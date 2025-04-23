import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Container } from '@mui/material';
import Fastfood from '@mui/icons-material/Fastfood';
import { useTracker } from 'meteor/react-meteor-data';

export const TaskList = () => {
  // Simulação de dados de tarefas
  const tasks = useTracker(() => [
    { id: 1, name: 'Comprar Hamburguér', createdBy: 'João' },
    { id: 2, name: 'Comprar Milkshake', createdBy: 'Maria' },
    { id: 3, name: 'Comprar Batata-Frita', createdBy: 'Carlos' },
  ]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Tarefas
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemIcon>
              <Fastfood />
            </ListItemIcon>
            <ListItemText
              primary={task.name}
              secondary={`Criado por: ${task.createdBy}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};