import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamtersList = {
  UserValuableList: undefined;
  AddAvaluable: undefined;
};

export type RootNavigationProps<Screen extends keyof RootStackParamtersList> =
  NativeStackScreenProps<RootStackParamtersList, Screen>;
