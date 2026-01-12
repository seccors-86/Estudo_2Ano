
import type { Topic, Subject } from '../types';

export const TOPIC_DATA: { [key in Subject]: Topic[] } = {
  mathematics: [
    { id: 'solidos_geometricos', label: 'Sólidos Geométricos' },
    { id: 'adicao_subtracao', label: 'Adição e Subtração' },
    { id: 'multiplicacao', label: 'Noções de Multiplicação' },
    { id: 'divisao', label: 'Noções de Divisão' },
  ],
  portuguese: [
    { id: 'sinonimos_antonimos', label: 'Sinônimos e Antônimos' },
    { id: 'substantivos', label: 'Substantivos Comuns/Próprios' },
    { id: 'genero', label: 'Gênero Masculino/Feminino' },
    { id: 'ortografia_r_s', label: 'Uso do R/RR e S/SS' },
    { id: 'fabula', label: 'Gênero Textual Fábula' },
    { id: 'singular_plural', label: 'Singular e Plural' },
    { id: 'aumentativo_diminutivo', label: 'Aumentativo e Diminutivo' },
    { id: 'uso_m_p_b', label: 'Uso do M antes de P e B' },
    { id: 'interpretacao_texto', label: 'Leitura e Interpretação' },
  ],
  english: [
    { id: 'basic_vocabulary', label: 'Vocabulário Básico' },
    { id: 'colors_numbers', label: 'Cores e Números' },
    { id: 'animals_nature', label: 'Animais e Natureza' },
  ]
};
