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
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newUser } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }
      return newUser;
    },
    async onSuccess() {
      //refresh products in cache after creating  a new product in db
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      location,
      name,
      area,
      phone_number,
    }: Pick<Profile, "id" | "location" | "name" | "area" | "phone_number">) {
      console.log(id, location, name, area, phone_number);

      const { data, error } = await supabase
        .from("profiles")
        .update({ location, name, area, phone_number })
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
      await queryClient.invalidateQueries({ queryKey: ["profile", id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: any) {
      const { error } = await supabase.from("profiles").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
  });
};
