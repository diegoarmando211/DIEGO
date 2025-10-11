// Archivo principal - Inicialización de la aplicación
class PhysicsCalculatorApp {
    constructor() {
        this.isInitialized = false;
    }

    // Inicialización principal de la aplicación
    async init() {
        try {
            console.log('🚀 Iniciando Calculadora de Física...');
            
            // Esperar a que el DOM esté listo
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeApp());
            } else {
                await this.initializeApp();
            }
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            this.showCriticalError(error);
        }
    }

    // Inicializar componentes de la aplicación
    async initializeApp() {
        try {
            console.log('🔧 Configurando componentes...');

            // 1. Inicializar UI Manager
            await this.initializeUIManager();

            // 2. Cargar datos iniciales
            await this.loadInitialData();

            // 3. Configurar service worker (opcional)
            this.registerServiceWorker();

            // 4. Configurar manejo de errores globales
            this.setupGlobalErrorHandling();

            // 5. Configurar atajos de teclado
            this.setupKeyboardShortcuts();

            // 6. Marcar como inicializado
            this.isInitialized = true;

            console.log('✅ Aplicación inicializada correctamente');
            this.showWelcomeMessage();
            
            // Sonido de bienvenida
            setTimeout(() => {
                if (window.audioManager) {
                    window.audioManager.play('startup');
                }
            }, 1000);

            // Escuchar primer gesto del usuario para reanudar AudioContext (políticas de autoplay)
            const resumeAudioOnGesture = async () => {
                if (window.audioManager && typeof window.audioManager.ensureAudioContext === 'function') {
                    await window.audioManager.ensureAudioContext();
                }
                // remover listeners una vez ejecutado
                window.removeEventListener('click', resumeAudioOnGesture);
                window.removeEventListener('keydown', resumeAudioOnGesture);
            };

            window.addEventListener('click', resumeAudioOnGesture);
            window.addEventListener('keydown', resumeAudioOnGesture);

        } catch (error) {
            console.error('❌ Error durante la inicialización:', error);
            throw error;
        }
    }

    // Inicializar UI Manager
    async initializeUIManager() {
        try {
            // Inicializar event listeners
            uiManager.initializeEventListeners();
            
            // Configurar control de audio
            this.setupAudioControl();
            
            // Cargar escenarios
            await uiManager.loadScenarios();
            
            console.log('✅ UI Manager inicializado');
        } catch (error) {
            console.error('❌ Error al inicializar UI Manager:', error);
            throw new Error('Error en la interfaz de usuario: ' + error.message);
        }
    }

    // Cargar datos iniciales
    async loadInitialData() {
        try {
            // Verificar conexión con la base de datos
            await this.testDatabaseConnection();
            
            // Precargar algunos cálculos de ejemplo si es la primera vez
            await this.loadSampleData();
            
            console.log('✅ Datos iniciales cargados');
        } catch (error) {
            console.warn('⚠️ Advertencia al cargar datos iniciales:', error.message);
            // No es crítico, continuar con la aplicación
        }
    }

    // Probar conexión con la base de datos
    async testDatabaseConnection() {
        try {
            const escenarios = await dbManager.getEscenarios();
            if (!escenarios || escenarios.length === 0) {
                throw new Error('No se pudieron cargar los escenarios');
            }
            console.log(`✅ Conexión DB OK - ${escenarios.length} escenarios disponibles`);
        } catch (error) {
            console.error('❌ Error de conexión DB:', error);
            uiManager.showNotification(
                'Usando modo demo - Los cálculos no se guardarán permanentemente', 
                'warning'
            );
        }
    }

    // Cargar datos de muestra
    async loadSampleData() {
        const sampleCalculations = localStorage.getItem('fisica_sample_loaded');
        
        if (!sampleCalculations) {
            try {
                // Agregar algunos cálculos de ejemplo
                const samples = [
                    {
                        EscenarioID: 5,
                        EscenarioNombre: 'Energía cinética',
                        Resultado: 500,
                        UnidadResultado: 'J',
                        Parametros: { m: 10, v: 10 }
                    },
                    {
                        EscenarioID: 6,
                        EscenarioNombre: 'Energía potencial',
                        Resultado: 981,
                        UnidadResultado: 'J',
                        Parametros: { m: 10, h: 10 }
                    }
                ];

                for (const sample of samples) {
                    await dbManager.saveCalculo(sample);
                }

                localStorage.setItem('fisica_sample_loaded', 'true');
                console.log('✅ Datos de muestra cargados');
            } catch (error) {
                console.warn('⚠️ No se pudieron cargar datos de muestra:', error.message);
            }
        }
    }

    // Registrar Service Worker para PWA
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registrado:', registration.scope);
                })
                .catch(error => {
                    console.log('⚠️ Service Worker no disponible:', error);
                });
        }
    }

    // Configurar manejo global de errores
    setupGlobalErrorHandling() {
        // Errores JavaScript no capturados
        window.addEventListener('error', (event) => {
            console.error('❌ Error global:', event.error);
            this.handleGlobalError(event.error);
        });

        // Promesas rechazadas no manejadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('❌ Promesa rechazada:', event.reason);
            this.handleGlobalError(event.reason);
        });
    }

    // Manejar errores globales
    handleGlobalError(error) {
        // Solo mostrar si la aplicación está inicializada
        if (this.isInitialized) {
            uiManager.showNotification(
                'Ha ocurrido un error inesperado. Por favor, recarga la página si persiste.',
                'error'
            );
        }
    }

    // Configurar control de audio
    setupAudioControl() {
        const audioToggle = document.getElementById('audioToggle');
        const audioIcon = document.getElementById('audioIcon');
        
        if (audioToggle && audioIcon) {
            audioToggle.addEventListener('click', () => {
                if (window.audioManager) {
                    const isEnabled = window.audioManager.toggle();
                    
                    if (isEnabled) {
                        audioIcon.className = 'fas fa-volume-up';
                        audioToggle.title = 'Desactivar sonido';
                        // Reproducir sonido de confirmación
                        setTimeout(() => window.audioManager.play('hover'), 100);
                    } else {
                        audioIcon.className = 'fas fa-volume-mute';
                        audioToggle.title = 'Activar sonido';
                    }
                }
            });
            
            // Configurar estado inicial
            if (window.audioManager && window.audioManager.isEnabled()) {
                audioIcon.className = 'fas fa-volume-up';
                audioToggle.title = 'Desactivar sonido';
            } else {
                audioIcon.className = 'fas fa-volume-mute';
                audioToggle.title = 'Activar sonido';
            }
        }
    }

    // Configurar atajos de teclado
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl/Cmd + Enter: Calcular
            if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                event.preventDefault();
                const calculateBtn = document.getElementById('calculateBtn');
                if (calculateBtn && calculateBtn.style.display !== 'none') {
                    calculateBtn.click();
                }
            }

            // Escape: Limpiar formulario
            if (event.key === 'Escape') {
                const clearBtn = document.getElementById('clearBtn');
                if (clearBtn) {
                    clearBtn.click();
                }
            }

            // Ctrl + S: Guardar (si está disponible)
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                const saveBtn = document.getElementById('saveBtn');
                if (saveBtn && saveBtn.style.display !== 'none') {
                    saveBtn.click();
                }
            }

            // Números 1-3: Cambiar secciones
            if (event.key >= '1' && event.key <= '3' && event.altKey) {
                event.preventDefault();
                const sections = ['calculadora', 'historial', 'teoria'];
                const sectionIndex = parseInt(event.key) - 1;
                if (sections[sectionIndex]) {
                    uiManager.switchSection(sections[sectionIndex]);
                }
            }
        });

        console.log('✅ Atajos de teclado configurados');
        console.log('📝 Atajos disponibles:');
        console.log('   • Ctrl+Enter: Calcular');
        console.log('   • Escape: Limpiar');
        console.log('   • Ctrl+S: Guardar');
        console.log('   • Alt+1/2/3: Cambiar sección');
    }

    // Mostrar mensaje de bienvenida
    showWelcomeMessage() {
        setTimeout(() => {
            uiManager.showNotification(
                '¡Bienvenido a la Calculadora de Física! Usa Ctrl+Enter para calcular rápidamente.',
                'success'
            );
        }, 1000);
    }

    // Mostrar error crítico
    showCriticalError(error) {
        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(231, 76, 60, 0.9);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Segoe UI', sans-serif;
        `;

        errorContainer.innerHTML = `
            <div style="text-align: center; max-width: 600px; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                <h1 style="margin-bottom: 1rem;">Error Critical</h1>
                <p style="margin-bottom: 2rem; font-size: 1.1rem;">
                    Ha ocurrido un error crítico al inicializar la aplicación.
                </p>
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
                    <code style="font-size: 0.9rem;">${error.message || error}</code>
                </div>
                <button onclick="location.reload()" style="
                    background: white;
                    color: #e74c3c;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    font-weight: bold;
                ">
                    <i class="fas fa-refresh"></i> Recargar Página
                </button>
            </div>
        `;

        document.body.appendChild(errorContainer);
    }

    // Métodos de utilidad

    // Obtener información del sistema
    getSystemInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screen: {
                width: screen.width,
                height: screen.height
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }

    // Verificar compatibilidad del navegador
    checkBrowserCompatibility() {
        const requiredFeatures = [
            'fetch',
            'Promise',
            'localStorage',
            'JSON'
        ];

        const missingFeatures = requiredFeatures.filter(feature => {
            return !(feature in window);
        });

        if (missingFeatures.length > 0) {
            throw new Error(`Navegador no compatible. Características faltantes: ${missingFeatures.join(', ')}`);
        }

        return true;
    }

    // Limpiar datos de la aplicación
    clearAppData() {
        if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
            localStorage.clear();
            location.reload();
        }
    }

    // Exportar datos
    exportData() {
        try {
            const data = {
                calculos: JSON.parse(localStorage.getItem('fisica_calculos') || '[]'),
                timestamp: new Date().toISOString(),
                version: '1.0.0'
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `fisica_calculadora_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            
            uiManager.showNotification('Datos exportados correctamente', 'success');
        } catch (error) {
            uiManager.showError('Error al exportar datos: ' + error.message);
        }
    }
}

// Instanciar y inicializar la aplicación
const app = new PhysicsCalculatorApp();

// Inicializar cuando se cargue la página
app.init();

// Hacer disponible globalmente para debugging
window.physicsApp = {
    app,
    uiManager,
    dbManager,
    physicsCalculator,
    clearData: () => app.clearAppData(),
    exportData: () => app.exportData(),
    getSystemInfo: () => app.getSystemInfo()
};

console.log('🔧 Aplicación disponible en window.physicsApp para debugging');