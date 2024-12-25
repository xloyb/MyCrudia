import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const  [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login