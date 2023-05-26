// Aqui é uma requisição AJAX para obter o objeto JSON da API localhost:3000/vagas
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/vagas');
xhr.onload = function () {
  if (xhr.status === 200) {
    const vagas = JSON.parse(xhr.responseText);

    // Criando um card para cada vaga
    vagas.forEach((vaga) => {
      const card = document.createElement('div');
      card.className = 'card';

      const cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
      cardHeader.innerText = vaga.nomeVaga;
      card.appendChild(cardHeader);

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const descricaoVaga = document.createElement('p');
      descricaoVaga.id = 'descricao-vaga';
      descricaoVaga.innerText = vaga.descVaga;
      cardBody.appendChild(descricaoVaga);

      const requisitos = document.createElement('ul');
      requisitos.id = 'requisitos';
      const requisitosArray = vaga.requisitos.split('•');
      for (let i = 1; i < requisitosArray.length; i++) {
        const requisito = requisitosArray[i].trim();
        const li = document.createElement('li');
        li.innerText = requisito;
        requisitos.appendChild(li);
      }
      cardBody.appendChild(requisitos);

      const candidatarBtn = document.createElement('button');
      candidatarBtn.className = 'btn btn-primary';
      candidatarBtn.style.float = 'right';
      candidatarBtn.innerText = 'ME CANDIDATAR';
      cardBody.appendChild(candidatarBtn);

      card.appendChild(cardBody);

      // Adicionando o card à página
      const vagasList = document.getElementById('vagas-list');
      vagasList.appendChild(card);
    });
  } else {
    console.error(`Erro ao obter as vagas da API. Status da requisição: ${xhr.status}`);
  }
};
xhr.send();

const selectDropdown = document.querySelector('.select-dropdown');
const searchInput = document.querySelector('.select-search input');
const options = Array.from(selectDropdown.querySelectorAll('li'));
const selectJobs = document.getElementById('selectJobs');

searchInput.addEventListener('click', () => {
  selectDropdown.classList.remove('hidden');
});

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();

  options.forEach((option) => {
    if (option.textContent.toLowerCase().indexOf(searchValue) !== -1) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
});

options.forEach((option) => {
  const checkbox = option.querySelector('input[type="checkbox"]');
  const label = option.querySelector('label');

  checkbox.addEventListener('change', () => {
    const selectedOptions = options.filter((option) => option.querySelector('input[type="checkbox"]').checked).map((option) => option.querySelector('label').textContent);
    selectJobs.value = selectedOptions;

    // Preenchendo o campo de entrada com base nos checkboxes selecionados
    const checkedValues = options.filter((option) => option.querySelector('input[type="checkbox"]').checked).map((option) => option.querySelector('label').textContent);
    searchInput.value = checkedValues.join(', ');
  });

  label.addEventListener('click', () => {
    if (checkbox.checked) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  });
});

document.addEventListener('click', (e) => {
  const { target } = e;

  if (!selectDropdown.contains(target) && target !== searchInput) {
    selectDropdown.classList.add('select-closed');
  }
});

searchInput.addEventListener('click', () => {
  selectDropdown.classList.remove('select-closed');
});

selectDropdown.addEventListener('click', () => {
  selectDropdown.classList.remove('select-closed');
});

options.forEach((option) => {
  const checkbox = option.querySelector('input[type="checkbox"]');
  const label = option.querySelector('label');

  checkbox.addEventListener('change', opçõesSelecionadas);
  label.addEventListener('click', opçõesSelecionadas);
});

function opçõesSelecionadas() {
  const selectedOptions = options.filter((option) => option.querySelector('input[type="checkbox"]').checked).map((option) => option.querySelector('label').textContent);
  selectJobs.value = selectedOptions;
  searchInput.value = valoresSelecionados().join(', ');
}

function valoresSelecionados() {
  return options.filter((option) => option.querySelector('input[type="checkbox"]').checked).map((option) => option.querySelector('label').textContent);
}

// Seleciona o botão de busca e adiciona um evento de clique
const btnSearch = document.querySelector('#btn-search');
btnSearch.addEventListener('click', searchVagas);

// Seleciona o elemento HTML que contém a lista de vagas e o elemento de alerta
const vagasList = document.querySelector('#vagas-list');
const alertNoVagas = document.querySelector('#alert-no-vagas');

// Função que busca as vagas de acordo com o valor digitado pelo usuário
function searchVagas() {
  // Seleciona o input de busca e o valor digitado pelo usuário
  const inputSearch = document.querySelector('.select-search input[type="text"]');
  const searchValue = inputSearch.value.trim();

  // Separa os requisitos por vírgula
  const requisitos = searchValue.split(',').map((req) => req.trim()).filter((req) => req !== '');

  // Faz a requisição para a API com os requisitos informados
  fetch(`http://localhost:3000/vagas?requisitos_like=${requisitos.join('&requisitos_like=')}`)
    .then((response) => response.json())
    .then((vagas) => {
      // Verifica se há vagas com os requisitos informados
      if (vagas.length > 0) {
        // Se houver vagas, cria a lista de vagas e exibe
        vagasList.innerHTML = '';
        vagas.forEach((vaga) => {
          const vagaHTML = `
              <div class="card mb-3">
                  <div class="card-header">${vaga.nomeVaga}</div>
                  <div class="card-body">
                      <p class="card-text">${vaga.descVaga}</p>
                      <ul class="list-group" style="margin: 0px 0px 16px; padding: 0px 0px 0px 17px;">
                          ${vaga.requisitos.split('\n').map((req) => `<li class="list-group">${req}</li>`).join('')}
                      </ul>
                      <button class="btn btn-primary pull-right">ME CANDIDATAR</button>
                  </div>
              </div>
          `;
          vagasList.insertAdjacentHTML('beforeend', vagaHTML);
        });

        alertNoVagas.classList.add('d-none');
      } else {
        vagasList.innerHTML = '';
        alertNoVagas.classList.remove('d-none');
      }
    })
    .catch((error) => console.error(error));
}
