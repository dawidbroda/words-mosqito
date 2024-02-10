import { StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useWordService } from '../../hooks/useWordService';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [search, setSearch] = useState('')
  const { list, addWord, removeWord } = useWordService()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista {list?.length}/{(list?.filter((i: any) => i?.bucket === 6)).length}</Text>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column'}}>
          <TextInput 
            style={styles.input} 
            placeholder='szukaj' 
            value={search}
            onChangeText={setSearch}
          />
          {list && list?.filter((w: any) => w.translate.startsWith(search))?.map((item: any) => (
          <View style={styles.itemContainer}>
            <Text style={styles.listItem}>{item?.word}: {item?.translate}</Text><Pressable onPress={() => {
              removeWord(item.id)
            }}><Text style={styles.x}>X</Text></Pressable>
          </View>))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
    marginRight: 10
  },
  itemContainer: {
    flex: 1,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  x: {
    marginTop: 10
  }
});
