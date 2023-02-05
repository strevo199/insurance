import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './altNavigation';
import {RootStackParamtersList} from './type';
import {UserValuableList} from '../screen';
import { AddAvaluable } from '../screen/addAvaluable';

const Stack = createNativeStackNavigator<RootStackParamtersList>();

export const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={UserValuableList} name="UserValuableList" />
        <Stack.Screen component={AddAvaluable} name="AddAvaluable" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
