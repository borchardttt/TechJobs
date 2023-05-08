const formCadastro = document.querySelector('#cadastro-form');
// Função anônima com argumento
formCadastro.addEventListener('submit', function(event) {
  event.preventDefault();

  const user = document.querySelector('input[name=user]').value;
  const area = document.querySelector('select[name=area]').value;
  const password = document.querySelector('input[name=password]').value;

  // Exibe uma caixa de diálogo prompt
  const confirmacaoCadastro = window.prompt('Tem certeza que deseja criar o cadastro?');

  // Verifica a resposta da caixa de diálogo prompt
  if (confirmacaoCadastro === 'sim') {
    const data = { user, area, password };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Cadastro realizado com sucesso:', data);
      // Exibe uma caixa de diálogo alert
      window.alert('Cadastro realizado com sucesso!');
      // Define um temporizador de 2 segundos com a função setTimeout
      setTimeout(function() {
        // Redireciona o usuário para outra página com a propriedade location.href
        window.location.href = 'http://localhost:3000';
      }, 2000);
    })
    .catch(error => console.error('Erro ao realizar cadastro:', error));
  }
});

// Função auto-executável
(function() {
  // Evento de carregamento do documento - onload
  window.onload = function() {
    console.log('Página carregada com sucesso!');
  }
})