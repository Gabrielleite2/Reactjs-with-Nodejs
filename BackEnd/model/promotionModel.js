import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
     nome: {
          type: String,
          required: true,
     },
     precoAtual: {
          type: Number,
          required: true,
     },
     precoComPromocao: {
          type: Number,
          required: true,
     },
     tipo: {
          type: String,
          required: true,
     },
     descricao: {
          type: String,
          required: true,
     },

     dataDeValidade: {
          type: String,
          required: true
     },

});

export default mongoose.model("promotion", promotionSchema);
