import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>Sistema en Mantenimiento</Text>
      <Text style={styles.alert}>Estamos solucionando unos problemas técnicos intermitentes en nuestros servidores de música.</Text>
      <ActivityIndicator size="large" color="#d9534f" style={{ marginTop: 20 }} />
      <Text style={styles.footer}>Equipo de Soporte DevOps & QA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', padding: 20 },
  icon: { fontSize: 50, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  alert: { fontSize: 14, color: '#aaa', textAlign: 'center', lineHeight: 20 },
  footer: { position: 'absolute', bottom: 30, color: '#555', fontSize: 12 }
});