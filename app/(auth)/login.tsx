import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router, Link } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={Colors.primary[500]} />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://i.ibb.co/zmCpYCK/biblio-corner-logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Mail size={20} color={Colors.primary[300]} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.primary[300]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Lock size={20} color={Colors.primary[300]} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.primary[300]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size={20} color={Colors.primary[300]} />
            ) : (
              <EyeOff size={20} color={Colors.primary[300]} />
            )}
          </TouchableOpacity>
        </View>

        <Link href="/(auth)/forgot-password" asChild>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, (isLoading || !email || !password) && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={isLoading || !email || !password}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signupLink}>
        <Text style={styles.signupText}>you don't have an account? </Text>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLinkText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Layout.spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: Layout.spacing.xl * 2,
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
    height: 180,
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
  inputContainer: {
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: Layout.borderRadius.lg,
    height: 56,
    paddingHorizontal: Layout.spacing.md,
    backgroundColor: Colors.background.primary,
  },
  inputIcon: {
    marginRight: Layout.spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  eyeIcon: {
    padding: Layout.spacing.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: Layout.spacing.xs,
  },
  forgotPasswordText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[600],
  },
  loginButton: {
    width: '100%',
    height: 54,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.primary[300],
  },
  loginButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.background.primary,
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  signupLinkText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[600],
  },
});