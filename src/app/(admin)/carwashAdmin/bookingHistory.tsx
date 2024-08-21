import { useGetCarWashBookings } from "@/src/api/carwash";
import { Link, router, useSegments } from "expo-router";
import moment from "moment";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Row, Table } from "react-native-table-component";

const BookingHistory = () => {
  const segments = useSegments();

  const { data } = useGetCarWashBookings();

  const bookingsArr: any[] = [];

  data?.forEach((order) => {
    let date = new Date(order.created_at);

    if (order.services_requested[0]) {
      let bookingObj = {
        car: order.services_requested[0].carModel.toUpperCase(),
        time: moment(date).format("HH:MM"),
        status: order.status,
        order_id: order.id,
        date: moment(date).format("YYYY-MM-DD"),
      };
      bookingsArr.push(bookingObj);
    }
  });

  //sort entries by dates and group them:
  let groups: { [index: string]: any[] } = bookingsArr.reduce(
    (group: { [index: string]: any[] }, item: any) => {
      let date = item.date;

      if (!group[date]) {
        group[date] = [];
      }

      group[date].push(item);

      return group;
    },
    {}
  );

  let dateKeys = Object.keys(groups);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.navigate(`/${segments[0]}/carwashAdmin`);
        }}
        style={styles.logoContainer}
      >
        <Image
          source={require("@/assets/images/carwashlogo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Booking History</Text>

      {dateKeys.map((date: string, index: number) => {
        return (
          <View key={index} style={styles.bookingSection}>
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>
                {moment(new Date()).format("YYYY-MM-DD") == date
                  ? "Today"
                  : date}
              </Text>
            </View>

            <Table>
              {groups[date].map((entry: any, entryIndex: number) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push(
                      `/${segments[0]}/carwashAdmin/${entry.order_id}}`
                    );
                  }}
                >
                  <Row
                    key={entry.order_id}
                    data={[entry.car, entry.time, entry.status]}
                    style={styles.bookingEntry}
                    textStyle={styles.rowText}
                  />
                </TouchableOpacity>
              ))}
            </Table>
          </View>
        );
      })}
    </ScrollView>
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
    marginVertical: 20,
  },
  logoContainer: {
    //backgroundColor: "#333",
    //borderRadius: 50,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  bookingSection: {
    marginBottom: 20,
  },
  dateHeader: {
    backgroundColor: "#8cc63f",
    padding: 10,
  },
  dateText: {
    color: "black",
    fontWeight: "bold",
  },
  bookingEntry: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  carText: {
    fontWeight: "bold",
  },
  timeText: {
    color: "#666",
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  rowText: {
    margin: 6,
    textAlign: "center",
  },
});

export default BookingHistory;
