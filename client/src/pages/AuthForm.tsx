/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent } from 'react';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleMode = () => {
    setIsRegister(prev => !prev);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password || (isRegister && (!name || !confirmPassword))) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = isRegister
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';

      const payload = isRegister
        ? { name, email, password }
        : { email, password };

      const { data } = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      setUser(data.user);
      navigate('/chat');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">pulseChat</h1>
            <p className="text-gray-600 mt-1">
              {isRegister ? 'Create your account' : 'Welcome back!'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <AlertCircle size={18} className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {isRegister && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 block w-full rounded-lg border border-gray-300 py-2"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 block w-full rounded-lg border border-gray-300 py-2"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full rounded-lg border border-gray-300 py-2"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 block w-full rounded-lg border border-gray-300 py-2"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {isLoading
                  ? isRegister
                    ? 'Creating account...'
                    : 'Logging in...'
                  : isRegister
                    ? 'Create account'
                    : 'Login'}
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
