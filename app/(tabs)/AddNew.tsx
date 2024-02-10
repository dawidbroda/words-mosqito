import { Button, Pressable, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useWordService } from '../../hooks/useWordService';
import { useState } from 'react';

export default function AddNewScreen() {
  const [word, setWord] = useState<string>('')
  const [translate, setTranslate] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const {list, addWord} = useWordService()

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input} 
        placeholder='pl' 
        value={word} 
        onChangeText={setWord} 
      />
      <TextInput 
        multiline={true}
        numberOfLines={4}
        style={styles.input} 
        placeholder='ang' 
        value={translate} 
        onChangeText={setTranslate}
      />
      <TextInput 
        style={styles.input} 
        placeholder='tags' 
        value={tags} 
        onChangeText={setTags}
      />
      <Pressable style={styles.button} onPress={() => {
        addWord(word, translate, tags)
        setWord('')
        setTranslate('')
        setTags('')
      }}><Text style={{ color: 'white'}}>Add</Text></Pressable>
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
    height:200, 
    textAlignVertical: 'top',
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
