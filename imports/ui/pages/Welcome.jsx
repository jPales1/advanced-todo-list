import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export const Welcome = () => (
  <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
    <Typography variant="h3" gutterBottom>
      Bem-vindo ao Advanced ToDo List!
    </Typography>
    <Typography variant="body1" component={"p"} gutterBottom>
      Gerencie suas tarefas de forma eficiente.
    </Typography>
    <Link to="/tasks" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary">
        Ir para a lista de tarefas
      </Button>
    </Link>
  </Container>
);