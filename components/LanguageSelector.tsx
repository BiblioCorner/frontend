import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ViewStyle, TextStyle } from 'react-native';
import { useLanguage, LANGUAGES } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguageSelector({ visible, onClose }: LanguageSelectorProps) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const handleLanguageSelect = async (languageCode: string) => {
    await setLanguage(languageCode);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('profile.language')}</Text>
          
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                language === lang.code && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageSelect(lang.code)}
            >
              <Text style={[
                styles.languageText,
                language === lang.code && styles.selectedLanguageText
              ]}>
                {lang.name}
              </Text>
              {language === lang.code && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  } as ViewStyle,
  modalContent: {
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  } as ViewStyle,
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: 20,
  } as TextStyle,
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  } as ViewStyle,
  selectedLanguage: {
    backgroundColor: Colors.background.secondary,
  } as ViewStyle,
  languageText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  } as TextStyle,
  selectedLanguageText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
  } as TextStyle,
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  checkmarkText: {
    color: Colors.background.primary,
    fontWeight: 'bold',
  } as TextStyle,
  cancelButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
  } as ViewStyle,
  cancelButtonText: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.text.primary,
  } as TextStyle,
});
