// função aqui é para popular a lista de usuários
function popularUsers(json) {
  var users = json.users;
  var ul = document.getElementById("user-list");
  for (var i = 0; i < users.length; i++) {
    var li = document.createElement("li");
    li.innerText = users[i].user;
    ul.appendChild(li);
  }
}

// Aqui é uma requisição AJAX para obter o objeto JSON do arquivo db.json
var xhr = new XMLHttpRequest();
xhr.open("GET", "/db.json");
xhr.onload = function() {
  if (xhr.status === 200) {
    // Chama a função para popular a lista de usuários com o objeto JSON
    popularUsers(JSON.parse(xhr.responseText));
  }
  else {
    console.error("Erro ao obter o arquivo db.json. Status da requisição: " + xhr.status);
  }
};
xhr.send();
