import { Button, Pressable, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';
import { syncDatabase } from '../../hooks/syncDatabaseService';

export default function Training() {
  const [current, setCurrent] = useState<any>()
  const [listArr, setListArr] = useState<[]>()
  const [bucket, setBucket] = useState<number>(1)
  const [answer, setAnswer] = useState<string>('')
  const [checkAnswer, setCheckAnswer] = useState<any>()

  const getRandomInt = (max: any) => {
    return Math.floor(Math.random() * (max - 0 + 1));
  }

  const getRandomBucket = () => {
    const random = getRandomInt(2)
    if(random === 0) {
      return 6
    }

    return random
  }

  const getRandomWord = async () => {
    const listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    
    if(listString) {
      const list: [] = JSON.parse(listString)
      setListArr(list)

      const bucket = getRandomBucket()
      
      const sortList: any = list?.filter((x: any) => x.bucket === bucket)
      setCurrent(sortList[getRandomInt(sortList.length - 1)])
    }
  }

  useEffect(() => {
    getRandomWord()
  },[])

  // const getCountInBucket = (bucketNumber: number) => {
  //   const sortList = listArr?.filter((x: any) => x.bucket === bucketNumber)
  //   return sortList?.length
  // }

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
      <View style={styles.titleContainer}>
        <Pressable onPress={() => updateBucket(1, current.id) }><Text style={styles.title}>-</Text></Pressable>
        <Text style={styles.title}>{current?.word} :</Text>
        <Text style={styles.title}>{current?.bucket}</Text>
      </View>
      {checkAnswer && <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green'
      }}>{current?.translate}</Text>}
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
    justifyContent: 'space-between',
    marginTop: 150
  }
});
