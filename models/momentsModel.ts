import mongoose, { Schema, Document, Model } from "mongoose"

export interface IMoment extends Document {
  order: number
  title: string
  desc?: string
  images: string[]
  createdAt: Date
  updatedAt: Date
}

const MomentSchema: Schema = new Schema(
  {
    order: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
  },
)

export const Moment: Model<IMoment> =
  mongoose.models.Moment || mongoose.model<IMoment>("Moment", MomentSchema)
