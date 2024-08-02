import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    document: { type: String },
    city: { type: Number },
    image: { type: String },
  },
  { versionKey: false }
);

const companies = mongoose.model("companies", companySchema);

export default companies;
