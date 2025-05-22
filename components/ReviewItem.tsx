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

  console.log({review});
  
  const reviewImages = [
    "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg", 
    "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg",
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg", 
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg",
    "https://images.pexels.com/photos/8534187/pexels-photo-8534187.jpeg",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    "https://images.pexels.com/photos/7681731/pexels-photo-7681731.jpeg",
    "https://images.pexels.com/photos/2925304/pexels-photo-2925304.jpeg",
    "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg"
    
  ];


  const getImageIndex = (id: string, index?: number) => {
    if (typeof index !== 'undefined') {
      return index % reviewImages.length;
    }
    
    const lastChars = id.slice(-3); 
    let hash = 0;
    for (let i = 0; i < lastChars.length; i++) {
      hash += lastChars.charCodeAt(i) * (i + 1);
    }
    return hash % reviewImages.length;
  };


  
  const imageUrl = reviewImages[getImageIndex(review._id)];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {<Image 
            source={{ uri: imageUrl }} 
            style={styles.avatar}
          /> }
          <View>
            <Text style={styles.username}>John Doe</Text>
            <View style={styles.starsRow}>
              {review.likes_count > 0 && (
                <Text>{review.likes_count} Likes</Text>
              )}
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => onReport(review._id)}
        >
          <MoreHorizontal size={20} color={Colors.gray[400]} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.date}>{review.created_at}</Text>
      <Text style={styles.content}>{review.content}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.reportButton}
          onPress={() => onReport(review._id)}
        >
          <Flag size={14} color={Colors.gray[500]} />
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

