import axios from "axios";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, useTheme, Text } from "react-native-paper";
import styled from "styled-components";
import { api } from "../../global";

interface ModalOptions {
  hideModal: () => void;
  title: string;
  subtitle: string;
  type: string;
  idCliente: string;
  allClients?: any;
  getData: () => void;
}

export default function ModalOption({
  hideModal,
  title,
  subtitle,
  type,
  idCliente,
  allClients,
  getData,
}: ModalOptions) {
  const theme = useTheme();
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const AreaBtn = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  async function ActionsUser() {
    if (type === "delete") {
      try {
        await axios
          .delete(`${api}/client/delete/${idCliente}`)
          .then(() => getData());
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "reset") {
      try {
        await axios
          .delete(`${api}/client/delete`)
          .then(() => getData())
          .then(() => hideModal());
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "submit") {
      try {
        await axios
          .post("https://api-teste.ip4y.com.br/cadastro", {
            allClients,
          })
          .then(() => hideModal());
      } catch (error) {
        setErrorDialogVisible(true);
      }
    }
  }

  return (
    <>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme.colors.inverseSurface,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 17,
          color: theme.colors.inverseSurface,
          marginVertical: "8%",
        }}
      >
        {subtitle}
      </Text>

      <AreaBtn>
        <Button
          style={{ width: "45%" }}
          buttonColor="red"
          textColor="#fff"
          mode="contained"
          onPress={hideModal}
        >
          Cancelar
        </Button>
        <Button
          style={{ width: "45%" }}
          textColor="#fff"
          buttonColor={theme.colors.primary}
          mode="contained"
          onPress={ActionsUser}
        >
          Prosseguir
        </Button>
      </AreaBtn>
      <Portal>
        <Dialog
          style={{ backgroundColor: theme.colors.surface }}
          visible={errorDialogVisible}
          onDismiss={() => setErrorDialogVisible(false)}
        >
          <Dialog.Title>Sucesso</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              As informações foram enviadas para API do iP4y!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              textColor="#fff"
              buttonColor={theme.colors.primary}
              onPress={() => {
                setErrorDialogVisible(false), hideModal();
              }}
            >
              Fechar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
