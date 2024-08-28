import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyCarWashOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["carwash_orders", { created_by: id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("carwash_orders")
        .select("*")
        .eq("created_by", id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useInsertCarwashOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("carwash_orders")
        //.insert(data)
        .insert({ ...data, created_by: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      //refresh products in cache after creating  a new product in db
      await queryClient.invalidateQueries({ queryKey: ["carwash_orders"] });
    },
  });
};

export const useGetCarWashBookings = () => {
  const statuses = ["NEW", "COMPLETED", "INPROGRESS"];

  return useQuery({
    queryKey: ["carwash_orders", statuses],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("carwash_orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);

      return data;
    },
  });
};

export const useCarWashOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["carwash_orders", id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("carwash_orders")
        //.select("*, order_items(*, products(*))")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//create a type to be used in the mutationFn below

type Order = {
  id: number;
  status: string;
};

export const useUpdateCarWashOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, status }: Pick<Order, "id" | "status">) {
      const { data, error } = await supabase
        .from("carwash_orders")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["carwash_orders"] });
      await queryClient.invalidateQueries({ queryKey: ["carwash_order", id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
