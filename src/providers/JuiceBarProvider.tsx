import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem } from "../types";
import { randomUUID } from "expo-crypto";

import { useRouter } from "expo-router";
import { useInsertOrder } from "../api/juicebar/orders";
import { useInsertOrderItems } from "../api/juicebar/order-items";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"], quantity: number) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  category: string;
};

const JuiceBarContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const JuiceBarProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const router = useRouter();

  const addItem = (
    product: Product,
    size: CartItem["size"],
    quantity: number
  ) => {
    //if already in cart, increment quantity

    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      product,
      product_id: product.id,
      size,
      quantity: quantity,
      id: randomUUID(),
        category: product.category,
      image: ""
    };

    setItems([newCartItem, ...items]);
  };

  //update quantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    //user first gets the place order modal instead, and then these functions can be called when they place the order
    //call modal component for order confirmation

    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const saveOrderItems = (newOrder: any) => {
    if (!newOrder) return;

    insertOrderItems(
      {
        items,
        order_id: newOrder.id,
      },
      {
        onSuccess() {
          clearCart();

          router.push(`/(user)/juicebar/orders`);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <JuiceBarContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </JuiceBarContext.Provider>
  );
};

export default JuiceBarProvider;

export const useCart = () => useContext(JuiceBarContext);
