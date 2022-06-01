import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import AppHeader from './src/components/AppHeader'
import {View, TouchableOpacity, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard, 
  Nominations,
  NominationUsers,
  Ocenka
} from './src/screens'
import { AntDesign } from '@expo/vector-icons';

const Stack = createStackNavigator()

export default function App() {
  const rightButtons = [
    {
        id: 1,
        color: 'rgba(255, 255, 255, 0.15)',
        content: <Text><AntDesign name="user" size={15} color="white" /></Text>,
        action: () => alert('Тут будет профиль'),
    }
];


  return (
    
    <Provider theme={theme}>
      <SafeAreaProvider>
      
      <NavigationContainer style={{marginTop: 0}}>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
          style={{marginTop: 0}}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Nominations" component={Nominations} />
          <Stack.Screen name="NominationUsers" component={NominationUsers} />
          <Stack.Screen name="Ocenka" component={Ocenka} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
     
      </SafeAreaProvider>
    </Provider>
  )
}