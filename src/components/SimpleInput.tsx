/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardType, TextInput} from 'react-native/';
import {Box, Text} from '.';

type SimpleInputType = {
  value?: string;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
  height?: number;
  keyboardType?: KeyboardType;
  onChangeText?: (text: string) => void;
};

export const SimpleInput = ({
  value,
  height = 62,
  label,
  keyboardType='default',
  placeholder,
  multiline = false,
  onChangeText,
}: SimpleInputType) => {
  return (
    <Box
      height={height}
      borderRadius="sm"
      borderWidth={0.3}
      borderColor="primaryColor"
      paddingHorizontal={'sm'}
      paddingVertical="xs">
      <Box>
        <Text variant={'regular12'}>{label}:</Text>
      </Box>
      <TextInput
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={keyboardType}
        style={{
          fontSize: 20,
          padding: 0,
          maxHeight: 50,
          justifyContent: 'center',
        }}
        value={value}
        onChangeText={onChangeText}
      />
    </Box>
  );
};
