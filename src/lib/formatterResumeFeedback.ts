export function formatterResumeFeedback(text: string) {
    // Escapa o texto para prevenir a injeção de HTML indesejado
    let escapedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  
    // Trata trechos entre "**" para ficarem em negrito
    escapedText = escapedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  
    // Adiciona uma quebra de linha antes e depois dos títulos
    escapedText = escapedText
      .replace(/(?:\r\n|\r|\n)*(.*:)/g, '<br /><br /><b>$1</b>');
  
    // Insere quebras de linha antes de cada hífen que não esteja no início do texto
    escapedText = escapedText
      .replace(/((?:\r\n|\r|\n).*)(-)/gm, '$1<br />$2');
  
    // Garante que não adiciona uma quebra de linha no início do texto
    escapedText = escapedText.replace(/^<br \/>/, '');
  
    return escapedText;
  }