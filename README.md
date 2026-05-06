# Gestion de Tareas con React

Proyecto final del Modulo 7 del Diplomado Fullstack. La aplicacion permite gestionar una lista de tareas consumiendo una API REST.

## Base del proyecto

Este proyecto fue realizado a partir del fork del repositorio base del diplomado. Antes de las modificaciones, el proyecto ya incluia:

- Configuracion inicial con React, TypeScript y Vite.
- Estructura base de rutas publicas y privadas.
- Pantallas base para login, registro de usuario, perfil y tareas.
- Cliente HTTP con Axios.
- Manejo de autenticacion mediante token JWT.
- Componentes de interfaz usando Material UI.

## Trabajo realizado

Sobre la base del fork se completo la funcionalidad principal requerida para la gestion de tareas:

- Listado dinamico de tareas del usuario autenticado.
- Creacion de nuevas tareas.
- Edicion del nombre de una tarea.
- Eliminacion de tareas individuales.
- Cambio de estado entre pendiente y finalizada.
- Indicadores visuales para diferenciar tareas pendientes y finalizadas.
- Contadores de tareas visibles, pendientes y finalizadas.
- Busqueda y filtro por estado desde la interfaz.
- Manejo de estados de carga, guardado y mensajes de error/exito.
- Configuracion de proxy en Vite para desarrollo local y evitar problemas de CORS con la API.

## Tecnologias

- React
- TypeScript
- Vite
- Material UI
- React Router DOM
- Axios
- Zod

## Requisitos

- Node.js
- npm

## Instalacion

```bash
npm install
```

## Variables de entorno

Crear o revisar el archivo `.env`:

```env
VITE_API_URL=/api
```

En desarrollo local, `/api` se redirige mediante el proxy configurado en Vite hacia:

```text
https://taskdone-node.onrender.com
```

Para un despliegue sin proxy, se puede usar directamente:

```env
VITE_API_URL=https://taskdone-node.onrender.com/api
```

## Ejecucion local

```bash
npm run dev
```

Luego abrir la URL mostrada por Vite, normalmente:

```text
http://localhost:5173
```

## Compilacion

```bash
npm run build
```

## Vista previa de produccion

```bash
npm run preview
```

## Despliegue en GitHub Pages

El proyecto incluye el paquete `gh-pages` y el script:

```bash
npm run deploy
```

Antes de desplegar en GitHub Pages se debe revisar:

- Usar `HashRouter` para evitar errores 404 al recargar rutas.
- Configurar `base` en `vite.config.ts` con el nombre del repositorio.
- Usar una URL publica para `VITE_API_URL`, no `/api`, porque el proxy de Vite solo funciona en desarrollo local.

## Funcionalidades principales

- Autenticacion de usuario.
- Registro de usuario.
- Perfil privado.
- Gestion completa de tareas:
  - listar
  - crear
  - editar
  - eliminar
  - marcar como pendiente/finalizada
  - filtrar
  - buscar

