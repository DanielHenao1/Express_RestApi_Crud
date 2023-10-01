// Importa Express.js
import express from "express";
import morgan from "morgan";

// Crea una instancia de la aplicación Express
const app = express();

//Creamos un arreglo de datos para poder hacer la pruebas - lo que se hace nomalmente es conectar a una base de datos
let productos = [
  {
    name: "Daniel",
    Price: 3000,
    id: 1,
  },
  {
    name: "Samuel",
    Price: 10000,
    id: 2,
  },
];

// ********************** Definir rutas y configuraciones aquí... *********************** \\

// Muestra un informacion al hacer una peticion get de prueba (GET / 404 1.723 ms - 139)
app.use(morgan("dev"));
// Utilizamos un middelware de express para poder resivir el post (express.json())
app.use(express.json());

// Metodo Get
app.get("/productos", (req, res) => {
  res.send(productos);
});

// Metodo post
app.post("/productos", (req, res) => {
  const newProducts = { ...req.body, id: productos.length + 1 };
  productos.push(newProducts);
  res.send("Creando un nuevo producto");
});

// Metodo put
app.put("/productos/:id", (req, res) => {
  const nuevaData = req.body;
  const productoEncontrado = productos.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!productoEncontrado)
    return res.json({
      message: "Producto Actualizado",
    });

  // utilizamos el metodo map y operador ternario (? :) para actualizar los datos (por ejemplo, si el id es igual a 1, se actualiza
  productos = productos.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...nuevaData } : p
  );
  console.log(productos);
  res.send("Actualizando un producto correctamente");
});

// Metodo delete
app.delete("/productos/:id", (req, res) => {
  const productoEncontrado = productos.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!productoEncontrado)
    return res.status(404).json({
      message: "Producto no encontrado",
    });

  productos = productos.filter((p) => p.id !== parseInt(req.params.id));

  res.send("Eliminando un producto");
});

// Metodo get + parametro :id
app.get("/productos/:id", (req, res) => {
  // const productoEncontrado = productos.find((p) => {
  //   return p.id == parseInt(req.params.id);
  // });

  // Esta es la forma de hacerlo mas corta que la anterior evitamos poner (llaves y return)
  const productoEncontrado = productos.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!productoEncontrado) {
    return res.status(404).json({
      message: "Producto no encontrado",
    });
  }
  res.send(productoEncontrado);
});

// Inicia el servidor en un puerto específico (por ejemplo, el puerto 3000)
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
