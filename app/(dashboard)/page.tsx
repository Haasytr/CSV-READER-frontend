import { DropzoneForm } from "./components/dropzone";

export default function DashboardPage() {
  return (
    <div className="gap-y-5 p-10 space-y-6">
      <h1 className="text-2xl md:text-4xl text-neutral-800 mb-6">
        Atualize seus produtos
      </h1>
      <p className="text-lg text-neutral-500">
        Suba um arquivo <strong className="text-blue-600">CSV</strong> para
        atualizar os produtos em nosso banco de dados!
      </p>
      <DropzoneForm />
    </div>
  );
}
