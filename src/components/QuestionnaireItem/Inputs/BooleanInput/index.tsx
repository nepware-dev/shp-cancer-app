import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import type {QuestionnaireItem} from 'components/QuestionnaireItem';
import RadioInput from '@rna/components/forms/RadioInput';

import {RootState} from 'store';
import {setAnswer} from 'store/slices/questionnaire';

import COLORS from 'utils/colors';

import styles from './styles';
import cs from '@rna/utils/cs';

interface BooleanInputProps {
  item: QuestionnaireItem;
}

const BooleanInput = (props: BooleanInputProps) => {
  const {item} = props;

  const dispatch = useDispatch();

  const currentAnswer = useSelector(
    (state: RootState) =>
      state.questionnaire?.itemMap?.[item.linkId].answer?.[0]?.valueBoolean,
  );

  const label = useMemo(
    () =>
      (item.text || item.linkId.replace(/-/g, ' ')) +
      (item.required ? '*' : ''),
    [item],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.optionsContainer}>
        <RadioInput
          contentContainerStyle={cs(styles.optionItem, [
            styles.optionItemSelected,
            currentAnswer === true,
          ])}
          label="Yes"
          labelStyle={styles.optionItemText}
          size="small"
          color={COLORS.primary}
          unSelectedColor={COLORS.descText}
          selected={currentAnswer === true}
          onPress={() =>
            dispatch(
              setAnswer({linkId: item.linkId, answer: {valueBoolean: true}}),
            )
          }
        />
        <RadioInput
          contentContainerStyle={cs(styles.optionItem, [
            styles.optionItemSelected,
            currentAnswer === false,
          ])}
          label="No"
          labelStyle={styles.optionItemText}
          size="small"
          color={COLORS.primary}
          unSelectedColor={COLORS.descText}
          selected={currentAnswer === false}
          onPress={() =>
            dispatch(
              setAnswer({linkId: item.linkId, answer: {valueBoolean: false}}),
            )
          }
        />
      </View>
    </View>
  );
};

export default BooleanInput;
