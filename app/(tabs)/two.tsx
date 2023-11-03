import { Button, Pressable, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
  const [current, setCurrent] = useState<any>()
  const [answer, setAnswer] = useState<string>('')
  const [checkAnswer, setCheckAnswer] = useState<any>()

  const getRandomInt = (max: any) => {
    return Math.floor(Math.random() * (max - 0 + 1));
  }

  const getRandomWord = async () => {
    const listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    
    if(listString) {
      const list: [] = JSON.parse(listString)
      setCurrent(list[getRandomInt(list.length - 1)])
    }
  }

  useEffect(() => {
    getRandomWord()
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{current?.word}</Text>
      {checkAnswer && <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: current.translate === answer.toLowerCase() ? 'green' : 'red'
      }}>{current?.translate}</Text>}
      <TextInput style={styles.input} placeholder='wpisz tłumaczenie...' value={answer} onChangeText={setAnswer} />
      <Pressable style={styles.button} onPress={() => {
        setCheckAnswer(true)
      }}><Text style={{ color: 'white'}}>sprawdz</Text></Pressable>
      {checkAnswer && <Pressable style={styles.button} onPress={() => {
        getRandomWord()
        setAnswer('')
        setCheckAnswer(false)
      }}><Text style={{ color: 'white'}}>następne</Text></Pressable>}
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 0,
    width: '80%',
  },
  input: {
    width: 300,
    height: 40,
    fontSize: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderCurve: 5,
    paddingLeft: 5,
    marginTop: 50
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
