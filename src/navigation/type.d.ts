import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamtersList = {
  UserValuableList: {
    name: string;
    description: string;
    purchasePrice: number;
    type: string;
    photo: string;
  };
  AddAvaluable: undefined;
};

export type RootNavigationProps<Screen extends keyof RootStackParamtersList> =
  NativeStackScreenProps<RootStackParamtersList, Screen>;
