import React from 'react';
import {View, Text} from 'react-native';

import AttachmentInput from './Inputs/AttachmentInput';
import BasicInput from './Inputs/BasicInput';
import BooleanInput from './Inputs/BooleanInput';
import ChoicesInput from './Inputs/ChoicesInput';
import DateInput from './Inputs/DateInput';
import DateTimeInput from './Inputs/DateTimeInput';
import TimeInput from './Inputs/TimeInput';

import styles from './styles';

export interface QuestionnaireItem {
  linkId: string;
  type: string;
  required: boolean;
  text?: string;
  item?: QuestionnaireItem[];
  [key: string]: any;
}

interface QuestionnaireItemProps {
  item: QuestionnaireItem;
}

const QuestionnaireItemComponent = (props: QuestionnaireItemProps) => {
  const {item} = props;

  if ((item.type === 'text' || item.type === 'display') && item.text) {
    return <Text style={styles.text}>{item.text}</Text>;
  }

  let questionItem;
  switch (item.type) {
    case 'string':
    case 'quantity':
    case 'integer':
    case 'decimal':
      questionItem = <BasicInput item={item} />;
      break;
    case 'boolean':
      questionItem = <BooleanInput item={item} />;
      break;
    case 'date':
      questionItem = <DateInput item={item} />;
      // questionItem = <AttachmentInput item={item} />;
      break;
    case 'time':
      questionItem = <TimeInput item={item} />;
      break;
    case 'dateTime':
      questionItem = <DateTimeInput item={item} />;
      break;
    case 'attachment':
      questionItem = <AttachmentInput item={item} />;
      break;
    case 'choice':
      questionItem = <ChoicesInput item={item} />;
      break;
    case 'group': {
      if (item.text) {
        questionItem = <Text style={styles.groupTitle}>{item.text}</Text>;
      }
      break;
    }
    default:
      questionItem = <Text style={styles.text}>{JSON.stringify(item)}</Text>;
      break;
  }

  return (
    <View>
      {questionItem}
      {item.item &&
        item.item.map(subItem => (
          <QuestionnaireItemComponent item={subItem} key={subItem.linkId} />
        ))}
    </View>
  );
};

export default QuestionnaireItemComponent;
