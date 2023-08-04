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
import { Loading } from "@components/Loading";



export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(true)


  const navigation = useNavigation()


  function handleNewGroup() {
    navigation.navigate('new')
  
  }

  async function fetchGroups() {
    try {

      setIsLoading(true)
      const data = await groupsGetAll()

      setGroups(data)


    } catch (error) {

      console.log(error)

    } finally{
      setIsLoading(false)
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

     <HighLight  title="Team" subtitle="Play with your friends" />

     {
      isLoading ? <Loading /> : 

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
          <ListEmpety message="How about signing up for the first class?" />
        )}
        showsHorizontalScrollIndicator={false}
     />

    }


     <Button
        title="Create a new team"
        onPress={handleNewGroup}
     />

    </Container>
  );
}

