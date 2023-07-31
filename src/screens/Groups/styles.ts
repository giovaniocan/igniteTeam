import theme from "src/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme} => theme.)};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
    font-size: 24px;
`
