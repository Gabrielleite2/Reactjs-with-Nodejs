import mongoose from "mongoose";




const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: Number,
    required: true,
  },
  dataDeNascimento: {
    type: String,
    required: true,
  },
  tempoDeContrato:{
    type: Number,
    required: true,
  },
  
});

export default mongoose.model("users", userSchema);
