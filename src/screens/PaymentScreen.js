import React, {useState} from 'react';
import {StyleSheet,Text,View,StatusBar,ScrollView,TouchableOpacity,} from 'react-native';
import colors from '../theme/colors';
import SPACING from '../theme/SPACING';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import {useStore} from '../store/store';
import {AntDesign, Ionicons, FontAwesome} from '@expo/vector-icons'
import { BlurView } from 'expo-blur';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];


export default function PaymentScreen({navigation, route}) {
  const calculateCartPrice = useStore((state) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state) => state.addToOrderHistoryListFromCart,
  );

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };
  return (
    <View style={styles.ScreenContainer}>
    <StatusBar backgroundColor={colors.dark} />

    {showAnimation ? (
      <View
        style={styles.LottieAnimation}
      />
    ) : (
      <></>
    )}

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <AntDesign
            name="left"
            color={colors['white-smoke']}
            size={16}
          />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Payments</Text>
        <View style={styles.EmptyView} />
      </View>

      <View style={styles.PaymentOptionsContainer}>
        <TouchableOpacity
          onPress={() => {
            setPaymentMode('Credit Card');
          }}>
          <View
            style={[
              styles.CreditCardContainer,
              {
                borderColor:
                  paymentMode == 'Credit Card'
                    ? colors.primary
                    : colors['white-smoke'],
              },
            ]}>
            <Text style={styles.CreditCardTitle}>Credit Card</Text>
            <View style={styles.CreditCardBG}>
              <BlurView
              intensity={100}
              tint='dark'
                style={styles.LinearGradientStyle}
                >
                <View style={styles.CreditCardRow}>
                  <Ionicons
                    name="hardware-chip"
                    size={SPACING*4}
                    color={colors.primary}
                  />
                  <FontAwesome
                    name="cc-visa"
                    size={SPACING*6}
                    color={colors.white}
                  />
                </View>
                <View style={styles.CreditCardNumberContainer}>
                  <Text style={styles.CreditCardNumber}>3879</Text>
                  <Text style={styles.CreditCardNumber}>8923</Text>
                  <Text style={styles.CreditCardNumber}>6745</Text>
                  <Text style={styles.CreditCardNumber}>4638</Text>
                </View>
                <View style={styles.CreditCardRow}>
                  <View style={styles.CreditCardNameContainer}>
                    <Text style={styles.CreditCardNameSubitle}>
                      Card Holder Name
                    </Text>
                    <Text style={styles.CreditCardNameTitle}>
                      Do Dinh Duoc
                    </Text>
                  </View>
                  <View style={styles.CreditCardDateContainer}>
                    <Text style={styles.CreditCardNameSubitle}>
                      Expiry Date
                    </Text>
                    <Text style={styles.CreditCardNameTitle}>02/30</Text>
                  </View>
                </View>
              </BlurView>
            </View>
          </View>
        </TouchableOpacity>
        {PaymentList.map((data) => (
          <TouchableOpacity
            key={data.name}
            onPress={() => {
              setPaymentMode(data.name);
            }}>
            <PaymentMethod
              paymentMode={paymentMode}
              name={data.name}
              icon={data.icon}
              isIcon={data.isIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

    <PaymentFooter
      buttonTitle={`Pay with ${paymentMode}`}
      price={{price: route.params.amount, currency: '$'}}
      buttonPressHandler={buttonPressHandler}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontWeight: '600',
    fontSize: SPACING*2,
    color: colors.white,
  },
  EmptyView: {
    height: 36,
    width: 36,
  },
  PaymentOptionsContainer: {
    padding: 15,
    gap: 15,
  },
  CreditCardContainer: {
    padding: SPACING,
    gap: SPACING,
    borderRadius: SPACING*3,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.white,
    marginLeft: SPACING,
  },
  CreditCardBG: {
    backgroundColor: colors['white-smoke'],
    borderRadius: 25,
  },
  LinearGradientStyle: {
    gap: 36,
    paddingHorizontal: 15,
    paddingVertical: SPACING,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontWeight: '600',
    fontSize: 18,
    color: colors.white,
    letterSpacing: 6,
  },
  CreditCardNameSubitle: {
    fontSize: 12,
    color: colors['dark-light'],
  },
  CreditCardNameTitle: {
    fontWeight: '800',
    fontSize: 18,
    color: colors.white,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
});