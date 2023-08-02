import React from 'react';
import {Text, View, Image} from 'react-native';

import Button from '../../components/Button';

import styles from './styles';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.heading}>Ready for the Questions</Text>
        <Text style={styles.message}>
          Please attempt all questions for better result
        </Text>
        <Image
          style={styles.doctorImage}
          source={require('../../assets/images/doctor.png')}
        />
      </View>
      <Button title="Question Set" />
    </View>
  );
};

export default Home;
