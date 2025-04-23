import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const Welcome = () => (
  <div>
    <h1>Bem-vindo ao Advanced ToDo List!</h1>
    <p>Gerencie suas tarefas de forma eficiente.</p>
    <Link to="/tasks">
      <Button variant="contained" color="primary">
        Ir para a lista de tarefas
      </Button>
    </Link>
  </div>
);