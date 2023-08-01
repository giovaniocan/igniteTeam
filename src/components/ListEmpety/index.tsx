import { Container, Message } from "./styles"

type ListEmpetyProps = {
    message:string
} 

export function ListEmpety({message}:ListEmpetyProps){
    return(
        <Container>
            <Message>
                {message}
            </Message>
        </Container>
    )
}