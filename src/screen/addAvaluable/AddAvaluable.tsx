/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {camera, trash} from '../../assets/images';
import {Box, MainLayout, RenderCamera, Text} from '../../components';
import {SimpleInput} from '../../components/SimpleInput';
import {palette} from '../../theme/palette';
import DocumentPicker from 'react-native-document-picker';
import RNFB from 'rn-fetch-blob';
import SelectDropdown from 'react-native-select-dropdown';
import {RootNavigationProps} from '../../navigation/type';
import Modal from 'react-native-modal';

type ItemType = {
  name: string;
  description: string;
  purchasePrice: number;
  type: string;
  photo: string;
};

const categories = ['Art', 'electronics', 'jewelry', 'musical instruments'];

export const AddAvaluable = ({
  navigation,
}: RootNavigationProps<'AddAvaluable'>) => {
  const [newvalueData, setNewvalueData] = useState<ItemType>({
    name: '',
    description: '',
    purchasePrice: 0,
    type: '',
    photo: '',
  });
  const [snappedUri, setsnappedUri] = useState<string>('');

  type updateValueDataType = {
    label: keyof typeof newvalueData;
    value: string | number;
  };

  const {name, description, purchasePrice, photo} = newvalueData;
  const [loadingDocument, setloadingDocument] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCameraModalVisible, setCameraModalVisible] = useState(false);

  const updateValueData = ({label, value}: updateValueDataType) => {
    setNewvalueData({
      ...newvalueData,
      [label]: value,
    });
  };

  const handlePickingFile = async () => {
    setModalVisible(!isModalVisible);
    let data = '';
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      }).then(resdata => {
        if (resdata && resdata[0]) {
          let fileNameURI = resdata[0].uri;

          if (Platform.OS === 'ios') {
            fileNameURI = fileNameURI
              .replace('file:///', '')
              .replace('file://', '');
            fileNameURI = fileNameURI.split('%20').join(' ');
          }

          RNFB.fs
            .readStream(fileNameURI, 'base64', 4095)
            .then(
              (ifSteam: {
                open: () => void;
                onData: (arg0: (chunk: any) => void) => void;
                onError: (arg0: (error: any) => void) => void;
                onEnd: (arg0: () => void) => void;
              }) => {
                setloadingDocument(!loadingDocument);
                ifSteam.open();
                ifSteam.onData(chunk => {
                  data += chunk;
                });
                ifSteam.onError(_error => {
                  Alert.alert('Error', 'file loading error');
                });
                ifSteam.onEnd(() => {
                  setloadingDocument(!loadingDocument);
                  const file = `data:${resdata[0].type};base64,${data}`;
                  updateValueData({label: 'photo', value: file});
                });
              },
            );
        }
      });
    } catch {
      Alert.alert('Error', 'file loading error');
    }
  };

  const handleContinue = () => {
    let error = false;
    const errorField: string[] = [];
    Object.entries(newvalueData).map(item => {
      if (item[1] === '' || item[1] === 0) {
        errorField.push(item[0]);
        error = true;
      }
      return 0;
    });

    if (error) {
      Alert.alert('The Following cannot be empty', `${errorField.join(' , ')}`);
      return;
    } else {
      navigation.navigate('UserValuableList', {newvalueData});
    }
  };

  const handleCloseCamera = () => {
    setCameraModalVisible(!isCameraModalVisible);
    let data = snappedUri;
    if (Platform.OS === 'ios') {
      data = data.replace('file:///', '').replace('file://', '');
      data = data.split('%20').join(' ');
    }
    updateValueData({label: 'photo', value: data});
    setsnappedUri('')
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <MainLayout
      title={'Add Valuables'}
      hasBottomButton
      BotttomButtonFunction={handleContinue}
      hasBackButton
      BotttomButtonTitle={'Continue'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={200}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 70}}
          showsVerticalScrollIndicator={false}>
          <Box marginHorizontal={'md'}>
            {photo ? (
              <Box
                height={150}
                justifyContent="center"
                alignItems={'center'}
                marginVertical="lg"
                width={150}
                gap="sm"
                borderWidth={0.1}
                borderRadius="xl"
                alignSelf={'center'}
                borderColor="primaryColor">
                <Image
                  source={{uri: photo}}
                  resizeMode="cover"
                  style={{width: '100%', borderRadius: 65, height: '100%'}}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                  onPress={() => {
                    updateValueData({label: 'photo', value: ''});
                    setloadingDocument(false);
                  }}>
                  <Image
                    source={trash}
                    resizeMode="cover"
                    style={{
                      width: 30,
                      height: 30,

                      tintColor: 'red',
                      zIndex: 2,
                    }}
                  />
                </TouchableOpacity>
              </Box>
            ) : (
              <TouchableOpacity
                style={{
                  height: 150,
                  width: 150,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 75,
                  borderWidth: 0.1,
                  borderColor: palette.primaryColor,
                  marginVertical: 24,
                }}
                activeOpacity={0.7}
                onPress={loadingDocument ? () => {} : toggleModal}>
                {loadingDocument ? (
                  <ActivityIndicator size={'large'} />
                ) : (
                  <>
                    <Image
                      source={camera}
                      style={{
                        height: 50,
                        tintColor: palette.primaryColor,
                        width: 50,
                      }}
                    />
                    <Text variant={'bold18'}>Add photo</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
            <Box marginBottom={'sm'}>
              <SimpleInput
                label="Name"
                placeholder="enter vauable name"
                value={name}
                onChangeText={value => updateValueData({label: 'name', value})}
              />
            </Box>
            <Box marginVertical={'sm'}>
              <SimpleInput
                label="Vaule in £"
                placeholder="enter amount"
                value={purchasePrice}
                keyboardType="numeric"
                onChangeText={value =>
                  updateValueData({label: 'purchasePrice', value: +value})
                }
              />
            </Box>
            <Box marginVertical={'sm'}>
              <SelectDropdown
                data={categories}
                onSelect={selectedItem => {
                  updateValueData({label: 'type', value: selectedItem});
                }}
              />
            </Box>
            <Box marginVertical={'sm'}>
              <SimpleInput
                label="Description"
                height={150}
                placeholder="Optional..."
                value={description}
                onChangeText={value =>
                  updateValueData({label: 'description', value})
                }
              />
            </Box>
          </Box>
          <Modal
            hasBackdrop
            onBackdropPress={() => setModalVisible(!isModalVisible)}
            style={{justifyContent: 'flex-end', margin: 0, marginBottom: 1}}
            isVisible={isModalVisible}>
            <Box
              backgroundColor={'whiteColor'}
              borderTopRightRadius="lg"
              borderTopLeftRadius={'lg'}
              height={250}
              gap="xs"
              padding={'md'}
              width={'100%'}>
              <Box alignItems={'center'} marginVertical="md">
                <Text
                  color="textColor"
                  textTransform={'uppercase'}
                  variant={'bold18'}>
                  Upload Option
                </Text>
              </Box>
              <TouchableOpacity
                onPress={handlePickingFile}
                style={{
                  height: 40,
                  borderBottomColor: palette.grayLight,
                  borderBottomWidth: 0.5,
                  justifyContent: 'center',
                }}>
                <Text
                  textTransform={'uppercase'}
                  color="textColor"
                  variant={'bold16'}>
                  Select from Device
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!isModalVisible);
                  setCameraModalVisible(!isCameraModalVisible);
                }}
                style={{height: 40, justifyContent: 'center'}}>
                <Text
                  color="textColor"
                  textTransform={'uppercase'}
                  variant={'bold16'}>
                  Take a snapshot
                </Text>
              </TouchableOpacity>
              {/* <T textext>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} /> */}
            </Box>
          </Modal>

          <Modal
            hasBackdrop
            onBackdropPress={() => setCameraModalVisible(!isCameraModalVisible)}
            style={{justifyContent: 'flex-end', margin: 0, marginBottom: 0}}
            isVisible={isCameraModalVisible}>
            <RenderCamera
              snappedUri={snappedUri}
              handleCloseCamera={handleCloseCamera}
              setsnappedUri={setsnappedUri}
              setCameraModalVisible={setCameraModalVisible}
            />
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};
