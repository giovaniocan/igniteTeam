import { useRoute } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";


import { playerAddByGroup } from "@storage/player/playersAddByGroup";
import { playersGetByGroupAdnTeam } from "@storage/player/playersGetByGroupAndTeam";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpety } from "@components/ListEmpety";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";



type RouteParams = {
    group: string;
}

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState('')

    const [team, setTeam] = useState('time a')

    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const { group } = route.params as RouteParams;

    async function handleAddPlayer(){
        if(newPlayerName.trim().length  === 0){
            return Alert.alert('Nova pessoa', 'informe o nome da pessoa para adicionar')
        }
        
        
        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            
           await playerAddByGroup(newPlayer, group)
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
           const playersByTeam = await playersGetByGroupAdnTeam(group, team)
           setPlayers(playersByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert('Time', 'não foi possivel carregar as pessoas')
        }
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

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard
                         name={item.name}
                         onRemove={() => {}}
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

            <Button 
                title="Remover turma"
                type="SECONDARY"    
            />
            
        </Container>
    )
}