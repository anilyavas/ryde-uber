import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'success',
    error: '',
    code: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        // create database user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          state: 'failed',
          error: 'Verification failed.',
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: 'failed',
        error: err.errors[0].longMessage,
      });
    }
  };

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
            placeholder='Enter your name'
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title='Sign Up'
            onPress={onSignUpPress}
            className='mt-6'
          />
          <OAuth />
          <Link
            href={'/sign-in'}
            className='text-lg text-center text-general-200 mt-10'
          >
            <Text>Already have an account? </Text>
            <Text className='text-primary-500'>Log In</Text>
          </Link>
        </View>
        <ReactNativeModal isVisible={verification.state == 'success'}>
          <View className='py-9 px-7 bg-white min-h-[300px]'>
            <Image
              source={images.check}
              className='w-[110px] h-[110px] mx-auto my-5'
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
