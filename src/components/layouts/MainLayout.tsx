/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {add, arrowLeft} from '../../assets/images';
import {Box, Card, Text} from '../../components';
import {palette} from '../../theme/palette';

export type MainLayoutPropsType = {
  title: string;
  hasBackButton?: boolean;
  BotttomButtonTitle?: string;
  hasBottomButton?: boolean;
  BotttomButtonFunction?: () => void;
  children?: JSX.Element | JSX.Element[];
};

export const MainLayout = ({
  title,
  hasBackButton = false,
  hasBottomButton = false,
  BotttomButtonTitle = 'Continue',
  children,
  BotttomButtonFunction,
}: MainLayoutPropsType) => {
  const navigation = useNavigation();
  const RenderHeader = () => {
    return (
      <Box
        marginVertical="lg"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginHorizontal="md">
        {hasBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                height: 15,
                width: 15,
                tintColor: palette.white,
              }}
              source={arrowLeft}
            />
          </TouchableOpacity>
        ) : (
          <Box />
        )}
        <Text variant="bold22" color="white">
          {title}
        </Text>

        <Box />
      </Box>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box flex={1} backgroundColor="mainBackground">
        {RenderHeader()}
        <Box
          backgroundColor="whiteColor"
          flex={1}
          overflow="hidden"
          position={'relative'}
          borderTopRightRadius="lg"
          justifyContent={'space-between'}
          borderTopLeftRadius={'lg'}>
          {children}
          {!!hasBottomButton && (
            <Box
              height={54}
              marginBottom="sm"
              borderRadius={'md'}
              width={'100%'}
              alignItems={'center'}
              bottom={0}
              position="absolute">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={BotttomButtonFunction}
                style={{
                  borderRadius: 8,
                  flex: 1,
                  backgroundColor: palette.mainBackground,
                  width: Dimensions.get('screen').width / 1.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  variant={'bold16'}
                  color="white"
                  textTransform={'uppercase'}
                  letterSpacing={1}>
                  {BotttomButtonTitle}
                </Text>
              </TouchableOpacity>
            </Box>
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
};
