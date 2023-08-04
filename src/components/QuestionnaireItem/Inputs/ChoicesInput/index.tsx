import React, {useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

import Checkbox from 'components/Checkbox';
import {QuestionnaireItem} from 'components/QuestionnaireItem';

import {RootState} from 'store';
import {setAnswer} from 'store/slices/questionnaire';

import styles from './styles';

const getItemTitle = (item: any) => {
  let title;

  // sets the title in case of a valueCoding attribute
  if (item.valueCoding) {
    title = item.valueCoding.display ?? item.valueCoding.code;
  } else {
    // get the object entry whose key starts with 'value'
    title =
      item[
        Object.keys(item).find(key => key.startsWith('value')) as string
      ].toString();
  }
  return title;
};

interface ChoicesInputProps {
  item: QuestionnaireItem;
}

const ChoicesInput = (props: ChoicesInputProps) => {
  const {item} = props;

  const dispatch = useDispatch();

  const [isPickerFocused, setPickerFocused] = useState<boolean>(false);

  const label = useMemo(
    () =>
      (item.text || item.linkId.replace(/-/g, ' ')) +
      (item.required ? '*' : ''),
    [item],
  );

  const questionnaireItemMap = useSelector(
    (state: RootState) => state.questionnaire.itemMap,
  );
  const itemMapEntry = useMemo(
    () => questionnaireItemMap?.[item.linkId],
    [questionnaireItemMap, item],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}</Text>
      {item.repeats ? (
        item.answerOption.map((answerOption: any, index: number) => (
          <Checkbox
            key={index}
            label={getItemTitle(answerOption)}
            checked={Boolean(
              questionnaireItemMap?.[item.linkId]?.answer?.find(
                (entry: any) =>
                  JSON.stringify(entry) === JSON.stringify(answerOption),
              ),
            )}
            onPress={() =>
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: {
                    [Object.keys(answerOption)[0]]:
                      answerOption[Object.keys(answerOption)[0]],
                  },
                  repeats: true,
                }),
              )
            }
          />
        ))
      ) : (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={JSON.stringify(
              itemMapEntry.answer ? itemMapEntry.answer[0] : null,
            )}
            onValueChange={value => {
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: JSON.parse(value),
                }),
              );
            }}
            onFocus={() => setPickerFocused(true)}
            onBlur={() => setPickerFocused(false)}
            style={styles.picker}>
            <Picker.Item label="Select answer..." enabled={!isPickerFocused} />
            {(item.answerOption || []).map(
              (answerOption: any, index: number) => (
                <Picker.Item
                  fontFamily="Manrope-Medium"
                  label={getItemTitle(answerOption)}
                  value={JSON.stringify(answerOption)}
                  key={index}
                />
              ),
            )}
          </Picker>
        </View>
      )}
    </View>
  );
};

export default ChoicesInput;
