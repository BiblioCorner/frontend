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
  Modal,
} from 'react-native';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
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

  // États pour les modals des sélecteurs
  const [fieldModalVisible, setFieldModalVisible] = useState(false);
  const [profileTypeModalVisible, setProfileTypeModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  // Options pour les sélecteurs
  const fieldOptions = [
    { label: 'IT', value: 'IT' },
    { label: 'Santé', value: 'Santé' },
    { label: 'Éducation', value: 'Éducation' },
  ];

  const profileTypeOptions = [
    { label: 'Étudiant', value: 'Student' },
    { label: 'Employé', value: 'Employee' },
    { label: 'Freelance', value: 'Freelancer' },
    { label: 'Entrepreneur', value: 'Entrepreneur' },
    { label: 'Sans emploi', value: 'Unemployed' },
    { label: 'Retraité', value: 'Retired' },
    { label: 'Autre', value: 'Other' },
  ];

  const roleOptions = [
    { label: 'Utilisateur', value: 'User' },
    { label: 'Administrateur', value: 'Admin' },
  ];

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

  // Fonction pour obtenir le libellé à partir de la valeur
  const getLabelFromValue = (options: { label: string; value: string }[], value: string) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  // Composant de modal pour la sélection
  interface SelectionModalProps {
    visible: boolean;
    onClose: () => void;
    options: { label: string; value: string }[];
    selectedValue: string;
    onSelect: (value: string) => void;
    title: string;
  }

  const SelectionModal: React.FC<SelectionModalProps> = ({ visible, onClose, options, selectedValue, onSelect, title }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          
          <ScrollView style={styles.modalScrollView}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.modalOption,
                  selectedValue === option.value && styles.modalOptionSelected
                ]}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedValue === option.value && styles.modalOptionTextSelected
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Composant personnalisé pour remplacer le Picker
  interface CustomSelectProps {
    label: string;
    value: string;
    options: { label: string; value: string }[];
    onPress: () => void;
  }

  const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onPress }) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selectControl} onPress={onPress}>
        <Text style={styles.selectText}>
          {getLabelFromValue(options, value)}
        </Text>
        <ChevronDown size={20} color={Colors.text.secondary} />
      </TouchableOpacity>
    </>
  );

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

      {/* Sélecteurs personnalisés */}
      <CustomSelect
        label="Secteur"
        value={field}
        options={fieldOptions}
        onPress={() => setFieldModalVisible(true)}
      />

      <CustomSelect
        label="Type de profil"
        value={profileType}
        options={profileTypeOptions}
        onPress={() => setProfileTypeModalVisible(true)}
      />

      <CustomSelect
        label="Rôle"
        value={role}
        options={roleOptions}
        onPress={() => setRoleModalVisible(true)}
      />

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

      {/* Modals de sélection */}
      <SelectionModal
        visible={fieldModalVisible}
        onClose={() => setFieldModalVisible(false)}
        options={fieldOptions}
        selectedValue={field}
        onSelect={setField}
        title="Choisissez votre secteur"
      />

      <SelectionModal
        visible={profileTypeModalVisible}
        onClose={() => setProfileTypeModalVisible(false)}
        options={profileTypeOptions}
        selectedValue={profileType}
        onSelect={setProfileType}
        title="Choisissez votre type de profil"
      />

      <SelectionModal
        visible={roleModalVisible}
        onClose={() => setRoleModalVisible(false)}
        options={roleOptions}
        selectedValue={role}
        onSelect={setRole}
        title="Choisissez votre rôle"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.spacing.xl,
    backgroundColor: Colors.background.primary,
    paddingBottom: Layout.spacing.xxl,
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
    width: 250,
    height: 250,
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
  // Styles pour le sélecteur personnalisé
  selectControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: Layout.borderRadius.lg,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
    backgroundColor: '#fff',
    height: 48,
  },
  selectText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  // Styles pour le modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: Layout.borderRadius.xl,
    borderTopRightRadius: Layout.borderRadius.xl,
    padding: Layout.spacing.lg,
    maxHeight: '70%',
  },
  modalTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
  },
  modalScrollView: {
    marginBottom: Layout.spacing.lg,
  },
  modalOption: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  modalOptionSelected: {
    backgroundColor: Colors.primary[50],
  },
  modalOptionText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  modalOptionTextSelected: {
    color: Colors.primary[600],
    fontFamily: Typography.fontFamily.medium,
  },
  modalCloseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    backgroundColor: Colors.primary[600],
    borderRadius: Layout.borderRadius.md,
  },
  modalCloseButtonText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: '#fff',
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
    marginBottom: Layout.spacing.xl,
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