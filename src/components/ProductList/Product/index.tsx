import Image from "next/image";
import { IProduto } from "../../../../types/products";
import { Card, Typography } from "@mui/material";
import SemFoto from "../../../../public/sem-foto.png";
import { useAppDispatch } from "@/store";
import { selecionaProduto } from "@/reducers/chart.reducer";

export const ProdutoItem = ({ produto }: { produto: IProduto }) => {
  const dispatch = useAppDispatch();

  return (
    <Card
      elevation={2}
      className="flex border pr-2 pt-1 pb-1 gap-3 border-solid border-gray-50 rounded-md cursor-pointer"
    >
      <div onClick={() => dispatch(selecionaProduto(produto))} className="flex gap-3">
        <Image
          alt="Produto"
          width={200}
          className="rounded-md"
          height={150}
          src={produto.foto ?? SemFoto}
        />
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-lg">{produto.nome}</div>
            <div className="text-sm font-extralight">
              <Typography
                className="max-h-[60px] overflow-hidden text-ellipsis"
                variant="body2"
              >
                {produto.descricao}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-lg font-bold">
              <Typography>R$ {produto.preco}</Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
