import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamtersList} from './type';

export const navigationRef = createNavigationContainerRef();

type RouteName = keyof RootStackParamtersList;

export const navigate = (name: RouteName, params: RootStackParamtersList) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
