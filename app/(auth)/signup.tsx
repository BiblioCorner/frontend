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
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Smartphone,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function SignupScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !phoneNumber) {
      Alert.alert(t('common.error'), t('common.fillAllFields'));
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, phoneNumber);
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.signup.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
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

      <Text style={styles.title}>{t('auth.signup.title')}</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Mail
            size={20}
            color={Colors.primary[300]}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={t('auth.signup.email')}
            placeholderTextColor={Colors.primary[300]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Lock
            size={20}
            color={Colors.primary[300]}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={t('auth.signup.password')}
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

        <View style={styles.inputWrapper}>
          <Smartphone
            size={20}
            color={Colors.primary[300]}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={t('auth.signup.phone')}
            placeholderTextColor={Colors.primary[300]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.signupButton,
          (isLoading || !email || !password || !phoneNumber) &&
            styles.signupButtonDisabled,
        ]}
        onPress={handleSignup}
        disabled={isLoading || !email || !password || !phoneNumber}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.signupButtonText}>{t('auth.signup.createAccount')}</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginLink}>
        <Text style={styles.loginText}>{t('auth.signup.haveAccount')} </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginLinkText}>{t('auth.signup.login')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentContainer: {
    paddingHorizontal: Layout.spacing.xl,
    paddingBottom: Layout.spacing.xl,
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
  signupButton: {
    width: '100%',
    height: 54,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
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
