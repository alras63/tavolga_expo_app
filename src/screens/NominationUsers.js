import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import AppHeader from "../components/AppHeader";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import * as SecureStore from "expo-secure-store";
import * as storage from "../helpers/storage";
import { ActivityIndicator } from "react-native-paper";
import {
  Avatar,
  Button as Buttonpaper,
  Card,
  Title,
  Paragraph as Paragraphpaper,
  Text,
} from "react-native-paper";
import { View } from "react-native";
import { gettingData } from "../helpers/apiRequest";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function NominationUsers({ route, navigation }) {
  const event_id = route.params.ev_id;
  const nom_id = route.params.nom_id;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const [loadingA, setUsersNLoading] = useState(true);

  const [dataA, setUsersN] = useState();

  const getUserData = async (dispatch) => {
    const user_data = await storage.getData("user_data");
    setData(user_data);
    setLoading(false);
  };

  const fetchActivities = async (dispatch) => {
    gettingData(
      "https://hakaton.alras63.ru/api/users-event/" +
        event_id +
        "/" +
        nom_id
    ).then(async (data) => {
 
      await storage.storeData("usersN", JSON.stringify(data));
    });

    const usersN = await storage.getData("usersN");
    setUsersN(usersN);
    setUsersNLoading(false);
  };
  useEffect(() => {
    getUserData();
    fetchActivities();
  }, []);
  const width_proportion = "100%";
  const cardListitems = dataA ?
    dataA.users
      ? dataA.users.map((userNom) => (
          <Card
            key={userNom.id}
            style={{ width: width_proportion, marginVertical: 5 }}
          >
            <Card.Title title={`${userNom.surname} ${userNom.first_name} ${userNom.lastname}`} subtitle={userNom.work} />
            <Card.Content>
              <Paragraphpaper>{userNom.phone}</Paragraphpaper>
            </Card.Content>
            <Card.Actions>
              <Buttonpaper
                onTouchStart={() => {
                  navigation.navigate("Ocenka", { ev_id: event_id, nom_id: nom_id, user_id: userNom.id});
                }}
              >
                <Text>
                  Перейти к оценке участника
                </Text>
                
              </Buttonpaper>
            </Card.Actions>
          </Card>
        ))
      : () => {
          <ActivityIndicator />;
        } : () => {
          <ActivityIndicator />;
        }
  return (
    <View style={{ padding: 20 }}>
      <Header>Список участников</Header>

      <View>
        {loadingA ? (
          <ActivityIndicator />
        ) : (
          <ScrollView style={{maxHeight: "90%"}}>{cardListitems}</ScrollView>
        )}
      </View>
    </View>
  );
}
