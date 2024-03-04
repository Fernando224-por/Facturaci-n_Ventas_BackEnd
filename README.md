# Proyecto de Facturación y ventas

:construction: Proyecto en construcción :construction:

> [!NOTE]
>Para poder contribuir en este proyecto debes tener instalado:
>
>[Node JS 20.8.1](https://nodejs.org/dist/v20.8.1/node-v20.8.1-x64.msi)
>[MySQL 8.0.34](https://dev.mysql.com/downloads/windows/installer/8.0.html)

> [!CAUTION]
> Por ningun motivo deben realizar un push a la Rama **MASTER**
> esto debido a que es la rama que se enviara a producción

# Comando de PRISMA ORM
Abre una terminal que este en el mismo PATH de este proyecto y ejecuta el siguiente comando
```bash
npx prisma init --datasource-provider mysql
```
esto creara el archivo **.env** y el folder **prisma** donde esta alojado el esquema de nuestra base de datos.

Para ejecutar una migracion en prisma ejecuta este comando:
```bash
npx prisma migrate --dev --name <Nombre de la migración> 
```
cada que realizes una migración dentro de el folder **prisma**, siempre se guardara en un folder llamado **MIGRATIONS** en donde podras ver el historial de migraciones

> [!TIP]
> Si solo deseas crear la migracion pero no ejecutarla utiliza el comando:
>```
>npx prisma migrate --dev --name <Nombre de la migración> -- create-only
> ```

Para "Lintear" el codigo, el comando
```bash
npx prisma db pull
```
# Ejecutar el servido de Express
En la terminal usa el comando:
```bash
npm run dev
```
