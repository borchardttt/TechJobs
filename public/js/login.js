swal_success = function (message = 'Sucesso!', text = ' ', autoClose = true) {
  swal({
      title: message,
      text: text,
      icon: "success",
      button: "Ok"
  });
}

swal_error = function (message = 'Erro!', text = ' ', autoClose = true) {
  swal({
    title: message,
    text: text,
    icon: "error",
    button: "Ok"
  });

  if (autoClose) {
    setTimeout(function () {
      swal.close();
    }, 2000);
  }
};

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

  const username = form.querySelector('input[name="user"]').value;
  const password = form.querySelector('input[name="password"]').value;

  $.getJSON('db.json', function(data) {
    let userId = null;
    let userArea = null;
    $.each(data.users, function(index, user) {
      if (user.user === username && user.password === password) {
        userId = user.id;
        userArea = user.area;
        return false;
      }
    });

    if (userId !== null) {
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("area", userArea);
      swal_success('Login realizado com sucesso!');
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    } else {
      swal_error("Nome de usuário ou senha incorretos.");
    }
  });
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
