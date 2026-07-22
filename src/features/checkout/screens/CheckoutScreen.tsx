import { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../../../store/slices/cartSlice';
import type { CartItem } from '../../../store/slices/cartSlice';

async function submitBooking(items: CartItem[]): Promise<{ success: boolean; bookingId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    success: true,
    bookingId: `BK-${Date.now()}`,
  };
}

export function CheckoutScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);

  const bookingMutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: (data) => {
      Alert.alert(
        'Booking Confirmed!',
        `Your booking ID: ${data.bookingId}\nTotal: ${formatPrice(totalPrice)}`,
        [{ text: 'OK', onPress: () => dispatch(clearCart()) }]
      );
      navigation.goBack();
    },
    onError: () => {
      Alert.alert('Error', 'Failed to submit booking. Please try again.');
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + delta }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="bg-sky-500 px-4 pt-12 pb-6">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
              <Text className="text-white text-lg">←</Text>
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Checkout</Text>
          </View>
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-slate-500 text-lg">Your cart is empty</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mt-4 bg-sky-500 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-semibold">Browse Services</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-sky-500 px-4 pt-12 pb-6">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Text className="text-white text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Checkout</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-slate-800 mb-4">Order Summary</Text>
        
        <View className="gap-3 pb-4">
          {cartItems.map((item) => (
            <View 
              key={item.id} 
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-slate-800 font-bold">{item.name}</Text>
                  <Text className="text-slate-500 text-sm mt-1">{item.duration}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  className="px-3 py-1"
                >
                  <Text className="text-red-500 text-sm">Remove</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <View className="flex-row items-center bg-slate-100 rounded-lg">
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item.id, -1)}
                    className="w-8 h-8 justify-center items-center"
                  >
                    <Text className="text-slate-700 font-bold">−</Text>
                  </TouchableOpacity>
                  <Text className="px-4 text-slate-800 font-semibold">{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityChange(item.id, 1)}
                    className="w-8 h-8 justify-center items-center"
                  >
                    <Text className="text-slate-700 font-bold">+</Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-sky-600 font-bold">
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-white rounded-xl p-4 mt-4 shadow-sm border border-slate-100">
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-600">Subtotal</Text>
            <Text className="text-slate-800">{formatPrice(totalPrice)}</Text>
          </View>
          <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-slate-100">
            <Text className="text-slate-800 font-bold text-lg">Total</Text>
            <Text className="text-sky-600 font-bold text-xl">{formatPrice(totalPrice)}</Text>
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      <View className="bg-white border-t border-slate-200 px-4 py-4 pb-6">
        <TouchableOpacity
          onPress={() => bookingMutation.mutate(cartItems)}
          disabled={bookingMutation.isPending}
          className="bg-sky-500 py-4 rounded-xl items-center"
        >
          {bookingMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}