import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const  [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();
  
    const login = async () => {
        try {
            const result = await onLogin!(email, password);
            if(result && result.error){
                alert(result.msg);
            }
        } catch (e) {
            console.log(e);
        }
    }

    

    return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login