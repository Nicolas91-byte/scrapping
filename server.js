const express = require('express');
const fs = require('fs');
const app = express();
const axios=require('axios');
const xml2js=require('xml2js');
const { parseString } = require('xml2js');

const port = 3000;

// Configura el middleware para servir archivos estáticos desde la carpeta actual
app.use(express.static(__dirname));

// Ruta para manejar la solicitud GET a '/productos'
app.get('/productos', (req, res) => {
  // Lee el archivo JSON
  fs.readFile('archivo.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Convierte el contenido del archivo a objeto JSON
    const jsonData = JSON.parse(data);

    // Envía el objeto JSON como respuesta
    res.json(jsonData);
  });
});

// Ruta para manejar la solicitud GET a la raíz ('/')
app.get('/', (req, res) => {
  // Lee el archivo HTML y envíalo como respuesta
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo HTML', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Envía el contenido del archivo HTML como respuesta
    res.send(data);
  });
});

app.get('/rssMarca', async(req, res)=>{
  try{
  // Realiza la petición HTTP para obtener el XML.
  const response= await
  axios.get('https://estaticos.marca.com/rss/portada.xml');
  const xml = response.data;
  //Convierte XML a JSON
  xml2js.parseString(xml, { explicitArray: false }, (err, result)=> {
  if (err){
  throw err;
  }
  //Envía el JSON al cliente
  res.json(result);
  });
  } catch (error){
  res.status(500).send('Error al obtener el feed RSS');
  }
  }
  );

  app.get('/atom', async (req, res) => {
    try {
      // Realiza la petición HTTP para obtener el XML.
      const response = await axios.get('https://www.mujerhoy.com/rss/atom/portada');
      const xml = response.data;
  
      // Convierte XML a JSON
      parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error al convertir XML a JSON:', err);
          res.status(500).send('Error interno del servidor');
          return;
        }
        // Envía el JSON al cliente
        res.json(result);
      });
    } catch (error) {
      console.error('Error al obtener el feed Atom:', error);
      res.status(500).send('Error al obtener el feed.');
    }
  });

// Ruta para manejar la solicitud GET a  ('/noticiasrss')
app.get('/noticiasrss', (req, res) => {
  // Lee el archivo HTML y envíalo como respuesta
  fs.readFile('noticiasrss.html', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo HTML', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Envía el contenido del archivo HTML como respuesta
    res.send(data);
  });
});

// Ruta para manejar la solicitud GET a  ('/noticiasrss')
app.get('/noticiasatom', (req, res) => {
  // Lee el archivo HTML y envíalo como respuesta
  fs.readFile('noticiasatom.html', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo HTML', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Envía el contenido del archivo HTML como respuesta
    res.send(data);
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${port}`);
});
