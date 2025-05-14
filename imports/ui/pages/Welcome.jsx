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

  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao Advanced ToDo List!
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Aqui está um resumo das tarefas.
      </Typography>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid size={12}>
          <Card style={{ backgroundColor: '#eee'}}>
            <CardContent style={{ padding: '16px' }}>
              <Typography variant="h5">Total de Tarefas</Typography>
              <Typography variant="h4">{totalTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card style={{ backgroundColor: '#eee'}}>
            <CardContent style={{ padding: '16px' }}>
              <Typography variant="h5">Tarefas em Andamento</Typography>
              <Typography variant="h4">{inProgressTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card style={{ backgroundColor: '#eee'}}>
            <CardContent style={{ padding: '16px' }}>
              <Typography variant="h5">Tarefas Concluídas</Typography>
              <Typography variant="h4">{completedTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Link to="/tasks" style={{ textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>
        <Button variant="contained" color="primary">
          Ver Lista de Tarefas
        </Button>
      </Link>
    </Container>
  );
};