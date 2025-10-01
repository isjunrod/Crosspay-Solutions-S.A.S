import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, PaymentQueryDto } from '../dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

function CurrentUser() {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  })();
}

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
    try {
      return await this.paymentsService.create(
        createPaymentDto,
        req.user.userId
      );
    } catch (error) {
      throw new Error('Failed to create payment');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findMyPayments(
    @Query() query: PaymentQueryDto,
    @CurrentUser() user: any
  ) {
    return this.paymentsService.findByUser(user.userId, query);
  }
}
