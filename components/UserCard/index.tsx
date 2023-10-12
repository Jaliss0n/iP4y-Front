import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native"; // Importando styled-components corretamente
import { useTheme } from "../../ThemeContext";
import { IconButton } from "react-native-paper";
import ModalLayout from "../ModalLayoult";
import ModalCount from "../ModalInput";
import ModalWage from "../ModalOptions";

interface UserCardProps {
  title: string;
  idCliente: string;
  name: string;
  cpf: string;
  surname: string;
  dateOfBirthday: string;
  email: string;
  gender: string;
  getData: () => void;
}

export default function UserCard({
  title,
  idCliente,
  name,
  cpf,
  surname,
  dateOfBirthday,
  email,
  gender,
  getData,
}: UserCardProps) {
  const { theme } = useTheme();

  //Estado do Modal Adicionar User
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //Estado Modal Editar User
  const [edit, setEdit] = React.useState(false);
  const showModalEdit = () => setEdit(true);
  const hideModalEdit = () => setEdit(false);

  const CardContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme.colors.primary};
    border-radius: 18px;
    padding-vertical: 10px;
    margin-right: 10px;
    elevation: 10;
    shadow-color: black;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.8;
    margin-bottom: 15px;
  `;

  const ContainerGroup = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 15px;
  `;

  const IconImage = styled(Image)`
    width: 40px;
    height: 40px;
    margin-right: 15px;
    tint-color: #fff;
  `;

  const TextBudget = styled(Text)`
    color: #fff;
    font-family: "Roboto-Bold";
    font-weight: 800;
    font-size: 25px;
    margin-right: 15px;
  `;

  const ContainerActions = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  `;

  return (
    <CardContainer>
      <ContainerGroup>
        <IconImage source={require("../../assets/images/accountcircle.png")} />
        <TextBudget>{title}</TextBudget>
      </ContainerGroup>
      <ContainerActions>
        <IconButton
          icon="delete-circle"
          iconColor="#fff"
          size={35}
          onPress={() => showModal()}
        />
        <IconButton
          icon="circle-edit-outline"
          iconColor="#fff"
          size={35}
          onPress={() => showModalEdit()}
        />
      </ContainerActions>
      <ModalLayout
        title="Apagar"
        hideModal={hideModal}
        visible={visible}
        showModal={showModal}
      >
        <ModalWage
          title="Tem certeza que pretende apagar o usuario?"
          subtitle="Esta ação não tem volta."
          idCliente={idCliente}
          type="delete"
          hideModal={hideModal}
          getData={getData}
        />
      </ModalLayout>

      <ModalLayout
        title="Editar"
        hideModal={hideModalEdit}
        visible={edit}
        showModal={showModalEdit}
      >
        <ModalCount
          getData={getData}
          edit
          idClient={idCliente}
          defaultValues={{
            cpf: cpf,
            name: name,
            surname: surname,
            dateOfBirth: dateOfBirthday,
            email: email,
            gender: gender,
          }}
        />
      </ModalLayout>
    </CardContainer>
  );
}
