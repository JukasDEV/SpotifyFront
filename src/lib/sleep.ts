//me de uma funcao de sleep usando new Promise
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
