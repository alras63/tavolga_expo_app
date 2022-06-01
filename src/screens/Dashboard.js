import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import AppHeader from '../components/AppHeader'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import * as SecureStore from 'expo-secure-store';
import * as storage from '../helpers/storage';
import { ActivityIndicator } from 'react-native-paper'
import { Avatar, Button as Buttonpaper, Card, Title, Paragraph as Paragraphpaper, Text } from 'react-native-paper';
import { View } from 'react-native'
import { gettingData } from '../helpers/apiRequest'
import { ScrollView } from 'react-native-gesture-handler'


export default function Dashboard({ navigation }) {
  
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const [loadingA, setActivitiesLoading] = useState(true);

  const [dataA, setActivities] = useState();

  const getUserData = async (dispatch) => {
 
     
        const user_data = await storage.getData('user_data');
        console.log(user_data);
        setData(user_data)
        setLoading(false)
      
 
  };

  const fetchActivities = async (dispatch) => {
    gettingData('https://hakaton.alras63.ru/api/events')
    .then(async (data) => {
        await storage.storeData('activities', JSON.stringify(data));
    });
     
  const activities = await storage.getData('activities');
   console.log(activities);
   setActivities(activities)
   setActivitiesLoading(false)
 

};
    useEffect(() => {
      getUserData();
      fetchActivities();
    }, []);
    const width_proportion = '100%';
  const cardListitems = dataA ? dataA.map((event) =>
<Card key={event.id} style={{width: width_proportion, marginVertical: 5}}>
    <Card.Title title={event.name} subtitle={event.descriptions} />
    <Card.Content>
      <Paragraphpaper>{event.descriptions}</Paragraphpaper>
    </Card.Content>
    <Card.Actions>
      <Buttonpaper onTouchStart={() => {navigation.navigate(
    'Nominations',
    { id: event.id },
  )}}>Перейти</Buttonpaper>
    </Card.Actions>
  </Card>
  ) : () => {
    <ActivityIndicator/>
  };
  return (
    <View style={{padding: 20}}>
     
      <Header>Список мероприятий</Header>
        
        <View>
        {
            (loadingA) ?
             <ActivityIndicator/>
             :
             <ScrollView>
             {cardListitems}
             </ScrollView>
           }
        </View>
  
      <Button
        mode="outlined"
        onPress={async() => {
          await SecureStore.setItemAsync('secure_token', '');
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
        }
      >
        ВЫЙТИ
      </Button>
    </View>
  )
}
