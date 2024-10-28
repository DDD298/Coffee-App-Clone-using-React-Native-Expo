import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ImageBGInfo from './ImageBGInfo';
import { BlurView } from 'expo-blur';
import colors from '../theme/colors';
import SPACING from '../theme/SPACING';

export default function FavouritesItemCard({
    id,
    imagelink_portrait,
    name,
    special_ingredient,
    type,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    description,
    favourite,
    ToggleFavouriteItem,}) {
  return (
    <View style={styles.CardContainer}>
      <ImageBGInfo 
      EnableBackHandler = {false}
      imagelink_portrait = {imagelink_portrait}
       type ={type}
       id = {id}
       favourite ={favourite}
       name = {name}
       special_ingredient={special_ingredient}
       ingredients={ingredients}
       average_rating={average_rating}
       ratings_count={ratings_count}
       roasted={roasted}
       ToggleFavourite={ToggleFavouriteItem}
      />
       <BlurView 
       tint='dark'
       intensity={100}
       style ={styles.ContainerBLur}>
         <Text style ={styles.DescriptionTitle}>Description</Text>
         <Text style ={styles.DescriptionText}>{description}</Text>
       </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
    CardContainer:{
        borderRadius: 25,
        overflow: 'hidden',
    },
  ContainerBLur:{
    gap: SPACING,
    padding: SPACING*2,
  },
  DescriptionTitle:{
    fontWeight: '700',
    fontSize: 16,
    color: colors['white-smoke'],
  },
  DescriptionText:{
    fontSize: 14,
    color: colors.white,
  },
});