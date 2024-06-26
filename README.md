
# Shortly

Shortly es una aplicación web que combina múltiples tecnologías modernas para ofrecer una experiencia dinámica. Utilizando Astro como framework principal, este proyecto integra Node.js para la lógica del servidor, Auth.js para la autenticación y manejo de sesiones, y Astro DB junto con Astro Studio para la gestión y visualización de la base de datos. Además, incluye React para la interfaz de usuario y Tailwind CSS junto a DaisyUI para los estilos.

## Tecnologías Utilizadas

- [**Astro**](https://docs.astro.build/en/getting-started/): Framework moderno de construcción de sitios web estáticos y dinámicos.
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- [**Auth.js**](https://authjs.dev/): Solución de autenticación para aplicaciones web.
- [**Astro DB**](https://docs.astro.build/en/guides/astro-db/): Biblioteca de gestión de bases de datos para Astro.
- [**Astro Studio**](https://docs.astro.build/en/guides/astro-db/#astro-studio): Herramienta de visualización y administración de bases de datos.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para diseño y estilos.
- [**DaisyUI**](https://daisyui.com/): Agrega hermosas clases de componentes a Tailwind CSS que son totalmente personalizables.

## Configuración Inicial

### Generación de Secretos

Genera un secreto utilizando la herramienta [Generate secret](https://string-gen.vercel.app/).

### Configuración de Google API

1. Obtén el ID y el secreto de la API de Google desde la [Google Cloud Console](https://console.cloud.google.com/).
2. Configura las credenciales con la siguiente información:
    - **URL de JavaScript**: [http://localhost:4321](http://localhost:4321/)
    - **URL de Redirección**: [http://localhost:4321/api/auth/callback/google](http://localhost:4321/api/auth/callback/google)

### Integración del Script de Autenticación

Agrega el siguiente script en la sección `<Layout>` de `index.astro` para manejar la autenticación de usuarios:

```jsx
<script>
  const { signIn, signOut } = await import("auth-astro/client")
  const login = document.querySelector("#login") as HTMLButtonElement
  if (login) {
    login.onclick = () => signIn("github")
  }
  
  const logout = document.querySelector("#logout") as HTMLButtonElement
  if (logout) { 
    logout.onclick = () => signOut()
  }
</script>
```

## Configuración de Astro DB

### Instalación y Creación del Proyecto

1. Instala las dependencias necesarias.
2. Crea un nuevo proyecto en Astro Studio y conectarlo.

### Conexión a la Base de Datos

Agrega la flag `--remote` a los scripts de inicio o ejecución del proyecto para conectarte a la base de datos. Si no se especifica, se creará una base de datos local.

```jsx
{
  "scripts": {
    "dev": "astro build --remote"
  }
}
```

### Configuración de Astro Studio

1. Accede a Astro Studio.
2. Crea un APP Token en Astro Studio y configúralo en la variable de entorno `ASTRO_STUDIO_APP_TOKEN`.

### Definición de la Base de Datos

En `db/config.ts`, establece tus tablas y sus respectivos tipos de datos. Aquí tienes un ejemplo de cómo definir las tablas `User` y `Link`:

```tsx
import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text(), 
    name: column.text(), 
    image: column.text()
  }
})

const Link = defineTable({
  columns: {
    userId: column.number({ references: () => User.columns.id }),
    url: column.text(), 
    code: column.text()
  }
})

export default defineDb({
  tables: {
    User, 
    Link
  }
});
```

## Estructura del Proyecto

Para una correcta organización de directorios en Astro, sigue la guía oficial: 
# Estructura del Proyecto

```plaintext
├── db/
│   ├── config.ts
│   └── seed.ts
├── public/
│   ├── favicon.svg
│   └── shortly.png
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── FormUrl.tsx
│   │   └── Header.astro
│   ├── layouts/
│   │   └── layout.astro
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── api/
│   │   │   ├── delete-url.ts
│   │   │   └── shorter-url.ts
│   │   ├── [code].ts
│   │   ├── dashboard.astro
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── db.ts
├── astro.config.mjs
├── package.json
├── tailwind.config.js
```
## Creación y Manejo de URLs

1. Crea un formulario para hacer fetch a la URL y enviarla a tu endpoint.
2. Configura un endpoint POST según la documentación de Astro: [Endpoints](https://docs.astro.build/en/guides/endpoints/#request-1).

### Ejemplo de Generación de IDs Únicos

Utiliza el siguiente código para generar un ID único de 5 digitos para cada URL:

```tsx
const auxId = Math.random().toString(36).substring(2, 7)
```

Establece un bucle `do while` para asegurar que el ID es único antes de asignarlo a una URL específica.

## Uso de la Aplicación sin Iniciar Sesión

La aplicación permite el uso sin necesidad de iniciar sesión, aunque el ID de usuario es opcional al guardar en la base de datos.

## Diagrama de Flujo de la Base de Datos

![Diagrama sin título](https://shortlly.vercel.app/diagram.png)