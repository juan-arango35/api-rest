import { Router } from "express";
import { prisma } from "../db.js";
const router = Router();

//traer categorias
router.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  res.json(categories);
});

//crear categorias
router.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    if(!name) return res.status(400).json({error:"El nombre es obligatorio"})
    const newcategory= await prisma.category.create({
      data:{
        name:name
      }
    })
    res.status(201).json(newcategory)
  } catch (error) {
   console.error("Error al crear el producto:", error);
   console.error(error)
res.status(500).json({ error: "Hubo un error al crear el producto." });
  }
});

//para eliminar un producto:
router.delete("/categories/:id", async(req, res)=>{

  const productoEliminado = await prisma.category.delete({
    where:{
      id: Number(req.params.id)
    }, 
   
  })
  if(!productoEliminado){ return res.status(404).json({error: "Categoria no encontrada"})}
  res.json(productoEliminado)
})

//para actualizar una categoria:
router.put("/categories/:id", async(req, res)=>{
  const categoriaActualizada = await prisma.category.update({
    where:{
      id: Number(req.params.id)
    },
    data:req.body
  })
  return res.json(categoriaActualizada)
})


export default router;
