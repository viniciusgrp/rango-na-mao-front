export interface ICategorias {
  categoriaId: number;
  lojaId: number;
  nome: string;
  ordem: number;
  createdAt: string;
  updatedAt: string;
  produtos: (IProduto)[];
}

export interface IProduto {
  produtoId: string;
  lojaId: number;
  categoriaId: number;
  nome: string;
  descricao: string;
  preco: string;
  servePessoas: number;
  removeIngredientes: boolean;
  custoProducao: null;
  valorDesconto: null;
  foto: null;
  adicionais: null;
  createdAt: string;
  updatedAt: string;
}