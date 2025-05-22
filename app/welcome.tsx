import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/icon.psd')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>
        {t('welcome.tagline')}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginButtonText}>{t('welcome.login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.signupButtonText}>{t('welcome.signup')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Layout.spacing.xl,
  },
  logoContainer: {
    width: '100%',
    height: 180,
    marginBottom: Layout.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.fontSize.xxl,
    color: Colors.primary[600],
    textAlign: 'center',
    marginBottom: Layout.spacing.xxl,
    lineHeight: Typography.fontSize.xxl * Typography.lineHeight.tight,
  },
  buttonContainer: {
    width: '100%',
    gap: Layout.spacing.md,
  },
  button: {
    width: '100%',
    height: 54,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: Colors.primary[600],
  },
  loginButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.background.primary,
  },
  signupButton: {
    backgroundColor: Colors.primary[200],
  },
  signupButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.primary[700],
  },
});