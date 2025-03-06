import { api } from "@/utils/api";
import { Button, Paper, TextField, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function Page() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
  } = useForm();

  const e = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/users", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
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
        }}
        elevation={2}
      >
        <Typography variant="h5">Entre ou cadastre-se</Typography>
        <Typography style={{ paddingTop: 8 }} variant="body1">
          Para poder prosseguir é necessário uma conta
        </Typography>
        <form onSubmit={handleSubmit((data) => e.mutateAsync({ ...data }))}>
          <TextField {...register("nome", { required: true })} label="Nome" />
          <TextField
            {...register("email", { required: true })}
            label="E-mail"
          />
          <TextField {...register("senha", { required: true })} label="Senha" />
          <TextField
            {...register("confirmarSenha", { required: true })}
            label="Confirmar senha"
          />
          <TextField {...register("cpf", { required: true })} label="CPF" />
          <TextField
            {...register("telefone", { required: true })}
            label="Telefone"
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Paper>
    </div>
  );
}
