import {
  addToCart,
  limpaProdutoSelecionado,
  removeFromCart,
} from "@/reducers/chart.reducer";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Dialog, Icon, Typography } from "@mui/material";
import Image from "next/image";
import SemFoto from "../../../public/sem-foto.png";
import AddIcon from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Close from "@mui/icons-material/Close";

export const ProdutoItem = () => {
  const produtoSelecionado = useAppSelector(
    (state) => state.cart.produtoSelecionado
  );

  const itensCarrinho = useAppSelector((state) => state.cart.produtos);

  const dispatch = useAppDispatch();

  const mesmoItem = itensCarrinho?.find(
    (e) => e.produtoId === produtoSelecionado?.produtoId
  );

  return (
    <Dialog
      open={!!produtoSelecionado}
      onClose={() => dispatch(limpaProdutoSelecionado())}
    >
      <Icon
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          cursor: "pointer",
          backgroundColor: "white",
          opacity: 0.5,
          borderRadius: "50%"
        }}
        onClick={() => dispatch(limpaProdutoSelecionado())}
      >
        <Close />
      </Icon>
      <div className="flex gap-3 flex-col p-2">
        <Image
          width={500}
          height={500}
          className="rounded-md"
          src={produtoSelecionado?.foto ?? SemFoto}
          alt="Produto"
        />
        <div className="p-2 flex flex-col gap-2">
          <div className="text-lg font-bold">
            <Typography variant="h4">{produtoSelecionado?.nome}</Typography>
          </div>
          <div className="text-sm font-extralight">
            <Typography>{produtoSelecionado?.descricao}</Typography>
          </div>
          <div className="text-lg font-bold">
            <Typography>
              R${" "}
              {Number(produtoSelecionado?.preco)?.toFixed(2).replace(".", ",")}
            </Typography>
          </div>
          <div className="flex gap-3 items-center">
            {mesmoItem && (
              <div className="text-sm font-bold flex gap-2">
                <Icon
                  onClick={() => dispatch(removeFromCart(produtoSelecionado))}
                  style={{
                    backgroundColor: "#E0E0E0",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <Remove />
                </Icon>
                <Typography>{mesmoItem.quantidade}</Typography>
                <Icon
                  onClick={() => dispatch(addToCart(produtoSelecionado))}
                  style={{
                    backgroundColor: "#E0E0E0",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon />
                </Icon>
              </div>
            )}
            <Button
              fullWidth
              onClick={() => dispatch(addToCart(produtoSelecionado))}
              variant="contained"
              color="primary"
            >
              {mesmoItem ? "Adicionar + 1" : "Adicionar ao Carrinho"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
