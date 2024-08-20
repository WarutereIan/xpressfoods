import { useGetCarWashBookings } from "@/src/api/carwash";
import { router, useRouter, useSegments } from "expo-router";
import moment from "moment";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const DashboardScreen = () => {
  const { data } = useGetCarWashBookings();

  const bookingsArr: [] = [];

  let totalRevenue = 0;
  let activeBookings = 0;

  data?.forEach((order) => {
    totalRevenue += order.total_amount;
    order.status == "NEW" ? activeBookings++ : null;

    let date = new Date(order.created_at);

    if (order.services_requested[0]) {
      let bookingObj = {
        car: order.services_requested[0].carModel.toUpperCase(),
        time: moment(date).format("MM-DD HH:mm"),
        status: order.status,
        order_id: order.id,
      };
      bookingsArr.push(bookingObj);
    }
  });

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.navigate(`/(user)/carwashAdmin`);
        }}
        style={styles.logoContainer}
      >
        <Image
          source={require("@/assets/images/carwashlogo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Revenue</Text>
          <Text style={styles.statValue}>KES {totalRevenue}</Text>
        </View>
        <View style={[styles.statBox, styles.activeBookings]}>
          <Text style={styles.statTitle}>Active Bookings</Text>
          <Text style={styles.statValue}>{activeBookings}</Text>
        </View>
      </View>

      {/* <ScrollView style={styles.bookingsContainer}>
        {bookingsArr.map((booking, index) => (
          <View key={index} style={styles.bookingItem}>
            <Text style={[styles.bookingText, styles[booking.status]]}>
              {booking.car}
            </Text>
            <Text style={[styles.bookingText, styles[booking.status]]}>
              {booking.time}
            </Text>
            <Text style={[styles.bookingText, styles[booking.status]]}>
              {booking.status}
            </Text>
          </View>
        ))}
        
      
      </ScrollView> */}

      <BookingsCard bookingsArr={bookingsArr} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/(user)/carwashAdmin/bookingHistory");
        }}
      >
        <Text style={styles.buttonText}>Booking History</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: "contain",
  },
  logoText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  activeBookings: {
    backgroundColor: "#8bc34a",
  },
  statTitle: {
    color: "white",
    fontSize: 16,
  },
  statValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  bookingsContainer: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  bookingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  bookingText: {
    color: "white",
  },
  NEW: {
    color: "white",
  },
  inProgress: {
    color: "red",
  },
  completed: {
    color: "green",
  },
  button: {
    backgroundColor: "#8bc34a",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DashboardScreen;

const BookingsCard = ({ bookingsArr }) => {
  const segments = useSegments();

  const groupedBookings: { [index: string]: {} } = {
    NEW: bookingsArr.filter((b) => b.status === "NEW"),
    INPROGRESS: bookingsArr.filter((b) => b.status === "INPROGRESS"),
    COMPLETED: bookingsArr.filter((b) => b.status === "COMPLETED"),
  };

  const maxLength = Math.max(
    groupedBookings.NEW.length,
    groupedBookings.INPROGRESS.length,
    groupedBookings.COMPLETED.length
  );

  return (
    <View style={styles2.card}>
      <View style={styles2.header}>
        <Text style={styles2.headerText}>NEW</Text>
        <Text style={styles2.headerText}>IN PROGRESS</Text>
        <Text style={styles2.headerText}>COMPLETED</Text>
      </View>
      <ScrollView style={styles2.scrollView}>
        {[...Array(maxLength)].map((_, index) => (
          <View key={index} style={styles2.row}>
            {["NEW", "INPROGRESS", "COMPLETED"].map((status: string) => {
              const booking = groupedBookings[status][index];
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push(
                      `/${segments[0]}/carwashAdmin/${booking.order_id}}`
                    );
                  }}
                >
                  <View key={status} style={styles2.cell}>
                    {booking && (
                      <>
                        <Text style={[styles2.carText, styles2[status]]}>
                          {booking.car}
                        </Text>
                        <Text style={[styles2.timeText, styles2[status]]}>
                          {booking.time}
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles2 = StyleSheet.create({
  card: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 300, // Set a fixed height or adjust as needed
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  carText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 13,
  },
  NEW: {
    color: "#fff",
  },
  INPROGRESS: {
    color: "#ffa500",
  },
  COMPLETED: {
    color: "#00ff00",
  },
});
