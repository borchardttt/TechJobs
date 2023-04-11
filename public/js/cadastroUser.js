const formCadastro = document.querySelector('#cadastro-form');
formCadastro.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = document.querySelector('input[name=user]').value;
  const area = document.querySelector('select[name=area]').value;
  const password = document.querySelector('input[name=password]').value;

  // Exibe uma janela de confirmação
  if (window.confirm('Tem certeza que deseja criar o cadastro?')) {
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
      alert('Cadastro realizado com sucesso!');
    })
    .catch(error => console.error('Erro ao realizar cadastro:', error));
  }
});
