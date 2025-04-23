import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TasksCollection } from '../../api/TasksCollection';
import { Container, TextField, Button, Typography } from '@mui/material';

export const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
          setIsEditing(false);
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
        {isEditing ? 'Editar Tarefa' : 'Detalhes da Tarefa'}
      </Typography>
      {isEditing ? (
        <>
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
        </>
      ) : (
        <>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            <strong>Nome:</strong> {taskName}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '20px' }}>
            <strong>Criado por:</strong> {task.createdBy}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Editar
          </Button>
        </>
      )}
    </Container>
  );
};