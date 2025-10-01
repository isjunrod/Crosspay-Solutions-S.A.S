import { Injectable } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Injectable()
export class DatabaseService {
  private mongod: MongoMemoryServer;

  async getConnectionUri(): Promise<string> {
    const nodeEnv = process.env.NODE_ENV;
    const mongoUri = process.env.MONGODB_URI;

    // Si estamos en producción o hay una URI específica configurada
    if (nodeEnv === 'production' || (mongoUri && mongoUri.trim() !== '')) {
      console.log(
        '🏭 Usando MongoDB configurado:',
        mongoUri ? 'MongoDB Atlas/Cloud' : 'Producción'
      );
      return mongoUri;
    }

    // Para desarrollo local: usar MongoDB Memory Server automáticamente
    console.log(
      '🧪 Modo desarrollo local - Iniciando MongoDB Memory Server...'
    );
    this.mongod = await MongoMemoryServer.create();
    const memoryUri = this.mongod.getUri();
    console.log('✅ MongoDB Memory Server listo:', memoryUri);

    return memoryUri;
  }

  async onModuleDestroy() {
    if (this.mongod) {
      console.log('� Cerrando MongoDB Memory Server...');
      await this.mongod.stop();
    }
  }
}
