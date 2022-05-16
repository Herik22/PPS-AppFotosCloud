import * as ImagePicker from "expo-image-picker";

export const fileToBlob = async (path) => {
  const file = await fetch(path);
  const blob = await file.blob();
  return blob;
};
