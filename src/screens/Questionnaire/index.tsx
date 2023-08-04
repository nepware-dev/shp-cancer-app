import React, {useCallback, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import QuestionnaireItem from 'components/QuestionnaireItem';
import {SaveButton} from 'components/HeaderButton';

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

  const handleSubmitQuestionnaire = useCallback(() => {
    const questionnaireResponse = createResponseJSON(
      itemMap,
      activeQuestionnaire,
    );
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
    // TODO: Submit QuestionnaireResponse to API
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
      <KeyboardAwareFlatList
        data={activeQuestionnaire?.item || []}
        renderItem={QuestionnaireItem}
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
