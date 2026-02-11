import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Skatefield } from '../types/SkatefieldTypes';

interface Props {
  data: Skatefield[];
}

export function SkatefieldMap({ data }: Props) {
  // Kartalta valittu kenttä
  const [selectedField, setSelectedField] = useState<Skatefield | null>(null);

  return (
    <View style={styles.map}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 65.0000, longitude: 25.5000,
          latitudeDelta: 0.2, longitudeDelta: 0.2
        }}
      >
        {data.map(field => (
          <Marker
            key={field.id}
            coordinate={{latitude: field.latitude, longitude: field.longitude }}
            pinColor={
              field.maintenanceDelta < 24 ? "green" :
              field.maintenanceDelta < 168 ? "orange" : "red"
            }
            onPress={() => setSelectedField(field)}
          />
        ))}
      </MapView>

      {/* Kentän info-overlay markeria painaessa */}
      {selectedField && (
        <View style={styles.overlay}>
          <Text style={styles.title}>{selectedField.name}</Text>
          <Text style={styles.area}>{selectedField.area}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Huollettu:</Text>
            <Text style={styles.label}>{selectedField.maintenanceDelta}h sitten</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.label}>{selectedField.status}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setSelectedField(null)}
          >
            <Text style={styles.closeButtonText}>Sulje</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  map: { 
    flex: 1
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  area: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: '600',
  },
});