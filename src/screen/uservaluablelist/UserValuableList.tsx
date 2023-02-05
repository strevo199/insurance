/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import {Box, Card, MainLayout} from '../../components';
import {RootNavigationProps} from '../../navigation/type';
import {insuredData} from './data';

export type ItemType = {
  name: string;
  description: string;
  purchasePrice: number;
  type: string;
  photo: string;
};

export const UserValuableList = ({
  route,
}: RootNavigationProps<'UserValuableList'>) => {
  const {newvalueData} = route.params || {};

  const [insuredDataList, setinsuredDataList] =
    useState<ItemType[]>(insuredData);

  useEffect(() => {
    if (newvalueData) {
      let sumOfPurchasePrice = 0;
      for (let i = 0; i < insuredDataList.length; i++) {
        sumOfPurchasePrice += insuredDataList[i].purchasePrice;
      }

      if (sumOfPurchasePrice < 40000) {
        setinsuredDataList(current => [...current, newvalueData]);
      } else {
        Alert.alert(
          'Opps!!!',
          'Your total valuables can not exceed  40,000 euros',
        );
      }
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
    </MainLayout>
  );
};
