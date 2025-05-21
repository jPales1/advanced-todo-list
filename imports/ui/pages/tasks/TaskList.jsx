import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../../api/TasksCollection';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import { ReactiveVar } from 'meteor/reactive-var';

const statusColors = {
  'Cadastrada': { bg: 'grey.200', color: 'grey' },
  'Em Andamento': { bg: '#e3e8ff', color: '#3b82f6' },
  'Concluída': { bg: '#d1fae5', color: '#059669' },
};

const showCompletedVar = new ReactiveVar(false);

export const TaskList = () => {
  const [taskName, setTaskName] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);
  const [taskError, setTaskError] = useState('');
  const user = useTracker(() => Meteor.user());
  const showCompleted = useTracker(() => showCompletedVar.get());
  const tasks = useTracker(() => {
    Meteor.subscribe('tasks', showCompleted);
    return TasksCollection.find({}).fetch();
  });
  const users = useTracker(() => {
    Meteor.subscribe('userData');
    return Meteor.users.find({}).fetch();
  });

  const navigate = useNavigate();

  const handleAddTask = () => {
    if (taskName.trim()) {
      setTaskError('');
      Meteor.call('tasks.insert', { name: taskName, isPersonal, createdBy: user.username }, (error) => {
        if (error) {
          console.error('Erro ao adicionar tarefa:', error);
        } else {
          setTaskName('');
          setIsPersonal(false);
        }
      });
    } else {
      setTaskError('Por favor, preencha o nome da tarefa');
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

  const getCreatorUser = (username) => {
    return users.find(u => u.username === username);
  };

  return (
    <Container sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 700 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Lista de Tarefas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
            onClick={handleAddTask}
          >
            Nova Tarefa
          </Button>
        </Box>
        <Stack mb={3}>
          <TextField
            label="Nova Tarefa"
            variant="outlined"
            fullWidth
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              setTaskError('');
            }}
            error={!!taskError}
            helperText={taskError}
          />
          <Box display="flex" gap={2}>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={showCompleted}
                  onChange={(e) => showCompletedVar.set(e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar Tarefas Concluídas"
            />
          </Box>
        </Stack>
        <Stack spacing={2}>
          {tasks.map((task) => {
            const creatorUser = getCreatorUser(task.createdBy);
            return (
              <Card key={task._id} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      mr: 2, 
                      bgcolor: '#ede9fe', 
                      color: '#6c2bd7' ,
                    }}
                    src={creatorUser?.profile?.photo || ''}
                  >
                  </Avatar>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {task.name}
                      </Typography>
                      {task.isPersonal && <LockIcon fontSize="small" color="disabled" />}
                      <Chip
                        label={task.situation || 'Cadastrada'}
                        size="small"
                        sx={{
                          ml: 1,
                          fontWeight: 'bold',
                          bgcolor: statusColors[task.situation || 'Cadastrada'].bg,
                          color: statusColors[task.situation || 'Cadastrada'].color,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Criado por: {task.createdBy}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleEditTask(task._id)} disabled={task.userId !== user._id}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(task._id)} disabled={task.userId !== user._id}>
                    <DeleteIcon fontSize="small" color='error' />
                  </IconButton>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Paper>
    </Container>
  );
};