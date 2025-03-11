import { LojaHeader } from "@/components/Header";
import { ProductList } from "@/components/ProductList";
import { ProdutoItem } from "@/components/ProdutoItem";

export default function LojaPage() {
  return (
    <>
      <LojaHeader />
      <main>
        <ProductList />
        <ProdutoItem />
      </main>
    </>
  );
}
