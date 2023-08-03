import React, {useMemo, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';

import type {QuestionnaireItem} from 'components/QuestionnaireItem';

import type {RootState} from 'store';
import {setAnswer} from 'store/slices/questionnaire';
import COLORS from 'utils/colors';

import styles from './styles';

interface BasicInputProps {
  item: QuestionnaireItem;
}

const TimeInput = (props: BasicInputProps) => {
  const {item} = props;

  const dispatch = useDispatch();

  const currentAnswer = useSelector(
    (state: RootState) =>
      state?.questionnaire?.itemMap?.[item.linkId]?.answer?.[0].valueTime,
  );

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const showPicker = useCallback(() => setModalVisible(true), []);
  const hidePicker = useCallback(() => setModalVisible(false), []);

  const handleDateConfirm = useCallback(
    (payload: Date) => {
      hidePicker();
      const value = payload.toISOString().split('T').pop();
      dispatch(
        setAnswer({
          linkId: item.linkId,
          answer: value ? {valueTime: value} : null,
        }),
      );
    },
    [hidePicker, item, dispatch],
  );

  const label = useMemo(
    () =>
      (item.text || item.linkId.replace(/-/g, ' ')) +
      (item.required ? '*' : ''),
    [item],
  );

  const answerDisplay = useMemo(() => {
    if (currentAnswer) {
      const date = new Date();
      const timedDate = new Date(
        date.toISOString().split('T').shift() + 'T' + currentAnswer,
      );
      date.setTime(+timedDate);
      return date.toTimeString();
    }
    return undefined;
  }, [currentAnswer]);

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity onPress={showPicker}>
        <TextInput
          placeholder="Set time..."
          placeholderTextColor={COLORS.descText}
          value={answerDisplay}
          style={styles.input}
          editable={false}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isModalVisible}
        mode="time"
        onConfirm={handleDateConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

export default TimeInput;
