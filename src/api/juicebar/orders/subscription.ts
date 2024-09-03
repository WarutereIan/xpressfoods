import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ordersSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "juicebar_orders" },
        (payload) => {
          console.log("Change received!", payload);
          //invalidates queries in cache and lets react query automatically query for the new data without user interaction
          queryClient.invalidateQueries({ queryKey: ["juicebar_orders"] });
        }
      )
      .subscribe();

    //this is called when the component is being unmounted
    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);
};

export const useUpdateOrderSubscription = (id: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "juicebar_orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["juicebar_orders", id] });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
