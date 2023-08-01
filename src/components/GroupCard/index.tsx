import { TouchableOpacityProps } from "react-native";
import { Icon, Title, Container } from "./styles";

type GroupCardProps = TouchableOpacityProps & {
    title: string;

}

export function GroupCard({title, ...rest}:GroupCardProps){
    return(
        <Container>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container>
    )
}