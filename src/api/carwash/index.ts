import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertCarwashOrder = () => {
  const queryClient = useQueryClient();
  //const {session} = useAuth()
  //const userId = session?.user.id

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("carwash_orders")
        .insert(data)
        //.insert({...data,user_id: userId, })
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
