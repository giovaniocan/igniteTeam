import { BackButton, BackIcon, Container, Logo } from "./styles";
import loogImg from '@assets/logo.png'

type Props = {
    showBackButton?: boolean
}

export function Header({showBackButton = false}:Props){
    return(
        <Container>
            {showBackButton && 
                <BackButton>
                     <BackIcon />
                </BackButton>
            }
            <Logo source={loogImg} />
        </Container>
    )
}