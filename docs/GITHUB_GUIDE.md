# Guía rápida para GitHub
1. Crear un nuevo repositorio vacío en GitHub.
2. Abrir terminal en la carpeta raíz del proyecto.
3. Ejecutar:
```bash
git init
git add .
git commit -m "feat: entrega académica alta fidelidad"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/med-appointments-hci.git
git push -u origin main
```

## Sugerencia de ramas
- main
- develop
- feature/frontend
- feature/backend
- feature/tests

## Convención de commits
- feat: nueva funcionalidad
- fix: corrección de error
- docs: documentación
- test: pruebas
- refactor: mejora sin cambiar comportamiento
