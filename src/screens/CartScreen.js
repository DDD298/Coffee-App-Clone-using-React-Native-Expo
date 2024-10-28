import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useStore } from '../store/store';
import colors from '../theme/colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import SPACING from '../theme/SPACING';
import PaymentFooter from '../components/PaymentFooter';
import CartItems from '../components/CartItems';


export default function CartScreen({navigation, route}) {
  const CartList = useStore((state) => state.CartList);
  const CartPrice = useStore((state) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };

  const incrementCartItemQuantityHandler = (id, size) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id, size) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={colors.dark}/>

      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style = {styles.ItemContainer}>
        <HeaderBar title={"Cart"} />
        {CartList.length == 0 ? (
        <EmptyListAnimation title={"Cart is Empty"} />
        ):(      
        <View style={styles.ListItemContainer}>
          {CartList.map((data) => (
          <TouchableOpacity 
            onPress={() => {
              navigation.push('Details', {index: data.index, id: data.id, type:data.type});
            }} 
            key={data.id}>
              <CartItems
                id={data.id}
                name={data.name} 
                imagelink_square={data.imagelink_square}
                special_ingredient={data.special_ingredient}
                roasted={data.roasted}
                prices={data.prices}
                type={data.type} 
                incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                decrementCartItemQuantityHandler={decrementCartItemQuantityHandler}
              />
          </TouchableOpacity>
))}

        </View>
        )}
        </View>
{CartList.length != 0 ? (
<PaymentFooter 
buttonPressHandler={buttonPressHandler}
buttonTitle={"Pay now"} 
price={{price: CartPrice, currency: "$"}}/> 
): ( 
<></>
)}
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