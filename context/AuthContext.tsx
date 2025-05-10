import React, { createContext, useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';

// User interface
interface User {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  savedLibraries?: string[];
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, phoneNumber: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  isAuthenticated: false,
});

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for stored auth on mount
  useEffect(() => {
    // In a real app, you would check for stored credentials here
    // For now we'll just simulate an auth check
    const checkAuth = async () => {
      try {
        // Simulate auth check delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would get this from storage or an API
        const storedUser = null; // localStorage.getItem('user')
        
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

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login - in a real app this would be an API call
      const newUser: User = {
        id: '1',
        email,
        name: 'Demo User',
      };
      
      setUser(newUser);
      // In a real app: localStorage.setItem('user', JSON.stringify(newUser));
      
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, phoneNumber: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration - in a real app this would be an API call
      const newUser: User = {
        id: '1',
        email,
        phoneNumber,
        name: email.split('@')[0],
      };
      
      setUser(newUser);
      // In a real app: localStorage.setItem('user', JSON.stringify(newUser));
      
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    // In a real app: localStorage.removeItem('user');
    router.replace('/welcome');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}