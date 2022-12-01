import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme, useNavigationContainerRef  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home'
import Posts from './components/Posts';
import logo from './assets/logo.png'

const Stack = createStackNavigator();
const navTheme = DefaultTheme;
navTheme.colors.background = '#171717';

export default function App() {

  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={{ 
           headerTitle: () => (
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%',}}>
                <Text style={{color: '#EDEDED', fontWeight: 'bold', fontSize: 20, marginLeft:5}}>Busqueda de Usuarios</Text>
                <Image style={{ width: 100, height: 20,  }} source={logo} />
            </View>
          ),
            title: 'Busqueda de Usuarios',
            headerStyle: {
              backgroundColor: '#171717',
            },
            headerTintColor: '#EDEDED',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}/>
        <Stack.Screen name="Posts" component={Posts} options={
          { 
            title: '',
              headerStyle: {
              backgroundColor: '#171717',
            },
            headerTintColor: '#EDEDED',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

