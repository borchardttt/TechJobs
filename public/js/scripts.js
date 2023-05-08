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

