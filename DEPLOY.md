# 🚀 Guía para Desplegar en GitHub Pages

Esta guía te ayudará a subir tu proyecto a GitHub Pages y que funcione correctamente.

## 📋 Opción 1: Deploy Automático (RECOMENDADO)

Esta opción usa GitHub Actions para desplegar automáticamente cada vez que hagas push.

### Pasos:

1. **Asegúrate de tener tu proyecto en GitHub:**
   - Si no lo tienes, crea un repositorio nuevo en GitHub
   - Sube tu código:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
     git push -u origin main
     ```

2. **Habilita GitHub Pages en tu repositorio:**
   - Ve a tu repositorio en GitHub
   - Click en **Settings** (Configuración)
   - En el menú lateral, click en **Pages**
   - En **Source**, selecciona **GitHub Actions**
   - Guarda los cambios

3. **¡Listo!** Cada vez que hagas push a la rama `main`, GitHub Actions construirá y desplegará automáticamente tu sitio.

   La URL será: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`

---

## 📋 Opción 2: Deploy Manual

Si prefieres hacer el deploy manualmente:

### Pasos:

1. **Instala gh-pages como dependencia de desarrollo:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Construye el proyecto:**
   ```bash
   npm run build
   ```

3. **Despliega manualmente:**
   ```bash
   npm run deploy
   ```

   Esto creará una rama `gh-pages` automáticamente con el contenido de `dist`.

4. **Configura GitHub Pages:**
   - Ve a Settings → Pages
   - En Source, selecciona la rama `gh-pages`
   - Guarda los cambios

---

## 🔍 Verificar que Funciona

1. Después de unos minutos, visita: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`
2. La página debería cargar correctamente
3. Las rutas funcionarán con `#` (ejemplo: `/#/cart`)

---

## ⚠️ Solución de Problemas

### La página aparece en blanco:

1. Verifica que `vite.config.js` tenga `base: './'`
2. Verifica que `App.jsx` use `HashRouter` (no `BrowserRouter`)
3. Verifica que el build se haya completado correctamente: `npm run build`
4. Revisa la consola del navegador (F12) para ver errores

### Las rutas no funcionan:

- Asegúrate de usar `HashRouter` en lugar de `BrowserRouter`
- Las rutas deberían verse así: `/#/cart` no `/cart`

### El deploy no funciona:

- Verifica que GitHub Actions esté habilitado en Settings → Actions
- Revisa la pestaña "Actions" en tu repositorio para ver si hay errores
- Asegúrate de que todos los archivos estén subidos a GitHub

---

## 📝 Notas Importantes

- **Base path**: Si tu repositorio NO está en la raíz (ej: `github.com/user/repo`), la configuración actual funcionará bien.
- **Build**: Siempre ejecuta `npm run build` antes de hacer commit si haces cambios importantes.
- **HashRouter**: Las rutas usarán `#` para funcionar en GitHub Pages sin configuración del servidor.
