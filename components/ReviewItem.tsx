import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, Flag, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ReviewType } from '@/types/review';
import styles from './ReviewItem.styles';


interface ReviewItemProps {
  review: ReviewType;
  onReport: (id: string) => void;
}

export default function ReviewItem({ review, onReport }: ReviewItemProps) {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={16}
        color={i < rating ? Colors.accent[500] : Colors.gray[300]}
        fill={i < rating ? Colors.accent[500] : 'none'}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: review.userAvatar }} 
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{review.userName}</Text>
            <View style={styles.starsRow}>
              {renderStars(review.rating)}
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => onReport(review.id)}
        >
          <MoreHorizontal size={20} color={Colors.gray[400]} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.date}>{review.date}</Text>
      <Text style={styles.content}>{review.content}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => onReport(review.id)}
        >
          <Flag size={14} color={Colors.gray[500]} />
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

