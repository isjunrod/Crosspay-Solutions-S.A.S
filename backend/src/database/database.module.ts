import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseModule], // Importar el módulo que contiene DatabaseService
      useFactory: async (databaseService: DatabaseService) => {
        await databaseService.onModuleInit();
        const uri = databaseService.getMongoUri();
        return { uri };
      },
      inject: [DatabaseService],
    }),
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}