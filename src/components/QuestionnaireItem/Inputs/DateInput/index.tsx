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

const DateInput = (props: BasicInputProps) => {
  const {item} = props;

  const dispatch = useDispatch();

  const currentAnswer = useSelector(
    (state: RootState) =>
      state?.questionnaire?.itemMap?.[item.linkId]?.answer?.[0].valueDate,
  );

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const showPicker = useCallback(() => setModalVisible(true), []);
  const hidePicker = useCallback(() => setModalVisible(false), []);

  const handleDateConfirm = useCallback(
    (payload: Date) => {
      hidePicker();
      const value = payload.toISOString().split('T').shift();
      dispatch(
        setAnswer({
          linkId: item.linkId,
          answer: value ? {valueDate: value} : null,
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

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity onPress={showPicker}>
        <TextInput
          placeholder="Set date..."
          placeholderTextColor={COLORS.descText}
          value={currentAnswer}
          style={styles.input}
          editable={false}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isModalVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

export default DateInput;
