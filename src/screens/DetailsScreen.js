import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useStore } from '../store/store';
import colors from '../theme/colors';
import  ImageBGInfo  from '../components/ImageBGInfo';
import SPACING from '../theme/SPACING';
import PaymentFooter from '../components/PaymentFooter';

export default function DetailsScreen({navigation, route}) {
  //console.log('route = ', route.params);
  const ItemOfIndex = useStore((state) => 
  route.params.type == 'Coffee' ? state.CoffeeList : state.BeansList,
  )[route.params.index];

  const BackHandler = ()=>{
    navigation.pop();
  };

  const addToCart = useStore((state) => state.addToCart);
  const calculateCartPrice =  useStore((state) => state.calculateCartPrice);

  const addToCartHandler = ({id, index, name, roasted, imagelink_square, special_ingredient, type, price,})=>{
    addToCart({id, index, name, roasted, imagelink_square, special_ingredient, type, prices:[{...price, quantity:1}],
   });
   calculateCartPrice();
   navigation.navigate('Cart');
 };

  const addToFavouriteList = useStore((state) => state.addToFavouriteList);
  const deleteFromFavouriteList = useStore((state) => state.deleteFromFavouriteList);

  const ToggleFavourite= (favourite, type, id) =>{
      favourite ? deleteFromFavouriteList(type,id) : addToFavouriteList(type, id);
  };
    
    const [price, setPrice] = useState(ItemOfIndex.prices[0]);
    const [fullDesc,setFullDesc] = useState(false);

 // console.log(data);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={colors.dark}/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
      <ImageBGInfo 
           EnableBackHandler = {true}
          imagelink_portrait = {ItemOfIndex.imagelink_portrait}
           type ={ItemOfIndex.type}
           id = {ItemOfIndex.id}
           favourite ={ItemOfIndex.favourite}
           name = {ItemOfIndex.name}
           special_ingredient={ItemOfIndex.special_ingredient}
           ingredients={ItemOfIndex.ingredients}
           average_rating={ItemOfIndex.average_rating}
           ratings_count={ItemOfIndex.ratings_count}
           roasted={ItemOfIndex.roasted}
           BackHandler={BackHandler}
           ToggleFavourite={ToggleFavourite}/> 

           <View style={styles.FooterInfoArea}>
            <Text style={styles.InfoTitle}>Description</Text>
            {fullDesc ? 
            (<TouchableWithoutFeedback 
              onPress={() => {
                setFullDesc(prev => !prev);
            }}>
              <Text style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
            </TouchableWithoutFeedback> 
            ) : (
            <TouchableWithoutFeedback
            onPress={() => {
              setFullDesc(prev => !prev);
          }}>
               <Text numberOfLines={3} style={styles.DescriptionText}>
                {ItemOfIndex.description}</Text>
            </TouchableWithoutFeedback>
            )}
            <Text style={styles.InfoTitle}>Size</Text>
           <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data) => (
              <TouchableOpacity 
              onPress={() => {
                setPrice(data);
              }}
              key={data.size} 
              style={[styles.SizeBox, {
                borderColor: data.size == price.size
                ?colors.primary
                :colors['dark-light'],
              }]}>
                <Text style= {[styles.SizeText, {
                  fontSize: ItemOfIndex.type == "Bean" 
                  ? 14 : 16, 
                color: data.size == price.size
                ?colors.primary
                :colors.white, }]}>{data.size}</Text>
              </TouchableOpacity>
            ))}
           </View>
           </View>
           <PaymentFooter 
           price={price} 
           buttonTitle='Add to Cart' 
           buttonPressHandler={() => {
            addToCartHandler({
              id:ItemOfIndex.id,
              index:ItemOfIndex.index,
              name:ItemOfIndex.name,
              roasted:ItemOfIndex.roasted,
              imagelink_square:ItemOfIndex.imagelink_square,
              special_ingredient:ItemOfIndex.special_ingredient,
              type:ItemOfIndex.type,
              price: price,
            });
           }}
           />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: colors.dark
  },
  ScrollViewFlex:{
    flexGrow: 1,
    justifyContent: "space-between",
  },
  FooterInfoArea:{
    padding: SPACING*2,
  },
  InfoTitle:{
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.light,
    marginBottom: SPACING,
  },
  DescriptionText:{
    letterSpacing: 0.5,
    fontSize: 14,
    color: colors.white,
    marginBottom: SPACING*3,
  },
  SizeOuterContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING*2,
  },
  SizeBox:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING,
    height: SPACING *4,
    borderWidth: 2,
  },
  SizeText: {
    fontWeight: '600',
  },
});