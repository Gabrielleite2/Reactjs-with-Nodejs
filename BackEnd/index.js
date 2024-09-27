import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import promotionRoute from "./routes/promotionRoute.js";
import loginRouter from "./routes/loginRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Carregar as variáveis de ambiente
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/crud"; // Conecte-se ao banco `crud`

// Conecte-se ao banco de dados `crud`
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected successfully.");
    // Iniciar o servidor apenas após a conexão ser bem-sucedida
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to the database:", error));


// Mapeamento de rotas
app.use("/api/user", userRoute); 
app.use("/api/promotion", promotionRoute);
app.use("/api/auth", loginRouter);
