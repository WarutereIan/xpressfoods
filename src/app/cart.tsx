import { View, Text, Platform, FlatList, Modal, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItems";
import Button from "../components/Button";

import { useCallback, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import BottomModal from "../components/BottomSheet";

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
        height: "100%",
        backgroundColor: isOpen ? "rgba(0,0,0,0.4)" : "white",
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
          fontWeight: "500",
          fontFamily: "Montserrat",
        }}
      >
        Total: ${total}
      </Text>

      <Button text="Confirm" onPress={() => handleSnapPress(0)} />

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
         < BottomModal total={total} onPress={checkout}/>
        </BottomSheetView>
      </BottomSheet>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Pressable>
  );
};

export default CartScreen;
