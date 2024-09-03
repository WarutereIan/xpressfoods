import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order } from "../../../../types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/(user)/juicebar/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#b56a35", "#2e1809"]}
          style={styles.background}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 0.7 }}
        />
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>

        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderRadius: 10,
    height: "150%",
  },
  title: {
    fontWeight: "800",
    marginVertical: 5,
    color: "white",
  },
  time: {
    color: "white",
    fontWeight: "800",
  },
  status: {
    fontWeight: "900",
    color: "white",
    fontSize: 14,
  },
});

export default OrderListItem;
