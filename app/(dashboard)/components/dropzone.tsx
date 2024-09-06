"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProductItem } from "./products-item";
import { ErrorItem } from "./errors-item";

import { productsProps } from "@/types/productsProps";
import { errorsProps } from "@/types/errorsProps";

import { validateProducts } from "@/actions/validate-products";
import { updateProducts } from "@/actions/update-products";

export function DropzoneForm() {
  const router = useRouter();

  const [CSVFile, setCSVFile] = useState<File>();
  const [filename, setFilename] = useState<string | null>(null);
  const [products, setProducts] = useState<productsProps[]>();

  const [error, setErrors] = useState<errorsProps>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        setCSVFile(file);
        setFilename(file.name);
        setProducts(undefined);
        setErrors(undefined);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  async function handleValidateData() {
    if (CSVFile) {
      validateProducts(CSVFile)
        .then((response) => {
          setProducts(response);
        })
        .catch((error) => {
          setErrors(error.response.data);
        });
    }

    router.refresh();
  }

  async function handleUpdateData() {
    if (products && CSVFile) {
      updateProducts(CSVFile)
        .then(() => {
          toast.success("Produtos atualizados com sucesso");
        })
        .catch((error) => {
          toast.error("Erro ao atualizar produtos", error);
        });
    }

    router.refresh();
  }

  console.log(error);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-2 w-full my-5 md:w-[50%] md:h-[250px] flex items-center justify-center border-dashed rounded text-center cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        {filename ? (
          <span>{filename}</span>
        ) : isDragActive ? (
          <p>Solte os arquivos aqui...</p>
        ) : (
          <p>Arraste e solte o CSV aqui, ou clique para selecionar</p>
        )}
      </div>
      <div className="md:space-x-4 flex md:flex-row flex-col items-center md:items-start space-y-4 md:space-y-0">
        {filename && (
          <Button onClick={handleValidateData} className="w-[150px] text-md">
            Validar arquivo
          </Button>
        )}
        {products && (
          <Button
            onClick={handleUpdateData}
            variant="primary"
            className="w-[150px] text-md"
          >
            Atualizar produtos
          </Button>
        )}
      </div>
      <div className="flex justify-start items-start space-y-4 flex-col">
        {products &&
          products.map((product) => (
            <ProductItem
              key={product.code}
              code={product.code}
              current_price={product.current_price}
              name={product.name}
              new_price={product.new_price}
            />
          ))}
        {error && (
          <ErrorItem
            code={error.code}
            message={error.message}
            key={error.code}
          />
        )}
      </div>
    </>
  );
}
