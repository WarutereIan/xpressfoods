import { useCreateAccount, useInsertUserProfile } from "@/src/api/user";
import { registerForPushNotificationsAsync } from "@/src/lib/notifications";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { router, useSegments } from "expo-router";
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

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, confirmSetPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { usernameSetter, phoneNumberSetter } = useAuth();
  

  const { mutate: createAccount } = useCreateAccount();
  const { mutate: insertProfile } = useInsertUserProfile();
  const { profileSetter } = useAuth();

  async function signUpWithEmail() {
    if (!username || !email || !password || !confirmPassword || !phoneNumber) {
      return Alert.alert("", "Please Fill in All Fields");
    }

    if (confirmPassword != password) {
      return Alert.alert("", "Passwords Do Not Match");
    }

    setLoading(true);
    usernameSetter(username);
    phoneNumberSetter(phoneNumber);

    createAccount(
      { email, password },
      {
        onSuccess(data) {
          const user_id = data.user?.id;

          //create user profile
          insertProfile(
            {
              name: username,
              user_id: user_id,
              phone_number: phoneNumber,
            },
            {
              onSuccess(profile) {
                //get and set user profile notification token
                registerForPushNotificationsAsync().then(async (token) => {
                  //save token in user's profile in db
                  //update token in db
                  await supabase
                    .from("profiles")
                    .update({ expo_push_token: token })
                    .eq("user_id", profile.user_id);

                  profileSetter(profile);

                  router.navigate("/(auth)/select-location");
                });
              },
              onError(error) {
                return Alert.alert("Error", error.message);
              },
            }
          );
        },
        onError(error) {
          return Alert.alert("Error creating account", error.message);
        },
      }
    );
  }

  return (
    <View style={styles.container}>
      {/*  <Image source={require("./assets/carrot-icon.png")} style={styles.icon} /> */}

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TextInput
        style={
          confirmPassword && confirmPassword !== password
            ? {
                borderBottomWidth: 1,
                borderBottomRightRadius: 5,
                borderBottomColor: "red",
                padding: 15,
                marginBottom: 15,
              }
            : {
                borderBottomWidth: 1,
                borderBottomRightRadius: 5,
                borderBottomColor: "#D3D3D3",
                padding: 15,
                marginBottom: 15,
              }
        }
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={confirmSetPassword}
        secureTextEntry={true}
      />

      <Text style={styles.terms}>
        By continuing you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity style={styles.button} onPress={signUpWithEmail}>
        <Text style={styles.buttonText}>
          {loading ? "Signing up" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => {
          router.navigate("/(auth)/sign-in");
        }}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.link}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
    marginTop: 80,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#666",
    marginBottom: 20,
  },
  input: {
    //ackgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomColor: "#D3D3D3",
    padding: 15,
    marginBottom: 15,
  },
  terms: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  link: {
    color: "#4CAF50",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
});

export default SignUpScreen;
