import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { HighLight } from "@components/HighLight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup(){
    const [group, setGroup] = useState('')

    const navigation = useNavigation();

   async function handleNew(){
    try {

        if(group.trim().length === 0){
            return Alert.alert('New Group', 'Please, type the name of the team')
        }

        await  groupCreate(group)   
        navigation.navigate('players', { group });

    } catch (error) {
        if(error instanceof AppError){
            Alert.alert('New Team', error.message)
        }else{
            Alert.alert('New Team', 'It was not possible to create a new team')
            console.log(error)
        }

      

    }}

    return(
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <HighLight
                     title="New team"
                     subtitle="Create a team to add people"
                 />

                 <Input
                    placeholder="Name of the team"
                    onChangeText={setGroup}
                 />

                <Button
                    title="Create"
                    style={{marginTop:20}}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}