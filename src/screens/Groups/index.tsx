
import { GroupCard } from "@components/GroupCard";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";



export function Groups() {
  return (
    <Container>
     <Header />

     <HighLight  title="Turmas" subtitle="Jogue com a sua turma " />

     <GroupCard title="Turminha do Linkdin"/>
    </Container>
  );
}

