  // Inicia a contagem do tempo logado em zero
  let tempoLogado = 0;
  
  // Define a função que será executada a cada 10 segundos
  const atualizarTempoLogado = () => {
    tempoLogado += 10; // Incrementa o tempo logado em 10 segundos
    console.log(`Tempo logado: ${tempoLogado} segundos`);
  }
  
  // Inicia o setInterval para executar a função a cada 10 segundos
  const intervalID = setInterval(atualizarTempoLogado, 10000);
  
  // Ao submeter o formulário de login, para o setInterval
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearInterval(intervalID);
    console.log('Login realizado com sucesso!');
  });

  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', () => {
      console.log(`Input "${inputs[i].name}" recebeu foco.`);
    });
    inputs[i].addEventListener('blur', () => {
      console.log(`Input "${inputs[i].name}" perdeu foco.`);
    });
  }
  

  
