import React, {useEffect, useState} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Host} from 'react-native-portalize';
import {useDispatch} from 'react-redux';
import Nav from '../navigation/AppDrawer';
import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';

LogBox.ignoreAllLogs();

export default function AppContainer(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isAppInitialized, setIsAppInitialized] = useState(true);

  useEffect(() => {}, []);

  return isAppInitialized ? (
    <Host>
      <StatusBar style="dark" />
      <Nav key={props.appKey} />
      <Toast />
    </Host>
  ) : null;
}
