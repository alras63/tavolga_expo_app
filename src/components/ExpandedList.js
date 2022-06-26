import React from "react";
import { Text, View } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { List, TextInput } from "react-native-paper";

export default function ExpandedList({
  item,
  ocenkaStorage,
  setOcenkaStorage,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [text, setText] = React.useState(item.scoreUser[0]);

  const handlePress = () => setExpanded(!expanded);
  const criteriaItemsPuncts = function (step) {
    let crtrpunct = [];
    crtrpunct.push(
      <List.Item
        key={step.id}
        title={`${step.name}`}
        titleNumberOfLines={10}
        titleStyle={{ fontSize: 13 }}
        titleEllipsizeMode="tail"
      />
    );
    return crtrpunct;
  };

  return (
    <List.Accordion
      key={item.id}
      title={item.pp}
      left={(props) => <List.Icon {...props} icon="star" />}
      expanded={expanded}
      onPress={handlePress}
    >
      <View>
        {criteriaItemsPuncts(item)}
        <Text>{item.description}</Text>
        <InputSpinner
          max={item.maxScore}
          min={item.minScore}
          step={item.stepScore ? item.stepScore : 1}
          colorMax={"#f04048"}
          colorMin={"#00ACAB"}
          value={item.scoreUser[0]}
          onChange={(num) => {
            if (
              ocenkaStorage.find((ocenka) => {
                return ocenka.id == item.id;
              })
            ) {

              ocenkaStorage.find((ocenka) => {
                return ocenka.id == item.id;
              }).value = num;
          
              setOcenkaStorage(ocenkaStorage);
            } else {
              setOcenkaStorage([...ocenkaStorage, { id: item.id, value: num }]);
            }
          }}
          style={{ margin: 10, maxWidth: "60%", marginHorizontal: "auto" }}
          skin="paper"
        />
      </View>
    </List.Accordion>
  );
}
