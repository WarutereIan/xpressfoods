import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../lib/supabase";
import {
  useDeleteProfile,
  useInsertUserProfile,
  useUpdateProfile,
} from "../api/user";
import { router } from "expo-router";
import { registerForPushNotificationsAsync } from "../lib/notifications";

const EditProfileScreen = () => {
  const { mutate: deleteProfile } = useDeleteProfile();
  const { mutate: insertProfile } = useInsertUserProfile();
  //get profile when user opens page
  let { session, clearSession, clearProfile, profile } = useAuth();

  console.log(profile);

  async function fetchProfile(user_id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id)
      .single();

    return data;
  }

  if (profile == null) {
    //fetch profile
    fetchProfile(session?.user.id).then((data) => {
      console.log(data);

      profile = data;
    });
  }

  useEffect(() => {
    setName(profile?.name);
    setPhoneNumber(profile.phone_number);
    setZone(profile.location);
    setArea(profile.area);
    setProfileId(profile?.id);
    setUserId(session?.user.id);
  }, []);

  const { mutate: updateProfile } = useUpdateProfile();
  const [name, setName] = useState(profile?.name);
  const [profileId, setProfileId] = useState(profile?.id);
  const [userId, setUserId] = useState<any>("");
  const [password, setPassword] = useState<any>(null);
  const [confirmPassword, setConfirmPassword] = useState<any>(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number);

  const [updating, setUpdating] = useState(true);

  const [zone, setZone] = useState(profile?.location);
  const [area, setArea] = useState(profile?.area);

  const onPressSave = () => {
    //update profile

    if (profileUpdated) {
      setUpdating(true);

      if (!profile) {
        insertProfile(
          {
            name: name,
            location: zone,
            area: area,
            user_id: session?.user.id,
            phone_number: phoneNumber,
          },
          {
            onSuccess() {
              //get and set user profile notification token
              registerForPushNotificationsAsync().then(async (token) => {
                //save token in user's profile in db
                //update token in db
                await supabase
                  .from("profiles")
                  .update({ expo_push_token: token })
                  .eq("user_id", session?.user.id);
              });
              setProfileUpdated(false);
            },
          }
        );
      }
      updateProfile(
        {
          id: profileId,
          location: zone,
          name,
          area,
          phone_number: phoneNumber,
        },
        {
          onSuccess() {
            setUpdating(false);
            setProfileUpdated(false);
            return Alert.alert("Success!", "Successfully Updated Profile 🥗");
          },
          onError(error) {
            setUpdating(false);
            setProfileUpdated(false);
            return Alert.alert(error.name, error.message);
          },
        }
      );
    }

    //if password updated change password
    if (passwordUpdated) {
      try {
        setUpdating(true);
        supabase.auth
          .updateUser({ password: confirmPassword })
          .then(() => setUpdating(false));
        setPasswordUpdated(false);
      } catch (error: any) {
        setUpdating(false);
        return Alert.alert("Error Updating Password", error);
      }
    }
    /* if (!updating) {
      return Alert.alert("Success!", "Profile Updated Successfully");
    } */
  };

  const onPressDelete = () => {
    supabase.auth.signOut().then(() => {
      supabase.auth.admin
        .deleteUser(userId)
        .then((data) => {
          //clear session data and profile
          console.log(data);

          clearSession();
          clearProfile();

          Alert.alert(
            "😔",
            "Succesfully Deleted Profile. Sad to see you go ☹️"
          );
          return router.navigate("/");
        })
        .catch((error) => {
          return Alert.alert("Could Not Delete Profile", error);
        });
    });
  };

  const onSignOut = () => {
    supabase.auth
      .signOut()
      .then(() => {
        clearSession();
        clearProfile();
        router.navigate("/");
      })
      .catch((error) => {
        return Alert.alert("", error);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {profile ? "Edit Profile" : "Complete Profile"}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(input) => {
            setName(input);
            setProfileUpdated(true);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          placeholder={phoneNumber}
          onChangeText={(input) => {
            setPhoneNumber(input);
            setProfileUpdated(true);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Change Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="************"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Confirm Password:
          {confirmPassword && confirmPassword !== password && (
            <Text style={{ fontWeight: 600, fontSize: 13 }}>
              {" "}
              Passwords do not match
            </Text>
          )}
        </Text>

        <TextInput
          style={
            confirmPassword && confirmPassword !== password
              ? {
                  borderWidth: 1,
                  borderColor: "red",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }
              : {
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }
          }
          value={confirmPassword}
          placeholder="************"
          onChangeText={(input) => {
            setConfirmPassword(input);
            if (confirmPassword && confirmPassword == password) {
              setPasswordUpdated(true);
            }
          }}
          secureTextEntry
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Your Zone</Text>
        <Picker
          selectedValue={zone}
          onValueChange={(itemValue) => {
            setZone(itemValue);
            setProfileUpdated(true);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Tilisi" value="Tilisi" />
          <Picker.Item label="Other" value="Other" />
          {/* Add more zones as needed */}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Your Area</Text>

        {zone == "Tilisi" ? (
          <Picker
            selectedValue={area}
            onValueChange={(itemValue) => {
              setArea(itemValue);
              setProfileUpdated(true);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Residence" value="" />
            <Picker.Item label="Maisha Mapya" value="MaishaMapya" />
            <Picker.Item label="Maisha Makao" value="MaishaMakao" />
            <Picker.Item label="Tilisi Views" value="TilisiViews" />
            {/* Add more areas as needed */}
          </Picker>
        ) : (
          <TextInput
            style={styles.input}
            onChangeText={setArea}
            value={area}
            placeholder="Other"
          />
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onPressSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity style={styles.deleteButton} onPress={onSignOut}>
          <Text style={styles.deleteButtonText}>Sign Out</Text>
        </TouchableOpacity>
        {/*  <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  dateButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  dateButtonText: {
    fontWeight: "bold",
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
    marginTop: 60,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: "#8bc34a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#d40f26",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default EditProfileScreen;
