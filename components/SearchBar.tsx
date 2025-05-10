import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Layout from '@/constants/Layout';

interface SearchBarProps {
  onSearch: (text: string) => void;
  onLocationSearch?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  onSearch, 
  onLocationSearch, 
  placeholder = 'Search libraries...' 
}: SearchBarProps) {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
    onSearch('');
  };

  const handleSubmit = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray[400]} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray[400]}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          clearButtonMode="never"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <X size={16} color={Colors.gray[400]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    height: 44,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  clearButton: {
    padding: Layout.spacing.xs,
  },
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.sm,
  },
});