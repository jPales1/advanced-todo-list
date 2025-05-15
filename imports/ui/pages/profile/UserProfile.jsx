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
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Perfil do Usuário
      </Typography>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Avatar
          src={previewPhoto}
          alt="Foto do Usuário"
          style={{ width: '100px', height: '100px', margin: '0 auto' }}
        />
        <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
          Alterar Foto
          <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
        </Button>
      </div>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Data de Nascimento"
        type="date"
        variant="outlined"
        fullWidth
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '10px' }}
      />
      <FormControl fullWidth style={{ marginBottom: '10px' }}>
        <InputLabel id="gender-label">Sexo</InputLabel>
        <Select
          labelId="gender-label"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
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
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSaveProfile}>
        Salvar Perfil
      </Button>
    </Container>
  );
};