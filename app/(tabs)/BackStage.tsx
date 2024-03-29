import { Button, Pressable, StyleSheet, TextInput, Platform } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useWordService } from '../../hooks/useWordService';
import { useEffect, useState } from 'react';
import { useListStringService } from '../../hooks/useListStringService';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Clipboard from 'expo-clipboard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BackStageScreen() {
  const { list, saveListString } = useListStringService()
  const [listString, setListString] = useState<string>('')
  const [api, setAPI] = useState<string>('http://192.168.1.6:4050/api/sync')

  const shot = async () => {
    try {
      const res = await axios.post(api, { JSONstring: "elo"}, {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
        }})
      setListString(`${res}`)
    } catch (e) {
      setListString(`${e}`)
    }
  }

  const copyToClipboard = async () => {
    const listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    
    if(listString) {
      const list: [] = JSON.parse(listString)
      const sortList: any[] = list?.filter((x: any) => x.bucket < 3).map((item: any) => item.translate)
      
      await Clipboard.setStringAsync(`
        Wymyśl krótkie zdanie w języku polskim które będzie zawierało jedno ze słów:
        ${sortList.join(', ')} i będzie
        w jednym z czasów: past simple, present simple, future simple, past continuous, 
        present continuous, future continuous, past perfect simple, present perfect simple, 
        future perfect simple, past perfect continuous, present perfect continuous lub 
        future present continuous. Wybierz formę, twierdzącą, przeczącą lub pytającą I 
        poinformuj który czas wybrałeś
      `);
      alert('prompt was copied')
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      token = await Notifications.getExpoPushTokenAsync({
        projectId: "ebad549f-1466-4ff1-8a64-ab197f51270a",
      });

    } else {
      alert('Must use physical device for Push Notifications');
    }
    token?.data && setListString(token?.data);
  }

  useEffect(() => {
    list && setListString(list)
  }, [list])

  return (
    <View style={styles.container}>
  
      <TextInput style={styles.input} placeholder='List string'
        multiline={true}
        numberOfLines={10} value={listString} onChangeText={setListString} />
            {/* <TextInput style={styles.inputlol} placeholder='pl' value={api} onChangeText={setAPI} /> */}
      <Pressable style={styles.button} onPress={() => {
        saveListString(listString)
        alert('zapisano')
      }}><Text style={{ color: 'white'}}>Save</Text></Pressable>
      <Pressable style={styles.button} onPress={() => {
        registerForPushNotificationsAsync()
      }}><Text style={{ color: 'white'}}>Notifi</Text></Pressable>
      <Pressable style={styles.button} onPress={() => {
        copyToClipboard()
      }}><Text style={{ color: 'white'}}>Get prompt</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: 300,
    height: 500,
    fontSize: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderCurve: 5,
    paddingLeft: 5,
    marginBottom: 10
  },
  inputlol: {
    width: 300,
    height: 40,
    fontSize: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderCurve: 5,
    paddingLeft: 5,
    marginBottom: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 10
  }
});
