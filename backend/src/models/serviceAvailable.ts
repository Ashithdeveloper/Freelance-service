import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String }, 
    price: { type: String }, 
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
