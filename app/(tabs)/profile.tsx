import React from 'react';
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
import { LogOut, Settings, Bookmark, Star, CreditCard as Edit, User as UserIcon } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: signOut,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Edit size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Bookmarks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Bookmark size={20} color={Colors.primary[600]} style={styles.menuIcon} />
            <Text style={styles.menuText}>Saved Libraries</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Star size={20} color={Colors.primary[600]} style={styles.menuIcon} />
            <Text style={styles.menuText}>My Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <UserIcon size={20} color={Colors.primary[600]} style={styles.menuIcon} />
            <Text style={styles.menuText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleSignOut}
          >
            <LogOut size={20} color={Colors.error[600]} style={styles.menuIcon} />
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});