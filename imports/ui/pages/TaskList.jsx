import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/TasksCollection';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Container, TextField, Button } from '@mui/material';
import Fastfood from '@mui/icons-material/Fastfood';

export const TaskList = () => {
  const [taskName, setTaskName] = useState('');
  const user = useTracker(() => Meteor.user());
  const tasks = useTracker(() => {
    Meteor.subscribe('tasks');
    return TasksCollection.find({}).fetch();
  });

  const handleAddTask = () => {
    if (taskName.trim()) {
      Meteor.call('tasks.insert', { name: taskName, createdBy: user.username }, (error) => {
        if (error) {
          console.error('Erro ao adicionar tarefa:', error);
        } else {
          setTaskName('');
        }
      });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Link to="/">
        <Button variant="outlined" color="secondary" style={{ marginBottom: '20px' }}>
          Voltar
        </Button>
      </Link>
      <Typography variant="h4" gutterBottom>
        Lista de Tarefas
      </Typography>
      <TextField
        label="Nova Tarefa"
        variant="outlined"
        fullWidth
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Adicionar Tarefa
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
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