function popularUsers(json) {
  var users = json.users;
  var usersRow = document.getElementById("user-list");
  
  users.forEach(function(user) {
    var tr = document.createElement("tr");
    var tdUser = document.createElement("td");
    var tdArea = document.createElement("td");
    
    tdUser.innerText = user.user;
    tdArea.innerText = user.area;
    
    tr.appendChild(tdUser);
    tr.appendChild(tdArea);
    
    usersRow.appendChild(tr);
  });
}

function popularEmpresas(json) {
  var empresas = json.empresas;
  var empresasRow = document.getElementById("empresas-list");
  
  empresas.forEach(function(empresa) {
    var tr = document.createElement("tr");
    var tdEmpresaName = document.createElement("td");
    var tdCNPJ = document.createElement("td");
    
    tdEmpresaName.innerText = empresa.nameEmpresa;
    tdCNPJ.innerText = empresa.cnpj;
    
    tr.appendChild(tdEmpresaName);
    tr.appendChild(tdCNPJ);
    
    empresasRow.appendChild(tr);
  });
}

// Aqui é uma requisição AJAX para obter o objeto JSON do arquivo db.json com return
var xhr = new XMLHttpRequest();
xhr.open("GET", "/db.json");
xhr.onload = function() {
  if (xhr.status === 200) {
    popularUsers(JSON.parse(xhr.responseText));
    popularEmpresas(JSON.parse(xhr.responseText));
  }
  else {
    return console.error("Erro ao obter o arquivo db.json. Status da requisição: " + xhr.status);
  }
};
xhr.send();
