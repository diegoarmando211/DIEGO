// Clase para manejar la interfaz de usuario
class UIManager {
    constructor() {
        this.currentSection = 'calculadora';
        this.currentScenario = null;
        this.mediaResources = this.initializeMediaResources();
    }

    // Inicializar recursos multimedia para cada escenario
    initializeMediaResources() {
        return {
            'TRABAJO_CONST': {
                image: 'images/trabajo_angulo.svg',
                description: 'Trabajo realizado por una fuerza con ángulo'
            },
            'TRABAJO_MD': {
                image: 'images/trabajo_simple.svg',
                description: 'Trabajo en la misma dirección'
            },
            'FUERZA_PESO': {
                image: 'images/fuerza_peso.svg',
                description: 'Fuerza peso de un objeto'
            },
            'TRABAJO_VERTICAL': {
                image: 'images/trabajo_vertical.svg',
                description: 'Trabajo para elevar un objeto'
            },
            'ENERGIA_CINETICA': {
                image: 'images/energia_cinetica_new.svg',
                description: '💫 Energía del movimiento - Velocidad cinética'
            },
            'ENERGIA_POTENCIAL': {
                image: 'images/energia_potencial.svg',
                description: 'Energía almacenada por posición'
            },
            'ENERGIA_MECANICA': {
                image: 'images/energia_mecanica.svg',
                description: 'Energía mecánica total'
            },
            'POTENCIA': {
                image: 'images/potencia.svg',
                description: 'Potencia desarrollada'
            },
            'TRABAJO_NETO': {
                image: 'images/trabajo_neto.svg',
                description: 'Trabajo total con múltiples fuerzas'
            },
            'CONSERVACION_ENERGIA': {
                image: 'images/conservacion_energia.svg',
                description: 'Conservación de energía mecánica'
            },
            'TEOREMA_TRABAJO_ENERGIA': {
                image: 'images/teorema_trabajo.svg',
                description: 'Teorema trabajo-energía cinética'
            }
        };
    }

    // Inicializar todos los event listeners
    initializeEventListeners() {
        // Navegación entre secciones
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });

        // Selector de escenario
        const escenarioSelect = document.getElementById('escenarioSelect');
        if (escenarioSelect) {
            escenarioSelect.addEventListener('change', (e) => {
                this.loadScenario(e.target.value);
            });
        }

        // Botones de acción
        const calculateBtn = document.getElementById('calculateBtn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.performCalculation();
            });
        }

        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearForm();
            });
        }

        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveCalculation();
            });
        }

        // Filtros de historial
        const filterBtn = document.getElementById('filterBtn');
        console.log('🔧 Configurando listener filterBtn:', filterBtn ? 'existe' : 'NO EXISTE');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                console.log('🎯 Botón filtrar clickeado');
                this.filterHistory();
            });
        }

        const clearFiltersBtn = document.getElementById('clearFiltersBtn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                console.log('🧹 Limpiando filtros');
                this.clearFilters();
            });
        }

        const clearHistoryBtn = document.getElementById('clearHistoryBtn');
        if (clearHistoryBtn) {
            clearHistoryBtn.addEventListener('click', () => {
                this.clearHistory();
            });
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportHistory();
            });
        }

        const importBtn = document.getElementById('importBtn');
        if (importBtn) {
            importBtn.addEventListener('click', () => {
                document.getElementById('importFile').click();
            });
        }

        const importFile = document.getElementById('importFile');
        if (importFile) {
            importFile.addEventListener('change', (e) => {
                this.importHistory(e.target.files[0]);
            });
        }
    }

    // Cambiar entre secciones
    switchSection(sectionName) {
        // Ocultar todas las secciones
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Actualizar botones de navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Mostrar sección seleccionada
        const targetSection = document.getElementById(sectionName);
        const targetBtn = document.querySelector(`[data-section="${sectionName}"]`);
        
        if (targetSection && targetBtn) {
            targetSection.classList.add('active');
            targetBtn.classList.add('active');
            this.currentSection = sectionName;

            // Cargar datos específicos de la sección
            if (sectionName === 'historial') {
                this.loadHistory();
            }
        }
    }

    // Cargar lista de escenarios
    async loadScenarios() {
        try {
            const escenarios = await dbManager.getEscenarios();
            const select = document.getElementById('escenarioSelect');
            const filterSelect = document.getElementById('filterEscenario');

            if (!select) return;

            // Opciones para selector principal
            select.innerHTML = '<option value="">Selecciona un escenario...</option>';
            escenarios.forEach(escenario => {
                const option = document.createElement('option');
                option.value = escenario.EscenarioID;
                option.textContent = escenario.Nombre;
                select.appendChild(option);
            });

            // También poblar el selector de filtros (si existe)
            if (filterSelect) {
                filterSelect.innerHTML = '<option value="">Todos los escenarios</option>';
                escenarios.forEach(escenario => {
                    const opt = document.createElement('option');
                    opt.value = escenario.EscenarioID;
                    opt.textContent = escenario.Nombre;
                    filterSelect.appendChild(opt);
                });
            }

        } catch (error) {
            this.showError('Error al cargar escenarios: ' + error.message);
        }
    }

    // Cargar un escenario específico
    async loadScenario(escenarioId) {
        if (!escenarioId) {
            document.getElementById('calculatorForm').style.display = 'none';
            return;
        }

        try {
            const escenario = await dbManager.getEscenarioById(escenarioId);
            if (!escenario) {
                this.showError('Escenario no encontrado');
                return;
            }

            this.currentScenario = escenario;
            this.renderScenarioForm(escenario);
            document.getElementById('calculatorForm').style.display = 'block';
        } catch (error) {
            this.showError('Error al cargar escenario: ' + error.message);
        }
    }

    // Renderizar el formulario del escenario
    renderScenarioForm(escenario) {
        // Actualizar información del escenario
        document.getElementById('scenarioTitle').textContent = escenario.Nombre;
        
        // Mostrar fórmula con información adicional
        const formulaElement = document.getElementById('scenarioFormula');
        formulaElement.innerHTML = `
            <div class="formula-display">
                <div class="formula-main">${escenario.FormulaDescripcion}</div>
                <div class="formula-result">Resultado en: ${escenario.UnidadResultado}</div>
                ${escenario.Descripcion ? `<div class="formula-description">${escenario.Descripcion}</div>` : ''}
                ${escenario.Notas ? `<div class="formula-notes">📝 ${escenario.Notas}</div>` : ''}
            </div>
        `;

        // Agregar multimedia
        this.renderScenarioMedia(escenario.Codigo);

        // Generar campos de parámetros
        const container = document.getElementById('parametersContainer');
        container.innerHTML = '';

        // Casos especiales para escenarios complejos
        if (escenario.Codigo === 'TRABAJO_NETO') {
            this.renderTrabajoNetoForm(container);
        } else if (escenario.Codigo === 'CONSERVACION_ENERGIA') {
            this.renderConservacionEnergiaForm(container);
        } else {
            // Formulario estándar
            escenario.parametros
                .sort((a, b) => a.OrdenParametro - b.OrdenParametro)
                .forEach(param => {
                    const paramGroup = document.createElement('div');
                    paramGroup.className = 'parameter-group slide-up';
                    
                    paramGroup.innerHTML = `
                        <label for="param_${param.Codigo}" class="tooltip" data-tooltip="${param.Descripcion || 'Ingresa el valor para ' + param.Nombre}">
                            ${param.Nombre}
                            ${param.Descripcion ? `<span class="param-help">ⓘ</span>` : ''}
                        </label>
                        <input 
                            type="number" 
                            id="param_${param.Codigo}" 
                            class="form-input" 
                            step="any" 
                            placeholder="Ingresa ${param.Nombre.toLowerCase()}"
                            data-codigo="${param.Codigo}"
                        >
                        <div class="unit-display">
                            <span class="unit-label">Unidad:</span> 
                            <span class="unit-value">${param.Unidad}</span>
                            ${param.Descripcion ? `<div class="param-description">${param.Descripcion}</div>` : ''}
                        </div>
                    `;
                    
                    container.appendChild(paramGroup);
                });
        }

        // Ocultar resultado anterior
        document.getElementById('resultContainer').style.display = 'none';
        document.getElementById('saveBtn').style.display = 'none';
    }

    // Formulario especializado para trabajo neto con múltiples fuerzas
    renderTrabajoNetoForm(container) {
        container.innerHTML = `
            <div class="parameter-group slide-up">
                <label for="numFuerzas" class="tooltip" data-tooltip="Selecciona cuántas fuerzas actúan sobre el objeto (2-5)">
                    Número de fuerzas
                    <span class="param-help">ⓘ</span>
                </label>
                <select id="numFuerzas" class="form-input" data-codigo="numFuerzas">
                    <option value="">Selecciona...</option>
                    <option value="2">2 fuerzas</option>
                    <option value="3">3 fuerzas</option>
                    <option value="4">4 fuerzas</option>
                    <option value="5">5 fuerzas</option>
                </select>
            </div>
            
            <div class="parameter-group slide-up">
                <label for="param_d" class="tooltip" data-tooltip="Distancia común recorrida por todas las fuerzas">
                    Distancia (m)
                    <span class="param-help">ⓘ</span>
                </label>
                <input type="number" id="param_d" class="form-input" step="any" placeholder="Ingresa distancia" data-codigo="d">
                <div class="unit-display">
                    <span class="unit-label">Unidad:</span> 
                    <span class="unit-value">m</span>
                    <div class="param-description">Distancia común para todas las fuerzas</div>
                </div>
            </div>

            <div id="fuerzasContainer" class="fuerzas-container"></div>
        `;

        // Event listener para generar campos de fuerzas dinámicamente
        document.getElementById('numFuerzas').addEventListener('change', (e) => {
            this.generateFuerzasFields(parseInt(e.target.value));
        });
    }

    // Generar campos dinámicos para las fuerzas
    generateFuerzasFields(numFuerzas) {
        const container = document.getElementById('fuerzasContainer');
        if (!container || !numFuerzas) return;

        container.innerHTML = '';
        
        for (let i = 1; i <= numFuerzas; i++) {
            const fuerzaGroup = document.createElement('div');
            fuerzaGroup.className = 'fuerza-group slide-up';
            fuerzaGroup.innerHTML = `
                <h4>Fuerza ${i}</h4>
                <div class="fuerza-inputs">
                    <div class="input-group">
                        <label>Magnitud (N)</label>
                        <input type="number" id="fuerza${i}_magnitud" class="form-input" step="any" 
                               placeholder="Fuerza ${i}" data-fuerza="${i}" data-tipo="magnitud">
                    </div>
                    <div class="input-group">
                        <label>Ángulo (°)</label>
                        <input type="number" id="fuerza${i}_angulo" class="form-input" step="any" 
                               placeholder="Ángulo ${i}" data-fuerza="${i}" data-tipo="angulo"
                               value="${i === 1 ? '180' : '0'}">
                        <small>Sugerencia: F1 suele ser 180° (oposición), otras 0° o ángulos específicos</small>
                    </div>
                </div>
            `;
            container.appendChild(fuerzaGroup);
        }
    }

    // Formulario especializado para conservación de energía
    renderConservacionEnergiaForm(container) {
        container.innerHTML = `
            <div class="conservacion-container">
                <div class="estado-section">
                    <h4>Estado Inicial (1)</h4>
                    <div class="parameter-group slide-up">
                        <label for="param_m" class="tooltip" data-tooltip="Masa del objeto en kilogramos">
                            Masa (kg)
                            <span class="param-help">ⓘ</span>
                        </label>
                        <input type="number" id="param_m" class="form-input" step="any" placeholder="Masa del objeto" data-codigo="m">
                    </div>
                    
                    <div class="parameter-group slide-up">
                        <label for="param_h1" class="tooltip" data-tooltip="Altura inicial del objeto">
                            Altura inicial (m)
                            <span class="param-help">ⓘ</span>
                        </label>
                        <input type="number" id="param_h1" class="form-input" step="any" placeholder="Altura inicial" data-codigo="h1">
                    </div>
                    
                    <div class="parameter-group slide-up">
                        <label for="param_v1" class="tooltip" data-tooltip="Velocidad inicial del objeto">
                            Velocidad inicial (m/s)
                            <span class="param-help">ⓘ</span>
                        </label>
                        <input type="number" id="param_v1" class="form-input" step="any" placeholder="Velocidad inicial" data-codigo="v1">
                    </div>
                </div>

                <div class="estado-section">
                    <h4>Estado Final (2)</h4>
                    <div class="parameter-group slide-up">
                        <label for="param_h2" class="tooltip" data-tooltip="Altura final del objeto">
                            Altura final (m)
                            <span class="param-help">ⓘ</span>
                        </label>
                        <input type="number" id="param_h2" class="form-input" step="any" placeholder="Altura final" data-codigo="h2">
                    </div>
                    
                    <div class="parameter-group slide-up">
                        <label for="param_v2" class="tooltip" data-tooltip="Velocidad final del objeto">
                            Velocidad final (m/s)
                            <span class="param-help">ⓘ</span>
                        </label>
                        <input type="number" id="param_v2" class="form-input" step="any" placeholder="Velocidad final" data-codigo="v2">
                    </div>
                </div>
            </div>
        `;
    }

    // Renderizar multimedia del escenario
    renderScenarioMedia(codigo) {
        const mediaContainer = document.getElementById('scenarioMedia');
        if (!mediaContainer) return;

        const media = this.mediaResources[codigo];
        if (!media) {
            mediaContainer.innerHTML = '';
            return;
        }

        mediaContainer.innerHTML = `
            <div class="media-content slide-up">
                <div class="media-visual">
                    <img src="${media.image}" alt="${media.description}" 
                         onerror="this.style.display='none'" 
                         class="scenario-image">
                </div>
                <p class="media-description">${media.description}</p>
            </div>
        `;
    }

    // Realizar cálculo
    async performCalculation() {
        try {
            console.log('UIManager.performCalculation invoked for scenario:', this.currentScenario && this.currentScenario.Codigo);
            if (!this.currentScenario) {
                this.showError('Selecciona un escenario primero');
                return;
            }

            const parametros = this.collectParameters();
            if (!parametros) return;

            // Realizar el cálculo
            const resultado = physicsCalculator.calcular(this.currentScenario, parametros);
            
            // Mostrar resultado
            this.displayResult(resultado, parametros);
            
            // Mostrar botón de guardar
            document.getElementById('saveBtn').style.display = 'block';
            
            // Sonido de éxito
            if (window.audioManager) {
                window.audioManager.play('calculate');
            }

        } catch (error) {
            this.showError('Error en el cálculo: ' + error.message);
        }
    }

    // Recopilar parámetros del formulario
    collectParameters() {
        const parametros = {};

        // Casos especiales
        if (this.currentScenario.Codigo === 'TRABAJO_NETO') {
            const numFuerzas = document.getElementById('numFuerzas').value;
            const distancia = document.getElementById('param_d').value;

            if (!numFuerzas || !distancia) {
                this.showError('Completa todos los campos requeridos');
                return null;
            }

            const fuerzas = [];
            for (let i = 1; i <= parseInt(numFuerzas); i++) {
                const magnitud = document.getElementById(`fuerza${i}_magnitud`).value;
                const angulo = document.getElementById(`fuerza${i}_angulo`).value;

                if (!magnitud || angulo === '') {
                    this.showError(`Completa los datos de la Fuerza ${i}`);
                    return null;
                }

                fuerzas.push({
                    magnitud: parseFloat(magnitud),
                    angulo: parseFloat(angulo)
                });
            }

            parametros.fuerzas = fuerzas;
            parametros.d = parseFloat(distancia);

        } else if (this.currentScenario.Codigo === 'CONSERVACION_ENERGIA') {
            const campos = ['m', 'h1', 'v1', 'h2', 'v2'];
            for (const campo of campos) {
                const input = document.getElementById(`param_${campo}`);
                if (!input || input.value === '') {
                    this.showError(`Completa el campo ${campo}`);
                    return null;
                }
                
                if (campo === 'm') {
                    parametros[campo] = parseFloat(input.value);
                } else {
                    // Separar estados
                    const masa = parseFloat(document.getElementById('param_m').value);
                    parametros.estado1 = {
                        masa: masa,
                        altura: parseFloat(document.getElementById('param_h1').value),
                        velocidad: parseFloat(document.getElementById('param_v1').value)
                    };
                    parametros.estado2 = {
                        masa: masa,
                        altura: parseFloat(document.getElementById('param_h2').value),
                        velocidad: parseFloat(document.getElementById('param_v2').value)
                    };
                    break;
                }
            }

        } else {
            // Formulario estándar
            const inputs = document.querySelectorAll('#parametersContainer input[data-codigo]');
            
            for (const input of inputs) {
                if (input.value === '') {
                    this.showError(`Completa el campo ${input.id}`);
                    return null;
                }
                parametros[input.dataset.codigo] = parseFloat(input.value);
            }
        }

        return parametros;
    }

    // Mostrar resultado del cálculo
    displayResult(resultado, parametros) {
        const container = document.getElementById('resultContainer');
        const content = document.getElementById('resultContent');

        let resultHtml = `
            <div class="result-main">
                <h3>Resultado: ${resultado.resultado} ${this.currentScenario.UnidadResultado}</h3>
                <p class="result-explanation">${resultado.explicacion}</p>
            </div>
        `;

        // Mostrar pasos del cálculo
        if (resultado.pasos && resultado.pasos.length > 0) {
            resultHtml += `
                <div class="result-steps">
                    <h4>Pasos del cálculo:</h4>
                    <ol>
                        ${resultado.pasos.map(paso => `<li>${paso}</li>`).join('')}
                    </ol>
                </div>
            `;
        }

        // Mostrar conversiones de potencia si existen
        if (resultado.conversiones) {
            resultHtml += `
                <div class="result-conversions">
                    <h4>Conversiones de potencia:</h4>
                    <div class="conversion-grid">
                        <div class="conversion-item">
                            <span class="conversion-label">Watt (W):</span>
                            <span class="conversion-value">${resultado.conversiones.W} W</span>
                        </div>
                        <div class="conversion-item">
                            <span class="conversion-label">Caballos de fuerza (hp):</span>
                            <span class="conversion-value">${resultado.conversiones.hp} hp</span>
                        </div>
                        <div class="conversion-item">
                            <span class="conversion-label">Kilowatt (kW):</span>
                            <span class="conversion-value">${resultado.conversiones.kW} kW</span>
                        </div>
                    </div>
                    <p class="conversion-note">${resultado.conversiones.conversiones.nota}</p>
                </div>
            `;
        }

        // Mostrar análisis específico para trabajo neto
        if (resultado.analisis) {
            resultHtml += `
                <div class="result-analysis">
                    <h4>Análisis del movimiento:</h4>
                    <p class="analysis-text">${resultado.analisis}</p>
                </div>
            `;
        }

        // Mostrar información de conservación de energía
        if (resultado.conservada !== undefined) {
            resultHtml += `
                <div class="result-conservation">
                    <h4>Análisis de conservación:</h4>
                    <div class="conservation-grid">
                        <div class="state-info">
                            <h5>Estado inicial:</h5>
                            <p>Ep1 = ${resultado.ep1} J</p>
                            <p>Ec1 = ${resultado.ec1} J</p>
                            <p>Em1 = ${resultado.em1} J</p>
                        </div>
                        <div class="state-info">
                            <h5>Estado final:</h5>
                            <p>Ep2 = ${resultado.ep2} J</p>
                            <p>Ec2 = ${resultado.ec2} J</p>
                            <p>Em2 = ${resultado.em2} J</p>
                        </div>
                    </div>
                    <p class="conservation-status ${resultado.conservada ? 'conserved' : 'not-conserved'}">
                        ${resultado.conservada ? '✅ La energía se conserva' : '❌ La energía no se conserva'}
                        (diferencia: ${resultado.diferencia} J)
                    </p>
                </div>
            `;
        }

        content.innerHTML = resultHtml;
        container.style.display = 'block';
        
        // Scroll hasta el resultado
        container.scrollIntoView({ behavior: 'smooth' });

        // Guardar el último resultado en memoria para que saveCalculation pueda usarlo
        this._lastResult = {
            Resultado: resultado.resultado,
            UnidadResultado: this.currentScenario.UnidadResultado,
            Explicacion: resultado.explicacion,
            Pasos: resultado.pasos || [],
            Conversiones: resultado.conversiones || null,
            Analisis: resultado.analisis || null,
            Raw: resultado
        };
    }

    // Limpiar formulario
    clearForm() {
        const inputs = document.querySelectorAll('#parametersContainer input');
        inputs.forEach(input => {
            input.value = '';
        });

        const selects = document.querySelectorAll('#parametersContainer select');
        selects.forEach(select => {
            select.value = '';
        });

        // Limpiar contenedor de fuerzas dinámicas
        const fuerzasContainer = document.getElementById('fuerzasContainer');
        if (fuerzasContainer) {
            fuerzasContainer.innerHTML = '';
        }

        document.getElementById('resultContainer').style.display = 'none';
        document.getElementById('saveBtn').style.display = 'none';
    }

    // Guardar cálculo en historial
    async saveCalculation() {
        try {
            // Usar último resultado calculado si existe
            const parametros = this.collectParameters();

            if (!this._lastResult) {
                throw new Error('No hay un resultado reciente para guardar. Realiza un cálculo primero.');
            }

            const calculoData = {
                EscenarioID: this.currentScenario.EscenarioID,
                EscenarioNombre: this.currentScenario.Nombre,
                Resultado: this._lastResult.Resultado,
                UnidadResultado: this._lastResult.UnidadResultado,
                Explicacion: this._lastResult.Explicacion,
                Pasos: this._lastResult.Pasos,
                Conversiones: this._lastResult.Conversiones,
                Analisis: this._lastResult.Analisis,
                Parametros: parametros
            };

            await dbManager.saveCalculo(calculoData);
            this.showSuccess('Cálculo guardado exitosamente');
            
            // Sonido de guardado exitoso
            if (window.audioManager) {
                window.audioManager.play('save');
            }
            
        } catch (error) {
            this.showError('Error al guardar: ' + error.message);
        }
    }

    // Cargar historial de cálculos
    async loadHistory() {
        try {
            const calculos = await dbManager.getHistorialCalculos();
            console.log('📚 loadHistory() - Cálculos totales:', calculos.length, calculos);
            const container = document.getElementById('historyList');
            
            if (calculos.length === 0) {
                container.innerHTML = '<p class="no-data">No hay cálculos guardados</p>';
                return;
            }

            container.innerHTML = calculos.map(calculo => {
                const fecha = new Date(calculo.Fecha).toLocaleString();
                return `
                    <div class="history-item slide-up">
                        <div class="history-header">
                            <h4>${calculo.EscenarioNombre}</h4>
                            <span class="history-date">${fecha}</span>
                        </div>
                        <div class="history-content">
                            <p>${calculo.Resultado}</p>
                        </div>
                    </div>
                `;
            }).join('');

        } catch (error) {
            this.showError('Error al cargar historial: ' + error.message);
        }
    }

    // Filtrar historial
    async filterHistory() {
        console.log('🔍 filterHistory() invocado');
        
        const escenarioSelect = document.getElementById('filterEscenario');
        const fechaInput = document.getElementById('filterFecha');
        
        console.log('📋 Elementos DOM:', {
            escenarioSelect: escenarioSelect ? 'existe' : 'NO EXISTE',
            fechaInput: fechaInput ? 'existe' : 'NO EXISTE'
        });
        
        const escenarioId = escenarioSelect ? escenarioSelect.value : '';
        const fecha = fechaInput ? fechaInput.value : '';
        
        console.log('🎯 Valores de filtro:', { escenarioId, fecha });

        const filtros = {};
        if (escenarioId && escenarioId !== '') filtros.escenarioId = escenarioId;
        if (fecha && fecha !== '') filtros.fecha = fecha;
        
        console.log('📝 Filtros aplicados:', filtros);
        console.log('🔍 Tipo de escenarioId:', typeof escenarioId, 'Valor:', escenarioId);

        try {
            const calculos = await dbManager.getHistorialCalculos(filtros);
            console.log('📊 Cálculos obtenidos:', calculos.length, calculos);
            
            const container = document.getElementById('historyList');
            
            if (calculos.length === 0) {
                container.innerHTML = '<p class="no-data">No se encontraron cálculos con los filtros aplicados</p>';
                console.log('❌ Sin resultados para mostrar');
                return;
            }

            container.innerHTML = calculos.map(calculo => {
                const fechaFormateada = new Date(calculo.Fecha).toLocaleString();
                return `
                    <div class="history-item slide-up">
                        <div class="history-header">
                            <h4>${calculo.EscenarioNombre}</h4>
                            <span class="history-date">${fechaFormateada}</span>
                        </div>
                        <div class="history-content">
                            <p>Resultado: ${calculo.Resultado} ${calculo.UnidadResultado || ''}</p>
                            ${calculo.Explicacion ? `<p><small>${calculo.Explicacion}</small></p>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
            
            console.log('✅ Historial filtrado renderizado exitosamente');

        } catch (error) {
            console.error('❌ Error en filterHistory:', error);
            this.showError('Error al filtrar historial: ' + error.message);
        }
    }

    // Limpiar filtros
    clearFilters() {
        const escenarioSelect = document.getElementById('filterEscenario');
        const fechaInput = document.getElementById('filterFecha');
        
        if (escenarioSelect) escenarioSelect.value = '';
        if (fechaInput) fechaInput.value = '';
        
        // Recargar todo el historial sin filtros
        this.loadHistory();
        
        this.showInfo('Filtros limpiados - Mostrando todos los cálculos');
    }

    // Limpiar historial
    clearHistory() {
        if (confirm('¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('fisica_calculos');
            this.loadHistory();
            this.showSuccess('Historial limpiado');
        }
    }

    // Exportar historial
    async exportHistory() {
        try {
            const calculos = await dbManager.getHistorialCalculos();
            const data = JSON.stringify(calculos, null, 2);
            
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `historial_fisica_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            this.showSuccess('Historial exportado');
            
        } catch (error) {
            this.showError('Error al exportar: ' + error.message);
        }
    }

    // Importar historial
    importHistory(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                localStorage.setItem('fisica_calculos', JSON.stringify(data));
                this.loadHistory();
                this.showSuccess('Historial importado exitosamente');
            } catch (error) {
                this.showError('Error al importar archivo: formato inválido');
            }
        };
        reader.readAsText(file);
    }

    // Mostrar error
    showError(message) {
        this.showNotification(message, 'error');
        // Sonido de error
        if (window.audioManager) {
            window.audioManager.play('error');
        }
    }

    // Mostrar éxito
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    // Mostrar información
    showInfo(message) {
        this.showNotification(message, 'info');
    }

    // Sistema de notificaciones mejorado
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 1001;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
        `;

        const colors = {
            error: '#e74c3c',
            success: '#27ae60',
            info: '#3498db',
            warning: '#f39c12'
        };

        notification.style.backgroundColor = colors[type];
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: auto;">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Instancia global del manager de UI
const uiManager = new UIManager();