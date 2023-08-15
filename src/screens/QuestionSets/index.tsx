import React, {useMemo, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import useFHIRResource from 'hooks/useFHIRResource';

import {setActiveQuestionnaire} from 'store/slices/questionnaire';

// import demoQuestionnaire from 'services/data/questionnaire.json';
import cervicalCancerScreeningQuestionnaire from 'services/data/CervicalCancerScreeningR4.json';

import COLORS from 'utils/colors';

import {NavigationProps} from 'navigation';

import styles from './styles';

const QuestionSets = () => {
  const navigation = useNavigation<NavigationProps>();

  const dispatch = useDispatch();

  const [{loading, result: questionnaire}] = useFHIRResource('Questionnaire');

  const questionSets = useMemo(() => {
    return questionnaire?.entry || [];
  }, [questionnaire]);
  console.log(questionSets);

  const handleQuestionSetPress = useCallback(
    (selectedQuestionnaire: any) => {
      dispatch(setActiveQuestionnaire(selectedQuestionnaire.resource));
      navigation.navigate('Questionnaire');
    },
    [dispatch, navigation],
  );

  const renderQuestionSetItem = useCallback(
    (props: {item: Record<string, any>}) => {
      return <QuestionSetItem {...props} onPress={handleQuestionSetPress} />;
    },
    [handleQuestionSetPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          // ...questionSets, // FIXME: only use static cervical cancer form for now
          {resource: cervicalCancerScreeningQuestionnaire},
        ]}
        renderItem={renderQuestionSetItem}
        keyExtractor={item => item.resource.title}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.text}>Loading...</Text>
          ) : (
            <Text style={styles.text}>No questionnaires found!</Text>
          )
        }
      />
    </View>
  );
};

function QuestionSetItem(props: {
  item: Record<string, any>;
  onPress: (item: any) => void;
}) {
  const {item, onPress} = props;

  const handlePress = useCallback(() => {
    onPress && onPress(item);
  }, [onPress, item]);

  return (
    <View style={styles.questionSetItem}>
      <TouchableOpacity onPress={handlePress} style={styles.itemWrapper}>
        <Text style={styles.questionSetItemText}>{item.resource?.title}</Text>
        <View style={styles.iconWrapper}>
          <Icon color={COLORS.textDarker} name="arrow-forward" size={14} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default QuestionSets;
