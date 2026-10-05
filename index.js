import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log(`Datos recibidos: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hola desde Express con middlewares!');
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});