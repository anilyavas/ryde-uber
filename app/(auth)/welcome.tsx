import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef, useState } from 'react';
import { onboarding } from '@/constants';

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<Swiper>(null);

  return (
    <SafeAreaView className='flex h-full items-center justify-between bg-white'>
      <TouchableOpacity
        className='w-full flex justify-end items-end p-5'
        onPress={() => {
          router.replace('/(auth)/sign-up');
        }}
      >
        <Text className='text-black font-JakartaBold text-md'>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className='w-[32px] h-[4px] bg-[#E2EF80] mx-1 rounded-full' />
        }
        activeDot={
          <View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full' />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id}>
            <Image
              source={item.image}
              className='w-full h-[300px] '
              resizeMode='contain'
            />
            <View className='flex flex-row items-center w-full mt-10 justify-center'>
              <Text className='text-4xl text-black font-bold mx-10 text-center'>
                {item.title}
              </Text>
            </View>
            <Text className='text-lg font-JakartaSemiBold text-[#858585] mx-10 mt-5 text-center'>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
}
