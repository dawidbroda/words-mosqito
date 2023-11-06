import { Button, Pressable, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useWordService } from '../../hooks/useWordService';
import { useEffect, useState } from 'react';
import { useListStringService } from '../../hooks/useListStringService';

export default function BackStageScreen() {
  const { list, saveListString } = useListStringService()
  const [listString, setListString] = useState<string>('')

  useEffect(() => {
    list && setListString(list)
  }, [list])

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='List string'
        multiline={true}
        numberOfLines={10} value={listString} onChangeText={setListString} />
      <Pressable style={styles.button} onPress={() => {
        saveListString(listString)
        alert('zapisano')
      }}><Text style={{ color: 'white'}}>Save</Text></Pressable>
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
