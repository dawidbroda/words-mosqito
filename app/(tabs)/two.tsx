import { Button, Pressable, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';
import { syncDatabase } from '../../hooks/syncDatabaseService';

export default function TabTwoScreen() {
  const [current, setCurrent] = useState<any>()
  const [listArr, setListArr] = useState<[]>()
  const [bucket, setBucket] = useState<number>(1)
  const [answer, setAnswer] = useState<string>('')
  const [checkAnswer, setCheckAnswer] = useState<any>()

  const getRandomInt = (max: any) => {
    return Math.floor(Math.random() * (max - 0 + 1));
  }

  const getRandomWord = async () => {
    const listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    
    if(listString) {
      const list: [] = JSON.parse(listString)
      setListArr(list)
      const sortList: any = list?.filter((x: any) => x.bucket === bucket)
      setCurrent(sortList[getRandomInt(sortList.length - 1)])
    }
  }

  useEffect(() => {
    getRandomWord()
  },[])

  useEffect(() => {
    getRandomWord()
  }, [bucket])

  const getCountInBucket = (bucketNumber: number) => {
    const sortList = listArr?.filter((x: any) => x.bucket === bucketNumber)
    return sortList?.length
  }

  const updateBucket = async (toBucket: number, id: any) => {
    let listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    if(!listString?.length) {
      listString = '[]'
    }
  
    const newList: object[] = JSON.parse(listString)

    const updatedList = newList.map((item: any) => {
      return item.id === id ? { ...item, bucket: toBucket } : item
    })
    
    await AsyncStorage.setItem('words_mosquito_list', JSON.stringify(updatedList));
    syncDatabase(JSON.stringify(updatedList))
    alert('Zaktualizowano!')
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Pressable onPress={() => setBucket(1)}><View style={{...styles.box, backgroundColor: bucket === 1 ? 'green': 'white'}}><Text>{getCountInBucket(1)}</Text></View></Pressable>
        <Pressable onPress={() => setBucket(2)}><View style={{...styles.box, backgroundColor: bucket === 2 ? 'green': 'white'}}><Text>{getCountInBucket(2)}</Text></View></Pressable>
        <Pressable onPress={() => setBucket(3)}><View style={{...styles.box, backgroundColor: bucket === 3 ? 'green': 'white'}}><Text>{getCountInBucket(3)}</Text></View></Pressable>
        <Pressable onPress={() => setBucket(4)}><View style={{...styles.box, backgroundColor: bucket === 4 ? 'green': 'white'}}><Text>{getCountInBucket(4)}</Text></View></Pressable>
        <Pressable onPress={() => setBucket(5)}><View style={{...styles.box, backgroundColor: bucket === 5 ? 'green': 'white'}}><Text>{getCountInBucket(5)}</Text></View></Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Pressable onPress={() => updateBucket(1, current.id) }><Text style={styles.title}>-</Text></Pressable>
        <Text style={styles.title}>{current?.word}</Text>
        <Pressable onPress={() => updateBucket(bucket + 1, current.id)}><Text style={styles.title}>+</Text></Pressable>
      </View>
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
    justifyContent: 'flex-start',
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
  },
  boxContainer: {
    width: 350,
    height: 50,
    marginBottom: 150,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box: {
    width: 50,
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
