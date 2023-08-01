import React from 'react';
import {Text} from 'react-native';

import Button from '../../vendor/react-native-arsenal/lib/components/Button';

import styles from './styles';

const _Button = ({title, ...buttonProps}: {title: string}) => {
  return (
    <Button style={styles.button} {...buttonProps}>
      <Text style={styles.buttonText}>{title}</Text>
    </Button>
  );
};

export default _Button;
