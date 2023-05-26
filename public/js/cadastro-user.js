const formCadastro = document.querySelector('#cadastro-form');

formCadastro.addEventListener('submit', function(event) {
  event.preventDefault();

  const user = document.querySelector('input[name=user]').value;
  const area = document.querySelector('select[name=area]').value;
  const password = document.querySelector('input[name=password]').value;
  let data = { user, area, password };

  swal({
    title: "Confirmação",
    text: "Tem certeza que deseja criar o cadastro?",
    icon: "info",
    buttons: {
      cancel: "Cancelar",
      confirm: {
        text: "Confirmar",
        value: "confirm"
      }
    }
  }).then((value) => {
    if (value === "confirm") {
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
        swal({
          title: "Sucesso",
          text: "Cadastro realizado com sucesso!",
          icon: "success",
          timer: 2000,
          buttons: false
        }).then(() => {
          setTimeout(() => {
            window.location.href = '/login';
          }, 500);
        });
      })
      .catch(error => console.error('Erro ao realizar cadastro:', error));
    }
  });
});

// Função auto-executável
(function() {
  // Evento de carregamento do documento - onload
  window.onload = function() {
    console.log('Página carregada com sucesso!');
  }
})();
