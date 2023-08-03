import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native"

import { groupsGetAll } from "@storage/group/groupGetAll";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpety } from "@components/ListEmpety";
import { Button } from "@components/Button";



export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()


  function handleNewGroup() {
    navigation.navigate('new')
  
  }

  async function fetchGroups() {
    try {

      const data = await groupsGetAll()

      setGroups(data)
      
    } catch (error) {

      console.log(error)

    }
  }

  function handleOpenGroup(group:string){
    navigation.navigate('players', {group})
  }

  
  useFocusEffect(useCallback(() => {
    fetchGroups()
  },[]))

  
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
            onPress={() => handleOpenGroup(item)}
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

