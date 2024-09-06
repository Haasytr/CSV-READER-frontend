import { errorsProps } from "@/types/errorsProps";

export function ErrorItem({ message, code }: errorsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 rounded-lg p-3 bg-red-500/20 ">
      <p>
        Código do produto: <b>{code}</b>
      </p>
      <p>{message}</p>
    </div>
  );
}
