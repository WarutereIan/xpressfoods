import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/src/lib/supabase";
import { decode } from "base64-arraybuffer";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/juicebar/products";
import RemoteImage from "@/src/components/RemoteImage";
import { Picker } from "@react-native-picker/picker";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("smoothies");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : "");
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  const router = useRouter();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
      setCategory(updatingProduct.category);
      setDescription(updatingProduct.description);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (!image) {
      setErrors("Image is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      //update
      setSubmitting(true);
      onUpdateCreate();
      setSubmitting(false);
    } else {
      setSubmitting(true);
      onCreate();
      setSubmitting(false);
    }
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  const onUpdateCreate = async () => {
    if (!validateInput()) {
      return;
    }
    console.warn("Updating Product, :", name);

    const imagePath = await uploadImage();

    updateProduct(
      { name, price: parseFloat(price), image: imagePath, id, description },

      {
        onSuccess: () => {
          console.log("updated Product", name);

          resetFields();
          router.back();
        },
      }
    );
  };
  const onCreate = async () => {
    if (!validateInput() || !image) {
      return;
    }

    const imagePath = await uploadImage();

    console.warn("Creating Product, :", imagePath);

    //save in db
    insertProduct(
      {
        name,
        price: parseFloat(price),
        image: imagePath,
        category: category,
        description,
      },
      {
        onSuccess: () => {
          console.log("created product", name);

          resetFields();
          router.back();
        },
      }
    );

    resetFields();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    console.warn("DELETE!!!");
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

      <RemoteImage
        path={updatingProduct ? updatingProduct.image : ""}
        fallback="https://img.freepik.com/premium-photo/strawberry-banana-smoothie-art-style_759095-46051.jpg?w=740"
        style={styles.image}
      />

      <Text onPress={pickImage} style={styles.textButton}>
        Select image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        //keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Smoothies" value="smoothies" />
          <Picker.Item label="Coffee" value="coffee" />
          <Picker.Item label="Shakes" value="shakes" />
          <Picker.Item label="Juice" value="juice" />
        </Picker>
      </View>

      {/* <Text style={styles.label}>Category ($)</Text>

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        //keyboardType="numeric"
        style={styles.input}
      /> */}

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 20,
    borderRadius: 5,
  },

  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
