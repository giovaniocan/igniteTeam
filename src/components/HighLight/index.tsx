import { Container, SubTitle, Title } from "./styles";

type HighLightProps = {
    title: string;
    subtitle: string;
} 

export function HighLight({subtitle, title}:HighLightProps){
    return(
        <Container>
            <Title>
                {title}
            </Title>
            <SubTitle>
                {subtitle}
            </SubTitle>
        </Container>
    )
}