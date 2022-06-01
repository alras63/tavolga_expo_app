import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native'

export default function StartScreen({ navigation }) {
    const onLoad = async() => {

        let token = await SecureStore.getItemAsync('secure_token');
    
        
    
        if(token != null && token != '') {
    
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })
        }
      
      }

      useEffect(() => {
        onLoad()
        }, [])
    
  return (
    <Background>
  
      <Logo />
      <Header>Приложение Таволга ЕРК</Header>
      <Paragraph>
        Единая информационная среда для проведения ЕРК в Самарской области
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Войти
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Зарегистрироваться
      </Button>
    </Background>
  )
}
