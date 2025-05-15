import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
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
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

export default function UserDrawer() {
  const [open, setOpen] = useState(true);
  const user = useTracker(() => Meteor.user());

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    Meteor.logout();
  };

  const drawerWidth = open ? 300 : 65;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }} role="presentation">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '20px',
          gap: 2,
          minHeight: '80px',
          justifyContent: open ? 'flex-start' : 'center'
        }}>
          <Avatar
            src={user?.profile?.photo || ''}
            alt="Foto do Usuário"
            sx={{ 
              width: open ? 60 : 40, 
              height: open ? 60 : 40,
              transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out'
            }}
          />
          {open && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {user?.profile?.name || 'Usuário'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.profile?.email || 'Email não disponível'}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider />

        <List>
          <Tooltip title="Dashboard" placement="right">
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <DashboardIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Tooltip title="Lista de Tarefas" placement="right">
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/tasks" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <ListIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Lista de Tarefas" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Tooltip title="Perfil do Usuário" placement="right">
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Perfil do Usuário" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Divider />

        <Box sx={{ padding: '16px' }}>
          <IconButton 
            onClick={toggleDrawer} 
            sx={{ 
              position: 'absolute',
              top: '50%',
              right: -20,
              backgroundColor: 'background.paper',
              boxShadow: 1,
              zIndex: 1200,
              '&:hover': {
                backgroundColor: 'background.paper',
              }
            }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          <Tooltip title="Sair" placement="right">
            <ListItemButton 
              onClick={handleLogout}
              sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Sair" />}
            </ListItemButton>
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
}