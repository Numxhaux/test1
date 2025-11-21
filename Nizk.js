// Nizkk<3 - Khan Academy Enhancement Suite
// Author: Nizk
// Version: 2.0.0

// Inicialização principal
(function() {
    'use strict';
    
    // Verifica se já foi carregado
    if (window.nizkkLoaded) {
        console.log('Nizkk<3 já está carregado');
        return;
    }
    window.nizkkLoaded = true;
    
    // Objeto de strings
    const Strings = {
        version: "2.0.0",
        author: "Nizk",
        features: {
            autoStart: "Iniciar Automaticamente",
            questionSpoof: "Modificação de Questões",
            videoSpoof: "Marcar Vídeos como Assistidos",
            showAnswers: "Mostrar Respostas",
            autoAnswer: "Responder Automaticamente",
            nextRecommendation: "Próxima Recomendação",
            repeatQuestion: "Repetir Questão",
            minuteFarmer: "Coletor de Minutos",
            rgbLogo: "Logo Animado RGB",
            darkMode: "Modo Escuro",
            onekoJs: "Gato Animado"
        },
        messages: {
            welcome: "Bem-vindo ao Nizkk<3!",
            loggedIn: "Logado como: ",
            deviceDetected: "Detectado dispositivo Apple!",
            pluginLoaded: "Plugin carregado: ",
            pressF12: "Pressione F12 para abrir o menu",
            useShortcuts: "Use as teclas de atalho para navegar",
            haveFun: "Divirta-se!",
            answersFound: "Respostas encontradas: ",
            questionModified: "Questão modificada com sucesso!",
            answersSent: "Respostas enviadas com sucesso!",
            videoMarked: "Vídeo marcado como assistido!",
            minuteFarmIgnored: "Coletor de minutos detectado, ignorando...",
            nextQuestion: "Próxima questão!",
            repeatActive: "Repetição ativada",
            repeatInactive: "Repetição desativada",
            repeatCompleted: "Repetição concluída",
            repeatsLeft: "Repetições restantes: ",
            submitButtonFound: "Botão de envio encontrado!",
            submitButtonNotFound: "Botão de envio não encontrado",
            nextQuestionNotFound: "Próxima questão não encontrada",
            statusOnline: "Status: Online"
        },
        urls: {
            missionImpossible: "https://www.myinstants.com/media/sounds/mission-impossible-theme-song.mp3",
            click: "https://www.myinstants.com/media/sounds/click.mp3",
            success: "https://www.myinstants.com/media/sounds/success.mp3",
            oneko: "https://cdn.jsdelivr.net/gh/adryd325/oneko.js@latest/oneko.js",
            onekoGif: "https://raw.githubusercontent.com/adryd325/oneko.js/master/oneko.gif",
            darkreader: "https://cdn.jsdelivr.net/npm/darkreader@4.9.44/darkreader.min.js",
            toastifyCss: "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css",
            toastifyJs: "https://cdn.jsdelivr.net/npm/toastify-js"
        }
    };
    
    // Configurações
    const device = {
        mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
        apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
    };
    
    let user = {
        username: "Usuário",
        nickname: "Convidado",
        UID: "00000000"
    };
    
    const loadedPlugins = [];
    
    // Configurações de recursos
    window.features = {
        autoStart: true,
        questionSpoof: true,
        videoSpoof: true,
        showAnswers: false,
        autoAnswer: false,
        nextRecommendation: false,
        repeatQuestion: false,
        minuteFarmer: false,
        rgbLogo: false,
        darkMode: true,
        onekoJs: false
    };
    
    window.featureConfigs = {
        autoAnswerDelay: 3,
        repeatCount: 1
    };
    
    // Criação de elementos
    const dropdownMenu = document.createElement('div');
    const watermark = document.createElement('div');
    const splashScreen = document.createElement('div');
    const notificationContainer = document.createElement('div');
    
    // Função de tela de carregamento inspirada no exemplo
    function createLoadingScreen() {
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'nizk-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="nizk-loading-container">
                <div class="nizk-loading-content">
                    <div class="nizk-logo-container">
                        <div class="nizk-logo">
                            <span class="nizk-logo-text">NIZK</span>
                            <div class="nizk-logo-glow"></div>
                        </div>
                    </div>
                    <div class="nizk-loading-text">
                        <h1>Welcome Back</h1>
                        <p>Initializing Nizk Solver...</p>
                    </div>
                    <div class="nizk-loading-bar">
                        <div class="nizk-loading-progress"></div>
                    </div>
                    <div class="nizk-loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;

        // Add styles for loading screen
        const loadingStyles = `
            #nizk-loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #0F0E17 0%, #1A1823 50%, #2D2636 100%);
                backdrop-filter: blur(10px);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: loadingFadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            @keyframes loadingFadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes loadingFadeOut {
                from {
                    opacity: 1;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(1.05);
                }
            }

            .nizk-loading-container {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }

            .nizk-loading-container::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(233, 30, 99, 0.1) 0%, transparent 70%);
                animation: rotate 20s linear infinite;
            }

            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            .nizk-loading-content {
                position: relative;
                z-index: 1;
                text-align: center;
                color: white;
                animation: contentSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            @keyframes contentSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .nizk-logo-container {
                margin-bottom: 30px;
                position: relative;
            }

            .nizk-logo {
                position: relative;
                display: inline-block;
                font-size: 48px;
                font-weight: 900;
                letter-spacing: 4px;
                text-transform: uppercase;
                background: linear-gradient(135deg, #E91E63 0%, #FF69B4 50%, #E91E63 100%);
                background-size: 200% 200%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: gradientShift 3s ease-in-out infinite, logoPulse 2s ease-in-out infinite;
            }

            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            @keyframes logoPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }

            .nizk-logo-glow {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 120%;
                height: 120%;
                background: radial-gradient(circle, rgba(233, 30, 99, 0.4) 0%, transparent 70%);
                filter: blur(20px);
                animation: glowPulse 2s ease-in-out infinite;
            }

            @keyframes glowPulse {
                0%, 100% { 
                    opacity: 0.5;
                    transform: translate(-50%, -50%) scale(1);
                }
                50% { 
                    opacity: 0.8;
                    transform: translate(-50%, -50%) scale(1.1);
                }
            }

            .nizk-loading-text h1 {
                font-size: 32px;
                font-weight: 700;
                margin: 0 0 10px 0;
                background: linear-gradient(135deg, #FFFFFF 0%, #B0B0B0 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: textGlow 2s ease-in-out infinite;
            }

            @keyframes textGlow {
                0%, 100% { opacity: 0.9; }
                50% { opacity: 1; }
            }

            .nizk-loading-text p {
                font-size: 16px;
                color: #B0B0B0;
                margin: 0;
                animation: textFade 2s ease-in-out infinite;
            }

            @keyframes textFade {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }

            .nizk-loading-bar {
                width: 300px;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                margin: 30px auto;
                overflow: hidden;
                position: relative;
            }

            .nizk-loading-bar::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(233, 30, 99, 0.8), transparent);
                animation: loadingShimmer 1.5s infinite;
            }

            @keyframes loadingShimmer {
                from { left: -100%; }
                to { left: 100%; }
            }

            .nizk-loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #E91E63 0%, #FF69B4 100%);
                border-radius: 2px;
                width: 0%;
                animation: loadingProgress 2s ease-out forwards;
            }

            @keyframes loadingProgress {
                to { width: 100%; }
            }

            .nizk-loading-dots {
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-top: 20px;
            }

            .nizk-loading-dots span {
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #E91E63 0%, #FF69B4 100%);
                border-radius: 50%;
                animation: dotBounce 1.4s ease-in-out infinite;
            }

            .nizk-loading-dots span:nth-child(1) { animation-delay: 0s; }
            .nizk-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
            .nizk-loading-dots span:nth-child(3) { animation-delay: 0.4s; }

            @keyframes dotBounce {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1.2);
                    opacity: 1;
                }
            }

            #nizk-loading-overlay.hiding {
                animation: loadingFadeOut 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            #nizk-loading-overlay.hiding .nizk-loading-content {
                animation: contentSlideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            @keyframes contentSlideDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(30px);
                }
            }
        `;

        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = loadingStyles;
        document.head.appendChild(styleSheet);

        // Add overlay to body
        document.body.appendChild(loadingOverlay);

        return loadingOverlay;
    }

    function hideLoadingScreen() {
        const overlay = document.getElementById('nizk-loading-overlay');
        if (overlay) {
            overlay.classList.add('hiding');
            setTimeout(() => {
                overlay.remove();
            }, 600);
        }
    }

    // Estilos CSS modernos
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
        }
        
        /* Animações */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
            50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.8); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        /* Watermark */
        .nizkk-watermark {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            user-select: none;
            z-index: 9999;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .nizkk-watermark:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .nizkk-watermark.dragging {
            transform: scale(1.05);
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
        }
        
        .nizkk-watermark.rgb {
            animation: rainbow 5s linear infinite;
        }
        
        /* Dropdown Menu */
        .nizkk-dropdown {
            position: absolute;
            top: 60px;
            left: 0;
            min-width: 280px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 20px;
            display: none;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease;
        }
        
        .nizkk-dropdown-header {
            color: white;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .nizkk-dropdown-section {
            margin-bottom: 20px;
        }
        
        .nizkk-dropdown-section-title {
            color: rgba(255, 255, 255, 0.8);
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .nizkk-dropdown-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            margin-bottom: 8px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: white;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        
        .nizkk-dropdown-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(4px);
        }
        
        .nizkk-dropdown-item-label {
            flex: 1;
            font-weight: 500;
        }
        
        .nizkk-toggle {
            position: relative;
            width: 48px;
            height: 24px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .nizkk-toggle.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .nizkk-toggle-slider {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        .nizkk-toggle.active .nizkk-toggle-slider {
            transform: translateX(24px);
        }
        
        .nizkk-dropdown-item input[type="number"] {
            width: 60px;
            padding: 4px 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            color: white;
            font-size: 12px;
            text-align: center;
        }
        
        .nizkk-dropdown-item input[type="number"]:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.4);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .nizkk-user-info {
            padding: 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: white;
            font-size: 14px;
            text-align: center;
            margin-bottom: 16px;
        }
        
        .nizkk-user-name {
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .nizkk-user-id {
            font-size: 12px;
            opacity: 0.7;
        }
        
        .nizkk-status {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            background: rgba(76, 175, 80, 0.2);
            border: 1px solid rgba(76, 175, 80, 0.3);
            border-radius: 20px;
            color: #4CAF50;
            font-size: 12px;
            font-weight: 600;
        }
        
        .nizkk-status-dot {
            width: 8px;
            height: 8px;
            background: #4CAF50;
            border-radius: 50%;
            margin-right: 6px;
            animation: pulse 2s infinite;
        }
        
        /* Notification Container */
        .nizkk-notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            pointer-events: none;
        }
        
        .nizkk-notification {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 12px;
            color: white;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease, float 3s ease-in-out infinite;
            pointer-events: auto;
            cursor: pointer;
            transition: all 0.2s ease;
            max-width: 300px;
        }
        
        .nizkk-notification:hover {
            transform: translateX(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .nizkk-notification.success {
            background: rgba(76, 175, 80, 0.1);
            border-color: rgba(76, 175, 80, 0.3);
        }
        
        .nizkk-notification.error {
            background: rgba(244, 67, 54, 0.1);
            border-color: rgba(244, 67, 54, 0.3);
        }
        
        .nizkk-notification.info {
            background: rgba(33, 150, 243, 0.1);
            border-color: rgba(33, 150, 243, 0.3);
        }
        
        /* Mobile adjustments */
        @media (max-width: 768px) {
            .nizkk-watermark {
                left: 50%;
                transform: translateX(-50%);
            }
            
            .nizkk-dropdown {
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 320px;
            }
            
            .nizkk-notification-container {
                left: 20px;
                right: 20px;
            }
            
            .nizkk-notification {
                max-width: none;
            }
        }
    `;
    
    // Injeta estilos
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    // Funções utilitárias
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const playAudio = url => {
        try {
            const audio = new Audio(url);
            audio.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
        } catch (e) {
            console.log('Erro ao criar áudio:', e);
        }
    };
    
    const findAndClickBySelector = selector => {
        try {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null && !element.disabled) {
                element.click();
                showNotification(`Clicado: ${selector}`, 'success', 1000);
                return true;
            }
        } catch (e) {
            console.log('Erro ao clicar no elemento:', e);
        }
        return false;
    };
    
    const showNotification = (message, type = 'info', duration = 5000) => {
        const notification = document.createElement('div');
        notification.className = `nizkk-notification ${type}`;
        notification.textContent = message;
        
        notificationContainer.appendChild(notification);
        
        // Auto-remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Click to remove
        notification.addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    };
    
    // Configura marca d'água
    watermark.className = 'nizkk-watermark';
    watermark.innerHTML = `Nizkk<3 v${Strings.version}`;
    document.body.appendChild(watermark);
    
    // Configura menu suspenso
    dropdownMenu.className = 'nizkk-dropdown';
    dropdownMenu.innerHTML = `
        <div class="nizkk-dropdown-header">Nizkk<3 Menu</div>
        
        <div class="nizkk-user-info">
            <div class="nizkk-user-name">${user.nickname}</div>
            <div class="nizkk-user-id">${user.username} - ${user.UID}</div>
        </div>
        
        <div class="nizkk-status">
            <div class="nizkk-status-dot"></div>
            ${Strings.messages.statusOnline}
        </div>
        
        <div class="nizkk-dropdown-section">
            <div class="nizkk-dropdown-section-title">Recursos Principais</div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.autoStart}</span>
                <div class="nizkk-toggle active" data-feature="autoStart">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.questionSpoof}</span>
                <div class="nizkk-toggle active" data-feature="questionSpoof">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.videoSpoof}</span>
                <div class="nizkk-toggle active" data-feature="videoSpoof">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.showAnswers}</span>
                <div class="nizkk-toggle" data-feature="showAnswers">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.autoAnswer}</span>
                <div class="nizkk-toggle" data-feature="autoAnswer">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
        </div>
        
        <div class="nizkk-dropdown-section">
            <div class="nizkk-dropdown-section-title">Configurações</div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">Atraso da Resposta</span>
                <input type="number" min="1" max="10" value="${featureConfigs.autoAnswerDelay}" data-config="autoAnswerDelay">
            </div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">Repetições</span>
                <input type="number" min="1" max="10" value="${featureConfigs.repeatCount}" data-config="repeatCount">
            </div>
        </div>
        
        <div class="nizkk-dropdown-section">
            <div class="nizkk-dropdown-section-title">Recursos Visuais</div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.rgbLogo}</span>
                <div class="nizkk-toggle" data-feature="rgbLogo">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.darkMode}</span>
                <div class="nizkk-toggle active" data-feature="darkMode">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
            <div class="nizkk-dropdown-item">
                <span class="nizkk-dropdown-item-label">${Strings.features.onekoJs}</span>
                <div class="nizkk-toggle" data-feature="onekoJs">
                    <div class="nizkk-toggle-slider"></div>
                </div>
            </div>
        </div>
    `;
    watermark.appendChild(dropdownMenu);
    
    // Configura container de notificações
    notificationContainer.className = 'nizkk-notification-container';
    document.body.appendChild(notificationContainer);
    
    // Event handlers
    let isDragging = false;
    let offsetX, offsetY;
    
    watermark.addEventListener('mousedown', event => {
        if (!dropdownMenu.contains(event.target)) {
            isDragging = true;
            offsetX = event.clientX - watermark.offsetLeft;
            offsetY = event.clientY - watermark.offsetTop;
            watermark.classList.add('dragging');
        }
    });
    
    watermark.addEventListener('mouseup', () => {
        isDragging = false;
        watermark.classList.remove('dragging');
    });
    
    document.addEventListener('mousemove', event => {
        if (isDragging) {
            let x = Math.max(0, Math.min(event.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
            let y = Math.max(0, Math.min(event.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
            watermark.style.left = x + 'px';
            watermark.style.top = y + 'px';
            dropdownMenu.style.display = 'none';
        }
    });
    
    watermark.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        playAudio(Strings.urls.click);
    });
    
    // Toggle handlers
    dropdownMenu.querySelectorAll('.nizkk-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const feature = toggle.dataset.feature;
            const isActive = toggle.classList.toggle('active');
            window.features[feature] = isActive;
            playAudio(Strings.urls.click);
            
            // Handle dependent features
            if (feature === 'autoAnswer' && isActive && !window.features.questionSpoof) {
                const questionSpoofToggle = dropdownMenu.querySelector('[data-feature="questionSpoof"]');
                questionSpoofToggle.classList.add('active');
                window.features.questionSpoof = true;
            }
            
            // Handle special features
            if (feature === 'rgbLogo') {
                watermark.classList.toggle('rgb', isActive);
            }
            
            if (feature === 'darkMode') {
                if (typeof DarkReader !== 'undefined') {
                    if (isActive) {
                        DarkReader.enable();
                    } else {
                        DarkReader.disable();
                    }
                }
            }
            
            if (feature === 'onekoJs') {
                const onekoEl = document.getElementById('oneko');
                if (onekoEl) {
                    onekoEl.style.display = isActive ? 'block' : 'none';
                }
            }
        });
    });
    
    // Input handlers
    dropdownMenu.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', () => {
            const config = input.dataset.config;
            let value = parseInt(input.value);
            if (value < 1) value = 1;
            if (value > 10) value = 10;
            input.value = value;
            window.featureConfigs[config] = value;
        });
    });
    
    // Inicialização
    const loadingOverlay = createLoadingScreen();
    
    // Carrega recursos externos
    Promise.all([
        loadScript(Strings.urls.darkreader, 'darkreader').then(() => {
            if (typeof DarkReader !== 'undefined') {
                DarkReader.setFetchMethod(window.fetch);
                DarkReader.enable();
            }
        }),
        loadCss(Strings.urls.toastifyCss, 'toastify'),
        loadScript(Strings.urls.toastifyJs, 'toastify'),
        loadScript(Strings.urls.oneko, 'oneko').then(() => {
            const onekoEl = document.getElementById('oneko');
            if (onekoEl) {
                onekoEl.style.backgroundImage = `url("${Strings.urls.onekoGif}")`;
                onekoEl.style.display = 'none';
            }
        })
    ]).then(async () => {
        // Carrega informações do usuário
        try {
            const response = await fetch('https://www.khanacademy.org/api/internal/graphql/GetUserProfile', {
                referrer: 'https://www.khanacademy.org/',
                body: '{"operationName":"GetUserProfile","variables":{},"query":"query GetUserProfile { user { nickname username id } }"}',
                method: 'POST',
                mode: 'cors',
                credentials: 'include'
            });
            
            const userData = await response.json();
            user = {
                nickname: userData.data.user.nickname,
                username: userData.data.user.username,
                UID: userData.data.user.id.slice(-8)
            };
            
            // Atualiza informações do usuário no menu
            const userInfo = dropdownMenu.querySelector('.nizkk-user-info');
            userInfo.innerHTML = `
                <div class="nizkk-user-name">${user.nickname}</div>
                <div class="nizkk-user-id">${user.username} - ${user.UID}</div>
            `;
        } catch (e) {
            console.log('Erro ao carregar informações do usuário:', e);
        }
        
        // Notificações de boas-vindas
        showNotification(Strings.messages.welcome, 'success');
        playAudio(Strings.urls.missionImpossible);
        await delay(500);
        showNotification(Strings.messages.loggedIn + user.nickname, 'info');
        
        if (device.apple) {
            await delay(500);
            showNotification(Strings.messages.deviceDetected, 'info');
        }
        
        loadedPlugins.forEach(plugin => {
            showNotification(Strings.messages.pluginLoaded + plugin, 'info', 2000);
        });
        
        hideLoadingScreen();
        
        await delay(1000);
        showNotification(Strings.messages.pressF12, 'info', 5000);
        showNotification(Strings.messages.useShortcuts, 'info', 5000);
        showNotification(Strings.messages.haveFun, 'success', 5000);
    });
    
    console.log('Nizkk<3 carregado com sucesso!');
})();
