import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ICategorias } from "../../../types/products";
import { ProdutoItem } from "./Product";

export const ProductList = () => {
  const { query } = useRouter();

  const { data, isLoading } = useQuery<ICategorias[]>({
    queryKey: ["loja", query.id],
    queryFn: async () => {
      const { data } = await api.get(`/categorias/${query.id}`);
      return data;
    },
    enabled: !!query.id,
    staleTime: 1000 * 60 * 60 * 24,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex align-middle justify-items-center h-full">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {data?.map((e: ICategorias) => {
        if (e?.produtos?.length < 1) return null
        return (
          <>
            <div key={e.categoriaId} className="m-3 ">
              <div className="w-full bg-gray-600 rounded-md text-white text-xl p-2">
                {e.nome}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                {e.produtos?.map((e) => {
                    if(e)
                  return <ProdutoItem key={e.produtoId} produto={e} />;
                })}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
