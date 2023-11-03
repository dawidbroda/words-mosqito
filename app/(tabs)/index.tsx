import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useWordService } from '../../hooks/useWordService';
import { useEffect } from 'react';

export default function TabOneScreen() {
  const { list, addWord } = useWordService()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista {list?.length}</Text>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column'}}>
          {list && list?.map((item: any) => (<Text style={styles.listItem}>{item?.word}: {item?.translate}</Text>))}
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
    flexDirection: 'row'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
