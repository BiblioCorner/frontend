import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ViewStyle, TextStyle } from 'react-native';
import { useLanguage, LANGUAGES } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.styles';


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

