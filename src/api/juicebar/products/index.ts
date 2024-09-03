import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/src/lib/supabase";

export const useProductList = () => {
  return useQuery({
    queryKey: ["juicebar_products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("juicebar_products")
        .select("*");
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["juicebar_products", id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("juicebar_products")
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

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("juicebar_products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
          category: data.category,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      //refresh products in cache after creating  a new product in db
      await queryClient.invalidateQueries({ queryKey: ["juicebar_products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedProduct } = await supabase
        .from("juicebar_products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
          category: data.category,
        })
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      //refresh products in cache after creating  a new product in db
      await queryClient.invalidateQueries({ queryKey: ["juicebar_products"] });
      await queryClient.invalidateQueries({
        queryKey: ["juicebar_products", id],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: any) {
      const { error } = await supabase
        .from("juicebar_products")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["juicebar_products"],
      });
    },
  });
};
