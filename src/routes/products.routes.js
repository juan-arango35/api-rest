import { Router } from "express";
import { prisma } from "../db.js";
const router = Router();

//hacemos el metodo get para obtener los datos de las tabla products
router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});


//para traer un unico producto:
router.get("/products/:id", async (req, res) => {
  const producto = await prisma.product.findFirst({
    where:{
      id: Number(req.params.id)},
      include:{
        category: true
      }
  })

  if(!producto){
    return res.status(404).json({error: "Producto no encontrado"})
  }
  res.json(producto)
})





//metodo post para crear elementos en nuestra tabla
router.post("/products", async (req, res) => {
  try {
    const { name, price, categoryId, stock } = req.body;
    console.log(req.body); // Muestra el cuerpo de la solicitud


    if (!name || !categoryId) {
      return res.status(400).json({ error: "El nombre y el categoryId son obligatorios." });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: price || 999, // Si no se envía `price`, usa el valor por defecto del modelo
        categoryId, // Debe ser un ID válido de la tabla `Category`
        stock: stock || 0, // Si no se envía `stock`, usa el valor por defecto del modelo
      },
    });

    res.status(201).json(newProduct); // Responde con el producto creado
  } catch (error) {
    console.error("Error al crear el producto:", error);
    console.error(error); // Muestra todo el error
    res.status(500).json({ error: "Hubo un error al crear el producto." });
  }
});

//para eliminar un producto

router.delete("/products/:id", async (req, res) => {
  const productDelete = await prisma.product.delete({
    where: {
      id: Number(req.params.id),
    },
  })
  if(!productDelete){ return res.status(404).json({error: "Producto no encontrado"})}
  res.json(productDelete)
})

//actualizar un producto
router.put("/products/:id", async (req, res) => {
  const productUpdate = await prisma.product.update({
    where:{
      id: Number(req.params.id)
    },
    data: req.body  // devuelve la data actualizada
  })
  return res.json(productUpdate)
})


export default router;
