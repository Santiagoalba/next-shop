# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos

docker compose up -d

2. Cambiar .env.template a .env y llenar con los datos de nuestra db de postgres

3. Renombrar variables de entorno

4. Ejecutar el comando ``` npm install ```

5. Ejecutar el comando ``` npm run dev ```

6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [llenar la base de datos local](localhost:3000/api/seed) Es un call a la api de next.

## Usuario por defecto:
__usuario:__ prueba123@mail.com
__password:__ password

# Prisma commands

npx prisma init
npx prisma migrate dev
npx prisma generate