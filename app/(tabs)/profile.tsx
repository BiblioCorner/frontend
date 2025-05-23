import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LogOut,
  Settings,
  Bookmark,
  Star,
  CreditCard as Edit,
  User as UserIcon,
  Globe,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguage, LANGUAGES } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [languageSelectorVisible, setLanguageSelectorVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const loadSavedAvatar = async () => {
    const savedUri = await AsyncStorage.getItem('userAvatar');
    if (savedUri) {
      setProfileImage(savedUri);
    } else {
      setProfileImage(user?.avatar || null);
    }
  };

  useEffect(() => {
    loadSavedAvatar();
  }, []);

  const saveAvatarLocally = async (uri: string) => {
    try {
      await AsyncStorage.setItem('userAvatar', uri);
    } catch (e) {
      console.error('Error saving avatar', e);
    }
  };

  const handleSignOut = () => {
    Alert.alert(t('common.logout'), t('profile.logoutConfirmation'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.logout'), style: 'destructive', onPress: signOut },
    ]);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('profile.permissionDenied'), t('profile.permissionExplanation'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      saveAvatarLocally(uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri:
                  profileImage ||
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
              <Edit size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user?.first_name || 'User'}</Text>
            <Text style={styles.userName}>{' ' + (user?.last_name || '')}</Text>
          </View>

          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          {user?.field && (
            <Text style={styles.userDetail}>
              Domaine : <Text style={styles.userDetailValue}>{user.field}</Text>
            </Text>
          )}
          {user?.profile_type && (
            <Text style={styles.userDetail}>
              Type de profil : <Text style={styles.userDetailValue}>{user.profile_type}</Text>
            </Text>
          )}
          {user?.role && (
            <Text style={styles.userDetail}>
              Rôle : <Text style={styles.userDetailValue}>{user.role}</Text>
            </Text>
          )}
          {user?.linkedin && (
            <Text style={styles.userDetail}>
              LinkedIn : <Text style={[styles.userDetailValue, { color: Colors.primary[600] }]}>
                {user.linkedin}
              </Text>
            </Text>
          )}
          {user?.user_description && (
            <Text style={styles.userDetail}>
              À propos : <Text style={styles.userDetailValue}>{user.user_description}</Text>
            </Text>
          )}

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>{t('profile.editProfile')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>{t('profile.bookmarks', 'Bookmarks')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>{t('profile.reviews', 'Reviews')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>{t('profile.events', 'Events')}</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Bookmark size={20} color={Colors.primary[600]} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('profile.savedLibraries')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Star size={20} color={Colors.primary[600]} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('profile.myReviews', 'My Reviews')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <UserIcon size={20} color={Colors.primary[600]} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('profile.accountSettings', 'Account Settings')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLanguageSelectorVisible(true)} style={styles.menuItem}>
            <Globe size={20} color={Colors.primary[600]} style={styles.menuIcon} />
            <Text style={styles.menuText}>{t('profile.language')}</Text>
            <Text style={styles.languageValue}>
              {LANGUAGES.find(lang => lang.code === language)?.name || 'English'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleSignOut}>
            <LogOut size={20} color={Colors.error[600]} style={styles.menuIcon} />
            <Text style={[styles.menuText, styles.logoutText]}>{t('profile.logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LanguageSelector visible={languageSelectorVisible} onClose={() => setLanguageSelectorVisible(false)} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.md,
  },
  headerTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.xxxl,
    color: Colors.text.primary,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Layout.spacing.lg,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.primary[100],
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },

  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary[600],
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.background.primary,
  },
  userName: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  userEmail: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.lg,
  },
  editProfileButton: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary[600],
  },
  editProfileButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.sm,
    color: Colors.primary[600],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.background.primary,
    marginHorizontal: Layout.spacing.lg,
    marginVertical: Layout.spacing.xl,
    padding: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.xl,
    color: Colors.primary[600],
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: Colors.border.light,
    alignSelf: 'center',
  },
  menuSection: {
    backgroundColor: Colors.background.primary,
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.xxl,
    borderRadius: Layout.borderRadius.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    paddingVertical: Layout.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  menuIcon: {
    marginRight: Layout.spacing.md,
  },
  menuText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: Colors.error[600],
  },
  languageValue: {
    marginLeft: 'auto',
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },
  languageSection: {
    marginTop: Layout.spacing.xxl,
    marginHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  languageTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.md,
  },
  userDetail: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: 6,
    textAlign: 'center',
    paddingHorizontal: Layout.spacing.md,
  },

  userDetailValue: {
    fontFamily: Typography.fontFamily.regular,
    color: Colors.text.primary,
  },

});


