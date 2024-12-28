import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { PricingCard, lightColors } from '@rneui/themed';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async () => { 
    const result = await onLogin!(email, password);
    console.log("Result from login:", result);  
    if (result?.error) {
      alert(result.msg);  
    } else {
      alert(result.msg);  
    }
  };
  

  const register = async () => {
      const result = await onRegister!(email, password);
      if (result && result.error) {
        alert(result.msg);
      } else {
        login();
      }
   
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "80%" }}>
      <Button size="md">Medium</Button>

      <ScrollView>
     

        <Text style={styles.title}>Login / Register (BETA)</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
          }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button onPress={login} title="Login" />
        <Text>OR</Text>
        <Button onPress={register} title="Register" />
        </ScrollView>

      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
