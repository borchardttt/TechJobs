/* Código abaixo cria a classe usuário cumprindo o requisitos abaixo de:
Criar objeto usando função construtora ou notação literal
(Obrigatório) Criar objetos a partir da definição de classes do ES6 - a classe precisa ser definida em arquivo separado,
 sendo o nome do arquivo em letras minúsculas no estilo dashed-case e nome da classe em UpperCamelCase
Fazendo Acesso aos elementos DOM do HTML via referência DOM pelo id do elemento HTML -
 acesso sem uso do getElementByID ou querySelector, o id do objeto DOM é o próprio nome da variável
 funções arrow
 auto executável
 aninhada
*/
class Usuario {
  alterarPerfil() {
    function validarResposta(resposta) {
      return resposta && resposta.match(/^(sim|s)$/i);
    }
    const resposta = prompt("Deseja alterar o seu perfil? Digite SIM ou NÃO.");

    if (validarResposta(resposta)) {
      document.querySelector('form').submit();
    }
  }

  constructor() {
    this.inputPhoto = document.getElementById('inputPhoto');
    this.photoPreview = document.getElementById('photoPreview');

    //função arrow
    this.inputPhoto.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        const imageUrl = event.target.result;
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const MAX_WIDTH = 120;
          const MAX_HEIGHT = 120;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          this.photoPreview.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
        };
      });

      reader.readAsDataURL(file);
    });
    
  }
}

class UsuarioAdmin extends Usuario {
  constructor() {
    super();
  }

  mostrarConteudoAdmin() {
    const usuarioLogado = "Gabriel Borchardt";

    if (this.usuario === usuarioLogado) {
      fetch("/public/pages/home-admin/index.html")
        .then(response => response.text())
        .then(data => {
          const conteudo = document.getElementById("conteudo");
          conteudo.innerHTML = data;
        })
        .catch(error => console.error(error));
    }
  }
}

    inputPhoto = document.getElementById('inputPhoto');
    photoPreview = document.getElementById('photoPreview');

    inputPhoto.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        const imageUrl = event.target.result;
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const MAX_WIDTH = 120;
          const MAX_HEIGHT = 120;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          this.photoPreview.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
        };
      });

      reader.readAsDataURL(file);
    });

    document.addEventListener("DOMContentLoaded", function() {
      if (sessionStorage.getItem('username')) {
        const nomeUsuario = sessionStorage.getItem('username');
        const inputNome = document.querySelector('#name');
        const userArea = sessionStorage.getItem('area');
        const inputArea = document.querySelector('#selectJobs');
        if (inputNome) {
          inputNome.value = nomeUsuario;
        }
        if (inputArea) {
          inputArea.value = userArea;
        }
      }
    });

    function updateUser() {
      const userId = sessionStorage.getItem('userId');
      const areaUsuario = document.getElementById('selectJobs').value;
      
      const userData = {
        area: areaUsuario
      };
    
      $.ajax({
        url: `http://localhost:3000/users/${userId}`,
        method: 'PATCH',
        data: JSON.stringify(userData),
        contentType: 'application/json',
        success: function(response) {
          console.log('Dados do usuário atualizados com sucesso:', response);
        },
        error: function(error) {
          console.error('Erro ao atualizar os dados do usuário:', error);
        }
      });
    
      const fileInput = document.getElementById('inputPhoto');
      const photo = fileInput.files[0]; // Obtém o arquivo de foto selecionado
    
      const formData = new FormData();
      formData.append('photo', photo);
    
      $.ajax({
        url: 'http://localhost:3000/upload',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          console.log('Foto enviada com sucesso:', response);
          // Redirecione para outra página ou faça qualquer ação necessária
        },
        error: function(error) {
          console.error('Erro ao enviar a foto:', error);
        }
      });
    }
    
    document.getElementById('userForm').addEventListener('submit', function(event) {
      event.preventDefault();
      updateUser();
    });

    
    function carregarFotoUsuario() {
      $.ajax({
        url: 'http://localhost:3000/users',
        method: 'GET',
        success: function(response) {
          if (response && Array.isArray(response) && response.length > 0) {
            const usuario = response.find(user => user.id === parseInt(userId));
            if (usuario && usuario.foto) {
              const fotoUrl = `http://localhost:8000/img-users/${usuario.foto}`;
              document.getElementById('photoPreview').src = fotoUrl;
            }
          }
        },
        error: function(error) {
          console.error('Erro ao carregar a foto do usuário:', error);
        }
      });
    }
    carregarFotoUsuario();