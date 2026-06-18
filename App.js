import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import { obtenerListaCanciones } from './assets/services/apiServices.js';

export default function App() {
  const [textBuscar, setTextBuscar] = useState('Rock');
  const [listaApi, setListaApi] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiCall = async () => {
    setLoading(true);
    try {
      const res = await obtenerListaCanciones(textBuscar);
      setListaApi(res);
    } catch (err) {
      console.log("error fetching", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.nav}>
        <Text style={{ color: '#1DB954', fontSize: 18, fontWeight: 'bold' }}>Evidencia DevOps & QA</Text>
      </View>

      <View style={styles.boxSearch}>
        <TextInput
          style={styles.inputTxt}
          placeholder="Buscar..."
          value={textBuscar}
          onChangeText={setTextBuscar}
        />
        <TouchableOpacity style={styles.btnSearch} onPress={apiCall}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 250, marginBottom: 15 }}>
        <Text style={styles.titleSec}>Resultados API Pública</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 10 }} />
        ) : (
          <FlatList
            data={listaApi.slice(0, 5)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardTrack}>
                <Image source={{ uri: item.album.cover_medium }} style={styles.imgAlbum} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }} numberOfLines={1}>{item.title}</Text>
                  <Text style={{ color: '#666', fontSize: 12 }}>{item.artist.name}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40, paddingHorizontal: 15 },
  nav: { backgroundColor: '#111', padding: 12, alignItems: 'center', marginBottom: 15, borderRadius: 5 },
  boxSearch: { flexDirection: 'row', marginBottom: 15 },
  inputTxt: { flex: 1, backgroundColor: '#fff', padding: 8, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  btnSearch: { backgroundColor: '#1DB954', padding: 10, marginLeft: 10, borderRadius: 5, justifyContent: 'center' },
  titleSec: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  cardTrack: { flexDirection: 'row', backgroundColor: '#fff', padding: 8, marginBottom: 6, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  imgAlbum: { width: 40, height: 40, borderRadius: 4 },
  rowTab: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  cellTab: { fontSize: 13 }
});