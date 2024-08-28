import { registerForPushNotificationsAsync } from "@/src/lib/notifications";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { refreshSession, profileSetter } = useAuth();

  async function getProfile(user_id: any) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id)
      .single();

    return profile;
  }

  async function signInWithEmail() {
    if (email.length == 0 || password.length == 0) {
      return Alert.alert("Please provide credentials");
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    //get and set user profile notification token
    registerForPushNotificationsAsync().then(async (token) => {
      //save token in user's profile in db
      //update token in db
      await supabase
        .from("profiles")
        .update({ expo_push_token: token })
        .eq("user_id", data.session?.user.id);
    });

    if (error) {
      setLoading(false);
      return Alert.alert(error.message);
    }

    const profile = await getProfile(data.user.id);
    profileSetter(profile);

    setLoading(false);
    router.navigate("/");
  }

  return (
    <View style={styles.container}>
      {/* <Image source={require("./assets/carrot-icon.png")} style={styles.icon} /> */}
      <Text style={styles.title}>Log in </Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={signInWithEmail}>
        <Text style={styles.loginButtonText}>
          {loading ? "Logging In" : "Log In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => {
          router.navigate("/(auth)/sign-up");
        }}
      >
        <Text style={styles.signupText}>Don't have an account? </Text>

        <Text style={styles.signupLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 80,
  },
  icon: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    padding: 10,
    borderRadius: 5,
  },
  forgotPassword: {
    color: "#888",
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#888",
  },
  signupLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default LoginScreen;
