import express from "express"
import { addToCart, clearUserCart, getCart, removeCartItem, updateCartItem } from "../controller/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.get("/",authMiddleware,getCart)
cartRouter.put("/update",authMiddleware,updateCartItem)
cartRouter.delete("/remove/:productId",authMiddleware,removeCartItem)
cartRouter.delete("/clear",authMiddleware,clearUserCart)

export default cartRouter