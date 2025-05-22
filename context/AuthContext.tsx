import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  field?: string;
  profile_type?: string;
  role?: string;
  linkedin?: string;
  user_description?: string;
  savedLibraries?: string[];
  avatar?: string;
}


interface SignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  field: string;
  profile_type: string;
  role: string;
  linkedin?: string;
  user_description?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignupPayload) => Promise<void>;
  getProfile: () => Promise<void>; 
  signOut: () => void;
  isAuthenticated: boolean;
}

// Context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  getProfile: async () => {},
  signOut: () => {},
  isAuthenticated: false,
});

// API base URL from .env
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // TODO: implement persistent auth check here
        const storedUser = null;
        if (storedUser) {
          // setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);


  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Échec de la connexion');
      }

      const data = await res.json();
      const token = data.token;
      console.log('JWT Token reçu :', token);
      await AsyncStorage.setItem('token', token);
      await getProfile();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: SignupPayload) => {
    console.log('Début de l’inscription');
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      console.log('Réponse API reçue:', res.status);

      if (!res.ok) throw new Error('Échec de l’inscription');

      const data = await res.json();
      router.replace('/login');
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  

  const getProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Erreur de récupération du profil');
    }

    const json = await res.json();
    const userData = json.user;

    const fullUser: User = {
      id: userData._id,
      email: userData.email,
      // name: `${userData.first_name} ${userData.last_name}`,
      first_name:userData.first_name,
      last_name:userData.last_name,
      field: userData.field,
      profile_type: userData.profile_type,
      role: userData.role,
      linkedin: userData.linkedin,
      user_description: userData.user_description,
      savedLibraries: userData.savedLibraries,
    };

    setUser(fullUser);
  } catch (error) {
    console.error('Échec du chargement du profil:', error);
  }
};


  const signOut = () => {
    setUser(null);
    router.replace('/welcome');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        getProfile,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
