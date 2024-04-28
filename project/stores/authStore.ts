import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { showMessage } from 'react-native-flash-message';
import { create } from 'zustand';

import { Login, loginResponseSchema } from '../schemas/auth';
import axiosInstance from '../utils/axios-intance';

type AuthState = {
  token: string | null;
  persistToken: (token: string | null) => void;
  clearToken: () => void;
  handleLogin: (credentials: Login) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,

  handleLogin: async (credentials: Login) => {
    return axiosInstance
      .post('/login', credentials)
      .then((response) => {
        const data = loginResponseSchema.parse(response.data);
        const roles = data?.user_roles || [];
        const hasRole = roles?.includes('company_operator');
        if (!hasRole) {
          showMessage({ message: 'Você não tem permissão para acessar essa aplicação.' });
          return;
        }
        get().persistToken(data?.access_token);
        router.push('/(auth)/(events)');
      })
      .catch(() => {
        showMessage({ message: 'Erro ao fazer login. Tente novamente.' });
      });
  },

  clearToken: async () => {
    set({ token: null });
    await AsyncStorage.removeItem('token');
  },

  persistToken: async (token: string | null) => {
    set({ token });
    if (token) {
      await AsyncStorage.setItem('token', token);
    }
  },
}));
