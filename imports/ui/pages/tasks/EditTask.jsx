import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TasksCollection } from '../../../api/TasksCollection';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskSituation, setTaskSituation] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchedTask = TasksCollection.findOne(taskId);
    if (fetchedTask) {
      setTask(fetchedTask);
      setTaskName(fetchedTask.name);
      setTaskDescription(fetchedTask.description);
      setTaskSituation(fetchedTask.situation);
      setIsPersonal(fetchedTask.isPersonal);
    }
  }, [taskId]);

  const handleSaveTask = () => {
    if (taskName.trim() && taskSituation) {
      Meteor.call(
        'tasks.update',
        taskId,
        { name: taskName, description: taskDescription, situation: taskSituation, isPersonal },
        (error) => {
          if (error) {
            console.error('Erro ao atualizar tarefa:', error);
          } else {
            setIsEditing(false);
          }
        }
      );
    }
  };

  const handleChangeSituation = (newSituation) => {
    Meteor.call(
      'tasks.update',
      taskId,
      { situation: newSituation },
      (error) => {
        if (error) {
          console.error('Erro ao alterar situação:', error);
        } else {
          setTaskSituation(newSituation);
        }
      }
    );
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
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <InputLabel id="situation-label">Situação</InputLabel>
            <Select
              labelId="situation-label"
              value={taskSituation}
              onChange={(e) => setTaskSituation(e.target.value)}
            >
              <MenuItem value="Cadastrada">Cadastrada</MenuItem>
              <MenuItem value="Em Andamento">Em Andamento</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </Select>
          </FormControl>
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
          <div>
            <Button variant="contained" color="primary" onClick={handleSaveTask}>
              Salvar Alterações
            </Button>
          </div>
        </>
      ) : (
        <>
          <Typography variant="body1" style={{ marginBottom: '5px' }}>
            <strong>Nome:</strong> {taskName}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '5px' }}>
            <strong>Descrição:</strong> {taskDescription || 'Sem descrição'}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '5px' }}>
            <strong>Situação:</strong> {taskSituation}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '5px' }}>
            <strong>Data:</strong> {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Criado por:</strong> {task.createdBy}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '20px' }}>
            <strong>Pessoal?</strong> {isPersonal ? 'Sim' : 'Não'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleChangeSituation('Em Andamento')}
            disabled={taskSituation !== 'Cadastrada'}
            style={{ marginRight: '10px' }}
          >
            Iniciar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleChangeSituation('Concluída')}
            disabled={taskSituation !== 'Em Andamento'}
            style={{ marginRight: '10px' }}
          >
            Concluir
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleChangeSituation('Cadastrada')}
            disabled={taskSituation === 'Cadastrada'}
            style={{ marginRight: '10px' }}
          >
            Reabrir
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            style={{ marginRight: '10px' }}
          >
            Editar
          </Button>
        </>
      )}
    </Container>
  );
};