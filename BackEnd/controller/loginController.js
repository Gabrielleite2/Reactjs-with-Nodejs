import FormDataModel from '../model/FormData.js';
import bcrypt from 'bcrypt';

// Controlador para registro
export const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const userExist = await FormDataModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Already registered" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10); // Criptografar a senha
    const newUser = await FormDataModel.create({ nome, email, senha: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

// Controlador para login
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await FormDataModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No records found!" });
    }

    const isMatch = await bcrypt.compare(senha, user.senha); // Comparar senhas

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};
