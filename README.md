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

### Generar dependencia de desarollo:
Para generar la dependencia que servira para hacer las querys en la base de datos, hay que usar el comando:
```bash
npx prisma generate
```

Para ejecutar una migracion en prisma ejecuta este comando:
```bash
npx prisma migrate --dev --name <Nombre de la migración> 
```
cada que realizes una migración dentro de el folder **prisma**, siempre se guardara en un folder llamado **MIGRATIONS** en donde podras ver el historial de migraciones.

> [!TIP]
> Si solo deseas crear la migracion pero no ejecutarla utiliza el comando:
>```
>npx prisma migrate --dev --name <Nombre de la migración> -- create-only
> ```

Para "Lintear" el codigo, el comando
```bash
npx prisma db pull
```

## Solucion error de migración en prisma
> [!IMPORTANT]
> Si al ejecutar ese comando, aparece este mensaje :
> ```bash
> Error: EPERM: operation not permitted, unlink: 'c:...'
> ```
> ejecuta los siguientes pasos:
> 
>  - Elimina primero el folder Node_modules del proyecto
>  - Cierra tu editor de codigo y reabrelo en modo **Administrador**
>  - Abre una terminal dentro de la misma carpeta del proyecto y ejecuta el siguiente comando:
>    ```bash
>    npm cache clean --force
>    ```
>   - Finalmente vuelve a instalar las dependecias del proyecto y ejecuta la migracion nuevamente


# Ejecutar el servido de Express
En la terminal usa el comando:
```bash
npm run dev
```

# Consultar API con REST CLIENT
Puedes usar cualquier cliente REST como los siguientes:
- [Insomnia](https://insomnia.rest/)
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/)
