import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Modal, Portal } from "react-native-paper";
import styled from "styled-components/native";
import { useTheme } from "react-native-paper";

interface ModalProps {
  visible: boolean;
  showModal: () => void;
  hideModal: () => void;
  title: string;
  children: React.ReactNode;
}

export default function ModalLayout({
  visible,
  showModal,
  hideModal,
  title,
  children,
}: ModalProps) {
  const theme = useTheme();

  const ContainerModal = styled(View)`
    padding: 20px;
  `;

  const TitleTop = styled(Text)`
    font-family: "Roboto-Bold";
    font-size: 20px;
    color: #fff;
    width: 30%;
    margin-vertical: 20px;
    margin-left: 20px;
  `;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          width: "90%",
          borderRadius: 18,
          alignSelf: "center",
        }}
      >
        <ImageBackground
          source={require("../../assets/images/WavePurple.png")}
          imageStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            tintColor: theme.colors.primary,
          }}
        >
          <TitleTop>{title}</TitleTop>
        </ImageBackground>
        <ContainerModal>{children}</ContainerModal>
      </Modal>
    </Portal>
  );
}
