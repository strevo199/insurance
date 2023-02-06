/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, TouchableOpacity} from 'react-native';
import {Box, Card, MainLayout} from '../../components';
import {RootNavigationProps} from '../../navigation/type';
import {insuredData} from './data';
import {add} from '../../assets/images';
import {palette} from '../../theme/palette';

export type ItemType = {
  name: string;
  description: string;
  purchasePrice: number;
  type: string;
  photo: string;
};
export const UserValuableList = ({
  navigation,
  route,
}: RootNavigationProps<'UserValuableList'>) => {
  const {newvalueData} = route.params || {};

  const [insuredDataList, setinsuredDataList] =
    useState<ItemType[]>(insuredData);

  useEffect(() => {
    if (newvalueData) {
      let sumOfPurchasePrice = 0;
      const checkingArray = [...insuredDataList, newvalueData]
      for (let i = 0; i < checkingArray.length; i++) {
        sumOfPurchasePrice += checkingArray[i].purchasePrice;
      }

      if (sumOfPurchasePrice > 40000) {
        Alert.alert(
          'Opps!!!',
          'Your total valuables can not exceed  40,000 euros',
        );
      }

      setinsuredDataList(current => {
        for (let i = 0; i < current.length; i++) {
          sumOfPurchasePrice += current[i].purchasePrice;
        }
        if (sumOfPurchasePrice > 40000) {
          Alert.alert(
            'Opps!!!',
            'Your total valuables can not exceed  40,000 euros',
          );
          return current;
        } else {
          console.log('no');
          return [...current, newvalueData];
        }
      });
    }

    // }
  }, [newvalueData]);

  const RenderItem = ({item}: ItemType) => {
    return <Card item={item} />;
  };

  return (
    <MainLayout title={'My Valuables'} hasRightIcon>
      <Box flex={1} paddingTop="md" alignItems="center">
        <FlatList
          renderItem={RenderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={insuredDataList}
          ListFooterComponent={<Box height={50} />}
          keyExtractor={(item, index) => `item-${index}`}
        />
      </Box>
      <TouchableOpacity
        style={{
          height: 60,
          width: 60,
          position: 'absolute',
          right: 10,
          bottom: 50,
          elevation: 5,
          backgroundColor: 'white',
          borderRadius: 40,
        }}
        onPress={() => navigation.navigate('AddAvaluable')}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            tintColor: palette.primaryColor,
          }}
          source={add}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </MainLayout>
  );
};
