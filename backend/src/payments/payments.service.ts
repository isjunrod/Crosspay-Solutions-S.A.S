import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment } from '../schemas/payment.schema';
import { CreatePaymentDto, PaymentQueryDto } from '../dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
    userId: string
  ): Promise<Payment> {
    const payment = new this.paymentModel({
      ...createPaymentDto,
      userId: new Types.ObjectId(userId), // Convertir a ObjectId
    });
    return payment.save();
  }

  async findByUser(userId: string, query: PaymentQueryDto): Promise<any> {
    const filter: any = { userId: new Types.ObjectId(userId) }; // Convertir a ObjectId

    // Filtros
    if (query.currency) filter.currency = query.currency;
    if (query.customerName) {
      filter.customerName = { $regex: query.customerName, $options: 'i' };
    }

    // Filtro por fechas
    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
      if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
    }

    // Filtro por rango de monto
    if (query.minAmount || query.maxAmount) {
      filter.amount = {};
      if (query.minAmount) filter.amount.$gte = Number(query.minAmount);
      if (query.maxAmount) filter.amount.$lte = Number(query.maxAmount);
    }

    // Paginación
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Ordenamiento
    const sortOptions: any = {};
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
    sortOptions[sortBy] = sortOrder;

    const payments = await this.paymentModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.paymentModel.countDocuments(filter);

    return {
      payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    };
  }

  async findOne(id: string): Promise<Payment> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.paymentModel.findById(id).exec();
  }
}
