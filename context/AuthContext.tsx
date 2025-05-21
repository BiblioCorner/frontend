// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { router } from 'expo-router';

// // User interface
// interface User {
//   id: string;
//   email: string;
//   name?: string;
//   phoneNumber?: string;
//   savedLibraries?: string[];
// }

// // Auth context interface
// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string, phoneNumber: string) => Promise<void>;
//   signOut: () => void;
//   isAuthenticated: boolean;
// }

// // Create auth context with default values
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isLoading: true,
//   signIn: async () => {},
//   signUp: async () => {},
//   signOut: () => {},
//   isAuthenticated: false,
// });

// // Auth provider component
// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   // Check for stored auth on mount
//   useEffect(() => {
//     // In a real app, you would check for stored credentials here
//     // For now we'll just simulate an auth check
//     const checkAuth = async () => {
//       try {
//         // Simulate auth check delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // In a real app, you would get this from storage or an API
//         const storedUser = null; // localStorage.getItem('user')
        
//         if (storedUser) {
//           // setUser(JSON.parse(storedUser));
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   // Sign in function
//   const signIn = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock successful login - in a real app this would be an API call
//       const newUser: User = {
//         id: '1',
//         email,
//         name: 'Demo User',
//       };
      
//       setUser(newUser);
//       // In a real app: localStorage.setItem('user', JSON.stringify(newUser));
      
//       // Navigate to main app
//       router.replace('/(tabs)');
//     } catch (error) {
//       console.error('Sign in failed:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Sign up function
//   const signUp = async (email: string, password: string, phoneNumber: string) => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock successful registration - in a real app this would be an API call
//       const newUser: User = {
//         id: '1',
//         email,
//         phoneNumber,
//         name: email.split('@')[0],
//       };
      
//       setUser(newUser);
//       // In a real app: localStorage.setItem('user', JSON.stringify(newUser));
      
//       // Navigate to main app
//       router.replace('/(tabs)');
//     } catch (error) {
//       console.error('Sign up failed:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Sign out function
//   const signOut = () => {
//     setUser(null);
//     // In a real app: localStorage.removeItem('user');
//     router.replace('/welcome');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         signIn,
//         signUp,
//         signOut,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use auth context
// export function useAuth() {
//   return useContext(AuthContext);
// }




import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Interfaces
// interface User {
//   id: string;
//   email: string;
//   name?: string;
//   savedLibraries?: string[];
// }
interface User {
  id: string;
  email: string;
  // name?: string;
  first_name?: string;
  last_name?: string;
  field?: string;
  profile_type?: string;
  role?: string;
  linkedin?: string;
  user_description?: string;
  savedLibraries?: string[];
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
    const newUser: User = {
      id: data.userId,
      email: email,
    };
    setUser(newUser);
    router.replace('/(tabs)');
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

  const signUp = async (userData: SignupPayload) => {
    setIsLoading(true);
    try {
      console.log(`${API_BASE_URL}/auth/signup`);
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Échec de l’inscription');
      }

      const data = await res.json();
      const newUser: User = {
        id: data._id || data.id,
        email: data.email,
        // name: `${data.first_name} ${data.last_name}`,
        first_name: data.first_name,
        last_name: data.last_name,
      };

      setUser(newUser);
      // router.replace('/login');
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign up failed:', error);
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
