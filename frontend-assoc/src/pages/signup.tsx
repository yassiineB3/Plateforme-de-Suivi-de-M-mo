import { useState } from 'react';
import api from '../api/axios';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      setMessage('✅ Inscription réussie !');
    } catch (err: any) {
      setMessage(err.response?.data?.message || '❌ Erreur lors de l’inscription');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      
    >
      <h2 >Créer un compte</h2>

      <input
        name="name"
        placeholder="Nom"
        onChange={handleChange}
       
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        
      />

      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        
      />

      <select
        name="role"
        onChange={handleChange}
        value={form.role}
       
      >
        <option value="student">Étudiant</option>
        <option value="sheikh">Sheikh</option>
      </select>

      <button
        type="submit"
        
      >
        S’inscrire
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
