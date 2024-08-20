import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertUserProfile = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProfile } = await supabase
        .from("profiles")
        //.insert(data)
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProfile;
    },
    async onSuccess() {
      //refresh products in cache after creating  a new product in db
      await queryClient.invalidateQueries({ queryKey: ["carwash_orders"] });
    },
  });
};
