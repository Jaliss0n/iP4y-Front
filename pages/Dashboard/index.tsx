import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, Dimensions } from "react-native";
import { ContainerGradient } from "../../components/ContainerGradient";
import UserCard from "../../components/UserCard";
import FabButton from "../../components/Fab";
import { Avatar, Button, IconButton, Switch } from "react-native-paper";
import styled from "styled-components/native";
import { useTheme } from "../../ThemeContext";
import ModalLayout from "../../components/ModalLayoult";
import ModalOptions from "../../components/ModalOptions";
import axios from "axios";
import { api } from "../../global";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Dashboard() {
  const { toggleThemeType, isDarkTheme, theme } = useTheme();

  const [clients, setClients] = useState([
    {
      idCliente: "",
      cpf: "",
      name: "",
      surname: "",
      dateOfBirthday: "",
      email: "",
      gender: "",
    },
  ]);

  //modal Reset
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //modal Submit
  const [submit, setSubmit] = React.useState(false);
  const showSubmit = () => setSubmit(true);
  const hideSubmit = () => setSubmit(false);

  async function getClientsData() {
    try {
      const response = await axios.get(`${api}/client/list`);
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getClientsData();
  }, []);

  const BlockWhite = styled(View)`
    background-color: ${theme.colors.surface};
    height: ${windowHeight * 0.05}px;
  `;

  const WaveImg = styled(Image)`
    width: 100%;
    margin-bottom: ${windowWidth * 0.01}px;
    height: ${windowWidth * 0.1}px;
    tint-color: ${theme.colors.surface};
  `;

  const Container = styled(View)`
    flex: 1;
  `;

  const ContainerUser = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 0 10px;
  `;

  const TitleUser = styled(Text)`
    font-family: "Roboto-Bold";
    color: #e9e9e9;
    margin-bottom: 8px;
    margin-top: 8px;
    font-size: 30px;
  `;

  const ContainerBtn = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 100px;
    width: 95%;
  `;

  const ContainerMB = styled(View)`
    margin: 20px 0;
    padding: 0 10px;
  `;

  const Title = styled(Text)`
    font-family: "Roboto-Regular";
    font-size: 25px;
    color: #e9e9e9;
    margin-bottom: 8px;
    margin-left: 4px;
  `;

  const IconBtn = styled(IconButton)`
    background-color: ${theme.colors.primary};
    border-radius: 12px;
  `;

  return (
    <ContainerGradient>
      <ScrollView>
        <BlockWhite />
        <WaveImg
          source={require("../../assets/images/waveWhiteInvert.png")}
          resizeMode="stretch"
        />
        <Container>
          <ContainerUser>
            <TitleUser>Ola, Adm!</TitleUser>
            <View
              style={{
                width: "40%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {isDarkTheme === false ? (
                <IconBtn
                  icon="white-balance-sunny"
                  iconColor="#fff"
                  onPressIn={toggleThemeType}
                  size={35}
                  onPress={() => console.log("Pressed")}
                />
              ) : (
                <IconBtn
                  icon="moon-waxing-crescent"
                  iconColor="#fff"
                  onPressIn={toggleThemeType}
                  size={35}
                  onPress={() => console.log("Pressed")}
                />
              )}
              <Avatar.Image
                size={50}
                source={require("../../assets/images/avatar.png")}
              />
            </View>
          </ContainerUser>

          <ContainerMB>
            <Title>Usuarios Criados</Title>
            <ScrollView showsHorizontalScrollIndicator={false}>
              {clients.map((client) => (
                <UserCard
                  getData={getClientsData}
                  key={client.idCliente}
                  title={client.name}
                  idCliente={client.idCliente}
                  cpf={client.cpf}
                  dateOfBirthday={client.dateOfBirthday}
                  email={client.email}
                  name={client.name}
                  surname={client.surname}
                  gender={client.gender}
                />
              ))}

              <ContainerBtn>
                <Button
                  style={{ width: "45%" }}
                  icon="backup-restore"
                  mode="contained"
                  textColor={theme.colors.text}
                  buttonColor={theme.colors.surface}
                  onPress={showModal}
                >
                  Reiniciar
                </Button>
                <Button
                  style={{ width: "45%" }}
                  icon="send-circle"
                  mode="contained"
                  textColor={theme.colors.text}
                  buttonColor={theme.colors.surface}
                  onPress={showSubmit}
                >
                  Enviar
                </Button>
              </ContainerBtn>
            </ScrollView>
          </ContainerMB>
        </Container>
      </ScrollView>
      <FabButton getData={getClientsData} />
      <ModalLayout
        hideModal={hideModal}
        showModal={showModal}
        visible={visible}
        title="Reiniciar"
      >
        <ModalOptions
          hideModal={hideModal}
          title="Tem certeza que dejesa apagar todos os registros?"
          subtitle="Esta ação não tem volta."
          type="reset"
          idCliente=""
          getData={getClientsData}
        />
      </ModalLayout>
      <ModalLayout
        hideModal={hideSubmit}
        showModal={showSubmit}
        visible={submit}
        title="Enviar"
      >
        <ModalOptions
          hideModal={hideSubmit}
          title="Tem certeza que dejesa enviar todos os registros para a API?"
          subtitle="Esta ação não tem volta."
          type="submit"
          idCliente=""
          allClients={clients}
          getData={() => {}}
        />
      </ModalLayout>
    </ContainerGradient>
  );
}
