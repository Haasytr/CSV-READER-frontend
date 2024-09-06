import { api } from "@/lib/axios";
import { productsProps } from "@/types/productsProps";

export async function updateProducts(file: File): Promise<productsProps[]> {
  const formData = new FormData();
  formData.append("csv", file);

  const response = await api.patch("/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
