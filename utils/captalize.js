function captalize(palavra) {
   return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
}

export default captalize