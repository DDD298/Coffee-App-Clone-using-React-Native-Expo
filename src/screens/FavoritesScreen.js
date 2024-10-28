import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import { useStore } from '../store/store';
import{useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import colors from '../theme/colors';
import SPACING from '../theme/SPACING';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavouritesItemCard from '../components/FavouritesItemCard';

export default function FavouritesScreen({navigation}) {
  const FavouritesList = useStore((state) => state.FavouritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavouriteList = useStore((state) => state.addToFavouriteList);
  const deleteFromFavouriteList = useStore((state) => state.deleteFromFavouriteList, );`1`

  const ToggleFavourite= (favourite, type, id) =>{
      favourite ? deleteFromFavouriteList(type,id) : addToFavouriteList(type, id);
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={colors.dark}/>

      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style = {styles.ItemContainer}>
        <HeaderBar title={"Favourites"} />
        {FavouritesList.length == 0 ? (
        <EmptyListAnimation title={"No Favourites"} />
        ):(

        <View style={styles.ListItemContainer}>
          {FavouritesList.map((data) => (
          <TouchableOpacity 
            onPress={() => {
              navigation.push('Details', {index: data.index, id: data.id, type:data.type});
            }} 
            key={data.id}>
              <FavouritesItemCard 
              id={data.id}
              imagelink_portrait={data.imagelink_portrait}
              name={data.name}
              special_ingredient={data.special_ingredient}
              type = {data.type}
              ingredients={data.ingredients}
              average_rating={data.average_rating}
              ratings_count={data.ratings_count}
              roasted={data.roasted}
              description={data.description}
              favourite={data.favourite}
              ToggleFavouriteItem={ToggleFavourite}
              />
            </TouchableOpacity>
))}
        </View>
        )}
        </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  ScrollViewFlex:{
    flexGrow: 1,
  },
  ScrollViewInnerView:{
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer:{
    flex: 1,
  },
  ListItemContainer:{
    paddingHorizontal: SPACING*2,
    gap: SPACING*2,
  },
});