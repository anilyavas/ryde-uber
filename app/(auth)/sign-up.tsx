import InputField from '@/components/InputField';
import { icons, images } from '@/constants';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image className='z-0 w-full h-[250px]' source={images.signUpCar} />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Create Your Account
          </Text>
        </View>
        <View className='p-5'>
          <InputField
            label='Name'
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
        </View>
      </View>
    </ScrollView>
  );
}
