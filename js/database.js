// Base de datos JSON local - Sistema simplificado
class DatabaseSimulator {
    constructor() {
        this.escenarios = [
            {
                EscenarioID: 1,
                Nombre: '🚀 Trabajo con angulo',
                Codigo: 'TRABAJO_CONST',
                FormulaDescripcion: 'W = F × d × cos(θ)',
                UnidadResultado: 'J (Joules)',
                Descripcion: '⚡ Trabajo realizado por una fuerza constante que forma un ángulo con la dirección del movimiento.',
                Notas: '📐 θ es el ángulo entre la fuerza y el desplazamiento | 🎯 Fundamental en balística y mecánica',
                parametros: [
                    { ParametroID: 1, Nombre: '💪 Fuerza (N)', Codigo: 'F', Unidad: 'N', OrdenParametro: 1, Descripcion: 'Fuerza aplicada al objeto' },
                    { ParametroID: 2, Nombre: '📏 Distancia (m)', Codigo: 'd', Unidad: 'm', OrdenParametro: 2, Descripcion: 'Distancia recorrida por el objeto' },
                    { ParametroID: 3, Nombre: '📐 Ángulo (θ)', Codigo: 'theta', Unidad: 'grados', OrdenParametro: 3, Descripcion: 'Ángulo entre la fuerza y el desplazamiento' }
                ]
            },
            {
                EscenarioID: 2,
                Nombre: '🌍 Fuerza en newton',
                Codigo: 'FUERZA_PESO',
                FormulaDescripcion: 'F = m × g',
                UnidadResultado: 'N (Newton)',
                Descripcion: '🌌 Fuerza de atracción gravitatoria que ejerce la Tierra sobre cualquier objeto con masa.',
                Notas: '🌍 g = 9.81 m/s² (aceleración de la gravedad terrestre) | ⚖️ Base de toda la mecánica terrestre',
                parametros: [
                    { ParametroID: 4, Nombre: '⚖️ Masa (kg)', Codigo: 'm', Unidad: 'kg', OrdenParametro: 1, Descripcion: 'Masa del objeto (cantidad de materia)' }
                ]
            },
            {
                EscenarioID: 3,
                Nombre: '⚡ Trabajo Lineal - Fuerza Paralela al Movimiento',
                Codigo: 'TRABAJO_MD',
                FormulaDescripcion: 'W = F × d',
                UnidadResultado: 'J (Joules)',
                Descripcion: '🎯 Trabajo cuando la fuerza y el desplazamiento están perfectamente alineados.',
                Notas: '✨ Caso especial donde θ = 0°, cos(0°) = 1 | 💡 Máxima eficiencia energética',
                parametros: [
                    { ParametroID: 5, Nombre: '💪 Fuerza (N)', Codigo: 'F', Unidad: 'N', OrdenParametro: 1, Descripcion: 'Fuerza aplicada en la dirección del movimiento' },
                    { ParametroID: 6, Nombre: '📏 Distancia (m)', Codigo: 'd', Unidad: 'm', OrdenParametro: 2, Descripcion: 'Distancia recorrida por el objeto' }
                ]
            },
            {
                EscenarioID: 4,
                Nombre: '🏗️ Energia Potencial',
                Codigo: 'TRABAJO_VERTICAL',
                FormulaDescripcion: 'Ep = m × g × h',
                UnidadResultado: 'J (Joules)',
                Descripcion: '⛰️ Energía almacenada debido a la posición del objeto en el campo gravitatorio terrestre.',
                Notas: '🌍 g = 9.81 m/s² | 📏 h = altura sobre referencia | � Energía potencial gravitatoria almacenada',
                parametros: [
                    { ParametroID: 7, Nombre: '⚖️ Masa (kg)', Codigo: 'm', Unidad: 'kg', OrdenParametro: 1, Descripcion: 'Masa del objeto a elevar' },
                    { ParametroID: 8, Nombre: '📏 Altura (m)', Codigo: 'h', Unidad: 'm', OrdenParametro: 2, Descripcion: 'Altura vertical a elevar el objeto' }
                ]
            },
            {
                EscenarioID: 5,
                Nombre: '💫 Energia Cinetica',
                Codigo: 'ENERGIA_CINETICA',
                FormulaDescripcion: 'Ec = ½ × m × v²',
                UnidadResultado: 'J (Joules)',
                Descripcion: '🚀 Energía que posee un objeto debido a su velocidad - la energía del movimiento puro.',
                Notas: '📈 Crece exponencialmente con la velocidad (v²) | ⚡ Fundamental en colisiones e impactos',
                parametros: [
                    { ParametroID: 9, Nombre: '⚖️ Masa (kg)', Codigo: 'm', Unidad: 'kg', OrdenParametro: 1, Descripcion: 'Masa del objeto en movimiento' },
                    { ParametroID: 10, Nombre: '🏃 Velocidad (m/s)', Codigo: 'v', Unidad: 'm/s', OrdenParametro: 2, Descripcion: 'Velocidad del objeto' }
                ]
            },
            {
                EscenarioID: 7,
                Nombre: '🔋 Energía Total del Sistema - Mecánica Completa',
                Codigo: 'ENERGIA_MECANICA',
                FormulaDescripcion: 'Em = Ec + Ep = ½mv² + mgh',
                UnidadResultado: 'J (Joules)',
                Descripcion: '⚡ Suma total de energía cinética y energía potencial - la energía mecánica completa del sistema.',
                Notas: '🔄 Em = ½mv² + mgh | 🌟 Energía total conservada en sistemas sin fricción',
                parametros: [
                    { ParametroID: 13, Nombre: '⚖️ Masa (kg)', Codigo: 'm', Unidad: 'kg', OrdenParametro: 1, Descripcion: 'Masa del objeto' },
                    { ParametroID: 14, Nombre: '🏃 Velocidad (m/s)', Codigo: 'v', Unidad: 'm/s', OrdenParametro: 2, Descripcion: 'Velocidad del objeto' },
                    { ParametroID: 15, Nombre: '📏 Altura (m)', Codigo: 'h', Unidad: 'm', OrdenParametro: 3, Descripcion: 'Altura del objeto sobre referencia' }
                ]
            },
            {
                EscenarioID: 8,
                Nombre: '⚡ Potencia',
                Codigo: 'POTENCIA',
                FormulaDescripcion: 'P = W/t',
                UnidadResultado: 'W (Watt)',
                Descripcion: '⏱️ Rapidez con la que se realiza trabajo o se transfiere energía - velocidad energética.',
                Notas: '🐎 1 hp (caballo de fuerza) = 746 W | ⚡ Potencia = Trabajo / Tiempo',
                parametros: [
                    { ParametroID: 16, Nombre: '⚡ Trabajo (J)', Codigo: 'W', Unidad: 'J', OrdenParametro: 1, Descripcion: 'Trabajo realizado' },
                    { ParametroID: 17, Nombre: '⏱️ Tiempo (s)', Codigo: 't', Unidad: 's', OrdenParametro: 2, Descripcion: 'Tiempo empleado en realizar el trabajo' }
                ]
            },
            {
                EscenarioID: 9,
                Nombre: '🎯 Trabajo Resultante Múltiples Fuerzas',
                Codigo: 'TRABAJO_NETO',
                FormulaDescripcion: 'Tr = F1×d1×cos(θ1) + F2×d2×cos(θ2) + F3×d3×cos(θ3) + ...',
                UnidadResultado: 'J (Joules)',
                Descripcion: '🔀 Trabajo total realizado por múltiples fuerzas actuando simultáneamente sobre un objeto con diferentes distancias y ángulos.',
                Notas: '📈 Si Tr > 0: acelerando | 🟰 Tr = 0: velocidad constante | 📉 Tr < 0: frenando',
                parametros: [
                    { ParametroID: 20, Nombre: '🔢 Número de fuerzas', Codigo: 'numFuerzas', Unidad: '', OrdenParametro: 1, Descripcion: 'Cantidad de fuerzas actuando (2-5)' }
                ]
            },
            {
                EscenarioID: 11,
                Nombre: '♻️ Conservacion de energia',
                Codigo: 'CONSERVACION_ENERGIA',
                FormulaDescripcion: 'Em1 = Em2, Ep1 + Ec1 = Ep2 + Ec2',
                UnidadResultado: 'J (Joules)',
                Descripcion: '🌟 Principio fundamental: la energía total se conserva - nunca se crea ni se destruye.',
                Notas: '✨ Válido sin fricción | 🔄 Energía se transforma pero no desaparece | 🎢 Perfecto para montañas rusas',
                parametros: [
                    { ParametroID: 24, Nombre: '⚖️ Masa (kg)', Codigo: 'm', Unidad: 'kg', OrdenParametro: 1, Descripcion: 'Masa del objeto' },
                    { ParametroID: 25, Nombre: '📏 Altura inicial (m)', Codigo: 'h1', Unidad: 'm', OrdenParametro: 2, Descripcion: 'Altura inicial del objeto' },
                    { ParametroID: 26, Nombre: '🏃 Velocidad inicial (m/s)', Codigo: 'v1', Unidad: 'm/s', OrdenParametro: 3, Descripcion: 'Velocidad inicial del objeto' },
                    { ParametroID: 27, Nombre: '📏 Altura final (m)', Codigo: 'h2', Unidad: 'm', OrdenParametro: 4, Descripcion: 'Altura final del objeto' },
                    { ParametroID: 28, Nombre: '🏃 Velocidad final (m/s)', Codigo: 'v2', Unidad: 'm/s', OrdenParametro: 5, Descripcion: 'Velocidad final del objeto' }
                ]
            },
            {
                EscenarioID: 12,
                Nombre: '🧮 Teorema de Trabajo - Trabajo Neto',
                Codigo: 'TEOREMA_TRABAJO_ENERGIA',
                FormulaDescripcion: 'W = ΔEc = Ec2 - Ec1 = ½mv2² - ½mv1²',
                UnidadResultado: 'J (Joules)',
                Descripcion: '⚡ Teorema fundamental: el trabajo total realizado equivale exactamente al cambio de energía cinética.',
                Notas: '🔑 Clave para análisis de colisiones | 🚗 Fundamental en frenado y aceleración de vehículos',
                parametros: [
                    { ParametroID: 29, Nombre: '⚖️ Masa (kg)', Codigo: 'm', Unidad: 'kg', OrdenParametro: 1, Descripcion: 'Masa del objeto' },
                    { ParametroID: 30, Nombre: '🏃 Velocidad inicial (m/s)', Codigo: 'v1', Unidad: 'm/s', OrdenParametro: 2, Descripcion: 'Velocidad inicial del objeto' },
                    { ParametroID: 31, Nombre: '🏃 Velocidad final (m/s)', Codigo: 'v2', Unidad: 'm/s', OrdenParametro: 3, Descripcion: 'Velocidad final del objeto' }
                ]
            },
            {
                EscenarioID: 13,
                Nombre: '🌌 Trabajo Cambio de Altura - Cambio de Energia Potencial - Trabajo de gravedad',
                Codigo: 'TRABAJO_POTENCIAL_GRAV',
                FormulaDescripcion: 'Wp = Epg1 - Epg2 = mgh1 - mgh2',
                UnidadResultado: 'J (Joules)',
                Descripcion: '🚁 Trabajo realizado por o contra la fuerza gravitatoria cuando un objeto cambia de altura.',
                Notas: '📈 Wp > 0: objeto baja (gravedad ayuda) | 📉 Wp < 0: objeto sube (trabajo contra gravedad)',
                parametros: [
                    { ParametroID: 32, Nombre: '⚖️ Masa (kg)', Codigo: 'm', Unidad: 'kg', OrdenParametro: 1, Descripcion: 'Masa del objeto' },
                    { ParametroID: 33, Nombre: '📏 Altura inicial (m)', Codigo: 'h1', Unidad: 'm', OrdenParametro: 2, Descripcion: 'Altura inicial del objeto' },
                    { ParametroID: 34, Nombre: '📏 Altura final (m)', Codigo: 'h2', Unidad: 'm', OrdenParametro: 3, Descripcion: 'Altura final del objeto' }
                ]
            },
            {
                EscenarioID: 14,
                Nombre: '⚡ Potencia Instantanea',
                Codigo: 'POTENCIA_INSTANTANEA',
                FormulaDescripcion: 'Pi = F × V × cos(θ)',
                UnidadResultado: 'W (Watt)',
                Descripcion: '⚡ Potencia instantánea calculada a partir de la fuerza, velocidad y el ángulo entre ellas.',
                Notas: '🔥 Pi = Potencia Instantánea | 💨 V = Velocidad instantánea | 📐 θ = ángulo entre fuerza y velocidad',
                parametros: [
                    { ParametroID: 35, Nombre: '💪 Fuerza (N)', Codigo: 'F', Unidad: 'N', OrdenParametro: 1, Descripcion: 'Fuerza aplicada al objeto' },
                    { ParametroID: 36, Nombre: '💨 Velocidad (m/s)', Codigo: 'V', Unidad: 'm/s', OrdenParametro: 2, Descripcion: 'Velocidad instantánea del objeto' },
                    { ParametroID: 37, Nombre: '📐 Ángulo (θ)', Codigo: 'theta', Unidad: 'grados', OrdenParametro: 3, Descripcion: 'Ángulo entre la fuerza y la velocidad' }
                ]
            },
            {
                EscenarioID: 15,
                Nombre: '🔋 Relación Energia y Potencia',
                Codigo: 'ENERGIA_POTENCIA',
                FormulaDescripcion: 'E = P × T',
                UnidadResultado: 'J (Joules)',
                Descripcion: '⚡ Energía calculada a partir de la potencia y el tiempo durante el cual se aplica.',
                Notas: '🔋 E = Energía total | ⚡ P = Potencia en vatios | ⏱️ T = Tiempo en segundos',
                parametros: [
                    { ParametroID: 38, Nombre: '⚡ Potencia (W)', Codigo: 'P', Unidad: 'W', OrdenParametro: 1, Descripcion: 'Potencia aplicada' },
                    { ParametroID: 39, Nombre: '⏱️ Tiempo (s)', Codigo: 'T', Unidad: 's', OrdenParametro: 2, Descripcion: 'Tiempo durante el cual se aplica la potencia' }
                ]
            },
            {
                EscenarioID: 16,
                Nombre: '💪 Fuerza aplicada por un objeto',
                Codigo: 'FUERZA_TRABAJO',
                FormulaDescripción: 'F = W / d',
                UnidadResultado: 'N (Newton)',
                Descripcion: '🔧 Fuerza necesaria para realizar un trabajo determinado a lo largo de una distancia específica.',
                Notas: '💪 F = Fuerza aplicada | ⚡ W = Trabajo en Joules | 📏 d = Distancia en metros',
                parametros: [
                    { ParametroID: 40, Nombre: '⚡ Trabajo (J)', Codigo: 'W', Unidad: 'J', OrdenParametro: 1, Descripcion: 'Trabajo realizado por la fuerza' },
                    { ParametroID: 41, Nombre: '📏 Distancia (m)', Codigo: 'd', Unidad: 'm', OrdenParametro: 2, Descripcion: 'Distancia a lo largo de la cual se aplica la fuerza' }
                ]
            }
        ];

        this.calculos = JSON.parse(localStorage.getItem('fisica_calculos') || '[]');
        this.constantes = {
            g: 9.81
        };
    }

    async getEscenarios() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.escenarios);
            }, 100);
        });
    }

    async getEscenarioById(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const escenario = this.escenarios.find(e => e.EscenarioID === parseInt(id));
                resolve(escenario);
            }, 50);
        });
    }

    async saveCalculo(calculoData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const nuevoCalculo = {
                    CalculoID: Date.now(),
                    EscenarioID: calculoData.EscenarioID,
                    Fecha: new Date().toISOString(),
                    Resultado: calculoData.Resultado,
                    UnidadResultado: calculoData.UnidadResultado,
                    Parametros: calculoData.Parametros,
                    EscenarioNombre: calculoData.EscenarioNombre
                };
                
                this.calculos.unshift(nuevoCalculo);
                localStorage.setItem('fisica_calculos', JSON.stringify(this.calculos));
                resolve(nuevoCalculo);
            }, 100);
        });
    }

    async getHistorialCalculos(filtros = {}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let resultados = [...this.calculos];
                console.log('🗃️ DB: Total cálculos en memoria:', this.calculos.length);
                console.log('🗃️ DB: Filtros recibidos:', filtros);
                console.log('🗃️ DB: Muestra de cálculos:', this.calculos.slice(0, 2));
                
                if (filtros.escenarioId) {
                    const filtroEscenarioId = parseInt(filtros.escenarioId);
                    console.log('🔍 DB: Filtrando por EscenarioID:', filtroEscenarioId, 'tipo:', typeof filtroEscenarioId);
                    
                    const antesFiltro = resultados.length;
                    resultados = resultados.filter(c => {
                        const match = c.EscenarioID === filtroEscenarioId;
                        if (!match) {
                            console.log('❌ DB: No coincide -', 'Calc EscenarioID:', c.EscenarioID, 'tipo:', typeof c.EscenarioID, 'vs filtro:', filtroEscenarioId);
                        }
                        return match;
                    });
                    console.log('🎯 DB: Después filtro escenario:', antesFiltro, '→', resultados.length);
                }
                
                if (filtros.fecha) {
                    const fechaFiltro = new Date(filtros.fecha);
                    console.log('🔍 DB: Filtrando por fecha:', fechaFiltro.toDateString());
                    
                    resultados = resultados.filter(c => {
                        const fechaCalculo = new Date(c.Fecha);
                        const match = fechaCalculo.toDateString() === fechaFiltro.toDateString();
                        console.log('📅 DB: Comparando fechas -', fechaCalculo.toDateString(), 'vs', fechaFiltro.toDateString(), '→', match);
                        return match;
                    });
                }
                
                console.log('✅ DB: Resultados finales:', resultados.length);
                resolve(resultados);
            }, 100);
        });
    }
}

// Manager de la base de datos JSON/localStorage
class DatabaseManager {
    constructor() {
        this.simulator = new DatabaseSimulator();
        this.useSimulator = true; // Siempre usar simulador JSON para simplicidad
        this.storageKey = 'fisica_calculos';
        this.configKey = 'fisica_config';
        this.initializeLocalStorage();
    }

    // Inicializar localStorage con datos predeterminados
    initializeLocalStorage() {
        const savedCalculos = localStorage.getItem(this.storageKey);
        if (!savedCalculos) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }

        const savedConfig = localStorage.getItem(this.configKey);
        if (!savedConfig) {
            const defaultConfig = {
                theme: 'light',
                showSteps: true,
                autoSave: true,
                precision: 4
            };
            localStorage.setItem(this.configKey, JSON.stringify(defaultConfig));
        }
    }

    async getEscenarios() {
        return await this.simulator.getEscenarios();
    }

    async getEscenarioById(id) {
        return await this.simulator.getEscenarioById(id);
    }

    async saveCalculo(calculoData) {
        return await this.simulator.saveCalculo(calculoData);
    }

    async getHistorialCalculos(filtros = {}) {
        return await this.simulator.getHistorialCalculos(filtros);
    }

    // Métodos adicionales para gestión local
    getConfig() {
        return JSON.parse(localStorage.getItem(this.configKey) || '{}');
    }

    saveConfig(config) {
        localStorage.setItem(this.configKey, JSON.stringify(config));
    }

    exportData() {
        const calculos = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        const config = this.getConfig();
        
        return {
            calculos: calculos,
            config: config,
            exported: new Date().toISOString(),
            version: '1.0.0'
        };
    }

    importData(data) {
        if (data.calculos) {
            localStorage.setItem(this.storageKey, JSON.stringify(data.calculos));
        }
        if (data.config) {
            this.saveConfig(data.config);
        }
        return true;
    }

    clearAllData() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.configKey);
        this.initializeLocalStorage();
    }

    getConstante(nombre) {
        return this.simulator.constantes[nombre] || 0;
    }
}

// Instancia global del manager
const dbManager = new DatabaseManager();