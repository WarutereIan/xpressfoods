import { useGetCarWashBookings } from "@/src/api/carwash";
import { router, useSegments } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const RenderPaymentItem = ({ item }) => {
  const segments = useSegments();

  return (
    <TouchableOpacity
      style={styles.paymentItem}
      onPress={() => {
        router.push(`${segments[0]}/carwashAdmin/${item.order_id}`);
      }}
    >
      <Text style={styles.paymentDescription}>{item.description}</Text>
      <Text style={styles.paymentDate}>{item.date}</Text>
      <Text style={styles.paymentAmount}>KES {item.amount}</Text>
    </TouchableOpacity>
  );
};

const PaymentHistoryScreen = () => {
  const { data } = useGetCarWashBookings();

  const [selectedMethod, setSelectedMethod] = useState("MPESA");

  const mpesaOrders: any[] = [];
  const cashOrders: any[] = [];

  data?.forEach((order) => {
    let date = new Date(order.created_at);

    if (order.services_requested[0] && order.status == "COMPLETED") {
      let bookingObj = {
        description: order.services_requested[0].carModel.toUpperCase(),
        date: moment(date).format("YYYY-MM-DD"),
        amount: order.total_amount,
        order_id: order.id,
      };
      if (order.payment_method == "MPESA") {
        mpesaOrders.push(bookingObj);
      } else {
        cashOrders.push(bookingObj);
      }
    }
  });

  const [displayedList, setDisplayedList] = useState<any[]>(mpesaOrders);
  const segments = useSegments();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.navigate(`${segments[0]}/carwashAdmin`);
          }}
        >
          <View style={styles.logo}>
            <Image source={require("@/assets/images/carwashlogo.png")} />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>Payment History</Text>
      </View>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={
            selectedMethod == "MPESA" ? styles.selectedButton : styles.button
          }
          onPress={() => {
            setSelectedMethod("MPESA");
            setDisplayedList(mpesaOrders);
          }}
        >
          <Text
            style={
              selectedMethod == "MPESA"
                ? styles.selectedButtonText
                : styles.buttonText
            }
          >
            M-PESA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            selectedMethod == "CASH" ? styles.selectedButton : styles.button
          }
          onPress={() => {
            setSelectedMethod("CASH");
            setDisplayedList(cashOrders);
          }}
        >
          <Text
            style={
              selectedMethod == "CASH"
                ? styles.selectedButtonText
                : styles.buttonText
            }
          >
            CASH
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {displayedList.length > 0 ? (
          displayedList.map((item) => {
            return <RenderPaymentItem item={item} />;
          })
        ) : (
          <View style={styles.paymentItem}>
            <Text> No orders found for {selectedMethod} method</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 40,
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: "#6ab04c",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
  },
  cashButton: {
    backgroundColor: "#6ab04c",
    padding: 10,
    borderRadius: 5,
  },
  selectedButtonText: {
    color: "#fff",
  },
  paymentItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  paymentDescription: {
    fontWeight: "bold",
  },
  paymentDate: {
    color: "#666",
  },
  paymentAmount: {
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default PaymentHistoryScreen;
