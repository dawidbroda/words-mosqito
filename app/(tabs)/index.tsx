import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useWordService } from '../../hooks/useWordService';
import { useEffect } from 'react';

export default function TabOneScreen() {
  const { list, addWord, removeWord } = useWordService()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista {list?.length}</Text>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column'}}>
          {list && list?.map((item: any) => (
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
