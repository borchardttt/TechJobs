const formEmpresa = document.querySelector('#empresa-form');
formEmpresa.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameEmpresa = document.querySelector('input[name=empresa]').value;
  const cnpj = document.querySelector('input[name=cnpj]').value;
  const password = document.querySelector('input[name=password]').value;

  // Exibe uma janela de confirmação
  if (window.confirm('Tem certeza que deseja criar o cadastro?')) {
    const data = { nameEmpresa, cnpj, password };

    fetch('http://localhost:3000/empresas', {
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
