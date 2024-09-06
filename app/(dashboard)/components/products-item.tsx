import { productsProps } from "@/types/productsProps";

export function ProductItem({
  code,
  current_price,
  name,
  new_price,
}: productsProps) {
  return (
    <div className="flex flex-col md:flex-row p-3 gap-4 rounded-lg  bg-gray-600/20 ">
      <b>Código: {code}</b>
      <span>Nome: {name}</span>
      <p>Preço atual: {current_price}</p>
      <p>Novo preço: {new_price}</p>
    </div>
  );
}
