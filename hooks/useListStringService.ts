import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { syncDatabase } from './syncDatabaseService'

export const useListStringService = () => {
  const [list, setList] = useState<string>()

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    //Cleaning list
    // await AsyncStorage.removeItem('words_mosquito_list');
    const listString: string | null = await AsyncStorage.getItem('words_mosquito_list')
    
    if(listString) {
      setList(listString)
    }
  }

  const saveListString = async (listString: string) => {    
    await AsyncStorage.setItem('words_mosquito_list', listString);
    syncDatabase(listString)
    setList(listString)
  }

  return {list, saveListString }
}