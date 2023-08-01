import { TouchableOpacityProps } from "react-native";
import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";
import { MaterialIcons} from '@expo/vector-icons'

type ButtonIconProps = TouchableOpacityProps & {
    icon:keyof typeof MaterialIcons.glyphMap // para passar as tipagem dessa biblioteca para ficar dinamica
    type?:ButtonIconTypeStyleProps

}

export function ButtonIcon({icon, type = 'PRIMARY', ...rest}:ButtonIconProps){
    return(
        <Container>
            <Icon 
                name={icon}
                type={type}  />
        </Container>
    )
}