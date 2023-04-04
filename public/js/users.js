// Definição da função para popular a lista de usuários
function popularUsers(json) {
  var users = json.users;
  var ul = document.getElementById("user-list");
  for (var i = 0; i < users.length; i++) {
    var li = document.createElement("li");
    li.innerText = users[i].name;
    ul.appendChild(li);
  }
}

// Obtém o objeto JSON a partir do arquivo db.json
fetch('/db.json')
  .then(response => response.json())
  .then(data => {
    // Chamando a função para popular a lista de usuários com o objeto JSON
    popularUsers(data);
  })
  .catch(error => console.error(error));
