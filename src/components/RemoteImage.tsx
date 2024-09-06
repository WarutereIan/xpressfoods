import { Image } from "react-native";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type RemoteImageProps = {
  path: string;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage("");
      const { data, error } = await supabase.storage
        .from("product-images")
        .download(path, {
          //scaling down the image using supabase
          /* transform: {
            width: 50,
            height: 50,
          }, */
        });

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  /* if (!image) {
    console.warn("no image");
  } */

  return (
    <Image
      source={{
        uri:
          image ||
          "https://www.nutritionadvance.com/wp-content/uploads/2018/01/green-arugula-leaves.jpg",
      }}
      style={{ borderRadius: 10 }}
      {...imageProps}
    />
  );
};

export default RemoteImage;
