import React from 'react';
import { StyleSheet, Text, View, ImageBackground,TouchableOpacity } from 'react-native';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import colors from '../theme/colors';
import {MaterialCommunityIcons, Ionicons, Entypo} from '@expo/vector-icons'
import { BlurView } from 'expo-blur';
import SPACING from '../theme/SPACING';

export default function ImageBGInfo(
    {EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,}
) {
   
  return (
    <View>
      <ImageBackground 
      style={styles.ItemBackgroundImage}
      source={imagelink_portrait}>
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBar1}>
            <TouchableOpacity
            onPress={() => {
              BackHandler();
            }} 
            style={styles.BGicon}>
               <Ionicons name = 'arrow-back' color={colors.secondary} size={20}/>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              ToggleFavourite(favourite, type, id);
            }} 
            style={styles.BGicon}>
            <Ionicons name = 'heart' color={favourite ? colors.red : colors.secondary} size={20}/>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ImageHeaderBar2}>
            <TouchableOpacity 
            onPress={()=>{
              ToggleFavourite(favourite, type, id);
            }} 
            style={styles.BGicon}>
            <Ionicons name = 'heart' color={favourite ? colors.red : colors.secondary} size={18}/>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.ImageInfoOuterContainer}>
          <View style={styles.ImageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style = {styles.ItemTitleText}>{name}</Text>
                <Text style = {styles.ItemSubTitleText}>
                  {special_ingredient}
                  </Text>
              </View>
              <View style = {styles.ItemPropertiesContainer}>
                <View style={styles.PropertiesOne}>
                  <MaterialCommunityIcons 
                  name = {type === 'Bean' ? 'seed' : 'seed'} 
                   size={type === 'Bean' ? 16 : 20}
                   color={colors.primary}/>
                   <Text style={[styles.PropertiesTextOne, {marginTop: type == 'Bean' ? 4 + 2 : 0}]}>
                    {type}
                    </Text>
                </View>
                <View style={styles.PropertiesOne}>
                <Entypo
                  name = {type === 'Bean' ? 'location' : 'drop'} 
                   size={20}
                   color={colors.primary}/>
                   <Text style={styles.PropertiesTextLast}>
                    {ingredients}
                    </Text>
                </View>
              </View>
            </View>
            <View style={styles.InfoContainerRow}>
              <View style = {styles.RatingContainer}>
                <Ionicons name='star' color={colors.primary} size={20}/>
                <Text style={styles.RatingText}>{average_rating}</Text>
                <Text style={styles.RatingCountText}>({ratings_count})</Text>
              </View>
              <View style = {styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
     ItemBackgroundImage: {
      width: "100%",
      justifyContent: "space-between",
      aspectRatio: 20/25,
  },
  ImageHeaderBar1: {
     padding: SPACING,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
  },
  ImageHeaderBar2:{
    padding: SPACING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  BGicon:{
    backgroundColor: colors.dark, 
    borderRadius: SPACING, 
    width: 35, 
    height: 35, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  ImageInfoOuterContainer:{
    paddingVertical:  24,
    paddingHorizontal: SPACING*2,
    backgroundColor: colors.blur,
    borderTopLeftRadius: SPACING*4,
    borderTopRightRadius: SPACING*4,
  },
  ImageInfoInnerContainer:{
    justifyContent:"space-between",
    gap: 15,
  },
  InfoContainerRow:{
     flexDirection:"row",
     justifyContent:"space-between",
     alignItems: 'center',
  },
  ItemTitleText:{
    fontWeight: '700',
    fontSize: 24,
    color: colors.white,
  },
  ItemSubTitleText:{
    fontWeight: '400',
    fontSize: 12,
    color: colors.white,
  },
  ItemPropertiesContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING *2,
  },
  PropertiesOne:{
    height: 55,
    width: 55,
    borderRadius: SPACING*2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark,
  },
  PropertiesTextLast:{
    fontSize: 10,
    color: colors.white,
    marginTop: 2,
  },
  PropertiesTextOne:{
    fontWeight: '400',
    fontSize: 10,
    color: colors.white,
  },
  RatingContainer:{
    flexDirection: 'row',
    gap: SPACING,
    alignItems: "center",
  },
  RatingText:{
    fontWeight: "600",
    fontSize: 18,
    color: colors.white,
  },
  RatingCountText:{
    fontSize: 12,
    color: colors.white,
  },
  RoastedContainer:{
    height: 55,
    width: 55*2 + SPACING*2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark,
  },
  RoastedText:{
    fontSize: 12,
    color: colors.white,
  },
});