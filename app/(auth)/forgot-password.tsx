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
import { router } from 'expo-router';
import { ArrowLeft, Mail } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { useTranslation } from 'react-i18next';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert(t('common.error'), t('common.enterEmail'));
      return;
    }

    try {
      setIsLoading(true);
      // Implement password reset logic here
      // This would typically call an API endpoint to send a reset email
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        t('auth.forgotPassword.success'),
        t('auth.forgotPassword.checkEmail'),
        [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.forgotPassword.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color={Colors.primary[500]} />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/icon.psd')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>{t('auth.forgotPassword.title', 'Forgot Password')}</Text>
      <Text style={styles.subtitle}>
        {t('auth.forgotPassword.subtitle', 'Enter your email to receive a password reset link')}
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Mail
            size={20}
            color={Colors.primary[300]}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={t('auth.login.email', 'Email')}
            placeholderTextColor={Colors.primary[300]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.resetButton,
          (isLoading || !email) && styles.resetButtonDisabled,
        ]}
        onPress={handleResetPassword}
        disabled={isLoading || !email}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.resetButtonText}>
            {t('auth.forgotPassword.resetPassword', 'Reset Password')}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginLink}>
        <Text style={styles.loginText}>
          {t('auth.forgotPassword.rememberPassword', 'Remember your password?')} 
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginLinkText}>
            {t('auth.login.signIn', 'Sign In')}
          </Text>
        </TouchableOpacity>
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
    width: 250,
    height: 250,
  },
  title: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.fontSize.xxxl,
    color: Colors.primary[600],
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  subtitle: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.lg,
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
  resetButton: {
    width: '100%',
    height: 54,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
  },
  resetButtonDisabled: {
    backgroundColor: Colors.primary[300],
  },
  resetButtonText: {
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
    marginLeft: Layout.spacing.xs,
  },
});