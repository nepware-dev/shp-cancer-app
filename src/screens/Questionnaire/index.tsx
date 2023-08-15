import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Alert, Platform} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {SaveButton} from 'components/HeaderButton';
import {AnalyzingLoader} from 'components/Loader';
import QuestionnaireItem from 'components/QuestionnaireItem';

// import FHIRService from 'services/fhir';
import {createResponseJSON} from 'utils/questionnaire';
// import usePromise from '@rna/hooks/usePromise';

import type {RootState} from 'store';
import type {NavigationProps} from 'navigation';

import styles from './styles';

const Questionnaire = () => {
  const questionnaireState = useSelector(
    (state: RootState) => state.questionnaire,
  );
  const {activeQuestionnaire, itemMap} = questionnaireState;

  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState<boolean>(false);
  // const [{loading: creating}, createQuestionnaireResponse] = usePromise(
  //   FHIRService.createQuestionnaireResponse,
  // );

  const handleSubmitQuestionnaire = useCallback(async () => {
    try {
      setLoading(true);
      const questionnaireResponse = createResponseJSON(
        itemMap,
        activeQuestionnaire,
      );

      // FIXME: Right now does not store the image urls.
      console.log(questionnaireResponse);
      // await createQuestionnaireResponse(questionnaireResponse);

      const img1 = itemMap?.['before-image']?.answer?.[0]?.valueAttachment;
      const img2 = itemMap?.['after-image']?.answer?.[0]?.valueAttachment;

      if (!img1) {
        throw new Error('Images are required!');
      }

      const data = new FormData();
      data.append('img1', {
        name: img1.url.substring(img1.url.lastIndexOf('/') + 1),
        type: img1.contentType,
        uri: Platform.OS === 'ios' ? img1.url.replace('file://', '') : img1.url,
      });
      if (img2) {
        data.append('img2', {
          name: img2.url.substring(img2.url.lastIndexOf('/') + 1),
          type: img2.contentType,
          uri:
            Platform.OS === 'ios' ? img2.url.replace('file://', '') : img2.url,
        });
      }

      let res = await fetch(
        'https://cc.naamii.org.np/predictions/joint-rn18/',
        {
          method: 'POST',
          body: data,
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      );
      const resultResponse = await res.text();
      if (['VIA Positive', 'VIA Negative'].includes(resultResponse)) {
        navigation.navigate('Result', {
          resultType: resultResponse as 'VIA Positive' | 'VIA Negative',
        });
      } else {
        throw new Error(
          'Response invalid! Please make sure you have selected the images properly.',
        );
      }
    } catch (err: any) {
      Alert.alert(
        typeof err?.message === 'string'
          ? err.message
          : 'An error occured while processing your data!',
      );
      console.log(err);
    }
    setLoading(false);
  }, [
    itemMap,
    activeQuestionnaire,
    navigation,
    // createQuestionnaireResponse,
  ]);

  const renderSaveButton = useCallback(
    () => <SaveButton onPress={handleSubmitQuestionnaire} />,
    [handleSubmitQuestionnaire],
  );

  useEffect(() => {
    if (activeQuestionnaire?.started) {
      navigation.setOptions({
        headerRight: renderSaveButton,
      });
    }
  }, [navigation, activeQuestionnaire, renderSaveButton]);

  return (
    <View style={styles.container}>
      <AnalyzingLoader loading={loading} />
      <KeyboardAwareFlatList
        data={activeQuestionnaire?.item || []}
        renderItem={renderProps => <QuestionnaireItem {...renderProps} />}
        keyExtractor={item => item.linkId}
        removeClippedSubviews={false}
        ListHeaderComponent={
          <Text style={styles.title}>{activeQuestionnaire?.title}</Text>
        }
        ListEmptyComponent={
          <Text style={styles.text}>No questions found!</Text>
        }
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Questionnaire;
