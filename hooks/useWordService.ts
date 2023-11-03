import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export const useWordService = () => {
  const [list, setList] = useState<object[]>([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    //Cleaning list
    // await AsyncStorage.removeItem('words_mosquito_list');
    const listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    
    if(listString) {
      console.log(listString);
      
      setList(JSON.parse(listString))
    }
  }

  const addWord = async (word: string, translate: string) => {
    let listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    if(!listString?.length) {
      listString = '[]'
    }
  
    const newList: object[] = JSON.parse(listString)
    
    newList.push({ word: word.toLowerCase(), translate: translate.toLowerCase(), bucket: 1 })
    await AsyncStorage.setItem('words_mosquito_list', JSON.stringify(newList));
    setList(newList)
  }

  return {list, addWord}
}