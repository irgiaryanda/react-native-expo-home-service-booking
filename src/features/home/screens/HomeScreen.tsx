import { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart } from '../../../store/slices/cartSlice';
import { fetchServices } from '../../../api/services';
import { FEATURE_PROMO_BANNER_ENABLED, APP_CONFIG } from '../../../api/remoteConfig';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import type { Service } from '../../../api/services';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [addedServiceId, setAddedServiceId] = useState<string | null>(null);

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleAddToCart = (service: Service) => {
    dispatch(addToCart(service));
    setAddedServiceId(service.id);
    setTimeout(() => setAddedServiceId(null), 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 justify-center items-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="mt-4 text-slate-500">Loading services...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 justify-center items-center">
        <Text className="text-red-500">Failed to load services</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-sky-500 px-4 pt-12 pb-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-2xl font-bold">LuminaCare</Text>
            <Text className="text-sky-100 text-sm mt-1">Home Service Booking</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            className="bg-white px-4 py-2 rounded-full flex-row items-center"
          >
            <Text className="text-sky-600 font-semibold">Cart</Text>
            {cartItemCount > 0 && (
              <View className="bg-red-500 rounded-full w-5 h-5 justify-center items-center ml-2">
                <Text className="text-white text-xs font-bold">{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {FEATURE_PROMO_BANNER_ENABLED && (
        <View className="mx-4 mt-4 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3">
          <Text className="text-center text-sm font-semibold text-sky-800">
            {APP_CONFIG.promoBannerMessage}
          </Text>
        </View>
      )}

      <Text className="mt-4 mb-3 px-4 text-lg font-bold text-slate-800">Our Services</Text>

      <ScrollView className="flex-1 px-4 pb-6" showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-6">
          {services?.map((service: Service) => (
            <View 
              key={service.id} 
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-slate-800 font-bold text-lg">{service.name}</Text>
                  <Text className="text-slate-500 text-sm mt-1">{service.description}</Text>
                  <View className="flex-row items-center mt-2">
                    <View className="bg-slate-100 px-2 py-1 rounded-md">
                      <Text className="text-slate-600 text-xs">{service.duration}</Text>
                    </View>
                    <View className="bg-sky-50 px-2 py-1 rounded-md ml-2">
                      <Text className="text-sky-600 text-xs capitalize">{service.category}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <Text className="text-sky-600 font-bold text-lg">
                  {formatPrice(service.price)}
                </Text>
                <TouchableOpacity
                  onPress={() => handleAddToCart(service)}
                  className={`px-5 py-2.5 rounded-full ${
                    addedServiceId === service.id 
                      ? 'bg-green-500' 
                      : 'bg-sky-500'
                  }`}
                >
                  <Text className="text-white font-semibold">
                    {addedServiceId === service.id ? 'Added!' : 'Book Now'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
