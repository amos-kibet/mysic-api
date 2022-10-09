import { logger } from "./log.js";

export const deleteDocument = (model) => async (req, res) => {
  const { userID } = req.params;

  try {
    const doc = await model.findOneAndDelete({ _id: userID }).exec();
    if (!doc) {
      logger.error("Could not find document");
      return res.status(204).json({ message: "Document does not exist" });
    }
    return res.status(200).json(doc);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json(error.message);
  }
};
export const getAllDocuments = (model) => async (req, res) => {
  try {
    const data = await model.find({}).exec();
    if (!data) {
      logger.error("Could not find document");
      return res.status(500).json({ message: "No document found" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
