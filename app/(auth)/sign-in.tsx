import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

export default function Signin() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image className='z-0 w-full h-[250px]' source={images.signUpCar} />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Welcome
          </Text>
        </View>
        <View className='p-5'>
          <InputField
            label='Email'
            placeholder='Enter your email'
            icon={icons.email}
            value={form.email}
            onChange={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label='Password'
            placeholder='Enter your password'
            icon={icons.lock}
            value={form.password}
            onChange={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />
          <CustomButton
            title='Sign In'
            onPress={onSignInPress}
            className='mt-6'
          />
          <OAuth />
          <Link
            href={'/sign-up'}
            className='text-lg text-center text-general-200 mt-10'
          >
            <Text>Don't have an account? </Text>
            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
