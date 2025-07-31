import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWebPushSubscription extends Document {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  expirationTime?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const WebPushSubscriptionSchema = new Schema<IWebPushSubscription>(
  {
    endpoint: { type: String, required: true, unique: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
    expirationTime: { type: Number, default: null },
  },
  {
    timestamps: true,
  },
);

export const WebPushSubscription: Model<IWebPushSubscription> =
  mongoose.models.WebPushSubscription ||
  mongoose.model<IWebPushSubscription>(
    "WebPushSubscription",
    WebPushSubscriptionSchema,
  );

export interface INotificationLog extends Document {
  subscriptionId: mongoose.Types.ObjectId;
  payload: string;
  sentAt: Date;
}

const NotificationLogSchema = new Schema<INotificationLog>(
  {
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: "WebPushSubscription",
      required: true,
    },
    payload: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  },
);

export const NotificationLog: Model<INotificationLog> =
  mongoose.models.NotificationLog ||
  mongoose.model<INotificationLog>("NotificationLog", NotificationLogSchema);
