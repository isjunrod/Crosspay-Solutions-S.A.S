import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (databaseService: DatabaseService) => {
        await databaseService.onModuleInit();
        const uri = await databaseService.getMongoUri(); // Cambié getConnectionUri por getMongoUri
        return {
          uri,
        };
      },
      inject: [DatabaseService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}