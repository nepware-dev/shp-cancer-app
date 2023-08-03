import React, {useCallback} from 'react';
import {Text, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import Button from 'components/Button';

import {setLogout} from 'store/slices/auth';

import styles from './styles';

const Home = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(setLogout());
  }, [dispatch]);

  const handleQuestionPress = useCallback(() => {
    navigation.navigate('QuestionSets');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={require('assets/images/logo.png')} />
        <Text style={styles.heading}>Ready for the Questions</Text>
        <Text style={styles.message}>
          Please attempt all questions for better result
        </Text>
        <Image
          style={styles.doctorImage}
          source={require('assets/images/doctor.png')}
        />
      </View>
      <Button title="View Question Sets" onPress={handleQuestionPress} />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default Home;
