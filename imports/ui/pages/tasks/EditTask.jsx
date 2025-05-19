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
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box display="flex" alignItems="center" gap={2}>
            {isEditing ? (
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{ borderRadius: 2, textTransform: 'none' }}
                onClick={() => setIsEditing(false)}
              >
                Voltar
              </Button>
            ) : (
              <Link to="/tasks" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Voltar
                </Button>
              </Link>
            )}
            <Typography variant="h4" fontWeight="bold">
              {isEditing ? 'Editar Tarefa' : 'Detalhes da Tarefa'}
            </Typography>
          </Box>

          {isEditing ? (
            <Stack spacing={2}>
              <TextField
                label="Nome da Tarefa"
                variant="outlined"
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                label="Descrição"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
              />
              <Button
                variant="contained"
                onClick={handleSaveTask}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  py: 1.5
                }}
              >
                Salvar Alterações
              </Button>
            </Stack>
          ) : (
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">Nome</Typography>
                <Typography variant="h6">{taskName}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">Descrição</Typography>
                <Typography variant="body1">{taskDescription || 'Sem descrição'}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">Situação</Typography>
                <Typography variant="body1">{taskSituation}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">Data de Criação</Typography>
                <Typography variant="body1">
                  {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">Criado por</Typography>
                <Typography variant="body1">{task.createdBy}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">Tarefa Pessoal</Typography>
                <Typography variant="body1">{isPersonal ? 'Sim' : 'Não'}</Typography>
              </Box>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleChangeSituation('Em Andamento')}
                  disabled={taskSituation !== 'Cadastrada'}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Iniciar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleChangeSituation('Concluída')}
                  disabled={taskSituation !== 'Em Andamento'}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Concluir
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<RestartAltIcon />}
                  onClick={() => handleChangeSituation('Cadastrada')}
                  disabled={taskSituation === 'Cadastrada'}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Reabrir
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Editar
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};