import InputText from "@/components/InputText";
import { api } from "@/utils/api";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidCPF } from "@/utils/validators/isValidCPF";
import React from "react";

const userSchema = z
  .object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string(),
    cpf: z
      .string()
      .refine(
        (val) => isValidCPF(val),
        "CPF inválido. Use o formato 000.000.000-00"
      ),
    telefone: z
      .string()
      .refine(
        (val) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val),
        "Telefone inválido. Use o formato (99) 99999-9999"
      ),
    dataNascimento: z.string().refine((val) => {
      return !isNaN(Date.parse(val));
    }, "Data inválida"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas não coincidem",
    path: ["confirmarSenha"],
  });

export default function Page() {
  const theme = useTheme();
  const { control, handleSubmit, clearErrors } = useForm({
    resolver: zodResolver(userSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await api.post("/users", data);
    },
    onSuccess: (data) => {
      console.log("Cadastro realizado com sucesso:", data);
      // Adicione aqui a lógica de sucesso, como redirecionar o usuário
    },
    onError: (error) => {
      console.error("Erro ao cadastrar:", error);
      // Adicione aqui a lógica de erro, como exibir uma mensagem ao usuário
    },
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    clearErrors();
      await mutation.mutateAsync(data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        padding: 40,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Paper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
          flexDirection: "column",
          width: "90%",
          maxWidth: 700,
        }}
        elevation={2}
      >
        <Typography variant="h5">Entre ou cadastre-se</Typography>
        <Typography style={{ paddingTop: 8 }} variant="body1">
          Para poder prosseguir é necessário uma conta
        </Typography>
        <Form
          control={control}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 16,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputText name="nome" label="Nome" control={control} />
          <InputText name="email" label="E-mail" control={control} />
          <InputText
            name="senha"
            label="Senha"
            type="password"
            control={control}
          />
          <InputText
            name="confirmarSenha"
            label="Confirmar senha"
            type="password"
            control={control}
          />
          <InputText
            name="cpf"
            label="CPF"
            mask="###.###.###-##"
            control={control}
          />
          <InputText
            name="telefone"
            label="Telefone"
            type="tel"
            mask="(##) #####-####"
            control={control}
          />
          <InputText
            name="dataNascimento"
            label="Data de Nascimento"
            type="date"
            placeholder=""
            control={control}
          />
          <Button color="primary" variant="contained" type="submit">
            Cadastrar
          </Button>
        </Form>
      </Paper>
    </div>
  );
}
