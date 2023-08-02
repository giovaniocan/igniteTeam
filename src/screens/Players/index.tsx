import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpety } from "@components/ListEmpety";
import { Button } from "@components/Button";

export function Players(){
    const [team, setTeam] = useState('time a')

    const [players, setPlayers] = useState(['Giovani', 'João', 'Maca'])

    return(
        <Container>
            <Header showBackButton />

            <HighLight
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"    
            />

            <Form>
                <Input 
                    placeholder="Nome da pessoa"
                    autoCorrect={false} // para o corretor nao ficar tentando corrigir o nome da pessoa
                />

                <ButtonIcon icon="add" />
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
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard
                         name={item}
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