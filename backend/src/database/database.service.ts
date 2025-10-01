import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private mongod: any; // Cambiar el tipo para evitar import estático
  public mongoUri: string;

  async onModuleInit() {
    if (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI) {
      // Usar MongoDB real en producción
      console.log('🌐 Usando MongoDB en la nube para producción');
      this.mongoUri = process.env.MONGODB_URI;
    } else {
      // Import dinámico solo en desarrollo
      console.log(
        '🧪 Modo desarrollo local - Iniciando MongoDB Memory Server...'
      );
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      this.mongod = await MongoMemoryServer.create();
      this.mongoUri = this.mongod.getUri();
      console.log(`✅ MongoDB Memory Server listo: ${this.mongoUri}`);
    }
  }

  async onModuleDestroy() {
    // Solo detener MongoDB Memory Server si está corriendo (desarrollo)
    if (this.mongod) {
      await this.mongod.stop();
      console.log('🛑 MongoDB Memory Server detenido');
    }
  }

  getMongoUri(): string {
    return this.mongoUri;
  }
}
