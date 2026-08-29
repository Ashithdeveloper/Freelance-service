import mongoose, { Document, Schema } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budget?: string;
  timeline?: string;
  message?: string;
  features?: string[];
  estimatedPrice?: number;
  estimatedDays?: number;
  source?: string;
  status: "new" | "in_discussion" | "completed" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: "",
    },
    serviceType: {
      type: String,
      default: "Web Application",
    },
    budget: {
      type: String,
      default: "",
    },
    timeline: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    estimatedPrice: {
      type: Number,
      default: 0,
    },
    estimatedDays: {
      type: Number,
      default: 0,
    },
    source: {
      type: String,
      default: "contact_form", // 'contact_form' | 'quote_estimator' | 'whatsapp'
    },
    status: {
      type: String,
      enum: ["new", "in_discussion", "completed", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model<IInquiry>("Inquiry", inquirySchema);

export default Inquiry;
