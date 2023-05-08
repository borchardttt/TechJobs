// Aqui é uma requisição AJAX para obter o objeto JSON da API localhost:3000/vagas
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/vagas");
xhr.onload = function() {
  if (xhr.status === 200) {
    var vagas = JSON.parse(xhr.responseText);
    
    // Criando um card para cada vaga
    vagas.forEach(function(vaga) {
      var card = document.createElement("div");
      card.className = "card";
      
      var cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      cardHeader.innerText = vaga.nomeVaga;
      card.appendChild(cardHeader);
      
      var cardBody = document.createElement("div");
      cardBody.className = "card-body";
      
      var descricaoVaga = document.createElement("p");
      descricaoVaga.id = "descricao-vaga";
      descricaoVaga.innerText = vaga.descVaga;
      cardBody.appendChild(descricaoVaga);
      
      var requisitos = document.createElement("ul");
      requisitos.id = "requisitos";
      var requisitosArray = vaga.requisitos.split("•");
      for (var i = 1; i < requisitosArray.length; i++) {
        var requisito = requisitosArray[i].trim();
        var li = document.createElement("li");
        li.innerText = requisito;
        requisitos.appendChild(li);
      }
      cardBody.appendChild(requisitos);
      
      var candidatarBtn = document.createElement("button");
      candidatarBtn.className = "btn btn-primary";
      candidatarBtn.style.float = "right";
      candidatarBtn.innerText = "ME CANDIDATAR";
      cardBody.appendChild(candidatarBtn);
      
      card.appendChild(cardBody);
      
      // Adicionando o card à página
      var vagasList = document.getElementById("vagas-list");
      vagasList.appendChild(card);
    });
  }
  else {
    console.error("Erro ao obter as vagas da API. Status da requisição: " + xhr.status);
  }
};
xhr.send();
const selectDropdown = document.querySelector('.select-dropdown');
const searchInput = document.querySelector('.select-search input');
const options = Array.from(selectDropdown.querySelectorAll('li'));

searchInput.addEventListener('click', () => {
  selectDropdown.classList.remove('hidden');
});

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();

  options.forEach(option => {
    if (option.textContent.toLowerCase().indexOf(searchValue) !== -1) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
});

options.forEach(option => {
  const checkbox = option.querySelector('input[type="checkbox"]');
  const label = option.querySelector('label');

  checkbox.addEventListener('change', () => {
    const selectedOptions = options.filter(option => option.querySelector('input[type="checkbox"]').checked).map(option => option.querySelector('input[type="checkbox"]').value);
    console.log(selectedOptions);
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
  const target = e.target;

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

options.forEach(option => {
  const checkbox = option.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', () => {
    const selectedOptions = options.filter(option => option.querySelector('input[type="checkbox"]').checked).map(option => option.querySelector('input[type="checkbox"]').value);
    console.log(selectedOptions);
  });
});