import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View } from "react-native";
import { Button, Dialog, TextInput, useTheme, Portal, Text  } from "react-native-paper";
import styled from "styled-components/native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formatCPFString,
  formatDateString,
  validaCPF,
  validarData,
  validarEmail,
} from "../../validation";
import axios from "axios";
import { api } from "../../global";

interface ModalInputProps {
  edit: boolean;
  idClient?: string;
  defaultValues?: createClientSchema;
  getData: () => void;
}

const createClientSchema = z.object({
  cpf: z.string().refine((value) => validaCPF(value), {
    message: "Insira um CPF válido!",
  }),
  name: z.string().min(2, "O Nome é obrigatório!"),
  surname: z.string().min(2, "O Sobrenome é obrogátorio!"),
  dateOfBirth: z.string().refine((value) => validarData(value), {
    message: "Insira uma Data valida",
  }),
  email: z.string().refine((value) => validarEmail(value)),
  gender: z.string().min(1, "O Gênero é obrigatório!"),
});

type createClientSchema = z.infer<typeof createClientSchema>;

export default function ModalInput({ edit, defaultValues, getData, idClient }: ModalInputProps) {
  const theme = useTheme();
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: edit ? defaultValues : {
      cpf: "",
      name: "",
      surname: "",
      dateOfBirth: "",
      email: "",
      gender: "",
    },
    resolver: zodResolver(createClientSchema),
  });

  async function onSubmitPost (data: createClientSchema) {
    trigger();
    try {
      await axios
        .post(`${api}/client/new`, {
          cpf: data.cpf,
          name: data.name,
          surname: data.surname,
          dateOfBirthday: data.dateOfBirth,
          email: data.email,
          gender: data.gender
        })
        .then((e) => {
          getData()
        });
    } catch (error) {
      setErrorDialogVisible(true)
    }
  };

  async function onSubmitPut (data: createClientSchema) {
    trigger();
    try {
      await axios
        .put(`${api}/client/update/${idClient}`, {
          cpf: data.cpf,
          name: data.name,
          surname: data.surname,
          dateOfBirthday: data.dateOfBirth,
          email: data.email,
          gender: data.gender
        })
        .then((e) => {
          getData()
        });
    } catch (error) {
      console.log(error)
      setErrorDialogVisible(true)
    }
  };

  const handleResetForm = () => {
    reset();
  };

  const handleOnChangeText = (
    value: string,
    onChange: (...event: string[]) => void
  ) => {
    onChange(value);
  };

  const BtnArea = styled(View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  const TextInputCustom = styled(TextInput)`
    margin-bottom: 5%;
  `;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputCustom
              disabled={edit === true}
              label={"CPF"}
              mode="outlined"
              inputMode="numeric"
              onBlur={onBlur}
              maxLength={14}
              onChangeText={(value) => {
                const formattedValue = formatCPFString(value);
                onChange(formattedValue);
              }}
              value={value}
              error={errors.cpf ? true : false}
            />
          )}
          name="cpf"
        />

        {errors.cpf ? (
          <Text style={{ color: "red" }}>{errors.cpf.message}</Text>
        ) : null}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputCustom
              label={"Nome"}
              maxLength={10}
              mode="outlined"
              onBlur={onBlur}
              onChangeText={(value: string) =>
                handleOnChangeText(value, onChange)
              }
              value={value}
              error={errors.name ? true : false}
            />
          )}
          name="name"
        />

        {errors.name ? (
          <Text style={{ color: "red" }}>{errors.name.message}</Text>
        ) : null}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputCustom
              label={"Sobrenome"}
              mode="outlined"
              onBlur={onBlur}
              onChangeText={(value: string) =>
                handleOnChangeText(value, onChange)
              }
              value={value}
              error={errors.surname ? true : false}
            />
          )}
          name="surname"
        />

        {errors.surname ? (
          <Text style={{ color: "red" }}>{errors.surname.message}</Text>
        ) : null}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputCustom
              label={"Data de Nascimento"}
              inputMode="numeric"
              mode="outlined"
              dataDetectorTypes={"calendarEvent"}
              onBlur={onBlur}
              onChangeText={(value) => {
                const formattedValue = formatDateString(value);
                onChange(formattedValue);
              }}
              value={value}
              error={errors.dateOfBirth ? true : false}
            />
          )}
          name="dateOfBirth"
        />

        {errors.dateOfBirth ? (
          <Text style={{ color: "red" }}>{errors.dateOfBirth.message}</Text>
        ) : null}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputCustom
              label={"E-mail"}
              mode="outlined"
              onBlur={onBlur}
              onChangeText={(value: string) =>
                handleOnChangeText(value, onChange)
              }
              value={value}
              error={errors.email ? true : false}
            />
          )}
          name="email"
        />

        {errors.email ? (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        ) : null}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputCustom
              label={"Genero"}
              mode="outlined"
              onBlur={onBlur}
              onChangeText={(value: string) =>
                handleOnChangeText(value, onChange)
              }
              value={value}
              error={errors.gender ? true : false}
            />
          )}
          name="gender"
        />

        {errors.gender ? (
          <Text style={{ color: "red" }}>{errors.gender.message}</Text>
        ) : null}
        <BtnArea>
          <Button
            style={{ width: "45%" }}
            icon="backup-restore"
            textColor="#fff"
            buttonColor={theme.colors.primary}
            mode="contained"
            onPress={handleResetForm}
          >
            Recomeçar
          </Button>

          {edit === true ? (
            <Button
              style={{ width: "45%" }}
              icon="account-multiple-plus"
              textColor="#fff"
              buttonColor={theme.colors.primary}
              mode="contained"
              onPress={handleSubmit(onSubmitPut)}
            >
              Atualizar
            </Button>
          ) : (
            <Button
              style={{ width: "45%" }}
              icon="account-multiple-plus"
              textColor="#fff"
              buttonColor={theme.colors.primary}
              mode="contained"
              onPress={handleSubmit(onSubmitPost)}
            >
              Inserir
            </Button>
          )}
        </BtnArea>
        <Portal>
          <Dialog style={{backgroundColor: theme.colors.surface}} visible={errorDialogVisible} onDismiss={() => setErrorDialogVisible(false)}>
            <Dialog.Title>Erro</Dialog.Title>
            <Dialog.Content>
            <Text variant="bodyMedium">Já existe um cliente com este CPF cadastrado.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button textColor="#fff" buttonColor={theme.colors.primary} onPress={() => setErrorDialogVisible(false)}>Fechar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
