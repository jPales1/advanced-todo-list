import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserDrawer() {
  const [open, setOpen] = useState(false);
  const user = useTracker(() => Meteor.user());

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <Box sx={{ textAlign: 'center', padding: '20px' }}>
            <Avatar
              src={user?.profile?.photo || ''}
              alt="Foto do Usuário"
              sx={{ width: 80, height: 80, margin: '0 auto' }}
            />
            <Typography variant="h6" sx={{ marginTop: '10px' }}>
              {user?.profile?.name || 'Usuário'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.profile?.email || 'Email não disponível'}
            </Typography>
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/tasks">
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Tarefas" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};