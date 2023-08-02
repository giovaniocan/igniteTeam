import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { HighLight } from "@components/HighLight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup(){
    const navigation = useNavigation();

    function handleNew(){
        navigation.navigate('players', { group: 'Cria do Lúis' });
    }

    return(
        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <HighLight
                     title="Nova turma"
                     subtitle="crie a turma para adicionar as pessoas"
                 />

                 <Input
                    placeholder="Nome da turma"
                 />

                <Button
                    title="Criar"
                    style={{marginTop:20}}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}