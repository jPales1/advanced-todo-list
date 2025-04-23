import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TasksCollection } from '../../api/TasksCollection';
import { Container, TextField, Button, Typography } from '@mui/material';

export const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const fetchedTask = TasksCollection.findOne(taskId);
    if (fetchedTask) {
      setTask(fetchedTask);
      setTaskName(fetchedTask.name);
    }
  }, [taskId]);

  const handleSaveTask = () => {
    if (taskName.trim()) {
      Meteor.call('tasks.update', taskId, { name: taskName }, (error) => {
        if (error) {
          console.error('Erro ao atualizar tarefa:', error);
        } else {
          navigate('/tasks');
        }
      });
    }
  };

  if (!task) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Link to="/tasks">
        <Button variant="outlined" color="secondary" style={{ marginBottom: '20px' }}>
          Voltar
        </Button>
      </Link>
      <Typography variant="h4" gutterBottom>
        Editar Tarefa
      </Typography>
      <TextField
        label="Nome da Tarefa"
        variant="outlined"
        fullWidth
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSaveTask}>
        Salvar Alterações
      </Button>
    </Container>
  );
};