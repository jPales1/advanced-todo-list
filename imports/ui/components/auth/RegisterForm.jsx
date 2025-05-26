import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Email from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    Accounts.createUser({
      username,
      email,
      password,
    }, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 500 }}>
        <Stack spacing={1} component="form" onSubmit={submit} className="register-form">
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Cadastro
          </Typography>
          <Box sx={{ marginBottom: "10px !important" }}>
            <Typography variant="body1" gutterBottom color="text.secondary">
              Crie sua conta para começar a gerenciar suas tarefas
            </Typography>
          </Box>

          <Typography variant="body3" fontWeight="bold">
            Usuário
          </Typography>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Usuário"
            variant="outlined"
            fullWidth
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Typography variant="body3" fontWeight="bold">
            Email
          </Typography>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              },
            }}
            type="email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography variant="body3" fontWeight="bold">
            Senha
          </Typography>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              },
            }}
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            required
            value={password}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Typography variant="body3" fontWeight="bold">
            Confirmar Senha
          </Typography>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              },
            }}
            type="password"
            variant="outlined"
            fullWidth
            name="confirmPassword"
            required
            value={confirmPassword}
            placeholder="Confirmar Senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth>
            Cadastrar
          </Button>

          <Box sx={{ width: '100%', textAlign: 'center', marginTop: '20px !important' }}>
            <Typography variant="body2" align="center" sx={{ width: '100%' }}>
              Já tem uma conta?{' '}
              <Link
                component={RouterLink}
                variant="body2"
                color="primary"
                sx={{ fontWeight: 'bold' }}
                to="/login"
              >
                Entrar
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}; 