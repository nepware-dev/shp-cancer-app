import React from 'react';
import {Text} from 'react-native';

import Button from '@rna/components/Button';

import cs from '@rna/utils/cs';

import styles from './styles';

const _Button = ({
  title,
  style,
  ...buttonProps
}: {
  title: string;
  [key: string]: any;
}) => {
  return (
    <Button style={cs(styles.button, style)} {...buttonProps}>
      <Text style={styles.buttonText}>{title}</Text>
    </Button>
  );
};

export default _Button;
