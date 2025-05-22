import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

export const NewTaskModal = ({ open, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);
  const [taskError, setTaskError] = useState('');

  const handleSubmit = () => {
    if (taskName.trim()) {
      setTaskError('');
      onAddTask(taskName, isPersonal);
      setTaskName('');
      setIsPersonal(false);
      onClose();
    } else {
      setTaskError('Por favor, preencha o nome da tarefa');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="new-task-modal"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" mb={3} textAlign='center'>
          Nova Tarefa
        </Typography>
        <Stack>
          <TextField
            label="Nome da Tarefa"
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
        </Stack>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Adicionar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}; 