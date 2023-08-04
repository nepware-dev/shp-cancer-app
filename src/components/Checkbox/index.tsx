import React, {useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from 'utils/colors';

import styles from './styles';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onPress?: (selected: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const {label, checked, onPress} = props;

  const handlePress = useCallback(() => {
    onPress && onPress(!checked);
  }, [onPress, checked]);

  return (
    <TouchableOpacity style={styles.checkboxItem} onPress={handlePress}>
      <Icon
        name={checked ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color={checked ? COLORS.primary : COLORS.inputBorder}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
