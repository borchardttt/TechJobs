const vagaRequisitos = document.getElementsByName("vagaRequisitos")[0];

vagaRequisitos.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    const text = this.value;
    let before, after;
    if (start === 0) {
      before = "• ";
      after = text.substring(end, text.length);
    } else {
      before = text.substring(0, start);
      after = text.substring(end, text.length);
      before = before.replace(/\n$/, "");
      before = `${before}\n• `;
    }
    this.value = `${before}${after}`;
    this.selectionStart = this.selectionEnd = start + 3;
  }
});

vagaRequisitos.value = "• ";

const formCadastro = document.querySelector('#vagaForm');

// Função anônima com argumento
formCadastro.addEventListener('submit', function(event) {
  event.preventDefault();

  const nomeVaga = document.querySelector('input[name=vagaNome]').value;
  const descVaga = document.querySelector('textarea[name=vagaDescricao]').value;
  const requisitos = document.querySelector('textarea[name=vagaRequisitos]').value;

  // Exibe uma caixa de diálogo SweetAlert com confirmação
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
      const data = { nomeVaga, descVaga, requisitos };

      fetch('http://localhost:3000/vagas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Cadastro realizado com sucesso:', data);
        // Exibe uma caixa de diálogo SweetAlert de sucesso
        swal({
          title: "Sucesso",
          text: "Cadastro realizado com sucesso!",
          icon: "success",
          timer: 2000,
          buttons: false
        }).then(() => {
          // Define um atraso antes de redirecionar o usuário para outra página
          setTimeout(() => {
            window.location.href = 'http://localhost:3000';
          }, 2000);
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
