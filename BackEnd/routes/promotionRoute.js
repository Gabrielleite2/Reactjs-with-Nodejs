import express from "express";
import { fetch, create, update, deletePromotion } from "../controller/promotion.js";

const promotionRoute = express.Router(); 

// Defina as rotas de promoções
promotionRoute.post("/create", create);
promotionRoute.get("/getAllPromotion", fetch);
promotionRoute.put("/update/:id", update);
promotionRoute.delete("/delete/:id", deletePromotion);

export default promotionRoute;
