import { createContext, PropsWithChildren, useContext, useState } from "react";
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
};

type CarMake = {
  class: string;
  model: string;
};

const CarwashContext = createContext<CarwashContextType>({
  services: [],
  addService: () => {},
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

  const { session } = useAuth();

  const { mutate: insertCarwashOrder } = useInsertCarwashOrder();
  const router = useRouter();

  const delivery_time = deliveryTime;
  const payment_mode = paymentMethod;

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

  const addService = (service: ServiceType) => {
    //check if exists already
    let serviceExists = services.find(
      (oldService) => service.serviceName === oldService.serviceName
    );

    if (serviceExists) {
      return;
    }

    setServices([service, ...services]);
  };

  const setPaymentMode = (paymentMode: string) => {
    setPaymentMethod(paymentMode);
  };

  const total = services.reduce((sum, item) => (sum += item.price), 0);

 function arrayToObject<T>(array: T[]): { [key: number]: T } {
   return Object.assign({}, array);
 }

  const clearCarWashCart = () => {
    setServices([]);
  };

  const checkout = () => {
    let servicesObj: any = arrayToObject(services);

    

    console.log({
      services_requested: servicesObj,
      payment_method: paymentMethod,
      created_by: session?.user.id,
      total_amount: total,
    });

    insertCarwashOrder(
      {
        services_requested: services,
        payment_method: paymentMethod,
        created_by: session?.user.id,
        total_amount: total,
      },
      {
        onSuccess() {
          clearCarWashCart();
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
      }}
    >
      {children}
    </CarwashContext.Provider>
  );
};

export default CarwashProvider;

export const useCarwash = () => useContext(CarwashContext);
