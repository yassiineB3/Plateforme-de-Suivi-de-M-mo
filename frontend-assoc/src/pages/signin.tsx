import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signin', form);
      const { access_token, user } = res.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', user.role);

      // Redirection selon le rôle
      if (user.role === 'sheikh') {
        navigate('/sheikh');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
      <button type="submit">Se connecter</button>
      {message && <p>{message}</p>}
    </form>
  );
}
