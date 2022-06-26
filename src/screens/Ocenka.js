import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import AppHeader from "../components/AppHeader";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import * as SecureStore from "expo-secure-store";
import * as storage from "../helpers/storage";
import { ActivityIndicator, List } from "react-native-paper";
import {
  Avatar,
  Button as Buttonpaper,
  Card,
  Title,
  Paragraph as Paragraphpaper,
  Text,
} from "react-native-paper";
import { View } from "react-native";
import { gettingData, postData } from "../helpers/apiRequest";
import { ScrollView } from "react-native-gesture-handler";
import ExpandedList from "../components/ExpandedList";

export default function Nominations({ route, navigation }) {
  const ev_id = route.params.ev_id;
  const nom_id = route.params.nom_id;
  const user_id = route.params.user_id;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [rating, setRating] = useState();
  const [criterias, setCriterias] = useState();
  const [comment, setComment] = useState();
  const [loadingA, setOcenkaLoading] = useState(true);

  const [dataA, setOcenka] = useState();

  const [ocenkaStorage, setOcenkaStorage] = useState([]);




  const getUserData = async (dispatch) => {
    const user_data = await storage.getData("user_data");
    setData(user_data);
    setLoading(false);
  };

  const ChangeMark = async (value, ppid) => {
    let data = new FormData()
    data.append("score", Number(value))
    postData(`https://hakaton.alras63.ru/api/update-score/${user_id}/${ppid}`, data)
    .then(res => console.log(res))
  }

  const saveOcenki = async(dispatch) => {
    ocenkaStorage.forEach(ocenka => {
      ChangeMark(ocenka.value, ocenka.id)
    });
  }

  const fetchActivities = async (dispatch) => {
    gettingData(
      `https://hakaton.alras63.ru/api/criterians/${ev_id}/${nom_id}/${user_id}`
    ).then(async (data) => {
      await storage.storeData("ocenka", JSON.stringify(data));
      const user = data["user"];
      gettingData(
        `https://hakaton.alras63.ru/api/rating?id=${ev_id}&nomination=${nom_id}`
      ).then((result) => {
        let rating = {
          stages: {},
        };
        for (var i in result) {
          var r = result[i];
          if (r.user.id == user.id) {
            rating["place"] = Number(i) + 1;
            rating["all"] = r.all;
            for (var j in r.rating) {
              rating.stages[j] = r.rating[j];
            }
          }
        }

        setRating(rating);

      });
      setOcenka(data);
      setOcenkaLoading(false);
    });
  };

  useEffect(() => {
    setUser(dataA ? dataA["user"] : null);
    setCriterias(dataA ? dataA["criterians"] : null);
    setComment(dataA ? dataA["comment"] : null);
  }, [dataA]);

  useEffect(() => {
    getUserData();
    fetchActivities();
  }, []);
  const width_proportion = "100%";
  const userItem = user ? (
    <Card style={{ width: width_proportion, marginVertical: 5 }}>
      <Card.Title
        title={`${user.surname} ${user.first_name} ${user.lastname}`}
        subtitle={user.work}
        titleNumberOfLines={3}
      />

      <Card.Content>
        <Paragraphpaper>{user.phone}</Paragraphpaper>
      </Card.Content>
    </Card>
  ) : (
    () => {
      <ActivityIndicator />;
    }
  );

  const stagesRating = function () {
    let stages = [];
    for (let index in rating["stages"]) {
      stages.push(
        <Paragraphpaper key={index}>
          <Text>
            Этап {index} — {rating["stages"][index]}
          </Text>
        </Paragraphpaper>
      );
    }

    return stages;
  };
  const ratingItem = rating ? (
    <Card style={{ width: width_proportion, marginVertical: 5 }}>
      <Card.Title title={`Рейтинг`} titleNumberOfLines={3} />

      <Card.Content>
        <Paragraphpaper>
          <Text>Позиция в рейтинге: {rating.place}</Text>
        </Paragraphpaper>
        <Paragraphpaper>
          <Text>Общее кол-во баллов: {rating.all} </Text>{" "}
        </Paragraphpaper>
        {stagesRating()}
      </Card.Content>
    </Card>
  ) : (
    () => {
      <ActivityIndicator />;
    }
  );

  const criteriaItems = function () {

    let crtr = [];

    for (let step in criterias) {
      for (let item in criterias[step]) {
        crtr.push(
          <ExpandedList setOcenkaStorage={setOcenkaStorage} ocenkaStorage={ocenkaStorage} item={criterias[step][item][0]} />
        );
      }
    }

    return crtr;
  };
  const ocenkaItem = criterias ? (
    <View>
      <List.Section title="Accordions"></List.Section>
      {criteriaItems()}
    </View>
  ) : (
    () => {
      <ActivityIndicator />;
    }
  );
  return (
    <View style={{ padding: 20 }}>
      <Header>Список номинаций</Header>

      <View>
        {loadingA ? (
          <ActivityIndicator />
        ) : (
          <>
          <ScrollView style={{maxHeight: "80%"}}>
            {userItem}
            {ratingItem}
            {ocenkaItem}
          
          </ScrollView>
            <Button mode="contained" onPress={saveOcenki}>
            Сохранить оценки
          </Button>
          </>
        )}
      </View>
    </View>
  );
}
