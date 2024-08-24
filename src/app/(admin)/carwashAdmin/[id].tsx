import {
  useCarWashOrderDetails,
  useUpdateCarWashOrder,
} from "@/src/api/carwash";
import { notifyUserAboutOrderUpdate } from "@/src/lib/notifications";
import { router, useLocalSearchParams, useSegments } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

const ActiveBookingsScreen = () => {
  const { mutate: updateOrder } = useUpdateCarWashOrder();
  const [selectedButton, setSelectedButton] = useState("");
  const segments = useSegments();

  const { id: idString } = useLocalSearchParams();

  const params = useLocalSearchParams();

  const id = parseFloat(typeof idString === "string" ? idString : "");

  const { data, isLoading, error } = useCarWashOrderDetails(id);

  const onStatusPress = async (status: string) => {
    updateOrder({ id, status: status });
    setSelectedButton(status);

    console.log("Notify user", data.created_by);
    if (data)
      await notifyUserAboutOrderUpdate(
        `Order for ${data.services_requested[0].title} Updated`,
        `Order ${status}`,
        data.created_by
      );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>failed to fetch products</Text>;
  }

  if (!data || data == undefined) {
    return <Text>Not Found</Text>;
  }

  let services: any[] = [];

  data.services_requested.map((service) => {
    services.push({
      serviceType: service.title,
      price: service.price,
    });
  });

  const order = {
    car: data.services_requested[0].carModel.toUpperCase(),
    time: moment(data.pick_up_time).format("HH:mm"),
    date: moment(data.pick_up_time).format("YYYY-MM-DD"),
    status: data.status,
    pickUpMethod: data.pick_up_method,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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

        <Text style={styles.title}>Order Status</Text>

        <View style={styles.bookingCard}>
          <Text style={styles.date}>{order.date}</Text>
          <Text style={styles.carModel}>{order.car}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Pick Up Method</Text>
            <Text style={styles.value}>{order.pickUpMethod}</Text>
          </View>

          {services.map((service) => {
            return (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>{service.serviceType}</Text>
                  <Text style={styles.value}>KES {service.price}</Text>
                </View>
              </>
            );
          })}

          <View style={styles.row}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>KES {data.total_amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{data.status}</Text>
          </View>
          <Text style={{ margin: 10, textAlign: "center", fontSize: 20 }}>
            {" "}
            Update Status
          </Text>

          {/*  {order.status == "COMPLETED" ? (
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>In Progress</Text>
              </View>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Completed</Text>
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  onStatusPress("INPROGRESS");
                }}
                style={
                  selectedButton == "INPROGRESS"
                    ? [styles.button, styles.selectedButton]
                    : [styles.button]
                }
              >
                <Text style={styles.buttonText}>In Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onStatusPress("COMPLETED");
                }}
                style={
                  selectedButton == "COMPLETED"
                    ? [styles.button, styles.selectedButton]
                    : [styles.button]
                }
              >
                <Text style={styles.buttonText}>Completed</Text>
              </TouchableOpacity>
            </View>
          )} */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                onStatusPress("INPROGRESS");
              }}
              style={
                selectedButton == "INPROGRESS"
                  ? [styles.button, styles.selectedButton]
                  : [styles.button]
              }
            >
              <Text style={styles.buttonText}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onStatusPress("COMPLETED");
              }}
              style={
                selectedButton == "COMPLETED"
                  ? [styles.button, styles.selectedButton]
                  : [styles.button]
              }
            >
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            router.push(`/${segments[0]}/carwashAdmin/bookingHistory`);
          }}
        >
          <Text style={styles.historyButtonText}>Booking History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 40,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  carModel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "black",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  waitingButton: {
    backgroundColor: "#8bc34a",
  },
  selectedButton: {
    backgroundColor: "#8bc34a",
  },

  bottomContainer: {
    padding: 20,
  },
  historyButton: {
    backgroundColor: "#8bc34a",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  historyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ActiveBookingsScreen;
