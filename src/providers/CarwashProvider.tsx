import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";
import { useInsertCarwashOrder } from "../api/carwash";
import { useAuth } from "./AuthProvider";
import { Alert } from "react-native";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

type ServiceType = {
  serviceName: string;
  carType: string;
  carModel: string;
  price: number;
  title: string;
};

type CarwashContextType = {
  services: ServiceType[];
  autoServices: [];
  clearServices: () => void;
  setMoreServices: (moreServices: any[]) => void;
  addService: (service: ServiceType) => void;
  total: number;
  checkout: () => void;
  payment_mode: string;
  setPaymentMode: (paymentMode: string) => void;
  setCarMake: (carMake: {}) => void;
  getCarMake: () => CarMake;
  getServices: () => ServiceType[];
  getDeliveryType: () => string;
  changeDeliveryType: (deliveryType: string) => {};
  delivery_time: any;
  set_DeliveryTime: (time: any) => {};
  rebook: (
    services_requested: [],
    payment_method: string,
    total_amount: number,
    pick_up_method: string
  ) => {};
};

type CarMake = {
  class: string;
  model: string;
};

const CarwashContext = createContext<CarwashContextType>({
  services: [],
  addService: () => {},
  clearServices: () => {},
  total: 0,
  payment_mode: "",
  checkout: () => {},
  setPaymentMode: () => {},
  setCarMake: (carMake: CarMake) => {},
  getCarMake: () => {},
  getServices: () => {},
  getDeliveryType: () => "",
  changeDeliveryType: (deliveryType: string) => {},
  delivery_time: "",
  set_DeliveryTime: (time: any) => {},
  rebook: () => {},
  autoServices: [],
  setMoreServices: (moreServices: any[]) => {},
});

const CarwashProvider = ({ children }: PropsWithChildren) => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("CASH");
  const [carModel, setCarModel] = useState<CarMake>({
    class: "",
    model: "",
  });
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [deliveryTime, setDeliveryTime] = useState();
  const [autoServices, setAutoServices] = useState<any>([]);

  const { session } = useAuth();

  const { mutate: insertCarwashOrder } = useInsertCarwashOrder();
  const router = useRouter();

  const delivery_time = deliveryTime;
  const payment_mode = paymentMethod;

  const setMoreServices = (moreServices: any[]) => {
    setAutoServices(moreServices);
  };

  const set_DeliveryTime = (time: any) => {
    setDeliveryTime(time);
  };

  const changeDeliveryType = (deliveryType: string) => {
    setDeliveryType(deliveryType);
  };

  const getDeliveryType = () => {
    return deliveryType;
  };

  const setCarMake = (carMake: CarMake) => {
    setCarModel(carMake);
  };

  const getCarMake = (): CarMake => {
    let res: CarMake = { class: carModel.class, model: carModel.model };
    return res;
  };

  const getServices = (): ServiceType[] => {
    return services;
  };

  const clearServices = () => {
    setServices([]);
  };
  const addService = (service: ServiceType) => {
    //check if exists already
    let serviceExists = services.find(
      (oldService) => service.serviceName === oldService.serviceName
    );

    if (serviceExists) {
      return;
    }

    setServices([service]);
  };

  const setPaymentMode = (paymentMode: string) => {
    setPaymentMethod(paymentMode);
  };

  const total =
    services.reduce((sum, item) => (sum += item.price), 0) +
    autoServices.reduce((sum, item) => (sum += item.price), 0);

  function arrayToObject<T>(array: T[]): { [key: number]: T } {
    return Object.assign({}, array);
  }

  const clearCarWashCart = () => {
    setServices([]);
  };

  const rebook = (
    services_requested: [],
    payment_method: string,
    total_amount: string,
    pick_up_method: string
  ) => {
    const price = parseInt(total_amount.replace("KES ", ""));
    const order = {
      services_requested: services_requested,
      payment_method: payment_method,
      created_by: session?.user.id,
      total_amount: price,
      pick_up_method: pick_up_method,
    };

    insertCarwashOrder(order, {
      onSuccess() {
        clearCarWashCart();
        router.navigate("/(user)/carwash/mybookings");
      },
      onError(error) {
        console.log(error);

        /* Alert.alert("Error", "Could not create order, diagnosing", [
            {
              text: "Cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {},
            },
          ]); */
      },
    });
  };

  const checkout = () => {
    insertCarwashOrder(
      {
        services_requested: [...services, ...autoServices],
        payment_method: paymentMethod,
        created_by: session?.user.id,
        total_amount: total,
        pick_up_method: deliveryType,
      },
      {
        onSuccess() {
          clearCarWashCart();
          router.push("/(user)/carwash/finalScreen");
        },
        onError(error) {
          console.log(error);

          /* Alert.alert("Error", "Could not create order, diagnosing", [
            {
              text: "Cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {},
            },
          ]); */
        },
      }
    );
  };

  return (
    <CarwashContext.Provider
      value={{
        services,
        addService,
        total,
        checkout,
        setPaymentMode,
        setCarMake,
        getCarMake,
        getServices,
        changeDeliveryType,
        getDeliveryType,
        set_DeliveryTime,
        delivery_time,
        payment_mode,
        rebook,
        setMoreServices,
        autoServices,
        clearServices,
      }}
    >
      {children}
    </CarwashContext.Provider>
  );
};

export default CarwashProvider;

export const useCarwash = () => useContext(CarwashContext);
