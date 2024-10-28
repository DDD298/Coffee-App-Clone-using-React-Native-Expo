import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, TextInput, FlatList, SafeAreaView, Dimensions, ToastAndroid} from 'react-native';
import { useStore } from '../store/store';
import { useRef, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';
import HeaderBar from '../components/HeaderBar';
import SPACING from '../theme/SPACING';
import{Ionicons} from "@expo/vector-icons";
import CoffeeCard from "../components/CoffeeCard"

//tạo một empty object, đi qua vòng lặp có độ dài dữ liệu mảng đó 
// kiểm tra nếu tên index tồn tại bên trong temp không
const getCategoriesFromData = (data) =>{
  let temp = {}
  for(let i =0; i < data.length; i++){
    if(temp[data[i].name] == undefined){
       temp[data[i].name] = 1;  
    }else{
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp); //extract all the properties form Temp and make it into an array
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category, data) => {
  if(category == "All"){
    return data;
  }else{
    let coffeeList = data.filter((item) => item.name == category);
    return coffeeList
  }
};
const width = Dimensions.get('window');

export default function HomeScreen({navigation}) {
  const CoffeeList = useStore((state)=> state.CoffeeList);
  const BeansList = useStore((state)=> state.BeansList);
  const addToCart = useStore((state) => state.addToCart);
  const calculateCartPrice =  useStore((state) => state.calculateCartPrice);

  const [categories, setcategories] =  useState(getCategoriesFromData(CoffeeList),);
  const [searchText, setSearchText] =  useState("");
  const [categoryIndex, setcategoryIndex] =  useState({
    index: 0,
    category: categories[0], //baoh categories thay đổi thì n sẽ thay đổi categoryIndex

  });
  const [sortedCoffee,setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList),
  ); //khi nào ấn vào một categories thì sẽ hiện categories
  
   const ListRef = useRef() 
   const tabBarHeight = useBottomTabBarHeight()
    
   const searchCoffee = (search) => {
    if(search !== ""){
      ListRef.current.scrollToOffset({
        animated: true,
        offset: 0
      });
      setcategoryIndex({index:0, categories: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item) =>
       item.name.toLowerCase().includes(search.toLowerCase()),
       ),
      ]);
    }
   };

   const resetSearchCoffee = () => {
    ListRef.current.scrollToOffset({
      animated: true,
      offset: 0
    });
    setcategoryIndex({index:0, categories: categories[0]});
    setSortedCoffee([ ...CoffeeList]);
    setSearchText('');
   };

   const CoffeeCartAddToCart = ({id, index, name, roasted, imagelink_square, special_ingredient, type, prices,})=>{
    addToCart({id, index, name, roasted, imagelink_square, special_ingredient, type, prices,
   });
   calculateCartPrice();
   ToastAndroid.showWithGravity(`${name} is Added to Cart`,ToastAndroid.SHORT, ToastAndroid.CENTER);
 };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={colors.dark}/>
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
      {/*app header */}
      <HeaderBar  />
      <Text style={styles.ScreenTitle}>Find the best coffee for you ^.^</Text>

      {/*search input */}
      <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {
            searchCoffee(searchText)
          }}>
            <Ionicons 
            style={styles.InputIcon}
            name = 'search' 
            size={18} 
            color={searchText.length > 0 ? colors.primary : colors['white-smoke']}/> 
          </TouchableOpacity>
          <TextInput 
          placeholder='Find Your Coffee...' 
          value={searchText} 
          onChangeText={text => {
            setSearchText(text);
            searchCoffee(text);
          }}
          placeholderTextColor={colors['white-smoke']}
          style={styles.TextInputContainer}/>
          {searchText.length  > 0 ? (
          <TouchableOpacity onPress={() => {
            resetSearchCoffee();
          }}>
              <Ionicons 
              style={{paddingHorizontal: SPACING*12}}
              name='close' 
              color={colors['white-smoke']} 
              size={18}/>
          </TouchableOpacity> 
          ) : (
          <></>
            )}
        </View>

           {/*categories Scroller */}
        <ScrollView 
        scrollEventThrottle={500}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
            key={index.toString()} //unique ID for components to indentify them
            style={styles.CategoryScrollViewContainer} 
            >
              <TouchableOpacity
              style={styles.CategoryScrollViewItem} 
              onPress={() => {
                ListRef.current.scrollToOffset({
                  animated: true,
                  offset: 0,
                })
                setcategoryIndex({index:index, category: categories[index]});
                setSortedCoffee([
                  ...getCoffeeList(categories[index], CoffeeList),
                ]);
              }}>
                <Text style={[styles.CategoryText, 
                  categoryIndex.index == index ? {color: colors.primary} : {} 
                  ]}>
                    {data}
                  </Text>
                {categoryIndex.index == index ? (
                <View style={styles.ActiveCategory}/>
                ) : ( 
                <></>
              )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

             {/*coffee flatlist */}
             <FlatList
             ref={ListRef}
             onEndReachedThreshold={500}
             horizontal
             ListEmptyComponent={
              <View style={styles.EmptyListContainer}>
                <Text style={styles.CategoryText}>No Coffee Available</Text>
              </View>
             }
             showsHorizontalScrollIndicator={false}
             data = {sortedCoffee}
             contentContainerStyle={[styles.FlatListContainer]}
             keyExtractor={item => item.id}
             renderItem={({item}) => {
              return <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index, 
                  id: item.id, 
                  type: item.type 
                });
              }}>
                <CoffeeCard 
                id = {item.id} 
                index ={item.index}
                type = {item.type}
                roasted = {item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient} 
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeeCartAddToCart}/>
              </TouchableOpacity>
             }}
             />

<Text style={styles.CoffeeBeansTitle}>CoffeeBeans</Text>
       {/*Beans FlatList*/}
       <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             data = {BeansList}
             contentContainerStyle={[styles.FlatListContainer, {marginBottom: tabBarHeight}]}
             keyExtractor={item => item.id}
             renderItem={({item}) => {
              return <TouchableOpacity onPress={() => {
                navigation.push('Details' , {
                  index: item.index, 
                  id: item.id, 
                  type: item.type 
                });
              }}>
                <CoffeeCard 
                id = {item.id} 
                index ={item.index}
                type = {item.type}
                roasted = {item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient} 
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={CoffeeCartAddToCart}/>
              </TouchableOpacity>
             }}
             />
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
  ScreenTitle:{
     fontSize: SPACING*3,
     color: colors.white,
     width: "80%", 
     marginVertical: SPACING*2,
     fontWeight: '600',
     paddingLeft: 20,
  },
  InputContainerComponent:{
    margin: SPACING,
    borderRadius: SPACING,
    backgroundColor: colors['dark-light'],
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  InputIcon:{
    marginHorizontal:SPACING *2,  
  },
  TextInputContainer: {
    height: SPACING * 6,
    fontSize: 15,
    color: colors.white,
  },
  CategoryScrollViewStyle:{
    marginBottom: SPACING*2,
  },
  CategoryScrollViewContainer:{
    paddingHorizontal: 15,
  },
  CategoryScrollViewItem:{
     alignItems: 'center',
  },
  CategoryText:{
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 5,
    marginTop: SPACING,
    fontWeight: '500'
  },
  ActiveCategory:{
     height: SPACING,
     width: SPACING,
     borderRadius: SPACING,
     backgroundColor: colors.primary,
  },
  FlatListContainer:{
    gap: SPACING*2,
    paddingVertical: SPACING*2,
    paddingHorizontal: SPACING*3,
  },
  EmptyListContainer:{
    width: width.width - SPACING*6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36 * 3.6,
  },
  CoffeeBeansTitle:{
    fontSize: 18,
    marginLeft: SPACING,
    marginTop: SPACING,
    color: colors.white,
    fontWeight: 'bold',
  },
});
