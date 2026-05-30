// ======================================================
// CARDÁPIO CONFIGURÁVEL
// Adicione, remova ou edite produtos aqui.
// Categorias sugeridas: Pratos, Lanches, Hambúrgueres,
// Pizzas, Bebidas, Sobremesas.
// ======================================================
const MENU = [
  {
    id: 1,
    categoria: "Hambúrgueres",
    nome: "Burger Supremo",
    descricao: "Pão brioche, blend artesanal 180g, cheddar, bacon crocante e molho especial.",
    preco: 22.90,
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    destaque: true,
    badges: ["Mais vendido"]
  },
  {
    id: 2,
    categoria: "Hambúrgueres",
    nome: "Smash Duplo",
    descricao: "Dois smash burgers, queijo americano, picles, cebola roxa e molho da casa.",
    preco: 29.90,
    imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    destaque: true,
    badges: ["Promoção"]
  },
  {
    id: 3,
    categoria: "Pizzas",
    nome: "Pizza Margherita",
    descricao: "Molho artesanal, mussarela, tomate fresco, manjericão e azeite especial.",
    preco: 49.90,
    imagem: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
    destaque: true,
    badges: ["Novo"]
  },
  {
    id: 4,
    categoria: "Pizzas",
    nome: "Pizza Pepperoni",
    descricao: "Mussarela premium, pepperoni fatiado, orégano e borda crocante.",
    preco: 54.90,
    imagem: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
    destaque: false,
    badges: ["Mais vendido"]
  },
  {
    id: 5,
    categoria: "Pratos",
    nome: "Filé ao Molho da Casa",
    descricao: "Filé grelhado, arroz cremoso, legumes salteados e molho exclusivo.",
    preco: 64.90,
    imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    destaque: true,
    badges: ["Chef"]
  },
  {
    id: 6,
    categoria: "Pratos",
    nome: "Massa Italiana",
    descricao: "Massa fresca com molho pomodoro, parmesão e ervas finas.",
    preco: 42.90,
    imagem: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    destaque: false,
    badges: []
  },
  {
    id: 7,
    categoria: "Lanches",
    nome: "Sanduíche Natural",
    descricao: "Frango temperado, alface, tomate, cenoura, queijo branco e molho leve.",
    preco: 18.90,
    imagem: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    destaque: false,
    badges: ["Leve"]
  },
  {
    id: 8,
    categoria: "Lanches",
    nome: "X-Bacon Tradicional",
    descricao: "Hambúrguer, queijo, bacon, presunto, alface, tomate e maionese especial.",
    preco: 24.90,
    imagem: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80",
    destaque: false,
    badges: []
  },
  {
    id: 9,
    categoria: "Bebidas",
    nome: "Suco Natural",
    descricao: "Suco natural gelado. Sabores disponíveis: laranja, limão, maracujá e acerola.",
    preco: 9.90,
    imagem: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80",
    destaque: false,
    badges: ["Natural"]
  },
  {
    id: 10,
    categoria: "Bebidas",
    nome: "Refrigerante Lata",
    descricao: "Refrigerante gelado 350ml. Consulte sabores disponíveis.",
    preco: 6.90,
    imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80",
    destaque: false,
    badges: []
  },
  {
    id: 11,
    categoria: "Sobremesas",
    nome: "Brownie com Sorvete",
    descricao: "Brownie quente, sorvete de creme e calda de chocolate.",
    preco: 21.90,
    imagem: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    destaque: true,
    badges: ["Novo"]
  },
  {
    id: 12,
    categoria: "Sobremesas",
    nome: "Pudim da Casa",
    descricao: "Pudim cremoso com calda de caramelo artesanal.",
    preco: 14.90,
    imagem: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
    destaque: false,
    badges: []
  }
];
