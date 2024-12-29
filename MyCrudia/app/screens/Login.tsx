


import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextField, Picker, Incubator, Text } from "react-native-ui-lib";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    setLoading(true);
    const result = await onLogin!(email, password);
    setLoading(false);

    if (result?.error) {
      alert(result.msg);
    } else {
      alert(result.msg);
    }
  };

  const register = async () => {
    setLoading(true);
    const result = await onRegister!(email, password);
    setLoading(false);

    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "80%" }}>
        <Text style={styles.title}>Login / Register (BETA)</Text>
        
        <TextField
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          floatingPlaceholder
          enableErrors
          validate={['required', 'email']}
          validationMessage={['Field is required', 'Email is invalid']}
          fieldStyle={styles.textField}
        />

        <TextField
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          floatingPlaceholder
          enableErrors
          validate={['required']}
          validationMessage={['Field is required']}
          fieldStyle={styles.textField}
        />

        <Button
          onPress={login}
          label={loading ? "Loading..." : "Login"}
          disabled={loading}
          backgroundColor="#6200EE"
        />
        <Text center marginT-10>OR</Text>
        <Button
          onPress={register}
          label={loading ? "Loading..." : "Register"}
          disabled={loading}
          backgroundColor="#03DAC5"
        />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: 'center'
  },
  textField: {
    borderBottomWidth: 1,
    borderColor: '#888',
    marginBottom: 20
  }
});
