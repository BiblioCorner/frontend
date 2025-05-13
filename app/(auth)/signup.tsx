import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';

export default function SignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [field, setField] = useState('IT');
  const [profileType, setProfileType] = useState('Student');
  const [role, setRole] = useState('User');
  const [linkedin, setLinkedin] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !field || !profileType || !role) {
      Alert.alert('Erreur', 'Merci de remplir tous les champs obligatoires.');
      return;
    }

    try {
      setIsLoading(true);
      await signUp({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        field,
        profile_type: profileType,
        role,
        linkedin,
        user_description: description,
      });
    } catch (error) {
      Alert.alert('Erreur', 'Inscription échouée. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={Colors.primary[500]} />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Créer un compte</Text>

      <TextInput style={styles.input} placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Nom" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />

      {/* pickers à refaire style*/}
      <Text style={styles.label}>Secteur</Text>
      <Picker selectedValue={field} onValueChange={setField} style={styles.picker}>
        <Picker.Item label="IT" value="IT" />
        <Picker.Item label="Santé" value="Santé" />
        <Picker.Item label="Éducation" value="Éducation" />
      </Picker>

      <Text style={styles.label}>Type de profil</Text>
      <Picker selectedValue={profileType} onValueChange={setProfileType} style={styles.picker}>
        <Picker.Item label="Étudiant" value="Student" />
        <Picker.Item label="Employé" value="Employee" />
        <Picker.Item label="Freelance" value="Freelancer" />
        <Picker.Item label="Entrepreneur" value="Entrepreneur" />
        <Picker.Item label="Sans emploi" value="Unemployed" />
        <Picker.Item label="Retraité" value="Retired" />
        <Picker.Item label="Autre" value="Other" />
      </Picker>

      <Text style={styles.label}>Rôle</Text>
      <Picker selectedValue={role} onValueChange={setRole} style={styles.picker}>
        <Picker.Item label="Utilisateur" value="User" />
        <Picker.Item label="Administrateur" value="Admin" />
      </Picker>

      <TextInput style={styles.input} placeholder="Lien LinkedIn (optionnel)" value={linkedin} onChangeText={setLinkedin} />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description (optionnelle)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
        onPress={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signupButtonText}>S'inscrire</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginLink}>
        <Text style={styles.loginText}>Déjà un compte ? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginLinkText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.xl,
    backgroundColor: Colors.background.primary,
  },
  backButton: {
    position: 'absolute',
    top: Layout.spacing.xl,
    left: Layout.spacing.lg,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    height: 160,
    marginTop: Layout.spacing.xl * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.fontSize.xxxl,
    color: Colors.primary[600],
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: Layout.borderRadius.lg,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.md,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginBottom: 4,
    marginTop: Layout.spacing.sm,
  },
  picker: {
    borderRadius: Layout.borderRadius.lg,
    marginBottom: Layout.spacing.md,
    backgroundColor: '#fff',
  },
  signupButton: {
    height: 54,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  signupButtonDisabled: {
    backgroundColor: Colors.primary[300],
  },
  signupButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.background.primary,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  loginLinkText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[600],
  },
});
