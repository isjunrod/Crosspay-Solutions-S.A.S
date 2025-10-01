import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Currency {
  COP = 'COP',
  USD = 'USD',
}

export enum DocumentType {
  CEDULA = 'cedula',
  PASAPORTE = 'pasaporte',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: Currency })
  currency: Currency;

  @Prop({ required: true, min: 0.01 })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true, enum: DocumentType })
  documentType: DocumentType;

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  expirationDate: string;

  @Prop({ required: true })
  securityCode: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.virtual('maskedCardNumber').get(function () {
  const last4 = this.cardNumber.slice(-4);
  return `**** **** **** ${last4}`;
});

PaymentSchema.set('toJSON', { virtuals: true });
