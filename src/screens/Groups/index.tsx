
import { GroupCard } from "@components/GroupCard";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { useState } from "react";
import { FlatList } from "react-native";
import { ListEmpety } from "@components/ListEmpety";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native"

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  

  function handleNewGroup() {
    navigation.navigate('new')
  
  }

  return (
    <Container>
     <Header />

     <HighLight  title="Turmas" subtitle="Jogue com a sua turma " />

     <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex:1} }
        ListEmptyComponent={() => (
          <ListEmpety message="que tal cadastrar a primeira turma?" />
        )}
        showsHorizontalScrollIndicator={false}
     />

     <Button
        title="Criar nova turma"
        onPress={handleNewGroup}
     />

    </Container>
  );
}

