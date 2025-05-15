import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/TasksCollection';
import { Link, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Fastfood from '@mui/icons-material/Fastfood';

export const TaskList = () => {
  const [taskName, setTaskName] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);
  const user = useTracker(() => Meteor.user());
  const tasks = useTracker(() => {
    Meteor.subscribe('tasks');
    return TasksCollection.find({}).fetch();
  });

  const navigate = useNavigate();

  const handleAddTask = () => {
    if (taskName.trim()) {
      Meteor.call('tasks.insert', { name: taskName, isPersonal, createdBy: user.username }, (error) => {
        if (error) {
          console.error('Erro ao adicionar tarefa:', error);
        } else {
          setTaskName('');
          setIsPersonal(false);
        }
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    Meteor.call('tasks.remove', taskId, (error) => {
      if (error) {
        console.error('Erro ao remover tarefa:', error);
      }
    });
  };

  const handleEditTask = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
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
      <div>
        <TextField
          label="Nova Tarefa"
          variant="outlined"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPersonal}
              onChange={(e) => setIsPersonal(e.target.checked)}
              color="primary"
            />
          }
          label="Tarefa Pessoal"
          style={{ marginBottom: '10px' }}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleAddTask} edge="end">
        Adicionar Tarefa
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEditTask(task._id)} disabled={task.userId !== user._id}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteTask(task._id)} disabled={task.userId !== user._id}>
                <Delete />
              </IconButton>
            </>
          }>
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