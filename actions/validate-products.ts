import { api } from "@/lib/axios";
import { productsProps } from "@/types/productsProps";

export async function validateProducts(file: File): Promise<productsProps[]> {
  const formData = new FormData();
  formData.append("csv", file);

  const response = await api.post("/validate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
