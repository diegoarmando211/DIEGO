// Clase para manejar todos los cálculos de física
class PhysicsCalculator {
    constructor() {
        this.g = 9.81; // Gravedad estándar
    }

    // Trabajo con ángulo: W = F * d * cos(theta)
    calcularTrabajoConAngulo(fuerza, distancia, angulo) {
        const anguloRad = (angulo * Math.PI) / 180; // Convertir a radianes
        const resultado = fuerza * distancia * Math.cos(anguloRad);
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `W = ${fuerza} N × ${distancia} m × cos(${angulo}°) = ${resultado.toFixed(4)} J`,
            pasos: [
                `Convertir ángulo a radianes: ${angulo}° = ${anguloRad.toFixed(4)} rad`,
                `cos(${angulo}°) = ${Math.cos(anguloRad).toFixed(4)}`,
                `W = ${fuerza} × ${distancia} × ${Math.cos(anguloRad).toFixed(4)} = ${resultado.toFixed(4)} J`
            ]
        };
    }

    // Trabajo simple (misma dirección): W = F * d
    calcularTrabajoSimple(fuerza, distancia) {
        const resultado = fuerza * distancia;
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `W = ${fuerza} N × ${distancia} m = ${resultado.toFixed(4)} J`,
            pasos: [
                `La fuerza y el desplazamiento van en la misma dirección`,
                `W = F × d = ${fuerza} × ${distancia} = ${resultado.toFixed(4)} J`
            ]
        };
    }

    // Fuerza (peso): F = m * g
    calcularFuerzaPeso(masa) {
        const resultado = masa * this.g;
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `F = ${masa} kg × ${this.g} m/s² = ${resultado.toFixed(4)} N`,
            pasos: [
                `La fuerza peso es el producto de la masa por la gravedad`,
                `g = ${this.g} m/s² (gravedad estándar)`,
                `F = m × g = ${masa} × ${this.g} = ${resultado.toFixed(4)} N`
            ]
        };
    }

    // Trabajo vertical: W = m * g * h
    calcularTrabajoVertical(masa, altura) {
        const resultado = masa * this.g * altura;
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `W = ${masa} kg × ${this.g} m/s² × ${altura} m = ${resultado.toFixed(4)} J`,
            pasos: [
                `El trabajo para elevar un objeto verticalmente`,
                `W = m × g × h`,
                `W = ${masa} × ${this.g} × ${altura} = ${resultado.toFixed(4)} J`
            ]
        };
    }

    // Energía cinética: Ec = 1/2 * m * v^2
    calcularEnergiaCinetica(masa, velocidad) {
        const resultado = 0.5 * masa * Math.pow(velocidad, 2);
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `Ec = ½ × ${masa} kg × (${velocidad} m/s)² = ${resultado.toFixed(4)} J`,
            pasos: [
                `La energía cinética es la energía del movimiento`,
                `Ec = ½ × m × v²`,
                `v² = ${velocidad}² = ${Math.pow(velocidad, 2)}`,
                `Ec = 0.5 × ${masa} × ${Math.pow(velocidad, 2)} = ${resultado.toFixed(4)} J`
            ]
        };
    }

    // Energía potencial: Ep = m * g * h
    // Energía mecánica: Em = Ec + Ep
    calcularEnergiaMecanica(masa, velocidad, altura) {
        const ec = 0.5 * masa * Math.pow(velocidad, 2);
        const ep = masa * this.g * altura;
        const resultado = ec + ep;
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `Em = Ec + Ep = ${ec.toFixed(4)} J + ${ep.toFixed(4)} J = ${resultado.toFixed(4)} J`,
            pasos: [
                `Calcular energía cinética: Ec = ½mv² = ½ × ${masa} × ${velocidad}² = ${ec.toFixed(4)} J`,
                `Calcular energía potencial: Ep = mgh = ${masa} × ${this.g} × ${altura} = ${ep.toFixed(4)} J`,
                `Energía mecánica total: Em = Ec + Ep = ${ec.toFixed(4)} + ${ep.toFixed(4)} = ${resultado.toFixed(4)} J`
            ]
        };
    }

    // Potencia: P = (F * d * cos(theta)) / t
    // Potencia: P = W/t
    calcularPotencia(trabajo, tiempo) {
        if (tiempo === 0) {
            throw new Error('El tiempo no puede ser cero');
        }
        
        const resultado = trabajo / tiempo;
        
        // Obtener conversiones
        const conversiones = this.mostrarConversionesPotencia(resultado);
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `P = ${trabajo} J / ${tiempo} s = ${resultado.toFixed(4)} W`,
            pasos: [
                `La potencia es el trabajo dividido por el tiempo`,
                `P = W / t`,
                `P = ${trabajo} / ${tiempo} = ${resultado.toFixed(4)} W`,
                `Conversiones: ${conversiones.conversiones.enHP}, ${conversiones.conversiones.enKW}`,
                `Nota: ${conversiones.conversiones.nota}`
            ],
            conversiones: conversiones
        };
    }

    // Potencia instantánea: Pi = F × V × cos(θ)
    calcularPotenciaInstantanea(fuerza, velocidad, angulo) {
        const anguloRad = (angulo * Math.PI) / 180;
        const resultado = fuerza * velocidad * Math.cos(anguloRad);
        
        // Obtener conversiones
        const conversiones = this.mostrarConversionesPotencia(resultado);
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `Pi = ${fuerza} N × ${velocidad} m/s × cos(${angulo}°) = ${resultado.toFixed(4)} W`,
            pasos: [
                `La potencia instantánea relaciona fuerza, velocidad y ángulo`,
                `Pi = F × V × cos(θ)`,
                `cos(${angulo}°) = ${Math.cos(anguloRad).toFixed(4)}`,
                `Pi = ${fuerza} × ${velocidad} × ${Math.cos(anguloRad).toFixed(4)} = ${resultado.toFixed(4)} W`,
                `Conversiones: ${conversiones.conversiones.enHP}, ${conversiones.conversiones.enKW}`,
                `Nota: ${conversiones.conversiones.nota}`
            ],
            conversiones: conversiones
        };
    }

    // Relación Energía y Potencia: E = P × T
    calcularEnergiaPotencia(potencia, tiempo) {
        const resultado = potencia * tiempo;
        
        return {
            resultado: parseFloat(resultado.toFixed(4)),
            explicacion: `E = ${potencia} W × ${tiempo} s = ${resultado.toFixed(4)} J`,
            pasos: [
                `La energía es el producto de la potencia por el tiempo`,
                `E = P × T`,
                `E = ${potencia} × ${tiempo} = ${resultado.toFixed(4)} J`,
                `Esta es la energía total transferida durante ${tiempo} segundos`
            ]
        };
    }

    // Método principal para calcular según el escenario
    calcular(escenario, parametros) {
        try {
            switch (escenario.Codigo) {
                case 'TRABAJO_CONST':
                    return this.calcularTrabajoConAngulo(
                        parametros.F, 
                        parametros.d, 
                        parametros.theta
                    );

                case 'TRABAJO_MD':
                    return this.calcularTrabajoSimple(
                        parametros.F, 
                        parametros.d
                    );

                case 'FUERZA_PESO':
                    return this.calcularFuerzaPeso(parametros.m);

                case 'TRABAJO_VERTICAL':
                    return this.calcularTrabajoVertical(
                        parametros.m, 
                        parametros.h
                    );

                case 'ENERGIA_CINETICA':
                    return this.calcularEnergiaCinetica(
                        parametros.m, 
                        parametros.v
                    );

                case 'ENERGIA_MECANICA':
                    return this.calcularEnergiaMecanica(
                        parametros.m, 
                        parametros.v, 
                        parametros.h
                    );

                case 'POTENCIA':
                    return this.calcularPotencia(
                        parametros.W, 
                        parametros.t
                    );

                case 'TRABAJO_NETO':
                    return this.calcularTrabajoNeto(
                        parametros.fuerzas
                    );

                case 'CONSERVACION_ENERGIA':
                    return this.calcularConservacionEnergia(
                        parametros.estado1, 
                        parametros.estado2
                    );

                case 'TEOREMA_TRABAJO_ENERGIA':
                    return this.calcularTeoremaTrabajoEnergia(
                        parametros.m, 
                        parametros.v1, 
                        parametros.v2
                    );

                case 'TRABAJO_POTENCIAL_GRAV':
                    return this.calcularTrabajoPotencialGravitatoria(
                        parametros.m, 
                        parametros.h1, 
                        parametros.h2
                    );

                case 'POTENCIA_INSTANTANEA':
                    return this.calcularPotenciaInstantanea(
                        parametros.F,
                        parametros.V,
                        parametros.theta
                    );

                case 'ENERGIA_POTENCIA':
                    return this.calcularEnergiaPotencia(
                        parametros.P,
                        parametros.T
                    );

                default:
                    throw new Error(`Escenario no reconocido: ${escenario.Codigo}`);
            }
        } catch (error) {
            throw new Error(`Error en el cálculo: ${error.message}`);
        }
    }

    // Método para validar parámetros
    validarParametros(escenario, parametros) {
        const errores = [];

        escenario.parametros.forEach(param => {
            const valor = parametros[param.Codigo];
            
            if (valor === undefined || valor === null || valor === '') {
                errores.push(`El parámetro ${param.Nombre} es requerido`);
                return;
            }

            const valorNumerico = parseFloat(valor);
            
            if (isNaN(valorNumerico)) {
                errores.push(`${param.Nombre} debe ser un número válido`);
                return;
            }

            // Validaciones específicas
            if (param.Codigo === 't' && valorNumerico <= 0) {
                errores.push('El tiempo debe ser mayor que cero');
            }

            if (param.Codigo === 'm' && valorNumerico <= 0) {
                errores.push('La masa debe ser mayor que cero');
            }

            if (param.Codigo === 'd' && valorNumerico < 0) {
                errores.push('La distancia no puede ser negativa');
            }

            if (param.Codigo === 'v' && valorNumerico < 0) {
                errores.push('La velocidad no puede ser negativa');
            }

            if (param.Codigo === 'F' && valorNumerico < 0) {
                errores.push('La fuerza no puede ser negativa');
            }

            if (param.Codigo === 'theta' && (valorNumerico < 0 || valorNumerico > 180)) {
                errores.push('El ángulo debe estar entre 0° y 180°');
            }
        });

        return errores;
    }

    // Método para convertir unidades (extensible)
    convertirUnidad(valor, desde, hasta) {
        const conversiones = {
            'hp_to_W': 746,        // 1 hp = 746 W
            'W_to_hp': 1/746,      // 1 W = 1/746 hp
            'kW_to_W': 1000,       // 1 kW = 1000 W
            'W_to_kW': 1/1000,     // 1 W = 0.001 kW
            'hp_to_kW': 0.746,     // 1 hp = 0.746 kW
            'kW_to_hp': 1/0.746    // 1 kW = 1.34 hp
        };

        const clave = `${desde}_to_${hasta}`;
        if (conversiones[clave]) {
            return valor * conversiones[clave];
        }

        return valor; // Sin conversión
    }

    // Método para mostrar conversiones de potencia
    mostrarConversionesPotencia(valorW) {
        const hp = this.convertirUnidad(valorW, 'W', 'hp');
        const kW = this.convertirUnidad(valorW, 'W', 'kW');
        
        return {
            W: valorW,
            hp: parseFloat(hp.toFixed(4)),
            kW: parseFloat(kW.toFixed(4)),
            conversiones: {
                enHP: `${hp.toFixed(4)} hp`,
                enKW: `${kW.toFixed(4)} kW`,
                nota: '1 hp = 746 W'
            }
        };
    }

    // Trabajo neto o total con múltiples fuerzas: Wt = F1×d×cos(180°) + F2×d×cos(α) + F3×d×cos(β)
    // Trabajo resultante con múltiples fuerzas: Tr = F1×d1×cos(θ1) + F2×d2×cos(θ2) + F3×d3×cos(θ3) + ...
    calcularTrabajoNeto(fuerzas) {
        let trabajoTotal = 0;
        let explicacionPartes = [];
        let pasos = ['Calculando el trabajo de cada fuerza:'];

        fuerzas.forEach((fuerza, index) => {
            const anguloRad = (fuerza.angulo * Math.PI) / 180;
            const trabajoIndividual = fuerza.magnitud * fuerza.distancia * Math.cos(anguloRad);
            trabajoTotal += trabajoIndividual;
            
            explicacionPartes.push(`F${index + 1} × d${index + 1} × cos(θ${index + 1}) = ${fuerza.magnitud} × ${fuerza.distancia} × ${Math.cos(anguloRad).toFixed(4)} = ${trabajoIndividual.toFixed(4)} J`);
            pasos.push(`Fuerza ${index + 1}: T${index + 1} = ${fuerza.magnitud} N × ${fuerza.distancia} m × cos(${fuerza.angulo}°) = ${trabajoIndividual.toFixed(4)} J`);
        });

        pasos.push(`Trabajo resultante: Tr = ${explicacionPartes.join(' + ')}`);
        pasos.push(`Tr = ${trabajoTotal.toFixed(4)} J`);

        // Análisis del movimiento
        let tipoMovimiento = '';
        if (trabajoTotal > 0) {
            tipoMovimiento = 'Movimiento acelerado (Tr > 0)';
        } else if (trabajoTotal === 0) {
            tipoMovimiento = 'Movimiento uniforme o cuerpo en reposo (Tr = 0)';
        } else {
            tipoMovimiento = 'Movimiento retardado/desacelerado (Tr < 0)';
        }

        return {
            resultado: parseFloat(trabajoTotal.toFixed(4)),
            explicacion: `Tr = ${explicacionPartes.join(' + ')} = ${trabajoTotal.toFixed(4)} J`,
            pasos: pasos,
            analisis: tipoMovimiento
        };
    }

    // Conservación de energía mecánica: Em1 = Em2, Ep1 + Ec1 = Ep2 + Ec2
    calcularConservacionEnergia(estado1, estado2) {
        const ep1 = estado1.masa * this.g * estado1.altura;
        const ec1 = 0.5 * estado1.masa * Math.pow(estado1.velocidad, 2);
        const em1 = ep1 + ec1;

        const ep2 = estado2.masa * this.g * estado2.altura;
        const ec2 = 0.5 * estado2.masa * Math.pow(estado2.velocidad, 2);
        const em2 = ep2 + ec2;

        const diferencia = Math.abs(em1 - em2);
        const conservada = diferencia < 0.01; // Tolerancia para errores de redondeo

        return {
            em1: parseFloat(em1.toFixed(4)),
            em2: parseFloat(em2.toFixed(4)),
            ep1: parseFloat(ep1.toFixed(4)),
            ec1: parseFloat(ec1.toFixed(4)),
            ep2: parseFloat(ep2.toFixed(4)),
            ec2: parseFloat(ec2.toFixed(4)),
            conservada: conservada,
            diferencia: parseFloat(diferencia.toFixed(4)),
            explicacion: `Estado 1: Em1 = Ep1 + Ec1 = ${ep1.toFixed(4)} + ${ec1.toFixed(4)} = ${em1.toFixed(4)} J\nEstado 2: Em2 = Ep2 + Ec2 = ${ep2.toFixed(4)} + ${ec2.toFixed(4)} = ${em2.toFixed(4)} J`,
            pasos: [
                `Estado inicial (1):`,
                `  Ep1 = mgh1 = ${estado1.masa} × ${this.g} × ${estado1.altura} = ${ep1.toFixed(4)} J`,
                `  Ec1 = ½mv1² = ½ × ${estado1.masa} × ${estado1.velocidad}² = ${ec1.toFixed(4)} J`,
                `  Em1 = Ep1 + Ec1 = ${ep1.toFixed(4)} + ${ec1.toFixed(4)} = ${em1.toFixed(4)} J`,
                `Estado final (2):`,
                `  Ep2 = mgh2 = ${estado2.masa} × ${this.g} × ${estado2.altura} = ${ep2.toFixed(4)} J`,
                `  Ec2 = ½mv2² = ½ × ${estado2.masa} × ${estado2.velocidad}² = ${ec2.toFixed(4)} J`,
                `  Em2 = Ep2 + Ec2 = ${ep2.toFixed(4)} + ${ec2.toFixed(4)} = ${em2.toFixed(4)} J`,
                `Verificación: Em1 ${conservada ? '≈' : '≠'} Em2 (diferencia: ${diferencia.toFixed(4)} J)`
            ]
        };
    }

    // Teorema Trabajo-Energía Cinética: W = ΔEc = Ec2 - Ec1
    calcularTeoremaTrabajoEnergia(masa, velocidadInicial, velocidadFinal) {
        const ec1 = 0.5 * masa * Math.pow(velocidadInicial, 2);
        const ec2 = 0.5 * masa * Math.pow(velocidadFinal, 2);
        const trabajo = ec2 - ec1;

        return {
            resultado: parseFloat(trabajo.toFixed(4)),
            ec1: parseFloat(ec1.toFixed(4)),
            ec2: parseFloat(ec2.toFixed(4)),
            explicacion: `W = Ec2 - Ec1 = ${ec2.toFixed(4)} - ${ec1.toFixed(4)} = ${trabajo.toFixed(4)} J`,
            pasos: [
                `Energía cinética inicial: Ec1 = ½mv1² = ½ × ${masa} × ${velocidadInicial}² = ${ec1.toFixed(4)} J`,
                `Energía cinética final: Ec2 = ½mv2² = ½ × ${masa} × ${velocidadFinal}² = ${ec2.toFixed(4)} J`,
                `Trabajo total: W = ΔEc = Ec2 - Ec1 = ${ec2.toFixed(4)} - ${ec1.toFixed(4)} = ${trabajo.toFixed(4)} J`,
                `Interpretación: ${trabajo > 0 ? 'Se realizó trabajo sobre el objeto (acelera)' : trabajo < 0 ? 'El objeto realizó trabajo (desacelera)' : 'No hay cambio en la energía cinética'}`
            ]
        };
    }

    // Trabajo por cambio de energía potencial gravitatoria: Wp = Epg1 - Epg2 = mgh1 - mgh2
    calcularTrabajoPotencialGravitatoria(masa, alturaInicial, alturaFinal) {
        const epg1 = masa * this.g * alturaInicial;
        const epg2 = masa * this.g * alturaFinal;
        const trabajo = epg1 - epg2;

        return {
            resultado: parseFloat(trabajo.toFixed(4)),
            epg1: parseFloat(epg1.toFixed(4)),
            epg2: parseFloat(epg2.toFixed(4)),
            explicacion: `Wp = Epg1 - Epg2 = ${epg1.toFixed(4)} - ${epg2.toFixed(4)} = ${trabajo.toFixed(4)} J`,
            pasos: [
                `Energía potencial inicial: Epg1 = mgh1 = ${masa} × ${this.g} × ${alturaInicial} = ${epg1.toFixed(4)} J`,
                `Energía potencial final: Epg2 = mgh2 = ${masa} × ${this.g} × ${alturaFinal} = ${epg2.toFixed(4)} J`,
                `Trabajo gravitatorio: Wp = Epg1 - Epg2 = ${epg1.toFixed(4)} - ${epg2.toFixed(4)} = ${trabajo.toFixed(4)} J`,
                `Interpretación: ${trabajo > 0 ? 'El objeto desciende (la gravedad realiza trabajo positivo)' : trabajo < 0 ? 'El objeto asciende (se realiza trabajo contra la gravedad)' : 'No hay cambio de altura'}`
            ]
        };
    }

    // Método para obtener información sobre una fórmula
    getFormulaInfo(codigo) {
        const formulas = {
            'TRABAJO_CONST': {
                nombre: 'Trabajo con Fuerza Constante',
                formula: 'W = F × d × cos(θ)',
                descripcion: 'Calcula el trabajo realizado por una fuerza constante que forma un ángulo θ con la dirección del movimiento.',
                aplicaciones: ['Arrastrar objetos en planos inclinados', 'Fuerzas aplicadas en ángulo', 'Componentes de fuerzas']
            },
            'ENERGIA_CINETICA': {
                nombre: 'Energía Cinética',
                formula: 'Ec = ½mv²',
                descripcion: 'Calcula la energía asociada al movimiento de un objeto.',
                aplicaciones: ['Vehículos en movimiento', 'Proyectiles', 'Objetos en caída libre']
            },
            'TRABAJO_NETO': {
                nombre: 'Trabajo Neto o Total',
                formula: 'Wt = F1×d×cos(180°) + F2×d×cos(α) + F3×d×cos(β)',
                descripcion: 'Calcula el trabajo total realizado por múltiples fuerzas actuando sobre un objeto.',
                aplicaciones: ['Fuerzas múltiples', 'Análisis de movimiento', 'Sistemas complejos']
            },
            'CONSERVACION_ENERGIA': {
                nombre: 'Conservación de Energía Mecánica',
                formula: 'Em1 = Em2, Ep1 + Ec1 = Ep2 + Ec2',
                descripcion: 'Principio que establece que la energía mecánica total se conserva en ausencia de fuerzas no conservativas.',
                aplicaciones: ['Péndulos', 'Montañas rusas', 'Caída libre', 'Sistemas conservativos']
            },
            'TEOREMA_TRABAJO_ENERGIA': {
                nombre: 'Teorema Trabajo-Energía Cinética',
                formula: 'W = ΔEc = Ec2 - Ec1 = ½mv2² - ½mv1²',
                descripcion: 'El trabajo total realizado sobre un objeto es igual al cambio en su energía cinética.',
                aplicaciones: ['Aceleración de vehículos', 'Frenado', 'Análisis de colisiones']
            },
            'TRABAJO_POTENCIAL_GRAV': {
                nombre: 'Trabajo por Energía Potencial Gravitatoria',
                formula: 'Wp = Epg1 - Epg2 = mgh1 - mgh2',
                descripcion: 'Trabajo realizado por o contra la fuerza gravitatoria cuando un objeto cambia de altura.',
                aplicaciones: ['Elevadores', 'Objetos en caída', 'Trabajo contra la gravedad']
            },
            'POTENCIA_INSTANTANEA': {
                nombre: 'Potencia Instantánea',
                formula: 'Pi = F × V × cos(θ)',
                descripcion: 'Calcula la potencia instantánea a partir de la fuerza, velocidad y el ángulo entre ambas.',
                aplicaciones: ['Vehículos en movimiento', 'Maquinaria industrial', 'Análisis de rendimiento']
            },
            'ENERGIA_POTENCIA': {
                nombre: 'Relación Energía y Potencia',
                formula: 'E = P × T',
                descripcion: 'Calcula la energía total a partir de la potencia aplicada durante un tiempo determinado.',
                aplicaciones: ['Consumo eléctrico', 'Almacenamiento de energía', 'Eficiencia energética']
            }
        };

        return formulas[codigo] || null;
    }
}

// Instancia global de la calculadora
const physicsCalculator = new PhysicsCalculator();