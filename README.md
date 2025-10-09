# CrossPay - Sistema de Pagos

## Demo en Vivo

URLs de Producción:
- Frontend: https://crosspay-solutions-front.vercel.app
- Backend API: https://crosspay-backend-solutions-291d394a9e6a.herokuapp.com/api
- Credenciales Demo: `prueba123@gmail.com` / `prueba123`

URLs de Desarrollo:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

## Configuración Instantánea

```bash
# 1. Clonar repositorio
git clone https://github.com/isjunrod/Crosspay-Solutions-S.A.S.git
cd Crosspay-Solutions-S.A.S

# 2. Instalar dependencias
npm run install:all

# 3. Ejecutar aplicación (2 terminales)
# Terminal 1 - Backend:
npm run start:backend

# Terminal 2 - Frontend:
npm run start:frontend

# LISTO! Frontend (3000) + Backend (3001) ejecutándose
# MongoDB Memory Server inicializado automáticamente
```

## Testing de la API

Endpoints Disponibles:

```bash
# Registro de usuario
POST https://crosspay-backend-solutions-291d394a9e6a.herokuapp.com/api/auth/register
Content-Type: application/json

{
  "email": "test@crosspay.com",
  "password": "password123"
}

# Login de usuario
POST https://crosspay-backend-solutions-291d394a9e6a.herokuapp.com/api/auth/login
Content-Type: application/json

{
  "email": "test@crosspay.com",
  "password": "password123"
}

# Crear transacción (requiere Bearer token)
POST https://crosspay-backend-solutions-291d394a9e6a.herokuapp.com/api/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100.50,
  "cardNumber": "4111111111111111",
  "expiryDate": "12/25",
  "cvv": "123",
  "cardholderName": "Juan Rodriguez"
}

# Obtener transacciones (requiere Bearer token)
GET https://crosspay-backend-solutions-291d394a9e6a.herokuapp.com/api/payments
Authorization: Bearer <token>
```
