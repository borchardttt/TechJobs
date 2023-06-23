function popularUsers(json) {
  const { users } = json;
  const usersRow = document.getElementById('user-list');

  users.forEach((user) => {
    const tr = document.createElement('tr');
    const tdUser = document.createElement('td');
    const tdArea = document.createElement('td');

    tdUser.innerText = user.user;
    tdArea.innerText = user.area;

    tr.appendChild(tdUser);
    tr.appendChild(tdArea);

    usersRow.appendChild(tr);
  });
}

function popularEmpresas(json) {
  const { empresas } = json;
  const empresasRow = document.getElementById('empresas-list');

  empresas.forEach((empresa) => {
    const tr = document.createElement('tr');
    const tdEmpresaName = document.createElement('td');
    const tdCNPJ = document.createElement('td');

    tdEmpresaName.innerText = empresa.nameEmpresa;
    tdCNPJ.innerText = empresa.cnpj;

    tr.appendChild(tdEmpresaName);
    tr.appendChild(tdCNPJ);

    empresasRow.appendChild(tr);
  });
}

// Aqui é uma requisição AJAX para obter o objeto JSON do arquivo db.json com return
const xhr = new XMLHttpRequest();
xhr.open('GET', '/db.json');
xhr.onload = function () {
  if (xhr.status === 200) {
    popularUsers(JSON.parse(xhr.responseText));
    popularEmpresas(JSON.parse(xhr.responseText));
  } else {
    console.error(`Erro ao obter o arquivo db.json. Status da requisição: ${xhr.status}`);
  }
};
xhr.send();

// manipulação de array
const filteredUsers = json.users.filter((user) => user.user.startsWith('A'));

// manipulação de string/ expressão regular
const fullNames = json.users.map((user) => user.user.split(' ')[0].concat(' ', user.user.split(' ')[1]));
// string template
function formatUserInfo(user) {
  return `
    <div class="user">
      <h2>${user.name}</h2>
      <p>${user.area}</p>
    </div>
  `;
}

const usersHtml = json.users.map((user) => formatUserInfo(user)).join('');
