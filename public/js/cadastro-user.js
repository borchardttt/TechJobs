const formCadastro = document.querySelector('#cadastro-form');

formCadastro.addEventListener('submit', function(event) {
  event.preventDefault();

  const user = document.querySelector('input[name=user]').value;
  const area = document.querySelector('select[name=area]').value;
  const password = document.querySelector('input[name=password]').value;
  let data = { user, area, password };


  const confirmacaoCadastro = window.prompt('Tem certeza que deseja criar o cadastro?');

  if (confirmacaoCadastro === 'sim') {
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
      window.alert('Cadastro realizado com sucesso!');
      setTimeout(function() {
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