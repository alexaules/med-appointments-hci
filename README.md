# Sistema de Gestión de Citas de Especialidades Médicas centrado en HCI

Proyecto académico de alta fidelidad para la asignatura de Human-Computer Interaction and Digital Citizenship.
Incluye frontend en React, backend en Node.js con Express, base de datos MongoDB, documentación académica,
diagramas UML, arquitectura C4 y plan de evaluación UX.

## 1. Objetivo
Desarrollar un prototipo de alta fidelidad orientado a mejorar la gestión de citas médicas, el registro de pacientes,
la administración de especialistas y la consulta del historial clínico, manteniendo un enfoque de diseño centrado
en el usuario, usabilidad, accesibilidad y buenas prácticas de calidad de software.

## 2. Estructura del repositorio

```text
med-appointments-hci/
├── Fase_Diseno/
│   ├── diagramas/
│   ├── modelo_datos/
│   ├── arquitectura/
│   └── navegacion/
├── Backend/
│   ├── src/
│   ├── tests/
│   ├── scripts/
│   └── .env.example
├── Frontend/
│   ├── src/
│   ├── public/
│   └── .env.example
├── Pruebas/
│   ├── matrices/
│   └── evidencias/
├── docs/
│   └── Parte_III_Alta_Fidelidad.docx
└── README.md
```

## 3. Requisitos previos
- Node.js 20+ recomendado
- MongoDB 7+ local o MongoDB Atlas
- Git
- Visual Studio Code

## 4. Variables de entorno

### Backend (`Backend/.env`)
```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/citas_medicas_hci
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=8h
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (`Frontend/.env`)
```env
VITE_API_URL=http://localhost:4000/api
```

## 5. Instalación paso a paso

### 5.1 Backend
```bash
cd Backend
cp .env.example .env
npm install
npm run dev
```

### 5.2 Frontend
En otra terminal:
```bash
cd Frontend
cp .env.example .env
npm install
npm run dev
```

### 5.3 Acceso
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Health check: http://localhost:4000/api/health

## 6. Scripts disponibles

### Backend
```bash
npm run dev        # desarrollo con nodemon
npm start          # ejecución estándar
npm test           # pruebas con Jest y Supertest
npm run seed       # inserta médicos de ejemplo
```

### Frontend
```bash
npm run dev        # desarrollo
npm run build      # compilación producción
npm run preview    # previsualización build
```

## 7. Funcionalidades implementadas
- Autenticación JWT con roles: administrador, gestor y médico
- CRUD completo de pacientes
- CRUD completo de médicos especialistas
- CRUD completo de citas médicas
- Filtros por estado, médico y fecha
- Dashboard con métricas de citas
- Validaciones de formularios en frontend y backend
- Manejo global de errores
- Diseño responsive
- Evaluación heurística y encuesta SUS documentadas

## 8. Endpoints principales
| Recurso | Endpoint | Métodos |
|---|---|---|
| Salud | `/api/health` | GET |
| Auth | `/api/auth` | POST login, POST register |
| Pacientes | `/api/patients` | GET, POST, GET/:id, PUT/:id, DELETE/:id |
| Médicos | `/api/doctors` | GET, POST, GET/:id, PUT/:id, DELETE/:id |
| Citas | `/api/appointments` | GET, POST, GET/:id, PUT/:id, DELETE/:id |

## 9. Credenciales iniciales sugeridas
Registrar desde la pantalla inicial un usuario administrador:
- nombre: Administrador
- email: admin@clinica.com
- contraseña: Admin123!

## 10. Flujo de GitHub
```bash
git init
git add .
git commit -m "feat: entrega inicial del prototipo de alta fidelidad"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/med-appointments-hci.git
git push -u origin main
```

### Buenas prácticas de versionamiento
- `main`: versión estable
- `develop`: integración
- `feature/nombre-modulo`: nuevas funciones
- Commits semánticos sugeridos: `feat`, `fix`, `docs`, `test`, `refactor`

## 11. Descripción corta para GitHub
Prototipo académico de alta fidelidad para la gestión de citas médicas, diseñado con enfoque HCI, arquitectura React + Node + MongoDB, CRUD completo, documentación técnica, UML, C4 y evaluación UX.

## 12. Evidencias académicas incluidas
- Documento Parte III en Word
- Diagramas UML en PNG
- Arquitectura C4 en PNG
- Matriz heurística de Nielsen
- Escala SUS
- Plan de pruebas

## 13. Notas de despliegue
Este prototipo fue preparado para ejecución local. Para despliegue en nube se recomienda:
- Frontend: Vercel o AWS Amplify
- Backend: Render, Railway, AWS Elastic Beanstalk o EC2
- Base de datos: MongoDB Atlas

## 14. Licencia
Uso académico.
