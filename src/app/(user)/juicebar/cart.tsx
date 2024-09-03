import {
  View,
  Text,
  Platform,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCallback, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCart } from "@/src/providers/JuiceBarProvider";

import CartListItem from "./components/CartListItem";

import BottomModal from "./components/BottomSheet";

const CartScreen = () => {
  const { items, total, checkout } = useCart();

  //create a bottom sheet modal
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = ["50%"];

  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setIsOpen(false);
  }, []);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  //need to customize checkout so that it pops the checkout modal, or  screen, and user can add in delivery
  //details, see payment details, and confirm/place order.
  //user will need to get notified when order is confirmed, using push notifications.

  //create function to display modal when checkout is pressed:
  //in this modal, user confirms delivery details, and payment method.

  return (
    <Pressable
      style={{
        padding: 10,
        //height: "100%",
        flex: 1,
        backgroundColor: isOpen ? "rgba(92, 49, 15,0.8)" : "#8B4513",
      }}
      onPress={() => sheetRef.current?.close()}
    >
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          fontWeight: "800",
          color: "white",
          //fontFamily: "Montserrat",
        }}
      >
        Total: ${total}
      </Text>

      {/* <Button text="Confirm" onPress={() => handleSnapPress(0)} /> */}

      <TouchableOpacity
        onPress={() => handleSnapPress(0)}
        style={{
          backgroundColor: "#573a26",
          padding: 15,
          alignItems: "center",
          borderRadius: 100,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "white",
            fontFamily: "Montserrat",
          }}
        >
          Confirm{" "}
        </Text>
      </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
        onChange={handleSheetChanges}
        // backdropComponent={CustomBackdrop}
      >
        <BottomSheetView>
          <BottomModal total={total} onPress={checkout} />
        </BottomSheetView>
      </BottomSheet>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Pressable>
  );
};

export default CartScreen;
