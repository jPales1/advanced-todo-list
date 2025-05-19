import React from 'react';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/TasksCollection';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const Welcome = () => {
  const { totalTasks, inProgressTasks, completedTasks } = useTracker(() => {
    Meteor.subscribe('tasks');
    const tasks = TasksCollection.find({}).fetch();
    return {
      totalTasks: tasks.length,
      inProgressTasks: tasks.filter(task => task.situation === 'Em Andamento').length,
      completedTasks: tasks.filter(task => task.situation === 'Concluída').length,
    };
  });

  const user = Meteor.user();

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" >
        Bem-vindo(a), {user.username}!
      </Typography>
      <Typography variant="body1" gutterBottom color="text.secondary">
        Aqui está um resumo das tarefas.
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <Card variant='outlined'>
            <CardContent style={{ padding: '16px' }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px !important' }}>
                <Typography variant="body1">Total de Tarefas</Typography>
                <FormatListBulletedIcon color='primary'/>
              </Box>
              <Typography variant="h5" component="span" fontWeight="bold">{totalTasks}</Typography>
              <Typography variant="body2" color="text.secondary">Tarefas cadastradas no sistema</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <Card variant='outlined'>
            <CardContent style={{ padding: '16px' }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px !important' }}>
                <Typography variant="body1">Em Andamento</Typography>
                <AccessTimeIcon color='primary'/>
              </Box>
              <Typography variant="h5" component="span" fontWeight="bold">{inProgressTasks}</Typography>
              <Typography variant="body2" color="text.secondary">Tarefas em progresso</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <Card variant='outlined'>
            <CardContent style={{ padding: '16px' }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px !important' }}>
                <Typography variant="body1">Concluídas</Typography>
                <CheckCircleOutlineIcon color='primary'/>
              </Box>
              <Typography variant="h5" component="span" fontWeight="bold">{completedTasks}</Typography>
              <Typography variant="body2" color="text.secondary">Tarefas finalizadas</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link to="/tasks" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Ver Lista de Tarefas
          </Button>
        </Link>
      </Box>
    </Container>
  );
};