import type { Difficulty } from '../types';

export interface Question {
  problem: string;
  options: (string | number)[];
  answer: string | number;
  difficulty: Difficulty;
  topic: string; // Corresponds to topic id
}

export interface QuestionBank {
  [key: string]: Question[];
}

// NOTA: Este é um banco de questões de amostra. Uma implementação completa teria centenas de questões por tópico.
export const QUESTION_BANK: QuestionBank = {
  mathematics: [
    // ===================================
    // Adição e Subtração (adicao_subtracao)
    // ===================================
    // Fichinha
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 5 + 3?', options: [7, 8, 9, 2], answer: 8 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 10 - 4?', options: [5, 6, 7, 14], answer: 6 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 8 + 2?', options: [9, 10, 11, 6], answer: 10 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 7 - 7?', options: [0, 1, 7, 14], answer: 0 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 4 + 5?', options: [1, 9, 8, 10], answer: 9 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 9 - 1?', options: [10, 7, 8, 6], answer: 8 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 6 + 1?', options: [5, 6, 7, 8], answer: 7 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 3 + 3?', options: [5, 6, 7, 9], answer: 6 },
    { topic: 'adicao_subtracao', difficulty: 'Fichinha', problem: 'Quanto é 5 - 2?', options: [1, 2, 3, 7], answer: 3 },
    // Eu me Viro
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Ana tinha 15 balas e deu 7. Com quantas ela ficou?', options: [8, 9, 22, 12], answer: 8 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Quanto é 25 + 15?', options: [30, 35, 40, 45], answer: 40 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Se você tem 30 reais e gasta 12, quanto sobra?', options: [15, 18, 22, 42], answer: 18 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Quanto é 18 + 5?', options: [22, 23, 24, 13], answer: 23 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Quanto é 50 - 20?', options: [20, 30, 40, 70], answer: 30 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Numa cesta há 12 maçãs e 8 laranjas. Quantas frutas há no total?', options: [18, 19, 20, 4], answer: 20 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Pedro tem 22 anos e seu irmão tem 15. Qual a diferença de idade?', options: [5, 6, 7, 37], answer: 7 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Quanto é 34 + 16?', options: [40, 50, 60, 48], answer: 50 },
    { topic: 'adicao_subtracao', difficulty: 'Eu me Viro', problem: 'Quanto é 43 - 9?', options: [32, 33, 34, 52], answer: 34 },
    // Desafiador
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Num ônibus há 45 pessoas. Desceram 12 e subiram 8. Quantas pessoas estão no ônibus agora?', options: [33, 53, 41, 25], answer: 41 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Quanto é 123 - 45?', options: [88, 78, 68, 168], answer: 78 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Maria comprou um livro por R$ 25 e um caderno por R$ 12. Se ela pagou com uma nota de R$ 50, quanto recebeu de troco?', options: [37, 13, 23, 3], answer: 13 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Quanto é 85 + 37?', options: [112, 122, 132, 48], answer: 122 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Quanto é 200 - 54?', options: [146, 156, 166, 254], answer: 146 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Uma escola tem 150 meninos e 135 meninas. Quantos alunos tem a escola?', options: [275, 280, 285, 15], answer: 285 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Carlos colheu 67 mangas e vendeu 28. Quantas mangas sobraram?', options: [49, 41, 39, 95], answer: 39 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Quanto é 56 + 19 + 10?', options: [75, 85, 95, 86], answer: 85 },
    { topic: 'adicao_subtracao', difficulty: 'Desafiador', problem: 'Eu tinha R$ 90. Gastei R$ 15 no lanche e R$ 32 no cinema. Com quanto fiquei?', options: [47, 58, 53, 43], answer: 43 },

    // ===================================
    // Multiplicação (multiplicacao)
    // ===================================
    // Fichinha
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 2 x 3?', options: [4, 5, 6, 8], answer: 6 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 5 x 2?', options: [7, 10, 12, 15], answer: 10 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 4 x 1?', options: [1, 4, 5, 3], answer: 4 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 3 x 3?', options: [6, 8, 9, 12], answer: 9 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 10 x 2?', options: [12, 20, 30, 8], answer: 20 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 6 x 0?', options: [6, 1, 0, 60], answer: 0 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 1 x 8?', options: [1, 7, 8, 9], answer: 8 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 2 x 5?', options: [7, 9, 10, 12], answer: 10 },
    { topic: 'multiplicacao', difficulty: 'Fichinha', problem: 'Quanto é 3 x 4?', options: [7, 10, 12, 15], answer: 12 },
    // Eu me Viro
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Tenho 3 caixas com 4 lápis cada. Quantos lápis tenho no total?', options: [7, 10, 12, 15], answer: 12 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Quanto é 7 x 5?', options: [12, 30, 35, 40], answer: 35 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Um pacote tem 6 figurinhas. Se eu comprar 5 pacotes, quantas figurinhas terei?', options: [11, 25, 30, 35], answer: 30 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Quanto é 8 x 4?', options: [12, 28, 32, 36], answer: 32 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Se um cachorro tem 4 patas, quantas patas têm 6 cachorros?', options: [10, 20, 24, 28], answer: 24 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Quanto é 9 x 3?', options: [12, 21, 24, 27], answer: 27 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Uma bicicleta tem 2 rodas. Quantas rodas têm 8 bicicletas?', options: [10, 12, 14, 16], answer: 16 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Quanto é 6 x 6?', options: [12, 30, 36, 42], answer: 36 },
    { topic: 'multiplicacao', difficulty: 'Eu me Viro', problem: 'Em uma mão temos 5 dedos. Em 7 mãos, quantos dedos teremos?', options: [12, 30, 35, 40], answer: 35 },
    // Desafiador
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Uma floricultura vendeu 6 buquês com 8 flores cada. Quantas flores foram vendidas?', options: [14, 42, 48, 54], answer: 48 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Quanto é 12 x 4?', options: [42, 48, 52, 16], answer: 48 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Em um prédio há 10 andares. Cada andar tem 5 apartamentos. Quantos apartamentos há no prédio?', options: [15, 45, 50, 60], answer: 50 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Quanto é 15 x 3?', options: [18, 35, 45, 50], answer: 45 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Uma caixa de lápis de cor tem 12 cores. Se uma turma tem 5 alunos e cada um ganha uma caixa, quantos lápis serão no total?', options: [17, 50, 60, 70], answer: 60 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Quanto é 20 x 5?', options: [80, 90, 100, 25], answer: 100 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Se um mês tem aproximadamente 4 semanas, quantos meses são 24 semanas?', options: [5, 6, 7, 28], answer: 6 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Quanto é 25 x 4?', options: [80, 90, 100, 110], answer: 100 },
    { topic: 'multiplicacao', difficulty: 'Desafiador', problem: 'Um ônibus escolar pode levar 30 crianças. Quantas crianças podem ser levadas em 3 viagens?', options: [33, 60, 90, 120], answer: 90 },

    // ===================================
    // Divisão (divisao)
    // ===================================
    // Fichinha
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Divida 6 por 2.', options: [2, 3, 4, 8], answer: 3 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Divida 10 por 5.', options: [2, 3, 5, 15], answer: 2 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Divida 8 por 4.', options: [2, 3, 4, 12], answer: 2 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Divida 9 por 3.', options: [2, 3, 4, 6], answer: 3 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Quanto é 4 dividido por 2?', options: [1, 2, 3, 6], answer: 2 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Divida 12 por 6.', options: [2, 3, 4, 18], answer: 2 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Quanto é 10 dividido por 2?', options: [4, 5, 6, 8], answer: 5 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Divida 5 por 1.', options: [1, 4, 5, 6], answer: 5 },
    { topic: 'divisao', difficulty: 'Fichinha', problem: 'Divida 14 por 7.', options: [2, 3, 7, 21], answer: 2 },
    // Eu me Viro
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Tenho 12 doces para dividir igualmente entre 3 crianças. Quantos doces cada uma ganha?', options: [3, 4, 6, 9], answer: 4 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Quanto é 20 dividido por 4?', options: [4, 5, 6, 16], answer: 5 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: '15 lápis foram guardados em 3 estojos. Quantos lápis há em cada estojo?', options: [3, 4, 5, 12], answer: 5 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Quanto é 21 dividido por 3?', options: [6, 7, 8, 18], answer: 7 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Mamãe fez 16 biscoitos e quer dividir entre seus 2 filhos. Quantos biscoitos cada um recebe?', options: [6, 8, 10, 14], answer: 8 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Quanto é 30 dividido por 5?', options: [5, 6, 7, 25], answer: 6 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Em um jogo, 18 cartas são distribuídas para 2 jogadores. Quantas cartas cada um recebe?', options: [8, 9, 10, 16], answer: 9 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Quanto é 25 dividido por 5?', options: [4, 5, 6, 20], answer: 5 },
    { topic: 'divisao', difficulty: 'Eu me Viro', problem: 'Uma pizza foi cortada em 8 fatias para 4 amigos. Quantas fatias cada um comeu?', options: [2, 3, 4, 12], answer: 2 },
    // Desafiador
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Uma sala com 24 alunos foi dividida em 6 grupos. Quantos alunos há em cada grupo?', options: [3, 4, 5, 18], answer: 4 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Quanto é 45 dividido por 9?', options: [5, 6, 7, 36], answer: 5 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Um livro de 60 páginas foi lido em 10 dias. Quantas páginas foram lidas por dia?', options: [5, 6, 10, 50], answer: 6 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Quanto é 56 dividido por 7?', options: [6, 7, 8, 49], answer: 8 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Tenho 36 figurinhas e quero colá-las em 9 páginas do meu álbum. Quantas figurinhas por página?', options: [3, 4, 5, 27], answer: 4 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Quanto é 81 dividido por 9?', options: [7, 8, 9, 72], answer: 9 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Uma caixa com 48 bombons será dividida entre 8 amigos. Quantos bombons para cada um?', options: [5, 6, 7, 40], answer: 6 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Quanto é 42 dividido por 6?', options: [6, 7, 8, 36], answer: 7 },
    { topic: 'divisao', difficulty: 'Desafiador', problem: 'Um agricultor colheu 50 laranjas e quer fazer pacotes com 10 laranjas cada. Quantos pacotes ele fará?', options: [5, 10, 40, 60], answer: 5 },

    // ===================================
    // Sólidos Geométricos (solidos_geometricos)
    // ===================================
    // Fichinha
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'Qual o nome da forma de uma bola de futebol?', options: ['Círculo', 'Esfera', 'Cubo', 'Cone'], answer: 'Esfera' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'Um dado de jogar tem a forma de um...', options: ['Quadrado', 'Círculo', 'Cubo', 'Dado'], answer: 'Cubo' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'O formato de um tijolo lembra um...', options: ['Círculo', 'Triângulo', 'Paralelepípedo', 'Cubo'], answer: 'Paralelepípedo' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'Uma casquinha de sorvete tem a forma de um...', options: ['Cilindro', 'Cone', 'Esfera', 'Círculo'], answer: 'Cone' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'Qual forma geométrica parece uma roda de carro?', options: ['Círculo', 'Quadrado', 'Roda', 'Esfera'], answer: 'Círculo' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'Qual sólido parece uma pirâmide do Egito?', options: ['Cone', 'Pirâmide', 'Triângulo', 'Cubo'], answer: 'Pirâmide' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'Uma lata de ervilha tem formato de...', options: ['Cone', 'Cilindro', 'Esfera', 'Lata'], answer: 'Cilindro' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'O Sol, visto de longe, parece uma...', options: ['Estrela', 'Círculo', 'Esfera', 'Luz'], answer: 'Esfera' },
    { topic: 'solidos_geometricos', difficulty: 'Fichinha', problem: 'Uma caixa de presente quadrada é um...', options: ['Quadrado', 'Cubo', 'Caixa', 'Retângulo'], answer: 'Cubo' },
    // Eu me Viro
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'Uma lata de refrigerante lembra qual sólido geométrico?', options: ['Cone', 'Cilindro', 'Círculo', 'Tubo'], answer: 'Cilindro' },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'Um chapéu de festa tem a forma de um...', options: ['Triângulo', 'Pirâmide', 'Cone', 'Círculo'], answer: 'Cone' },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'Quantos lados tem um quadrado?', options: [3, 4, 5, 6], answer: 4 },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'O que é um objeto com seis faces quadradas iguais?', options: ['Retângulo', 'Cubo', 'Pirâmide', 'Dado'], answer: 'Cubo' },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'Qual destes objetos tem o formato de uma esfera?', options: ['Livro', 'Laranja', 'Garrafa', 'Dado'], answer: 'Laranja' },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'Qual a base de um cone?', options: ['Quadrada', 'Triangular', 'Circular', 'Pontuda'], answer: 'Circular' },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'Um rolo de papel higiênico tem a forma de um...', options: ['Cilindro', 'Círculo', 'Cone', 'Tubo'], answer: 'Cilindro' },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'As pirâmides do Egito têm base...', options: ['Circular', 'Quadrada', 'Triangular', 'Redonda'], answer: 'Quadrada' },
    { topic: 'solidos_geometricos', difficulty: 'Eu me Viro', problem: 'Qual forma não é um sólido geométrico?', options: ['Cubo', 'Esfera', 'Círculo', 'Cilindro'], answer: 'Círculo' },
    // Desafiador
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Quantas faces tem um cubo?', options: [4, 5, 6, 8], answer: 6 },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Uma caixa de sapatos tem a forma de um...', options: ['Retângulo', 'Quadrado', 'Caixa', 'Paralelepípedo'], answer: 'Paralelepípedo' },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Quantos vértices (pontas) tem uma pirâmide de base quadrada?', options: [4, 5, 6, 8], answer: 5 },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Um cilindro tem quantas bases?', options: [0, 1, 2, 3], answer: 2 },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Qual sólido geométrico não tem nenhuma face plana?', options: ['Cubo', 'Cone', 'Cilindro', 'Esfera'], answer: 'Esfera' },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Quantas arestas (linhas) tem um cubo?', options: [6, 8, 10, 12], answer: 12 },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'A "planificação" de um cubo resulta em quantos quadrados?', options: [4, 5, 6, 8], answer: 6 },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Um prisma de base triangular tem quantas faces?', options: [3, 4, 5, 6], answer: 5 },
    { topic: 'solidos_geometricos', difficulty: 'Desafiador', problem: 'Qual sólido tem uma base circular e um vértice?', options: ['Cilindro', 'Esfera', 'Cone', 'Pirâmide'], answer: 'Cone' },
  ],
  portuguese: [
    // ===================================
    // Sinônimos e Antônimos (sinonimos_antonimos)
    // ===================================
    // Fichinha
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'Qual o contrário de "grande"?', options: ['Alto', 'Pequeno', 'Enorme', 'Largo'], answer: 'Pequeno' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'Qual palavra tem o mesmo sentido de "bonito"?', options: ['Feio', 'Lindo', 'Alegre', 'Triste'], answer: 'Lindo' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'O contrário de "dia" é...', options: ['Sol', 'Claro', 'Noite', 'Manhã'], answer: 'Noite' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'O mesmo que "feliz" é...', options: ['Triste', 'Chato', 'Alegre', 'Bravo'], answer: 'Alegre' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'O contrário de "frio" é...', options: ['Gelado', 'Quente', 'Morno', 'Neve'], answer: 'Quente' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'O mesmo que "carro" é...', options: ['Casa', 'Automóvel', 'Rua', 'Pneu'], answer: 'Automóvel' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'O contrário de "alto" é...', options: ['Grande', 'Baixo', 'Largo', 'Fino'], answer: 'Baixo' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'O mesmo que "casa" é...', options: ['Lar', 'Apartamento', 'Prédio', 'Rua'], answer: 'Lar' },
    { topic: 'sinonimos_antonimos', difficulty: 'Fichinha', problem: 'O contrário de "cheio" é...', options: ['Completo', 'Vazio', 'Redondo', 'Largo'], answer: 'Vazio' },
    // Eu me Viro
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'Qual o antônimo de "rápido"?', options: ['Veloz', 'Lento', 'Corrida', 'Claro'], answer: 'Lento' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'Qual o sinônimo de "enorme"?', options: ['Pequeno', 'Gigante', 'Médio', 'Forte'], answer: 'Gigante' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'O contrário de "claro" é...', options: ['Branco', 'Luz', 'Sol', 'Escuro'], answer: 'Escuro' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'O mesmo que "encontrar" é...', options: ['Perder', 'Achar', 'Buscar', 'Esconder'], answer: 'Achar' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'O antônimo de "corajoso" é...', options: ['Valente', 'Forte', 'Medroso', 'Herói'], answer: 'Medroso' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'Qual o sinônimo de "saboroso"?', options: ['Ruim', 'Gostoso', 'Cheiroso', 'Azedo'], answer: 'Gostoso' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'O contrário de "começo" é...', options: ['Início', 'Meio', 'Fim', 'Princípio'], answer: 'Fim' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'O mesmo que "perguntar" é...', options: ['Responder', 'Falar', 'Indagar', 'Calar'], answer: 'Indagar' },
    { topic: 'sinonimos_antonimos', difficulty: 'Eu me Viro', problem: 'O antônimo de "fácil" é...', options: ['Simples', 'Difícil', 'Moleza', 'Leve'], answer: 'Difícil' },
    // Desafiador
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'Qual o antônimo de "antigo"?', options: ['Velho', 'Idoso', 'Moderno', 'Passado'], answer: 'Moderno' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'Qual o sinônimo de "distante"?', options: ['Perto', 'Longe', 'Junto', 'Vizinho'], answer: 'Longe' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'O contrário de "barulho" é...', options: ['Som', 'Música', 'Grito', 'Silêncio'], answer: 'Silêncio' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'O mesmo que "auxiliar" é...', options: ['Atrapalhar', 'Ajudar', 'Brigar', 'Olhar'], answer: 'Ajudar' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'O antônimo de "chegada" é...', options: ['Vinda', 'Entrada', 'Partida', 'Início'], answer: 'Partida' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'Qual o sinônimo de "calmo"?', options: ['Agitado', 'Nervoso', 'Tranquilo', 'Bravo'], answer: 'Tranquilo' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'O contrário de "guerra" é...', options: ['Luta', 'Briga', 'Batalha', 'Paz'], answer: 'Paz' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'O mesmo que "residir" é...', options: ['Passear', 'Visitar', 'Morar', 'Sair'], answer: 'Morar' },
    { topic: 'sinonimos_antonimos', difficulty: 'Desafiador', problem: 'O antônimo de "permitir" é...', options: ['Deixar', 'Autorizar', 'Liberar', 'Proibir'], answer: 'Proibir' },
    
    // ===================================
    // Substantivos Comuns e Próprios (substantivos)
    // ===================================
    // Fichinha
    { topic: 'substantivos', difficulty: 'Fichinha', problem: 'A palavra "cachorro" é um substantivo comum ou próprio?', options: ['Próprio', 'Comum', 'Adjetivo', 'Verbo'], answer: 'Comum' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: 'O nome da sua cidade é um substantivo...', options: ['Comum', 'Próprio', 'Adjetivo', 'Qualidade'], answer: 'Próprio' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: '"Menina" é um substantivo...', options: ['Próprio', 'Comum', 'Nome', 'Pessoa'], answer: 'Comum' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: 'O nome "Ana" é um substantivo...', options: ['Comum', 'Próprio', 'Menina', 'Letra'], answer: 'Próprio' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: 'Qual destes é um substantivo comum?', options: ['Rex', 'Cachorro', 'Pluto', 'Bidu'], answer: 'Cachorro' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: 'Qual destes é um substantivo próprio?', options: ['País', 'Cidade', 'Estado', 'Brasil'], answer: 'Brasil' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: '"Rio" é um substantivo...', options: ['Comum', 'Próprio', 'Água', 'Lugar'], answer: 'Comum' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: 'O nome do seu professor é um substantivo...', options: ['Comum', 'Próprio', 'Aula', 'Escola'], answer: 'Próprio' },
    { topic: 'substantivos', difficulty: 'Fichinha', problem: '"Lápis" é um substantivo...', options: ['Comum', 'Próprio', 'Objeto', 'Cor'], answer: 'Comum' },
    // Eu me Viro
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: 'Na frase "Gosto de ler o livro de Monteiro Lobato", qual é o substantivo próprio?', options: ['Gosto', 'Livro', 'Monteiro Lobato', 'Ler'], answer: 'Monteiro Lobato' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: 'Qual palavra deve ser escrita com letra maiúscula por ser substantivo próprio?', options: ['gato', 'cidade', 'são paulo', 'menino'], answer: 'são paulo' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: '"Carro" é um substantivo comum. Qual seria um substantivo próprio relacionado a ele?', options: ['Roda', 'Motor', 'Ferrari', 'Velocidade'], answer: 'Ferrari' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: 'Na frase "O rio Amazonas é o maior do mundo", qual é o substantivo comum?', options: ['Amazonas', 'Maior', 'Mundo', 'Rio'], answer: 'Rio' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: 'Qual das alternativas contém apenas substantivos comuns?', options: ['Mesa, Cadeira, Lápis', 'João, Maria, Pedro', 'Brasil, Japão, China', 'Nike, Adidas, Puma'], answer: 'Mesa, Cadeira, Lápis' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: 'O nome de uma marca de refrigerante é um substantivo...', options: ['Comum', 'Próprio', 'Líquido', 'Bebida'], answer: 'Próprio' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: '"Planeta" é comum. Um exemplo de substantivo próprio seria:', options: ['Estrela', 'Sol', 'Lua', 'Terra'], answer: 'Terra' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: 'Na frase "Minha gata se chama Mimi", qual é o substantivo próprio?', options: ['Minha', 'Gata', 'Chama', 'Mimi'], answer: 'Mimi' },
    { topic: 'substantivos', difficulty: 'Eu me Viro', problem: 'Qual das alternativas contém um substantivo próprio?', options: ['Aquele menino alto', 'Gosto de chocolate', 'Moro na Rua da Paz', 'Comprei uma caneta'], answer: 'Moro na Rua da Paz' },
    // Desafiador
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Na frase "O menino Pedro chutou a bola", qual é o substantivo comum?', options: ['Menino', 'Pedro', 'Chutou', 'A'], answer: 'Menino' },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Substantivos próprios nomeiam seres...?', options: ['Em geral', 'Pequenos', 'Grandes', 'Específicos'], answer: 'Específicos' },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Qual frase usa o substantivo próprio de forma incorreta?', options: ['Viajei para o Rio de Janeiro.', 'Meu cachorro se chama Totó.', 'Gosto de tomar coca-cola.', 'O Oceano atlântico é grande.'], answer: 'O Oceano atlântico é grande.' },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Na frase "A professora Maria ensina Português", quantos substantivos próprios existem?', options: [1, 2, 3, 0], answer: 2 },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Qual o substantivo comum para "Mônica, Cebolinha, Cascão"?', options: ['Desenho', 'Revista', 'Personagens', 'Turma'], answer: 'Personagens' },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: '"Humanidade" é um substantivo...', options: ['Comum', 'Próprio', 'Coletivo', 'Abstrato'], answer: 'Coletivo' },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Qual palavra é um substantivo comum e abstrato?', options: ['Felicidade', 'Mesa', 'Fada', 'Deus'], answer: 'Felicidade' },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Em "O Japão fica na Ásia", quais são os substantivos próprios?', options: ['Japão', 'Ásia', 'Japão e Ásia', 'Fica'], answer: 'Japão e Ásia' },
    { topic: 'substantivos', difficulty: 'Desafiador', problem: 'Em "A capital da Bahia é Salvador", qual é o substantivo próprio que nomeia uma cidade?', options: ['Capital', 'Bahia', 'Salvador', 'É'], answer: 'Salvador' },

    // ===================================
    // Gênero Masculino e Feminino (genero)
    // ===================================
    // Fichinha
    { topic: 'genero', difficulty: 'Fichinha', problem: 'Qual o feminino de "menino"?', options: ['Moça', 'Mulher', 'Menina', 'Garota'], answer: 'Menina' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'Qual o masculino de "gata"?', options: ['Gato', 'Gatão', 'Gatinho', 'Gatuno'], answer: 'Gato' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'O feminino de "pai" é...', options: ['Tia', 'Avó', 'Mãe', 'Filha'], answer: 'Mãe' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'O masculino de "professora" é...', options: ['Diretor', 'Aluno', 'Professor', 'Estudante'], answer: 'Professor' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'O feminino de "amigo" é...', options: ['Colega', 'Prima', 'Irmã', 'Amiga'], answer: 'Amiga' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'O masculino de "galinha" é...', options: ['Galo', 'Pinto', 'Frango', 'Ganso'], answer: 'Galo' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'O feminino de "irmão" é...', options: ['Prima', 'Irmã', 'Tia', 'Filha'], answer: 'Irmã' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'O masculino de "vovó" é...', options: ['Vovô', 'Tio', 'Pai', 'Velho'], answer: 'Vovô' },
    { topic: 'genero', difficulty: 'Fichinha', problem: 'O feminino de "ator" é...', options: ['Atora', 'Atriz', 'Artista', 'Cantora'], answer: 'Atriz' },
    // Eu me Viro
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'Qual o masculino de "vaca"?', options: ['Boi', 'Touro', 'Bezerro', 'Cavalo'], answer: 'Boi' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'Qual o feminino de "rei"?', options: ['Realeza', 'Princesa', 'Rainha', 'Dama'], answer: 'Rainha' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'O masculino de "abelha" é...', options: ['Abelho', 'Zangão', 'Vespa', 'Mosquito'], answer: 'Zangão' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'O feminino de "príncipe" é...', options: ['Princesa', 'Rainha', 'Condessa', 'Dama'], answer: 'Princesa' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'O masculino de "ovelha" é...', options: ['Bode', 'Cabra', 'Carneiro', 'Cordeiro'], answer: 'Carneiro' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'O feminino de "leão" é...', options: ['Leoa', 'Tigresa', 'Gata', 'Loba'], answer: 'Leoa' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'O masculino de "égua" é...', options: ['Pônei', 'Burro', 'Cavalo', 'Jumento'], answer: 'Cavalo' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'O feminino de "herói" é...', options: ['Heroína', 'Mulher', 'Valente', 'Corajosa'], answer: 'Heroína' },
    { topic: 'genero', difficulty: 'Eu me Viro', problem: 'O masculino de "cabra" é...', options: ['Carneiro', 'Ovelha', 'Bode', 'Cabrito'], answer: 'Bode' },
    // Desafiador
    { topic: 'genero', difficulty: 'Desafiador', problem: 'Qual o feminino de "cavaleiro"?', options: ['Dama', 'Amazona', 'Égua', 'Cavalaria'], answer: 'Amazona' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'O masculino de "atriz" é...', options: ['Ator', 'Artista', 'Apresentador', 'Atoro'], answer: 'Ator' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'O feminino de "poeta" é...', options: ['Poetisa', 'Poema', 'Poetiza', 'Poetanta'], answer: 'Poetisa' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'O masculino de "madrinha" é...', options: ['Padre', 'Padrinho', 'Amigo', 'Parente'], answer: 'Padrinho' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'Qual o feminino de "imperador"?', options: ['Imperadora', 'Rainha', 'Imperatriz', 'Realeza'], answer: 'Imperatriz' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'O masculino de "freira" é...', options: ['Frade', 'Frei', 'Padre', 'Monge'], answer: 'Frade' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'O feminino de "zangão" é...', options: ['Zangona', 'Vespa', 'Abelha', 'Formiga'], answer: 'Abelha' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'O masculino de "dama" é...', options: ['Rei', 'Príncipe', 'Lorde', 'Cavaleiro'], answer: 'Cavaleiro' },
    { topic: 'genero', difficulty: 'Desafiador', problem: 'O feminino de "réu" é...', options: ['Ré', 'Reia', 'Acusada', 'Criminosa'], answer: 'Ré' },

    // ===================================
    // Ortografia R/RR e S/SS (ortografia_r_s)
    // ===================================
    // Fichinha
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'A palavra "caro" se escreve com:', options: ['R', 'RR'], answer: 'R' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'A palavra "carro" se escreve com:', options: ['R', 'RR'], answer: 'RR' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'A palavra "casa" se escreve com:', options: ['S', 'SS'], answer: 'S' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'A palavra "passarinho" se escreve com:', options: ['S', 'SS'], answer: 'SS' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'Complete: "A a___anha subiu pela parede." (r/rr)', options: ['r', 'rr'], answer: 'r' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'Complete: "Eu gosto de ma___a." (ç/ss)', options: ['ç', 'ss'], answer: 'ss' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'A palavra "tesoura" tem som de Z, mas se escreve com:', options: ['Z', 'S', 'SS', 'C'], answer: 'S' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'A palavra "barata" se escreve com:', options: ['R', 'RR'], answer: 'R' },
    { topic: 'ortografia_r_s', difficulty: 'Fichinha', problem: 'A palavra "vaso" se escreve com:', options: ['S', 'SS', 'Z'], answer: 'S' },
    // Eu me Viro
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'Complete: "O fe___o de passar está quente." (r/rr)', options: ['r', 'rr'], answer: 'rr' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'Complete: "A prince___a mora no castelo." (s/z)', options: ['s', 'z'], answer: 's' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'Qual palavra está escrita corretamente?', options: ['Girasol', 'Girassol', 'Jirasol', 'Jirassol'], answer: 'Girassol' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'Qual palavra está escrita corretamente?', options: ['Baraca', 'Barraca', 'Barraka', 'Barraka'], answer: 'Barraca' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'Complete: "Ele quebrou o o___o." (s/ss)', options: ['s', 'ss'], answer: 'ss' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'Complete: "O ca___oal foi passear." (z/s)', options: ['z', 's'], answer: 's' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'A palavra "honra" se escreve com R ou RR?', options: ['R', 'RR'], answer: 'R' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'A palavra "assado" se escreve com S ou SS?', options: ['S', 'SS'], answer: 'SS' },
    { topic: 'ortografia_r_s', difficulty: 'Eu me Viro', problem: 'Qual palavra está errada?', options: ['Serrote', 'Enrrolado', 'Careta', 'Marreco'], answer: 'Enrrolado' },
    // Desafiador
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Complete: "A ca___oça quebrou." (r/rr)', options: ['r', 'rr'], answer: 'rr' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Complete: "O co___ação bate forte." (r/rr)', options: ['r', 'rr'], answer: 'r' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Qual frase está correta?', options: ['A vassoura é para varrer.', 'A vassoura é para varer.', 'A vasoura é para varrer.', 'A vasoura é para varer.'], answer: 'A vassoura é para varrer.' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'A palavra "Israel" se escreve com R, pois...', options: ['Está entre vogais', 'Começa com R', 'Está depois de consoante', 'É nome próprio'], answer: 'Está depois de consoante' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Complete: "Tive uma surp___esa agradável." (s/z)', options: ['s', 'z'], answer: 's' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Qual palavra está escrita incorretamente?', options: ['Pêssego', 'Carrocel', 'Discussão', 'Profissão'], answer: 'Carrocel' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Complete: "A a___inatura do documento é importante." (s/ss)', options: ['s', 'ss'], answer: 'ss' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Qual palavra precisa de RR?', options: ['Gen_o', 'Ca_eta', 'Co_ida', 'Hou_a'], answer: 'Co_ida' },
    { topic: 'ortografia_r_s', difficulty: 'Desafiador', problem: 'Qual palavra está correta?', options: ['Aniverssário', 'Aniversario', 'Aniverçario', 'Aniversário'], answer: 'Aniversário' },

    // ===================================
    // Gênero Textual Fábula (fabula)
    // ===================================
    // Fichinha
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'Na fábula, quem geralmente fala e age como pessoas?', options: ['As plantas', 'Os animais', 'As casas', 'Os rios'], answer: 'Os animais' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'O que uma fábula sempre tenta nos ensinar?', options: ['Uma receita', 'Uma conta', 'Uma lição', 'Um endereço'], answer: 'Uma lição' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'Na "A Lebre e a Tartaruga", quem vence a corrida?', options: ['A lebre', 'A tartaruga', 'O coelho', 'A lesma'], answer: 'A tartaruga' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'Na "A Cigarra e a Formiga", quem cantou todo o verão?', options: ['A formiga', 'O grilo', 'A cigarra', 'A abelha'], answer: 'A cigarra' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'A lição de uma fábula é chamada de...', options: ['Moral da história', 'Piada', 'Título', 'Começo'], answer: 'Moral da história' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'Na fábula "O Leão e o Rato", quem ajuda o leão a escapar da rede?', options: ['O elefante', 'O macaco', 'O caçador', 'O rato'], answer: 'O rato' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'Que animal mentiroso gritava "Socorro, o lobo!"?', options: ['O menino', 'O pastor', 'A ovelha', 'O lobo'], answer: 'O pastor' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'Na "A Raposa e as Uvas", por que a raposa não comeu as uvas?', options: ['Estavam azedas', 'Estavam verdes', 'Estavam muito altas', 'Não gostava de uvas'], answer: 'Estavam muito altas' },
    { topic: 'fabula', difficulty: 'Fichinha', problem: 'Fábulas são histórias...', options: ['Longas e reais', 'Curtas com uma lição', 'De terror', 'Sem personagens'], answer: 'Curtas com uma lição' },
    // Eu me Viro
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Qual a moral da história "A Lebre e a Tartaruga"?', options: ['Devagar se vai ao longe', 'Quem corre sempre vence', 'A mentira tem perna curta', 'A união faz a força'], answer: 'Devagar se vai ao longe' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Na fábula "A Cigarra e a Formiga", o que a formiga fazia no verão?', options: ['Cantava', 'Dormia', 'Trabalhava', 'Passeava'], answer: 'Trabalhava' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Em "O Leão e o Rato", o que o rato fez para salvar o leão?', options: ['Roeu a corda', 'Lutou com o caçador', 'Gritou por ajuda', 'Assustou o leão'], answer: 'Roeu a corda' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Na fábula "A Raposa e as Uvas", a raposa diz que as uvas estavam "verdes". Isso significa que ela...', options: ['Realmente achou que estavam verdes', 'Estava com inveja', 'Não conseguiu pegá-las', 'Preferia uvas roxas'], answer: 'Não conseguiu pegá-las' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Qual a moral da história "O Pastor Mentiroso"?', options: ['Quem mente perde a credibilidade', 'É bom pedir ajuda', 'Lobos são perigosos', 'Mentir é divertido'], answer: 'Quem mente perde a credibilidade' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Quem é considerado o principal escritor de fábulas da antiguidade?', options: ['Monteiro Lobato', 'Ziraldo', 'Esopo', 'Maurício de Sousa'], answer: 'Esopo' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'O que a formiga ensina para a cigarra em sua fábula?', options: ['A cantar melhor', 'A importância de se preparar para o futuro', 'A aproveitar o verão', 'A não ter medo do inverno'], answer: 'A importância de se preparar para o futuro' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Em "O Rato do Campo e o Rato da Cidade", qual rato vivia com mais perigos?', options: ['O do campo', 'O da cidade', 'Os dois', 'Nenhum'], answer: 'O da cidade' },
    { topic: 'fabula', difficulty: 'Eu me Viro', problem: 'Qual a principal característica de uma fábula?', options: ['Ter rimas', 'Ser uma história real', 'Ter uma moral', 'Ser muito longa'], answer: 'Ter uma moral' },
    // Desafiador
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'A moral "Uma boa ação ganha outra" se aplica a qual fábula?', options: ['A Lebre e a Tartaruga', 'O Leão e o Rato', 'A Cigarra e a Formiga', 'A Raposa e as Uvas'], answer: 'O Leão e o Rato' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'A moral "É fácil desprezar aquilo que não se pode alcançar" se refere a qual fábula?', options: ['O Pastor Mentiroso', 'O Leão e o Rato', 'A Raposa e as Uvas', 'A Cigarra e a Formiga'], answer: 'A Raposa e as Uvas' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'Na fábula "A Assembleia dos Ratos", qual foi o plano para saber quando o gato viria?', options: ['Fazer uma armadilha', 'Colocar um sino no gato', 'Mudar de casa', 'Atacar o gato'], answer: 'Colocar um sino no gato' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'Qual a moral da história "A Assembleia dos Ratos"?', options: ['Falar é fácil, fazer é difícil', 'A união faz a força', 'Os gatos são espertos', 'Os ratos são medrosos'], answer: 'Falar é fácil, fazer é difícil' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'Na fábula "O Lobo em Pele de Cordeiro", o que o lobo queria?', options: ['Fazer amizade com as ovelhas', 'Se proteger do frio', 'Enganar para poder comer as ovelhas', 'Virar vegetariano'], answer: 'Enganar para poder comer as ovelhas' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'A moral "Cuidado com os que mudam de aparência para enganar" se refere a qual fábula?', options: ['O Lobo em Pele de Cordeiro', 'O Leão e o Rato', 'A Raposa e as Uvas', 'A Cigarra e a Formiga'], answer: 'O Lobo em Pele de Cordeiro' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'Que escritor brasileiro é famoso por adaptar fábulas para o Sítio do Picapau Amarelo?', options: ['Ziraldo', 'Maurício de Sousa', 'Monteiro Lobato', 'Ruth Rocha'], answer: 'Monteiro Lobato' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'Na fábula "A Galinha dos Ovos de Ouro", o que o dono faz por ganância?', options: ['Vende a galinha', 'Mata a galinha', 'Compra mais galinhas', 'Esconde os ovos'], answer: 'Mata a galinha' },
    { topic: 'fabula', difficulty: 'Desafiador', problem: 'A moral "Quem tudo quer, tudo perde" se aplica melhor a qual fábula?', options: ['A Lebre e a Tartaruga', 'O Leão e o Rato', 'A Galinha dos Ovos de Ouro', 'A Cigarra e a Formiga'], answer: 'A Galinha dos Ovos de Ouro' },

    // ===================================
    // Singular e Plural (singular_plural)
    // ===================================
    // Fichinha
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'Qual o plural de "casa"?', options: ['Casas', 'Casão', 'Casinha', 'Casebre'], answer: 'Casas' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'Qual o plural de "menino"?', options: ['Meninão', 'Meninada', 'Meninos', 'Menininho'], answer: 'Meninos' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'O plural de "flor" é...', options: ['Floricultura', 'Flores', 'Florista', 'Florão'], answer: 'Flores' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'O plural de "carro" é...', options: ['Carrinho', 'Carros', 'Carroça', 'Carreiro'], answer: 'Carros' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'Qual é o singular de "cachorros"?', options: ['Cachorrinho', 'Cachorrão', 'Cachorro', 'Cachorrada'], answer: 'Cachorro' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'O plural de "livro" é...', options: ['Livraria', 'Livreto', 'Livros', 'Livreiro'], answer: 'Livros' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'Qual o plural de "gato"?', options: ['Gatos', 'Gatuno', 'Gatão', 'Gatinho'], answer: 'Gatos' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'O plural de "bola" é...', options: ['Bolada', 'Bolas', 'Bolão', 'Boleiro'], answer: 'Bolas' },
    { topic: 'singular_plural', difficulty: 'Fichinha', problem: 'Qual é o singular de "mesas"?', options: ['Mesinha', 'Mesão', 'Mesa', 'Meseiro'], answer: 'Mesa' },
    // Eu me Viro
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'Qual o plural de "mão"?', options: ['Mãos', 'Mães', 'Mões', 'Mãozinhas'], answer: 'Mãos' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'Qual o plural de "pão"?', options: ['Pãos', 'Pães', 'Pãozinhos', 'Pãesinhos'], answer: 'Pães' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'O plural de "avião" é...', options: ['Aviões', 'Aviãos', 'Avionetas', 'Avisão'], answer: 'Aviões' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'O plural de "jardim" é...', options: ['Jardins', 'Jardims', 'Jardineiro', 'Jardinagem'], answer: 'Jardins' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'Qual o plural de "luz"?', options: ['Luzes', 'Luzis', 'Luz', 'Luzinhas'], answer: 'Luzes' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'O plural de "cor" é...', options: ['Cores', 'Colorido', 'Coris', 'Corão'], answer: 'Cores' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'Qual o plural de "motor"?', options: ['Motores', 'Motorista', 'Motorzão', 'Motoris'], answer: 'Motores' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'O plural de "nariz" é...', options: ['Narizes', 'Narizão', 'Narizinho', 'Narigis'], answer: 'Narizes' },
    { topic: 'singular_plural', difficulty: 'Eu me Viro', problem: 'Qual o plural de "animal"?', options: ['Animals', 'Animais', 'Animale', 'Animões'], answer: 'Animais' },
    // Desafiador
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'Qual o plural de "cidadão"?', options: ['Cidadãos', 'Cidadões', 'Cidades', 'Cidadães'], answer: 'Cidadãos' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'Qual o plural de "homem"?', options: ['Homenzinhos', 'Homens', 'Homões', 'Homenzarrão'], answer: 'Homens' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'O plural de "funil" é...', options: ['Funils', 'Funis', 'Funiz', 'Funéis'], answer: 'Funis' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'O plural de "troféu" é...', options: ['Troféis', 'Trofeus', 'Troféus', 'Trofézes'], answer: 'Troféus' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'Qual o plural de "revólver"?', options: ['Revólvers', 'Revólveres', 'Revólves', 'Revolveris'], answer: 'Revólveres' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'O plural de "barril" é...', options: ['Barris', 'Barrils', 'Barrís', 'Barriis'], answer: 'Barris' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'Qual o plural de "qualquer"?', options: ['Qualqueres', 'Qualquer', 'Quaisquer', 'Quaisqueres'], answer: 'Quaisquer' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'O plural de "pincel" é...', options: ['Pincels', 'Pincéis', 'Pinceis', 'Pinceles'], answer: 'Pincéis' },
    { topic: 'singular_plural', difficulty: 'Desafiador', problem: 'Qual o plural de "degrau"?', options: ['Degrais', 'Degraus', 'Degrãos', 'Degrauses'], answer: 'Degraus' },
    
    // ===================================
    // Aumentativo e Diminutivo (aumentativo_diminutivo)
    // ===================================
    // Fichinha
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'Qual o diminutivo de "gato"?', options: ['Gatão', 'Gatinho', 'Gataço', 'Gatuno'], answer: 'Gatinho' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'Qual o aumentativo de "casa"?', options: ['Casinha', 'Casebre', 'Casão', 'Casarão'], answer: 'Casarão' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'O diminutivo de "pé" é...', options: ['Pezão', 'Pezinho', 'Pisada', 'Sapato'], answer: 'Pezinho' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'O aumentativo de "dedo" é...', options: ['Dedal', 'Dedinho', 'Dedão', 'Digital'], answer: 'Dedão' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'O diminutivo de "flor" é...', options: ['Florão', 'Ramalhete', 'Florzinha', 'Jardim'], answer: 'Florzinha' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'O aumentativo de "menino" é...', options: ['Menininho', 'Garoto', 'Meninão', 'Rapaz'], answer: 'Meninão' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'O diminutivo de "cão" é...', options: ['Cachorro', 'Cãozão', 'Cãozinho', 'Canil'], answer: 'Cãozinho' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'O aumentativo de "amigo" é...', options: ['Amiguinho', 'Amigão', 'Colega', 'Companheiro'], answer: 'Amigão' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Fichinha', problem: 'O diminutivo de "nariz" é...', options: ['Narina', 'Narigão', 'Narigudo', 'Narizinho'], answer: 'Narizinho' },
    // Eu me Viro
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'Qual o aumentativo de "nariz"?', options: ['Narizinho', 'Narigão', 'Narigudo', 'Narina'], answer: 'Narigão' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'Qual o diminutivo de "sala"?', options: ['Salão', 'Salinha', 'Saleta', 'Salada'], answer: 'Saleta' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'O aumentativo de "boca" é...', options: ['Boquinha', 'Bocão', 'Bocarra', 'Bocal'], answer: 'Bocarra' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'O diminutivo de "rua" é...', options: ['Ruazinha', 'Ruela', 'Ruazona', 'Estrada'], answer: 'Ruela' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'O aumentativo de "fogo" é...', options: ['Foginho', 'Fogueira', 'Fogão', 'Fogaréu'], answer: 'Fogaréu' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'O diminutivo de "vila" é...', options: ['Vilão', 'Vilela', 'Cidade', 'Vilarejo'], answer: 'Vilarejo' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'O aumentativo de "cabeça" é...', options: ['Cabecinha', 'Cabeção', 'Cabeçorra', 'Crânio'], answer: 'Cabeçorra' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'O diminutivo de "corpo" é...', options: ['Corpinho', 'Corpanzil', 'Corpete', 'Corpúsculo'], answer: 'Corpúsculo' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Eu me Viro', problem: 'O aumentativo de "voz" é...', options: ['Vozinha', 'Vozão', 'Vozear', 'Vozeirão'], answer: 'Vozeirão' },
    // Desafiador
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'Qual o diminutivo de "chuva"?', options: ['Chuvinha', 'Chuveiro', 'Chuvisco', 'Chuvão'], answer: 'Chuvisco' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'Qual o aumentativo de "homem"?', options: ['Homenzinho', 'Homenzarrão', 'Humanidade', 'Rapagão'], answer: 'Homenzarrão' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'O diminutivo de "rio" é...', options: ['Riacho', 'Riozinho', 'Afluente', 'Córrego'], answer: 'Riacho' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'O aumentativo de "ladrão" é...', options: ['Ladrãozão', 'Ladravaz', 'Ladrãozinho', 'Ladro'], answer: 'Ladravaz' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'O diminutivo de "palácio" é...', options: ['Palacinho', 'Palacete', 'Castelo', 'Casa'], answer: 'Palacete' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'O aumentativo de "animal" é...', options: ['Animalão', 'Animalejo', 'Animalaço', 'Bicho'], answer: 'Animalaço' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'O diminutivo de "sino" é...', options: ['Sininho', 'Sineta', 'Sinal', 'Som'], answer: 'Sineta' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'O aumentativo de "rico" é...', options: ['Ricão', 'Riquinho', 'Ricaço', 'Milionário'], answer: 'Ricaço' },
    { topic: 'aumentativo_diminutivo', difficulty: 'Desafiador', problem: 'O diminutivo de "lugar" é...', options: ['Lugarzinho', 'Local', 'Lugarejo', 'Espaço'], answer: 'Lugarejo' },
    
    // ===================================
    // Uso do M antes de P e B (uso_m_p_b)
    // ===================================
    // Fichinha
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'A palavra "campo" se escreve com M ou N antes do P?', options: ['M', 'N'], answer: 'M' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'A palavra "bomba" se escreve com M ou N antes do B?', options: ['M', 'N'], answer: 'M' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'Complete: "O po__te caiu." (m/n)', options: ['m', 'n'], answer: 'n' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'Complete: "Eu gosto de bo__bom." (m/n)', options: ['m', 'n'], answer: 'm' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'Complete: "A la__pada queimou." (m/n)', options: ['m', 'n'], answer: 'm' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'Complete: "O ve__to está forte." (m/n)', options: ['m', 'n'], answer: 'n' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'Complete: "Hoje é meu a__iversário." (m/n)', options: ['m', 'n'], answer: 'n' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'A palavra "tempo" se escreve com M ou N?', options: ['M', 'N'], answer: 'M' },
    { topic: 'uso_m_p_b', difficulty: 'Fichinha', problem: 'A palavra "tampa" se escreve com M ou N?', options: ['M', 'N'], answer: 'M' },
    // Eu me Viro
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Qual palavra está escrita corretamente?', options: ['Sonbra', 'Sombra', 'Sombrra', 'Zombra'], answer: 'Sombra' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Qual palavra está escrita corretamente?', options: ['Tanpa', 'Tampa', 'Tãpa', 'Tanpa'], answer: 'Tampa' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Qual palavra está errada?', options: ['Pente', 'Lombo', 'Canto', 'Anbulância'], answer: 'Anbulância' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Complete: "Vamos aca__par na floresta." (m/n)', options: ['m', 'n'], answer: 'm' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Complete: "O elefa__te é grande." (m/n)', options: ['m', 'n'], answer: 'n' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Qual palavra está correta?', options: ['Limpesa', 'Linpeza', 'Limpeza', 'Limpesa'], answer: 'Limpeza' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Qual palavra está errada?', options: ['Empada', 'Bambú', 'Mundo', 'Tonto'], answer: 'Bambú' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Complete: "O co__putador é novo." (m/n)', options: ['m', 'n'], answer: 'm' },
    { topic: 'uso_m_p_b', difficulty: 'Eu me Viro', problem: 'Qual palavra está certa?', options: ['Cantiga', 'Campeão', 'Ponteiro', 'Todas estão certas'], answer: 'Todas estão certas' },
    // Desafiador
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Complete: "O e__blema do time é um leão." (m/n)', options: ['m', 'n'], answer: 'm' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'A regra diz: "Usa-se M antes de..."', options: ['T e D', 'V e F', 'S e Z', 'P e B'], answer: 'P e B' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Qual palavra completa a frase: "O __ morava na selva."?', options: ['bonbeiro', 'bombeiro', 'bonbeiro', 'bombero'], answer: 'bombeiro' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Qual palavra está errada?', options: ['Comprar', 'Sempre', 'Lâmpada', 'Conbinar'], answer: 'Conbinar' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Qual palavra está correta?', options: ['Inportante', 'Importante', 'Inportamte', 'Importamte'], answer: 'Importante' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Complete: "Preciso de um e__prego novo." (m/n)', options: ['m', 'n'], answer: 'm' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Qual frase está totalmente correta?', options: ['A anbulancia chegou tenpo.', 'A ambulância chegou a tempo.', 'A ambulancia chegou a tenpo.', 'A anbulância chegou a tempo.'], answer: 'A ambulância chegou a tempo.' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Qual palavra NÃO segue a regra do M antes de P e B?', options: ['Tambor', 'Pomba', 'Cantar', 'Limpo'], answer: 'Cantar' },
    { topic: 'uso_m_p_b', difficulty: 'Desafiador', problem: 'Complete: "O campeão co__quistou a vitória." (m/n)', options: ['m', 'n'], answer: 'n' },

    // ===================================
    // Leitura e Interpretação (interpretacao_texto)
    // ===================================
    // Fichinha
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "O gato bebeu o leite." Quem bebeu o leite?', options: ['O cachorro', 'O rato', 'O gato', 'O leite'], answer: 'O gato' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "A bola azul caiu no rio." Qual era a cor da bola?', options: ['Verde', 'Amarela', 'Azul', 'Vermelha'], answer: 'Azul' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "O cachorro Totó late muito." Qual é o nome do cachorro?', options: ['Cachorro', 'Late', 'Totó', 'Muito'], answer: 'Totó' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "Mamãe fez um bolo de chocolate." Qual o sabor do bolo?', options: ['Morango', 'Baunilha', 'Chocolate', 'Cenoura'], answer: 'Chocolate' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "O sol está quente hoje." Como está o tempo?', options: ['Frio', 'Chuvoso', 'Quente', 'Nublado'], answer: 'Quente' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "Ana foi à escola de bicicleta." Como Ana foi para a escola?', options: ['A pé', 'De carro', 'De ônibus', 'De bicicleta'], answer: 'De bicicleta' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "O passarinho voou para a árvore." Para onde o passarinho voou?', options: ['Para o chão', 'Para a gaiola', 'Para a árvore', 'Para o ninho'], answer: 'Para a árvore' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "Eu comi uma maçã vermelha." O que eu comi?', options: ['Banana', 'Laranja', 'Maçã', 'Pera'], answer: 'Maçã' },
    { topic: 'interpretacao_texto', difficulty: 'Fichinha', problem: 'Leia: "O palhaço do circo é engraçado." Como é o palhaço?', options: ['Triste', 'Sério', 'Bravo', 'Engraçado'], answer: 'Engraçado' },
    // Eu me Viro
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "Pedro tem um boné azul e uma camisa amarela." Qual a cor da camisa de Pedro?', options: ['Azul', 'Amarela', 'Verde', 'Branca'], answer: 'Amarela' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "A menina correu para casa porque começou a chover." Por que a menina correu?', options: ['Porque estava atrasada', 'Porque viu um amigo', 'Porque começou a chover', 'Porque estava cansada'], answer: 'Porque começou a chover' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "No zoológico, eu vi um leão, um macaco e uma girafa." Qual animal não foi visto?', options: ['Leão', 'Macaco', 'Girafa', 'Elefante'], answer: 'Elefante' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "Maria gosta de sorvete, mas não gosta de bolo." Do que Maria não gosta?', options: ['Sorvete', 'Bolo', 'Doce', 'Fruta'], answer: 'Bolo' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "Depois do almoço, escovei os dentes." O que eu fiz depois do almoço?', options: ['Brinquei', 'Dormi', 'Escovei os dentes', 'Assisti TV'], answer: 'Escovei os dentes' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "A flor mais bonita do jardim é a rosa vermelha." Qual a flor mais bonita?', options: ['Margarida', 'Girassol', 'Rosa', 'Cravo'], answer: 'Rosa' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "O carro vermelho é mais rápido que o carro azul." Qual carro é mais lento?', options: ['O vermelho', 'O azul', 'Os dois são iguais', 'Não diz no texto'], answer: 'O azul' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "O carteiro entregou uma carta para João." Quem recebeu a carta?', options: ['O carteiro', 'João', 'A carta', 'Ninguém'], answer: 'João' },
    { topic: 'interpretacao_texto', difficulty: 'Eu me Viro', problem: 'Leia: "Para fazer a lição, preciso de um lápis e uma borracha." O que não é necessário para a lição?', options: ['Lápis', 'Borracha', 'Tesoura', 'Caderno'], answer: 'Tesoura' },
    // Desafiador
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "Ana e Bia foram ao parque. Ana comprou um sorvete." Quem comprou o sorvete?', options: ['Bia', 'Ana', 'As duas', 'Ninguém'], answer: 'Ana' },
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "O gato de pelo branco dorme no sofá, enquanto o cachorro preto brinca no quintal." Onde está o cachorro?', options: ['No sofá', 'Dormindo', 'No quintal', 'Com o gato'], answer: 'No quintal' },
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "Carlos acordou cedo, tomou café e foi para a escola. Ele só voltou para casa no fim da tarde." O que Carlos fez pela manhã?', options: ['Voltou para casa', 'Ficou dormindo', 'Foi para a escola', 'Brincou'], answer: 'Foi para a escola' },
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "Havia três frutas na cesta: uma maçã, uma banana e uma laranja. Comi a maçã." Quantas frutas sobraram?', options: [1, 2, 3, 0], answer: 2 },
    // FIX: Combined the problem string into a single line to fix a syntax error caused by a newline character.
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "Lucas é mais alto que Marcos, mas é mais baixo que André." Quem é o mais alto de todos?', options: ['Lucas', 'Marcos', 'André', 'São iguais'], answer: 'André' },
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "A festa será no sábado, um dia depois da sexta-feira." Que dia é a festa?', options: ['Sexta-feira', 'Domingo', 'Sábado', 'Quinta-feira'], answer: 'Sábado' },
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "O filme começa às 3 horas. Cheguei ao cinema às 2 horas." Eu cheguei adiantado ou atrasado?', options: ['Atrasado', 'Adiantado', 'Na hora certa', 'Não fui ao cinema'], answer: 'Adiantado' },
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "Todos os meus amigos gostam de futebol, exceto a Laura, que prefere vôlei." Quem gosta de vôlei?', options: ['Todos', 'Meus amigos', 'Laura', 'Ninguém'], answer: 'Laura' },
    { topic: 'interpretacao_texto', difficulty: 'Desafiador', problem: 'Leia: "A tartaruga é um réptil. O cachorro é um mamífero. A galinha é uma ave." O que a tartaruga é?', options: ['Mamífero', 'Ave', 'Réptil', 'Peixe'], answer: 'Réptil' },
  ]
};