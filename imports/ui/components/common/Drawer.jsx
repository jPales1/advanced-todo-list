import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, useLocation } from 'react-router-dom';
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
  const [open, setOpen] = useState(false);
  const user = useTracker(() => Meteor.user());
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    Meteor.logout();
  };

  const drawerWidth = open ? 300 : 65;

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

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
          {!open && (
            <Tooltip title="Dashboard" placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/"
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    bgcolor: isCurrentPath('/') ? 'primary.light' : 'transparent',
                    color: isCurrentPath('/') ? 'primary.main' : 'inherit',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'primary.main'
                    },
                    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 0, 
                    mr: open ? 3 : 'auto', 
                    justifyContent: 'center',
                    color: 'inherit'
                  }}>
                    <DashboardIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Dashboard" />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )}
          {open && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5,
                  bgcolor: isCurrentPath('/') ? 'primary.light' : 'transparent',
                  color: isCurrentPath('/') ? 'primary.main' : 'inherit',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.main'
                  },
                  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 0, 
                  mr: open ? 3 : 'auto', 
                  justifyContent: 'center',
                  color: 'inherit'
                }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          )}

          {!open && (
            <Tooltip title="Lista de Tarefas" placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/tasks"
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    bgcolor: isCurrentPath('/tasks') ? 'primary.light' : 'transparent',
                    color: isCurrentPath('/tasks') ? 'primary.main' : 'inherit',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'primary.main'
                    },
                    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 0, 
                    mr: open ? 3 : 'auto', 
                    justifyContent: 'center',
                    color: 'inherit'
                  }}>
                    <ListIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Lista de Tarefas" />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )}
          {open && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/tasks"
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5,
                  bgcolor: isCurrentPath('/tasks') ? 'primary.light' : 'transparent',
                  color: isCurrentPath('/tasks') ? 'primary.main' : 'inherit',
                  '&:hover': {
                    bgcolor: 'rgba(103, 58, 183, 0.08)',
                    color: 'primary.main'
                  },
                  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 0, 
                  mr: open ? 3 : 'auto', 
                  justifyContent: 'center',
                  color: 'inherit'
                }}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Tarefas" />
              </ListItemButton>
            </ListItem>
          )}

          {!open && (
            <Tooltip title="Perfil do Usuário" placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/profile"
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    bgcolor: isCurrentPath('/profile') ? 'primary.light' : 'transparent',
                    color: isCurrentPath('/profile') ? 'primary.main' : 'inherit',
                    '&:hover': {
                      bgcolor: 'rgba(103, 58, 183, 0.08)',
                      color: 'primary.main'
                    },
                    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 0, 
                    mr: open ? 3 : 'auto', 
                    justifyContent: 'center',
                    color: 'inherit'
                  }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  {open && <ListItemText primary="Perfil do Usuário" />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )}
          {open && (
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/profile"
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5,
                  bgcolor: isCurrentPath('/profile') ? 'primary.light' : 'transparent',
                  color: isCurrentPath('/profile') ? 'primary.main' : 'inherit',
                  '&:hover': {
                    bgcolor: 'rgba(103, 58, 183, 0.08)',
                    color: 'primary.main'
                  },
                  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 0, 
                  mr: open ? 3 : 'auto', 
                  justifyContent: 'center',
                  color: 'inherit'
                }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil do Usuário" />
              </ListItemButton>
            </ListItem>
          )}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              backgroundColor: 'background.paper',
              boxShadow: 1,
              '&:hover': {
                backgroundColor: 'background.paper',
              }
            }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        <Divider />

        {!open && (
          <Tooltip title="Sair" placement="right">
            <ListItemButton
              onClick={handleLogout}
              sx={{ minHeight: 48, justifyContent: 'center', px: 2.5 }}
            >
              <ListItemIcon sx={{ 
                minWidth: 0, 
                mr: 'auto', 
                justifyContent: 'center',
                color: 'inherit'
              }}>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Sair" />}
            </ListItemButton>
          </Tooltip>
        )}
        {open && (
          <ListItemButton
            onClick={handleLogout}
            sx={{ minHeight: 48, justifyContent: 'initial', px: 2.5 }}
          >
            <ListItemIcon sx={{ 
              minWidth: 0, 
              mr: 3, 
              justifyContent: 'center',
              color: 'inherit'
            }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        )}
      </Box>
    </Drawer>
  );
}