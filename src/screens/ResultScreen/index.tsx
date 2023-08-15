import React, {useCallback, useMemo} from 'react';
import {View, Image, Text} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import Button from 'components/Button';

import {removeActiveQuestionnaire} from 'store/slices/questionnaire';

import {RootStackParamList, NavigationProps} from 'navigation';

import styles from './styles';

const data = [
  {
    id: 1,
    status: 'negative',
    image: require('assets/images/result/happy.png'),
    result: 'Congratulations, you have reported a negative test result',
    message: '',
  },
  {
    id: 2,
    status: 'normal',
    image: require('assets/images/result/normal.png'),
    result: '',
    message: '',
  },
  {
    id: 3,
    status: 'positive',
    image: require('assets/images/result/sad.png'),
    result: 'Unfortunately, you have reported a positive test result',
    message: 'Please contact us for Healthcare facilities',
  },
];

const ResultScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const {params} = useRoute<RouteProp<RootStackParamList, 'Result'>>();

  const dispatch = useDispatch();

  const handleTakeSurveyClick = useCallback(() => {
    dispatch(removeActiveQuestionnaire());
    navigation.navigate('Home');
  }, [navigation, dispatch]);

  const activeResultData = useMemo(() => {
    return params?.resultType === 'VIA Positive' ? data[2] : data[0];
  }, [params]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.emoji} source={activeResultData.image} />
        <Text style={styles.heading}>{activeResultData.result}</Text>
        <Text style={styles.message}>{activeResultData.message}</Text>
      </View>
      <Button onPress={handleTakeSurveyClick} title="Take Another Survey" />
    </View>
  );
};

export default ResultScreen;
