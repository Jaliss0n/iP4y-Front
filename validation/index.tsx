export const validaCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");
  
    if (cpf.length !== 11) {
      return false;
    }
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    let total = 0;
    for (let i = 0; i < 9; i++) {
      total += Number(cpf.charAt(i)) * (10 - i);
    }
    const resto = total % 11;
    const digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  
    total = 0;
    for (let i = 0; i < 10; i++) {
      total += Number(cpf.charAt(i)) * (11 - i);
    }
    const resto2 = total % 11;
    const digitoVerificador2 = resto2 < 2 ? 0 : 11 - resto2;
  
    if (
      Number(cpf.charAt(9)) === digitoVerificador1 &&
      Number(cpf.charAt(10)) === digitoVerificador2
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  export const validarEmail = (email: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
  };
  
  export const validarData = (data: string) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
  
    if (!regex.test(data)) {
      return false; 
    }
  
    const partesData = data.split("-");
    const dia = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]);
    const ano = parseInt(partesData[2]);
  
    if (ano < 1000 || ano > 9999 || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      return false;
    }
  
    if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
      if (dia > 30) {
        return false;
      }
    } else if (mes === 2) {
      if ((ano % 4 !== 0 || (ano % 100 === 0 && ano % 400 !== 0)) && dia > 28) {
        return false;
      }
      if (dia > 29) {
        return false;
      }
    }
  
    return true;
  };

  export function formatCPFString(input: string): string {
    // Remove todos os caracteres não numéricos da string
    const cleanedInput: string = input.replace(/\D/g, '');
  
    // Verifica se a string está vazia
    if (cleanedInput.length === 0) {
      return cleanedInput; // Retorna a string original se estiver vazia
    }
  
    // Divide a string em grupos de 3 dígitos
    const groups = cleanedInput.match(/\d{1,3}/g);
  
    // Se não houver grupos, retorne a string original
    if (!groups) {
      return cleanedInput;
    }
  
    // Formata os grupos de dígitos separados por ponto
    const formattedGroups = groups.slice(0, -1).join('.') + '-' + groups[groups.length - 1];
  
    return formattedGroups;
  }
  
  
  
  export function formatDateString(input: string): string {
   
    const cleanedInput: string = input.replace(/\D/g, '');
  
   
    const matchResult: string[] | null = cleanedInput.match(/\d{1,2}/g);
  
    if (matchResult === null) {
      return cleanedInput; 
    }
  
    const formattedInput: string = matchResult
      .map((part, index) => {
        if (index === 0) {
          return part;
        }
        if (index === 1) {
          return `-${part}`;
        }
        if (index === 2) {
          return `-${part}`;
        }
        return part;
      })
      .join('')
      .slice(0, 10);
  
    return formattedInput;
  }