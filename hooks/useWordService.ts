import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';
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
      setList(JSON.parse(listString))
    }
  }

  const addWord = async (word: string, translate: string) => {
    let listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    if(!listString?.length) {
      listString = '[]'
    }
  
    const newList: object[] = JSON.parse(listString)
    
    newList.push({ word: word.toLowerCase(), translate: translate.toLowerCase(), bucket: 1, id: uuid.v4() })
    await AsyncStorage.setItem('words_mosquito_list', JSON.stringify(newList));
    setList(newList)
  }

  const removeWord = async (id: any) => {
    const currentListString = await AsyncStorage.getItem('words_mosquito_list')

    if(currentListString) {
      const currentList: [] = JSON.parse(currentListString)
      const newList: object[] = []

      currentList.forEach((item: any) => {
        if(id !== item.id) {
          newList.push(item)
        }
      })

      await AsyncStorage.setItem('words_mosquito_list', JSON.stringify(newList));
      setList(newList)
    }
  }

  return {list, addWord, removeWord}
}