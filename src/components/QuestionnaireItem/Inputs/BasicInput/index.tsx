import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import type {QuestionnaireItem} from 'components/QuestionnaireItem';

import type {RootState} from 'store';
import {setAnswer} from 'store/slices/questionnaire';

import styles from './styles';

interface BasicInputProps {
  item: QuestionnaireItem;
}

const getKeyboardType = (item: QuestionnaireItem) => {
  switch (item.type) {
    case 'integer':
      return 'number-pad';
    case 'quantity':
    case 'decimal':
      return 'decimal-pad';
    default:
      return 'default';
  }
};

export const setGlobalAnswer = (item: any, value: any, dispatch: any) => {
  dispatch(setAnswer({answer: value, linkId: item.linkId}));
};

const BasicInput = (props: BasicInputProps) => {
  const {item} = props;

  const dispatch = useDispatch();

  const globalValue = useSelector(
    (state: RootState) =>
      Object.values(
        state?.questionnaire?.itemMap?.[item.linkId]?.answer?.[0] ?? {},
      )[0],
  ) as string | undefined;
  const [localValue, setLocalValue] = useState<undefined | string>(undefined);

  useEffect(
    () => setLocalValue(localValue ?? globalValue),
    [localValue, globalValue],
  );

  const label = useMemo(
    () =>
      (item.text || item.linkId.replace(/-/g, ' ')) +
      (item.required ? '*' : ''),
    [item],
  );

  const handleAnswerChange = useCallback(
    (text: string) => {
      text = text.trim();
      setLocalValue(text);
      if (
        item.type === 'integer' &&
        (!Number.isInteger(Number(text)) ||
          text.includes(',') ||
          text.includes('.'))
      ) {
        setGlobalAnswer(item, null, dispatch);
        return;
      } else if (item.type === 'decimal') {
        text = text.replace(',', '.');
        if (Number.isNaN(Number(text))) {
          setGlobalAnswer(item, null, dispatch);
          return;
        }
      }
      setGlobalAnswer(
        item,
        text
          ? {
              [`value${
                item.type.charAt(0).toUpperCase() + item.type.slice(1)
              }`]: item.type === 'string' ? text : Number(text),
            }
          : null,
        dispatch,
      );
    },
    [dispatch, item],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={localValue}
        style={styles.input}
        keyboardType={getKeyboardType(item)}
        onChangeText={handleAnswerChange}
      />
    </View>
  );
};

export default BasicInput;
