import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

// Especifica que o modelo deve usar a coleção "formdatamodels"
export default mongoose.model('FormDataModel', formDataSchema, 'formdatamodels');
