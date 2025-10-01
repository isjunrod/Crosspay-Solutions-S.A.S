import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Matches,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum Currency {
  COP = 'COP',
  USD = 'USD',
}

export enum DocumentType {
  CEDULA = 'cedula',
  PASAPORTE = 'pasaporte',
}

export class CreatePaymentDto {
  @IsEnum(Currency)
  currency: Currency;

  @IsNumber()
  @Min(0.01)
  @Transform(({ value }) => parseFloat(value))
  amount: number;

  @IsString()
  description: string;

  @IsString()
  customerName: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  @Matches(/^[0-9]{13,19}$/, {
    message: 'Número de tarjeta debe tener entre 13 y 19 dígitos',
  })
  cardNumber: string;

  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: 'Fecha de vencimiento debe estar en formato MM/YY',
  })
  expirationDate: string;

  @IsString()
  @Matches(/^[0-9]{3,4}$/, {
    message: 'Código de seguridad debe tener 3 o 4 dígitos',
  })
  securityCode: string;

  // Campos opcionales para tracking interno
  @IsOptional()
  @IsString()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;
}

export class PaymentQueryDto {
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  minAmount?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  maxAmount?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}

// DTO para la respuesta del frontend (sin datos sensibles)
export class PaymentResponseDto {
  id: string;
  currency: Currency;
  amount: number;
  description: string;
  customerName: string;
  documentType: DocumentType;
  createdAt: Date;

  // Número de tarjeta enmascarado
  maskedCardNumber: string; // ej: "**** **** **** 1234"
}
