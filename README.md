# 🚀 PhysicsLab Pro - Calculadora Cuántica de Física

![PhysicsLab Pro](images/physics_hero.svg)

## ✨ La Calculadora de Física Más Avanzada del Universo

**PhysicsLab Pro** es una calculadora de física futurista y visualmente impactante que transforma el estudio de la mecánica clásica en una experiencia interactiva épica. Diseñada para estudiantes, profesores e ingenieros que buscan una herramienta poderosa y atractiva.

### 🌟 Características Principales

#### 🎯 **13 Fórmulas Físicas Implementadas**
- 🚀 **Trabajo Angular** - Proyectiles y Vector Fuerza
- ⚡ **Trabajo Lineal** - Fuerza Paralela al Movimiento  
- 🌍 **Fuerza Gravitatoria** - Peso de la Materia
- 🏗️ **Trabajo Anti-Gravedad** - Elevación de Masas
- 💫 **Energía Cinética** - Velocidad al Límite
- ⛰️ **Energía Potencial** - Potencial Gravitatorio
- 🔋 **Energía Mecánica Total** - Sistema Completo
- ⚡ **Potencia Desarrollada** - Energía por Tiempo
- 🎯 **Trabajo Resultante** - Múltiples Fuerzas
- 📐 **Trabajo Neto Básico** - Fuerzas Simples
- ♻️ **Conservación Energética** - Energía Indestructible
- 🧮 **Teorema Fundamental** - Trabajo = ΔEnergía Cinética
- 🌌 **Trabajo vs Gravedad** - Campo Gravitatorio

#### 🎨 **Diseño Futurista**
- **Tema Cósmico**: Gradientes espaciales, efectos de neón y partículas animadas
- **Tipografía Tecnológica**: Fuentes Orbitron y Roboto para máximo impacto
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales impresionantes
- **Responsive Design**: Perfecto en desktop, tablet y móvil

#### 🔊 **Sistema de Audio Inmersivo**
- **Efectos de Sonido**: Tonos futuristas para cada acción
- **Web Audio API**: Sonidos sintéticos generados en tiempo real
- **Control de Usuario**: Activa/desactiva audio con un clic

#### 💾 **Persistencia de Datos Inteligente**
- **LocalStorage**: Guarda todos tus cálculos automáticamente
- **Historial Completo**: Accede a cálculos anteriores instantáneamente
- **Análisis Avanzado**: Visualiza patrones en tus datos

#### 🖼️ **Imágenes SVG Explicativas**
- **Visualización Clara**: Diagramas animados para cada fórmula
- **Gráficos Educativos**: Comprende conceptos físicos visualmente
- **Efectos Interactivos**: Elementos que responden al usuario

### 🚀 Instalación y Uso

#### Prerrequisitos
- Node.js (versión 14 o superior)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

#### Instalación Rápida
```bash
# 1. Clona o descarga el proyecto
git clone [url-del-repositorio]
cd PhysicsLab-Pro

# 2. Inicia el servidor
node server.js

# 3. Abre tu navegador en:
http://localhost:8000
```

#### Uso Básico
1. **🚀 Selecciona** una fórmula del Laboratorio
2. **📝 Ingresa** los parámetros requeridos
3. **⚡ Calcula** y obtén resultados instantáneos
4. **💾 Guarda** tus cálculos para referencia futura
5. **📊 Analiza** tu historial en Memoria Cuántica

### 🎯 Casos de Uso

#### 👨‍🎓 **Para Estudiantes**
- Resolver problemas de física de manera visual e interactiva
- Comprender conceptos mediante diagramas animados
- Practicar con diferentes valores y ver resultados inmediatos
- Guardar y revisar cálculos para estudio

#### 👨‍🏫 **Para Profesores**
- Demostrar conceptos físicos de forma atractiva
- Crear ejercicios interactivos para estudiantes
- Mostrar relaciones entre variables físicas
- Generar ejemplos para clases

#### 👨‍🔬 **Para Ingenieros**
- Cálculos rápidos de mecánica clásica
- Verificación de resultados teóricos
- Análisis de sistemas energéticos
- Documentación de cálculos importantes

### 🛠️ Tecnologías Utilizadas

#### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Animaciones avanzadas y efectos visuales
- **JavaScript ES6+**: Lógica de aplicación y cálculos
- **SVG**: Gráficos vectoriales escalables

#### Arquitectura
- **MVC Pattern**: Separación clara de responsabilidades
- **Modular Design**: Código organizado y mantenible
- **Progressive Enhancement**: Funciona sin JavaScript básico

#### APIs
- **Web Audio API**: Efectos de sonido sintéticos
- **LocalStorage API**: Persistencia de datos local
- **CSS Animations**: Transiciones fluidas

### 📱 Compatibilidad

#### Navegadores Soportados
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

#### Dispositivos
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024+)
- ✅ Mobile (375x667+)

### 🔧 Estructura del Proyecto

```
PhysicsLab-Pro/
├── 📄 index.html          # Página principal
├── 📁 css/
│   └── styles_new.css     # Estilos futuristas
├── 📁 js/
│   ├── audio.js           # Sistema de audio
│   ├── database.js        # Gestión de datos
│   ├── calculations.js    # Motor de cálculos
│   ├── ui.js             # Interfaz de usuario
│   └── main.js           # Inicialización
├── 📁 images/
│   ├── physics_hero.svg   # Imagen principal
│   ├── energia_cinetica_new.svg
│   └── [otras imágenes SVG]
├── 📄 server.js           # Servidor local
├── 📄 manifest.json       # PWA manifest
└── 📄 README.md          # Esta documentación
```

### 🎨 Personalización

#### Cambiar Tema de Colores
```css
:root {
    --primary-gradient: linear-gradient(135deg, #tu-color1, #tu-color2);
    --accent-color: #tu-color-acento;
    /* Modifica las variables CSS */
}
```

#### Agregar Nueva Fórmula
1. Añade el escenario en `database.js`
2. Implementa el cálculo en `calculations.js`
3. Crea la imagen SVG correspondiente
4. Actualiza los recursos multimedia en `ui.js`

#### Personalizar Sonidos
Modifica los métodos en `audio.js` para crear nuevos efectos de sonido usando Web Audio API.

### 🐛 Resolución de Problemas

#### El audio no funciona
- Verifica que el navegador soporte Web Audio API
- Asegúrate de que el audio esté activado (botón en header)
- Algunos navegadores requieren interacción del usuario primero

#### Las imágenes SVG no cargan
- Verifica que el servidor esté ejecutándose
- Confirma que los archivos SVG existen en `/images/`
- Revisa la consola del navegador para errores

#### Los cálculos no se guardan
- LocalStorage debe estar habilitado en tu navegador
- Verifica que no estés en modo incógnito/privado
- Revisa que haya espacio disponible en LocalStorage

### 🤝 Contribuir

¡Las contribuciones son bienvenidas! Puedes:

1. **🐛 Reportar bugs** en los issues
2. **💡 Sugerir mejoras** y nuevas características  
3. **🔧 Enviar pull requests** con mejoras
4. **📖 Mejorar documentación**

### 📜 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

### 🙏 Reconocimientos

- **Font Awesome** - Iconos increíbles
- **Google Fonts** - Tipografías Orbitron y Roboto
- **Web Audio API** - Sistema de sonido avanzado
- **CSS Grid & Flexbox** - Layout moderno

### 📞 Contacto

¿Preguntas? ¿Sugerencias? ¡Contacta con nosotros!

---

### 🌟 ¡Dale una estrella al proyecto si te ha sido útil!

**PhysicsLab Pro** - *Donde la física se encuentra con el futuro* 🚀

---

*Desarrollado con ❤️ para hacer la física más accesible y emocionante*