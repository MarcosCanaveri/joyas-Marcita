import express from "express";
import productsRouter from "./src/routes/products.routes.js";

const app = express();

const users = [
  { name: "Juan", email: "juan@example.com", id: 1, category: "profesor" },
  { name: "Maria", email: "maria@example.com", id: 2, category: "estudiante" },
  { name: "Pedro", email: "pedro@example.com", id: 3, category: "estudiante" }
]

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', productsRouter);

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === parseInt(id));
  if (user) {
    res.json({
      message: "Usuario encontrado",
      data: user
    })
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const category = req.query.category;

  if (name && category){
    const users_query = users.filter (user => user.name == name && user.category == category);
    if(users_query.length > 0){
      res.json({
        message: "Usuarios encontrados",
        data: users_query
      });
    } else {
      res.status(404).json({'message': 'Usuarios no encontrados'});
    }
  }else if (name) {
    const users_query = users.filter(user => user.name == name);
    if(users_query.length > 0){
      res.json({
        message: "Usuarios encontrados",
        data: users_query
      })
    } else {
      res.status(404).json({'message': 'Usuarios no encontrados'});
    }
  }

  else if (category) {
    const users_query = users.filter(user => user.category == category);
    if(users_query.length > 0){
      res.json({
        message: "Usuarios encontrados",
        data: users_query
      });
    } else {
      res.status(404).json({'message': 'Usuarios no encontrados'});
    }
  }
  else {
    res.status(400).json({'message': 'Debe proporcionar al menos un parámetro de búsqueda'});
  }
});


app.use((req, res, next) => {
  console.log(`Datos recibidos: ${req.method} ${req.url}`);
  next();
});



app.get('/', (req, res) => {
  res.send('Hola desde Express con middlewares!');
});

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.get('/item/:id', (req, res) => {
  const itemId = req.params.id;
  res.send(`Devolviendo el ítem con ID: ${itemId}`);
});

app.get('/items', (req, res) => {
  const category = req.query.category;
  const price = req.query.price;
  res.send(`Categoría: ${category}, Precio: ${price}`);
});

app.use((req, res, next) => {
  res.status(404).send('Recurso no encontrado o ruta inválida');
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});