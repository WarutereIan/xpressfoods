import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/src/lib/supabase";
import { Order } from "@/src/types";
import { useAuth } from "@/src/providers/AuthProvider";

export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Blending", "Delivering"];

  return useQuery({
    queryKey: ["juicebar_orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("juicebar_orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["juicebar_orders", { userId: id }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("juicebar_orders")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["juicebar_orders", id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("juicebar_orders")
        .select("*, juicebar_order_items(*, juicebar_products(*))")
        //.select("*, juicebar_order_items(*)")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("juicebar_orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      //refresh products in cache after creating  a new product in db
      await queryClient.invalidateQueries({ queryKey: ["juicebar_orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, status }: Pick<Order, "id" | "status">) {
      const { data, error } = await supabase
        .from("juicebar_orders")
        .update({ status })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["juicebar_orders"] });
      await queryClient.invalidateQueries({ queryKey: ["juicebar_order", id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
