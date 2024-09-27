import Promotion from "../model/promotionModel.js";

export const create = async (req, res) => {
  try {
    const promotionData = new Promotion(req.body);
    const { nome } = promotionData;

    const promotionExist = await Promotion.findOne({ nome });
    if (promotionExist) {
      return res.status(400).json({ message: "Promotion already exists." });
    }
    const savedPromotion = await promotionData.save();
    res.status(200).json(savedPromotion);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const promotion = await Promotion.find();
    if (promotion.length === 0) {
      return res.status(404).json({ message: "Promotion Not Found." });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const promotionExist = await Promotion.findById({ _id: id });
    if (!promotionExist) {
      return res.status(404).json({ message: "Promotion Not Found." });
    }
    const updatePromotion = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatePromotion);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const deletePromotion = async (req, res) => {
  try {
    const id = req.params.id;
    const promotionExist = await Promotion.findById({ _id: id });
    if (!promotionExist) {
      return res.status(404).json({ message: "User Not Found." });
    }
    await Promotion.findByIdAndDelete(id);
    res.status(201).json({ message: "Promotion deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};
