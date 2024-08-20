import { useMyCarWashOrderList } from "@/src/api/carwash";
import { useCarwash } from "@/src/providers/CarwashProvider";
import { router, useSegments } from "expo-router";
import moment from "moment";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const BookingItem = ({
  date,
  time,
  price,
  status,
  pickUpType,
  car,
  services_requested,
  payment_method,
  washType,
}) => {
  const { rebook } = useCarwash();

  const onPressRebook = () => {
    rebook(services_requested, payment_method, price, pickUpType);
  };

  return (
    <View style={styles.bookingItem}>
      <View>
        <Text style={styles.serviceType}>{washType}</Text>
        <Text style={styles.car}>{car}</Text>
        <Text style={styles.dateTime}>{`${date} ${time}`}</Text>
        <Text style={styles.pickUp}>{pickUpType}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      {status == "COMPLETED" ? (
        <TouchableOpacity style={styles.rebookButton} onPress={onPressRebook}>
          <Text style={styles.rebookText}>Rebook</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

const MyBookingsScreen = () => {
  const { data } = useMyCarWashOrderList();

  const segments = useSegments();

  let bookingsArr: any[] = [];

  data?.forEach((order) => {
    let date = new Date(order.created_at);

    if (order.services_requested[0]) {
      let bookingObj = {
        services: order.services_requested,
        washType: order.services_requested[0].title,
        car: order.services_requested[0].carModel.toUpperCase(),
        date: moment(date).format("YYYY-MM-DD"),
        time: moment(date).format("HH:mm"),
        status: order.status,
        payment_method: order.payment_method,
        price: order.total_amount,
        pickUpType: order.pick_up_method.replace("_", " ").toUpperCase(),
      };
      bookingsArr.push(bookingObj);
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}></TouchableOpacity>
      <TouchableOpacity
        style={styles.myBookingsButton}
        onPress={() => {
          router.navigate(`${segments[0]}/carwash`);
        }}
      >
        <Image source={require(`@/assets/images/carwashlogo.png`)} />
      </TouchableOpacity>
      <ScrollView style={styles.bookingsList}>
        {bookingsArr.map((booking) => {
          return (
            <BookingItem
              date={booking.date}
              time={booking.time}
              price={`KES ${booking.price}`}
              status={booking.status}
              pickUpType={booking.pickUpType}
              car={booking.car}
              washType={booking.washType}
              services_requested={booking.services}
              payment_method={booking.payment_method}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginTop: 40,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  myBookingsButton: {
    //backgroundColor: "#8bc34a",
    //padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  myBookingsText: {
    color: "white",
    fontWeight: "bold",
  },
  bookingsList: {
    flex: 1,
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  bookingItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceType: {
    fontWeight: "bold",
    fontSize: 16,
  },
  car: {
    fontWeight: "bold",
  },
  dateTime: {
    color: "#666",
  },
  price: {
    color: "#666",
  },
  pickUp: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    color: "green",
  },
  rebookButton: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
  },
  rebookText: {
    color: "#333",
  },
});

export default MyBookingsScreen;
