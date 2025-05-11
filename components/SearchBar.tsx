import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X, MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import styles from './SearchBar.styles';

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
