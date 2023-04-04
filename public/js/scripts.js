/*Scripts do sistema TechJobs
  Feito por: Gabriel Borchardt, Universidade Tecnologica Federal do Paraná
  Curso: Tecnólogo em Sistemas Para Internet
*/

//script para ocultar form de user CPF e aparecer o form de EMPRESA
$(document).ready(function() {
  $('#empresaCheckbox').change(function() {
    if(this.checked) {
      $('#empresa-form').show();
      $('#cadastro-form').hide();
    } else {
      $('#empresa-form').hide();
      $('#cadastro-form').show(); 
    }
  });
  $('#cnpj').mask('00.000.000/0000-00', {reverse: true});
});

//script para exibir a div de sucesso após o form de cadastro ser enviado e direcionar para o login
$(document).ready(function() {
  $("#cadastro-form").submit(function(event) {
    event.preventDefault();
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      type: form.attr("method"),
      data: form.serialize(),
      success: function(response) {
        form[0].reset();
        $("#success-message").fadeIn().delay(3000).fadeOut(function() {
          window.location.href = "/index.html";
        });
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
  });
});