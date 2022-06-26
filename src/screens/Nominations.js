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


export default function Nominations({ route, navigation }) {
  const event_id = route.params.id;

  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState();
  const [loadingA, setNominationsLoading] = useState(true);

  const [dataA, setNominations] = useState();

  const getUserData = async (dispatch) => {
 
     
        const user_data = await storage.getData('user_data');
  
        setData(user_data)
        setLoading(false)
      
 
  };

  const fetchActivities = async (dispatch) => {
    gettingData('https://hakaton.alras63.ru/api/nominations-event/' + event_id)
    .then(async (data) => {
        await storage.storeData('nominations', JSON.stringify(data));
        setNominations(data)
        setNominationsLoading(false)
      }); 
};
    useEffect(() => {
      getUserData();
      fetchActivities();
    }, []);
    const width_proportion = '100%';
    const cardListitems = dataA ? dataA.nominations ? dataA.nominations.map((nom) =>
    <Card key={nom.id} style={{width: width_proportion, marginVertical: 5}}>
        <Card.Title title={nom.name} subtitle={nom.short_name} />
        <Card.Content>
          <Paragraphpaper>{nom.description}</Paragraphpaper>
        </Card.Content>
        <Card.Actions>
          <Buttonpaper onPress={() => {navigation.navigate(
        'NominationUsers',
        { ev_id: event_id, nom_id: nom.id },
      )}}>Перейти к списку участников</Buttonpaper>
        </Card.Actions>
      </Card>
      ) : () => {
        <ActivityIndicator/>
      } : () => {
        <ActivityIndicator/>
      };
  return (
    <View style={{padding: 20}}>
     
      <Header>Список номинаций</Header>
        
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
    </View>
  )
}
