export function formatterFeedback(entrada: string) {
    // Captura os segmentos de texto para cada seção, incluindo a formatação com asteriscos
  const avaliacaoMatch = entrada.match(/\*\*Avaliação da Resposta:\*\*\n([\s\S]*?)\n\n\*\*Nota para a resposta:\*\*/);
  const notaMatch = entrada.match(/\*\*Nota para a resposta:\*\*\n([\s\S]*?)\n\n\*\*Melhoria Sugerida:\*\*/);
  const melhoriaMatch = entrada.match(/\*\*Melhoria Sugerida:\*\*\n([\s\S]*?)\n\n\*\*Resposta Recomendada:\*\*/);
  const respostaMatch = entrada.match(/\*\*Resposta Recomendada:\*\*\n([\s\S]*)$/);

  // Cria o objeto com as propriedades extraídas
  const obj = {
    avaliacaoDeResposta: avaliacaoMatch ? avaliacaoMatch[1].trim() : '',
    NotaDaResposta: notaMatch ? notaMatch[1].trim() : '',
    MelhoriaSugerida: melhoriaMatch ? melhoriaMatch[1].trim() : '',
    RespostaRecomendada: respostaMatch ? respostaMatch[1].trim() : ''
  };

  return obj;
}