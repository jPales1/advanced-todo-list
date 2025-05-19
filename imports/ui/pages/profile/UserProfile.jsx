import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';

export const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [company, setCompany] = useState('');
  const [photo, setPhoto] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState('');

  useTracker(() => {
    Meteor.subscribe('userData');
  }, []);

  useEffect(() => {
    Meteor.call('userProfile.get', (error, profile) => {
      if (error) {
        console.error('Erro ao carregar perfil:', error);
      } else if (profile) {
        setName(profile.name || '');
        setEmail(profile.email || '');
        setBirthDate(profile.birthDate || '');
        setGender(profile.gender || '');
        setCompany(profile.company || '');
        setPhoto(profile.photo || '');
        setPreviewPhoto(profile.photo || '');
      }
    });
  }, []);

  const handleSaveProfile = () => {
    const profileData = { name, email, birthDate, gender, company, photo };
    Meteor.call('userProfile.update', profileData, (error) => {
      if (error) {
        console.error('Erro ao salvar perfil:', error);
      } else {
        alert('Perfil salvo com sucesso!');
      }
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight="bold">
            Perfil do Usuário
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={previewPhoto}
              alt="Foto do Usuário"
              sx={{ 
                width: 120, 
                height: 120, 
                border: '2px solid',
                borderColor: 'primary.main',
                bgcolor: 'primary.light'
              }}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Alterar Foto
              <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
            </Button>
          </Box>

          <Stack spacing={2}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Data de Nascimento"
              type="date"
              variant="outlined"
              fullWidth
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              slotProps={{
                input: {
                  shrink: true
                }
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <FormControl fullWidth>
              <InputLabel id="gender-label">Sexo</InputLabel>
              <Select
                labelId="gender-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="Outro">Outro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Empresa"
              variant="outlined"
              fullWidth
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Stack>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveProfile}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              py: 1.5,
              mt: 2
            }}
          >
            Salvar Perfil
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};