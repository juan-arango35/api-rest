import express from "express";
import productsRoute from "./routes/products.routes.js";
import categoriesRoute from "./routes/categories.routes.js";

const app = express()
app.use(express.json())
app.use("/api", productsRoute)
app.use("/api", categoriesRoute)



app.listen(3000)
console.log("Server running on port 3000")