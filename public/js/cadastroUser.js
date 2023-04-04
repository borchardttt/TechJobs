
var select = document.querySelector('select');
var requestURL = 'https://borchardttt.github.io/TechJobs/db.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var users = request.response;
  populateselect(users);
}
