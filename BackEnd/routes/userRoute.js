import express from "express";
import { fetch, create, update, deleteUser, deleteUserCpf } from "../controller/userController.js";

const userRoute = express.Router(); // Defina a rota uma única vez

// Defina as rotas do usuário
userRoute.post("/create", create);
userRoute.get("/getAllUsers", fetch);
userRoute.put("/update/:id", update);
userRoute.delete("/delete/:id", deleteUser);
userRoute.delete("/deletar/:cpf", deleteUserCpf);

export default userRoute;
