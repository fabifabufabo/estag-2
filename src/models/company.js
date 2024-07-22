import mongoose from "mongoose";

const cpfCnpjRegex =
  /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

const companySchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    document: { type: String, match: cpfCnpjRegex, required: true },
    city: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { versionKey: false }
);

const companies = mongoose.model("companies", companySchema);

export default companies;
