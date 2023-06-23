const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/layouts'));


const publicPath = path.join(__dirname);
app.use(express.static(publicPath));

// ...

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'img-users'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, './photo_' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhuma foto foi enviada.');
  }
  res.send('Foto salva com sucesso.');
});

// ...


const port = process.env.PORT || 8000;
app.use('/img-users', express.static(path.join(__dirname, 'public', 'img-users')));

//rotas do sistema abaixo:

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/home/index.html'));
});
app.get('/edit-user', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/editUser/index.html'));
});
app.get('/cadastro-vagas', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/cadastroJobs/index.html'));
});
app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/users/index.html'));
});
app.get('/sidebar', (req, res) => {
  res.render('sidebar');
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});