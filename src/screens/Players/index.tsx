import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";


import { playerAddByGroup } from "@storage/player/playersAddByGroup";
import { playersGetByGroupAdnTeam } from "@storage/player/playersGetByGroupAndTeam";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";


import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpety } from "@components/ListEmpety";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";




type RouteParams = {
    group: string;
}

export function Players(){
    const [isLoading, setIsLoading] = useState(true)

    const [newPlayerName, setNewPlayerName] = useState('')

    const [team, setTeam] = useState('time a')

    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const { group } = route.params as RouteParams;

    const newPlayerNameInput = useRef<TextInput>(null)

    const navigation = useNavigation()

    async function handleAddPlayer(){
        if(newPlayerName.trim().length  === 0){
            return Alert.alert('New player', 'informe o nome da pessoa para adicionar')
        }
        
        
        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            
           await playerAddByGroup(newPlayer, group)

           newPlayerNameInput.current?.blur()

           setNewPlayerName('')

           fetchPlayersByTeam()

        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message)
            }else{
                console.log(error)
                Alert.alert('Nova pessoa', 'ocorreu um erro inesperado')
            }
        }
    }

    async function fetchPlayersByTeam(){
        try {
            setIsLoading(true)

           const playersByTeam = await playersGetByGroupAdnTeam(group, team)
           setPlayers(playersByTeam)
        
        } catch (error) {
            console.log(error)
            Alert.alert('Time', 'não foi possivel carregar as pessoas')
        } finally{
            setIsLoading(false) // terminou de carregar o  loading sai
        }
    }

    async function handleRemovePlayer(playerName: string){
        try {
            
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()

        } catch (error) {
            Alert.alert('Time', 'não foi possivel remover a pessoa')
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group)
            navigation.navigate('groups')
        } catch (error) {
            Alert.alert('Remover grupo', 'It was not possible to remove the group')
        }
    }

    async function handleGroupRemove(){
        Alert.alert(
            'Remove', 
            'do you really wanna remove the group? ',
            [
                {text: 'No', style:'cancel'},
                {text: 'Yes', onPress: async () => groupRemove() }
            ]
         )
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])    

    return(
        <Container>
            <Header showBackButton />

            <HighLight
                title={group}
                subtitle="adicione a galera e separe os times"    
            />

            <Form>
                <Input 
                    onChangeText={setNewPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect={false} // para o corretor nao ficar tentando corrigir o nome da pessoa
                    value={newPlayerName}
                    inputRef={newPlayerNameInput}

                    onSubmitEditing={handleAddPlayer}//quandoa gente clica no 'confirmar' do tecldo para efetuar a acao
                    returnKeyType="done"
                />

                <ButtonIcon
                     icon="add"
                     onPress={handleAddPlayer}
                 />
            </Form>

            <HeaderList>

                <FlatList
                    data={['time a', 'time b']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            {
                isLoading ? <Loading /> : 

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard
                         name={item.name}
                         onRemove={() => handleRemovePlayer(item.name)}
                     />
                )}
                ListEmptyComponent={() => (
                    <ListEmpety message="não há pessoas nesse time" />
                  )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex:1}
                ]}
            />

            }


            <Button 
                title="Remover turma"
                type="SECONDARY"    
                onPress={handleGroupRemove}
            />
            
        </Container>
    )
}