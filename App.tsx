import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useSkatefield } from './hooks/useSkatefield';
import { SkatefieldMap } from './components/SkatefieldMap';

export default function App() {
  const { skatefields, loading } = useSkatefield();

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Ladataan luistelukenttiä...</Text>
        </View>
      ) : (
        <SkatefieldMap data={skatefields} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
