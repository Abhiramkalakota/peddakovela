import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import TempleIcon from './icons/TempleIcon';
import { useTranslation } from '../hooks/useTranslation';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.DEVOTEE);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username) {
        setError('Please enter a username.');
        return;
    }
    const success = login(username, password, role);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center pt-16">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
            <TempleIcon className="h-16 w-16 mx-auto text-amber-500" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                {t('templeConnect')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                {t('signInToContinue')}
            </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              {t('iAmA')}
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            >
              <option value={Role.DEVOTEE}>{t('devotee')}</option>
              <option value={Role.ADMIN}>{t('admin')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {t('username')}
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              placeholder={role === Role.ADMIN ? 'Hint: admin' : 'Hint: devotee'}
            />
          </div>

          <div>
            <label htmlFor="password-unused" className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <input
              id="password-unused"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
              placeholder=" (any password)"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-300"
            >
              {t('signIn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
