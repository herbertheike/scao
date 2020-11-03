import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, RefreshControl, ScrollView, Button } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import firebase from "firebase";
import {DrawerContentMenu} from './DrawerContent'
import Categorias from './getcategorias'
const searchicon = <Icon name="search" size={30} color="#25282B" style={{ marginHorizontal: 10 }} />;

const Drawer = createDrawerNavigator();
const url = 'http://localhost:8080/administrativo/shopping'
const ColorCode = ['#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061', '#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061',
  '#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061', '#E5454C', '#5653d4', '#08a791', '#faa33f', '#b6644f', '#fb3061',
  '#E5454C', '#5653d4', '#08a791', '#faa33f'];

  

function HomeScreen(props) {
//refresh
const wait = (timeout) => {
  return new Promise(resolve => { 
    setTimeout(resolve, timeout);
  });
}

const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);

  wait(2000).then(() => setRefreshing(false));
}, []);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const carticon = <Icon name='shopping-cart' size={30} color="#25282B" style={{ marginHorizontal: 10 }} />
  const menuicon = <Icon style={{ marginLeft: 10 }} onPress={() => props.navigation.toggleDrawer()} name="bars" color="#25282B" size={30} />
  useEffect(() => {
    fetch('http://192.168.0.107:8080/administrativo/segmento/')
      .then((response) => response.json())
      .then((json) => setData(json.Segmentos))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  state = { user: {} };

  return (

    <SafeAreaView style={styles.container}>

    <Header statusBarProps={{ barStyle: 'light-content' }} barStyle='light-content' leftComponent={menuicon}
        centerComponent={{ style: { color: '#25282B', fontWeight: 'bold', fontSize: 20, fontFamily: "Roboto" } }}
        rightComponent={carticon}
        containerStyle={{ backgroundColor: '#E8E8E8', justifyContent: 'space-around' }} />
      <View style={styles.section}>
        {searchicon}
        <TextInput style={{ flex: 1 }} placeholder='Busque produtos ou Lojas' name={'search'} ></TextInput>
      </View>
      <ScrollView >
        <View style={{height: 280, paddinga: 10}}>
          <Text style={{fontWeight: "bold", color: "black", padding: 10}}>Ofertas</Text>
        <FlatList
                horizontal
                data={data}
                keyExtractor={({ id }, item) => id}
                renderItem={({ item }) => (

                  <TouchableOpacity style={{
                    width: 300,
                    borderRadius: 15,
                    backgroundColor: "#ffffff",
                    color: '#000000',
                    marginHorizontal: 10,
                    alignItems: 'center',
                    padding: 7.5
                  }} title="Login" color='#ffffff' onPress={() => alert(item.idseg)}>
                    <Image style={{ width: '98%', height: 150,  borderRadius: 15,}} source={{ uri: 'https://s2.glbimg.com/AcvU3JnaX1sF2wTlwpNVJ3SYF6E=/e.glbimg.com/og/ed/f/original/2020/04/28/marcin-kempa-3slosn6dpoq-unsplash.jpg' }} />
                    <Text >{item.nome}</Text>
                  </TouchableOpacity>
                )}
              />
        </View>
      <View style={{ height:  'auto' }}>
      <Text style={{fontWeight: "bold", color: "black", padding: 10}}>Categorias</Text>
            {isLoading ? <ActivityIndicator /> : (
              <FlatList
                horizontal
                data={data}
                keyExtractor={({ id }, item) => id}
                renderItem={({ item }) => (

                  <TouchableOpacity style={{
                    width: 120,
                    height: 150,
                    borderRadius: 7,
                    backgroundColor: ColorCode[item.idseg - 1],
                    color: '#FFFFFF',
                    marginHorizontal: 10,
                    alignItems: 'center',
                    padding: 7.5
                  }} title="Login" color='#ffffff' onPress={() => alert(item.idseg)}>
                    <Text style={styles.botaotext}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
      </View>

      <View style={{ margin: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Lojas props={{ props }} />
      </View>
      </ScrollView>
      </SafeAreaView>
  );
}

function Lojas() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const staricon = <Icon name='star' size={12} />

  

  useEffect(() => {
    fetch('http://192.168.0.107:8080/shopping/lojas')
      .then((response) => response.json())
      .then((json) => setData(json.lojas))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View>
      <Text style={{fontWeight: "bold", color: "black", padding: 8}}>Lojas</Text>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
         refreshing={true}
          keyExtractor={({ id }, idLoja) => id}
          renderItem={({ item }) => (

            <TouchableOpacity style={{
              marginVertical: 5,
              borderRadius: 5,
              backgroundColor: '#ffffff',
              padding: 10,
            }} title="Login" color='#ffffff' onPress={() => navigation.navigate('LojaDetail', { params: { id: item.idLoja, logo: item.logo } })}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image style={{ width: 60, height: 60, marginRight: 5 }} source={{ uri: item.logo }} />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.lojastext}>{item.nomeloja} - {item.shopping}</Text>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={styles.starloja}>{staricon} - 4,93 - {item.segmento} - 5.0km</Text>
                    <Text style={styles.lojades}>{item.desc}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
};



export default function lojasMain() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContentMenu {... props}/>}>
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen name="Categorias" component={Categorias}/>
      <Drawer.Screen name="loja" component={Lojas} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e8e8e8',

  },
  cashbackdesk: {
    fontSize: 60,
    padding: 15,
    fontWeight: 'bold',

  },
  image: {
    width: 250,
    height: 100,
  },
  imageloja: {
    width: 60,
    height: 60,

  },
  ImageStyle: {
    padding: 25,

    margin: 10,
    height: 25,
    width: 25,
    resizeMode: 'center',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#000',
    height: 60,
    borderRadius: 5,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  login: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 15,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: -350,
    marginTop: 100
  },

  logintext: {
    fontWeight: 'bold',
    fontSize: 18,
    position: 'relative',
    width: 350
  },
  logindesc: {
    width: 350,
    fontSize: 14,
    position: 'relative',
    color: '#999999'
  },
  lojades: {
    width: '100%',
    fontSize: 14,
    position: 'relative',
    color: '#b9b9b9'
  },
  lojastext: {
    fontWeight: 'bold',
    color: '#000000'
  },
  starloja: {
    fontWeight: 'bold',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 10,
    color: '#ED9950',
  },
  botaotext: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});