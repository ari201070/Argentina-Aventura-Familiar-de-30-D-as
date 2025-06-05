# MCP Service Layer

Este módulo implementa una capa de abstracción (Model Context Protocol) para interactuar con servicios externos como IA (Gemini) y conversión de moneda (Polygon.io).

## Funcionalidades

- **Abstracción de APIs**: Los componentes de la app solo interactúan con este módulo, no directamente con los proveedores externos.
- **Reutilización**: Las funciones son reutilizables desde cualquier parte de la app.
- **Offline/Online**: Soporta caché local (`localStorage`) para tasas de cambio y manejo de errores.
- **Mock de IA**: Si la API de Gemini no está disponible, devuelve respuestas simuladas.

## Proveedores soportados

- **Gemini**: IA para consultas de usuario.
- **Polygon.io**: Conversión de moneda.
- **(Opcional)**: Se pueden agregar más proveedores sin modificar el resto de la app.

## Ejemplo de uso


## Mejoras futuras

- **Mock de IA**: Respuestas simuladas cuando la API falla.
- **Caché de respuestas de IA**: Guardar respuestas frecuentes en `localStorage`.
- **Sincronización automática**: Actualizar caché cuando vuelva la conexión.
