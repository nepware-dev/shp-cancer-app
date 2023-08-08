import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {SaveButton} from 'components/HeaderButton';
import {AnalyzingLoader} from 'components/Loader';
import QuestionnaireItem from 'components/QuestionnaireItem';

import {createResponseJSON} from 'utils/questionnaire';

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

  const handleSubmitQuestionnaire = useCallback(() => {
    setLoading(true);
    const questionnaireResponse = createResponseJSON(
      itemMap,
      activeQuestionnaire,
    );
    // TODO: Submit QuestionnaireResponse to API
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'QuestionnaireResponse created!',
        JSON.stringify(questionnaireResponse),
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Result'),
          },
        ],
      );
    }, 2000);
  }, [itemMap, activeQuestionnaire, navigation]);

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
