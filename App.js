import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { syncData } from './src/utils/cloudEngine';

export default function App() {
  const handlePress = async () => {
    const res = await syncData();
    console.log("Datos sincronizados:", res);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnGigante} onPress={handlePress}>
        <Text style={styles.btnText}>SINCRO GIGANTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  btnGigante: { backgroundColor: '#ff5722', width: '80%', padding: 20, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 20, fontWeight: 'bold' }
});