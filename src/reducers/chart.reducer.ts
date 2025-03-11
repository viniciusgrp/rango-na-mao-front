import { createSlice } from "@reduxjs/toolkit";
import { IProduto } from "../../types/products";

interface ICarrinho {
  produtos: IProdutos[];
  produtoSelecionado: IProduto | null;
}

interface IProdutos extends IProduto {
  quantidade: number;
}

const initialState: ICarrinho = {
  produtos: [],
  produtoSelecionado: null,
};

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.produtos.findIndex(
        (produto) => produto.produtoId === action.payload.produtoId
      );
      if (index === -1) {
        state.produtos.push({ ...action.payload, quantidade: 1 });
      } else {
        state.produtos[index].quantidade += 1;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.produtos.findIndex(
        (produto) => produto.produtoId === action.payload.produtoId
      );
      if (index !== -1) {
        state.produtos[index].quantidade -= 1;
        if (state.produtos[index].quantidade === 0) {
          state.produtos.splice(index, 1);
        }
      } else {
        console.error("Produto não encontrado no carrinho");
      }
    },
    selecionaProduto: (state, action) => {
      state.produtoSelecionado = action.payload;
    },
    limpaProdutoSelecionado: (state) => {
      state.produtoSelecionado = null;
    },
  },
});

export default carrinhoSlice;

export const {
  addToCart,
  removeFromCart,
  selecionaProduto,
  limpaProdutoSelecionado,
} = carrinhoSlice.actions;
