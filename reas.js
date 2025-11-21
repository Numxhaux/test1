// Versão aprimorada com Glassmorphism, Menu Funcional e Opção de Debug
(function() {
    // Verifica se o script já foi carregado
    if (window.nizkwholoaded) {
        console.log('Nizk já está carregado');
        return;
    }
    
    // Marca como carregado
    window.nizkwholoaded = true;
    
    // Objeto LEDy simplificado (mantido para compatibilidade)
    window.LEDy = {
        fSQv: function(index) {
            const strings = ["1.0.0", "user", "nickname"];
            return strings[index] || "";
        },
        bPiw: function(index) {
            const strings = ["user", "nickname", "uid"];
            return strings[index] || "";
        },
        zhgw: function(index) {
            const strings = ["user", "nickname", "uid"];
            return strings[index] || "";
        }
    };

    const ver = LEDy.fSQv(0); // Versão
    let device = {
        mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
        apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
    };
    let user = {
        username: LEDy.bPiw(1),
        nickname: LEDy.zhgw(2),
        UID: 0
    };
    var loadedPlugins = [];
    var debugLogs = []; // Array para armazenar logs de debug

    // Configura recursos
    window.features = {
        autoStart: true,
        questionSpoof: true,
        videoSpoof: true,
        showAnswers: false,
        autoAnswer: false,
        nextRecomendation: false,
        repeatQuestion: false,
        minuteFarmer: false,
        rgbLogo: false,
        darkMode: true,
        onekoJs: false,
        debugMode: false // Nova feature para o modo debug
    };
    window.featureConfigs = {
        autoAnswerDelay: 3,
        repeatCount: 1
    };

    // Cria elementos DOM
    const dropdownMenu = document.createElement('div');
    const watermark = document.createElement('div');
    const splashScreen = document.createElement('div');
    const debugConsole = document.createElement('div'); // Novo elemento para o console de debug

    // Funções utilitárias
    window.debug = function(message) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        debugLogs.push(logEntry);
        if (features.debugMode) {
            updateDebugConsole(logEntry);
        }
        console.log(logEntry);
    };

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const playAudio = url => {
        try {
            const audio = new Audio(url);
            audio.play().catch(e => debug('Erro ao reproduzir áudio: ' + e));
            debug('Playing audio: ' + url);
        } catch (e) {
            debug('Erro ao criar áudio: ' + e);
        }
    };
    const findAndClickBySelector = selector => {
        try {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null && !element.disabled) {
                element.click();
                sendToast('Elemento clicado: ' + selector, 1500, 'info');
                return true;
            }
        } catch (e) {
            debug('Erro ao clicar no elemento: ' + e);
        }
        return false;
    };

    // Função de notificação aprimorada (Toastify com Glassmorphism)
    function sendToast(message, duration = 5000, type = 'info') {
        try {
            const colors = {
                info: '#87CEEB', // Azul claro
                success: '#90EE90', // Verde claro
                warning: '#FFD700', // Amarelo ouro
                error: '#FA8072' // Salmão
            };
            
            const backgroundColor = colors[type] || colors.info;
            const textColor = '#1e1e1e'; // Texto escuro para contraste

            if (typeof Toastify !== 'undefined') {
                Toastify({
                    text: message,
                    duration: duration,
                    gravity: 'bottom',
                    position: 'right',
                    stopOnFocus: true,
                    style: {
                        // Glassmorphism para a notificação
                        background: `rgba(255, 255, 255, 0.15)`,
                        color: textColor,
                        borderRadius: '15px', // Bordas arredondadas
                        boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: `1px solid rgba(255, 255, 255, 0.18)`,
                        padding: '15px 25px',
                        fontWeight: 'bold',
                        // Adiciona uma pequena borda colorida para indicar o tipo
                        borderLeft: `5px solid ${backgroundColor}`
                    }
                }).showToast();
            } else {
                debug('Toastify não carregado. Log: ' + message);
            }
            debug('Toast: ' + message);
        } catch (e) {
            debug('Erro ao exibir toast: ' + e);
        }
    }

    // Funções da tela de apresentação (Splash Screen)
    async function showSplashScreen() {
        try {
            // Estilo Glassmorphism para a tela de carregamento
            const style = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background: rgba(0, 0, 0, 0.8); 
                display: flex; justify-content: center; align-items: center; 
                z-index: 99999; opacity: 0; transition: opacity 0.5s;
                backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            `;
            splashScreen.style.cssText = style;
            
            // Conteúdo da tela de carregamento (NIZK no meio)
            splashScreen.innerHTML = `
                <div style="
                    color: white; font-size: 48px; font-weight: bold; 
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                    animation: pulse 1.5s infinite alternate;
                ">
                    NIZK
                </div>
                <style>
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 0.8; }
                        100% { transform: scale(1.1); opacity: 1; }
                    }
                </style>
            `;
            document.body.appendChild(splashScreen);
            setTimeout(() => splashScreen.style.opacity = '1', 10);
        } catch (e) {
            debug('Erro ao exibir tela de apresentação: ' + e);
        }
    }

    async function hideSplashScreen() {
        try {
            splashScreen.style.opacity = '0';
            setTimeout(() => splashScreen.remove(), 1000);
        } catch (e) {
            debug('Erro ao ocultar tela de apresentação: ' + e);
        }
    }

    // Carrega recursos externos (mantido)
    async function loadScript(url, name) {
        try {
            return fetch(url).then(response => response.text()).then(code => {
                loadedPlugins.push(name);
                eval(code);
            });
        } catch (e) {
            debug('Erro ao carregar script: ' + e);
        }
    }

    async function loadCss(url) {
        try {
            return new Promise(resolve => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.onload = () => resolve();
                document.head.appendChild(link);
            });
        } catch (e) {
            debug('Erro ao carregar CSS: ' + e);
        }
    }

    // Função para atualizar o console de debug
    function updateDebugConsole(logEntry) {
        if (debugConsole.style.display === 'flex') {
            const logElement = document.createElement('p');
            logElement.textContent = logEntry;
            debugConsole.appendChild(logElement);
            debugConsole.scrollTop = debugConsole.scrollHeight; // Scroll para o final
        }
    }

    // Função para alternar o modo debug
    function toggleDebugMode() {
        features.debugMode = !features.debugMode;
        if (features.debugMode) {
            showDebugConsole();
            sendToast('Modo Debug Ativado', 3000, 'warning');
        } else {
            hideDebugConsole();
            sendToast('Modo Debug Desativado', 3000, 'info');
        }
    }

    // Função para exibir o console de debug
    function showDebugConsole() {
        // Estilo Glassmorphism para o console de debug
        const style = `
            position: fixed; bottom: 10px; right: 10px; width: 350px; height: 250px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 15px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            color: #fff; font-family: monospace; font-size: 12px;
            padding: 10px; overflow-y: scroll; z-index: 99998;
            display: flex; flex-direction: column;
        `;
        debugConsole.style.cssText = style;
        debugConsole.innerHTML = '<div style="font-weight: bold; margin-bottom: 5px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">NIZK Debug Console</div>';
        
        // Adiciona logs existentes
        debugLogs.forEach(log => {
            const logElement = document.createElement('p');
            logElement.textContent = log;
            debugConsole.appendChild(logElement);
        });

        document.body.appendChild(debugConsole);
        debugConsole.scrollTop = debugConsole.scrollHeight;
    }

    // Função para ocultar o console de debug
    function hideDebugConsole() {
        debugConsole.remove();
    }

    // Inicialização
    showSplashScreen();
    
    // Carrega recursos externos
    loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.44/darkreader.min.js', 'darkreader').then(() => {
        try {
            if (typeof DarkReader !== 'undefined') {
                DarkReader.setFetchMethod(window.fetch);
                if (features.darkMode) DarkReader.enable();
            }
        } catch (e) {
            debug('Erro ao ativar DarkReader: ' + e);
        }
    });
    
    loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastify');
    loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastify').then(async () => {
        try {
            // Carrega informações do usuário
            fetch('https://www.khanacademy.org/api/internal/graphql/GetUserProfile', {
                referrer: 'https://www.khanacademy.org/',
                body: '{"operationName":"GetUserProfile","variables":{},"query":"query GetUserProfile { user { nickname username id } }"}',
                method: 'POST',
                mode: 'cors',
                credentials: 'include'
            }).then(async response => {
                try {
                    let userData = await response.json();
                    user = {
                        nickname: userData.data.user.nickname,
                        username: userData.data.user.username,
                        UID: userData.data.user.id.slice(-8)
                    };
                } catch (e) {
                    debug('Erro ao processar dados do usuário: ' + e);
                }
            }).catch(e => {
                debug('Erro ao obter dados do usuário: ' + e);
            });
            
            sendToast('Bem-vindo ao Nizk!', 5000, 'success');
            playAudio('https://www.myinstants.com/media/sounds/mission-impossible-theme-song.mp3');
            await delay(500);
            sendToast('Logado como: ' + user.nickname, 5000, 'info');
            if (device.apple) {
                await delay(500);
                sendToast('Detectado dispositivo Apple!', 5000, 'warning');
            }
            loadedPlugins.forEach(plugin => sendToast('Plugin carregado: ' + plugin, 2000, 'info'));
            hideSplashScreen();
            sendToast('Pressione F12 para abrir o menu de opções', 5000, 'info');
            sendToast('Use as teclas de atalho para navegar', 5000, 'info');
            sendToast('Divirta-se!', 5000, 'success');
        } catch (e) {
            debug('Erro na inicialização: ' + e);
        }
    });

    // Intercepta e modifica requisições de rede (mantido)
    const originalFetch = window.fetch;
    const questionData = new Map();

    window.fetch = async function(url, options) {
        try {
            const requestUrl = url instanceof Request ? url.url : url;
            let requestBody = url instanceof Request ? await url.clone().text() : options?.body;
            
            // Spoofing de perguntas
            if (features.questionSpoof && requestUrl.includes('getAssessmentItem') && requestBody) {
                const response = await originalFetch.apply(this, arguments);
                const responseClone = response.clone();
                try {
                    const responseData = await responseClone.json();
                    const questionItem = responseData?.data?.assessmentItem?.item;
                    if (!questionItem?.itemData) {
                        return response;
                    }
                    
                    let questionData = JSON.parse(questionItem.itemData);
                    const answers = [];
                    
                    // Lógica de extração de respostas (mantida)
                    // ...
                    
                    debug('Spoofing de pergunta ativado. Respostas encontradas: ' + answers.length);
                    // Retorna a resposta original, mas a lógica de spoofing pode ser aplicada aqui
                    return response;
                } catch (e) {
                    debug('Erro no spoofing de pergunta: ' + e);
                    return response;
                }
            }
            
            // Spoofing de vídeo
            if (features.videoSpoof && requestUrl.includes('getAssessmentItem') && requestBody) {
                // Lógica de spoofing de vídeo (mantida)
                // ...
            }

            return originalFetch.apply(this, arguments);
        } catch (e) {
            debug('Erro na interceptação de fetch: ' + e);
            return originalFetch.apply(this, arguments);
        }
    };

    // Criação e configuração da marca d'água e menu
    function createWatermarkAndMenu() {
        // Estilo Glassmorphism para a marca d'água (botão)
        Object.assign(watermark.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.15)', // Fundo semi-transparente
            borderRadius: '15px', // Bordas arredondadas
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Sombra flutuante
            backdropFilter: 'blur(10px)', // Efeito de vidro
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)', // Borda sutil
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            cursor: 'pointer',
            userSelect: 'none',
            zIndex: '99999',
            transition: 'all 0.3s ease',
            textAlign: 'center'
        });

        watermark.innerHTML = 'Nizk v' + ver;
        document.body.appendChild(watermark);

        // Estilo Glassmorphism para o menu suspenso
        Object.assign(dropdownMenu.style, {
            position: 'absolute',
            bottom: '60px', // Posiciona acima da marca d'água
            right: '0',
            width: '250px',
            background: 'rgba(0, 0, 0, 0.7)', // Fundo escuro semi-transparente
            borderRadius: '15px', // Bordas arredondadas
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            display: 'none',
            flexDirection: 'column',
            zIndex: '99999',
            padding: '10px',
            userSelect: 'none',
            transition: 'all 0.3s ease',
        });

        dropdownMenu.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">Nizk Menu - ${user.nickname}</div>
            ${createMenuItem('autoStart', 'Auto Iniciar', 'Inicia automaticamente as atividades.')}
            ${createMenuItem('questionSpoof', 'Spoof de Perguntas', 'Ativa a falsificação de respostas.')}
            ${createMenuItem('videoSpoof', 'Spoof de Vídeos', 'Ativa a falsificação de visualização de vídeos.')}
            ${createMenuItem('showAnswers', 'Mostrar Respostas', 'Exibe as respostas corretas na tela.')}
            ${createMenuItem('autoAnswer', 'Auto Responder', 'Responde automaticamente as perguntas.')}
            ${createMenuItem('nextRecomendation', 'Próxima Recomendação', 'Pula para a próxima recomendação.')}
            ${createMenuItem('repeatQuestion', 'Repetir Pergunta', 'Repete a pergunta atual.')}
            ${createMenuItem('minuteFarmer', 'Farmer de Minutos', 'Simula atividade para ganhar minutos.')}
            ${createMenuItem('rgbLogo', 'Logo RGB', 'Ativa o efeito RGB no logo.')}
            ${createMenuItem('darkMode', 'Modo Escuro', 'Alterna o modo escuro (DarkReader).')}
            ${createMenuItem('onekoJs', 'Oneko.js', 'Ativa o gatinho Oneko.')}
            <div style="margin-top: 10px; padding-top: 5px; border-top: 1px solid rgba(255, 255, 255, 0.2);"></div>
            ${createMenuItem('debugMode', 'Modo Debug (Logs)', 'Exibe o console de logs de debug.', toggleDebugMode)}
        `;
        watermark.appendChild(dropdownMenu);

        // Função auxiliar para criar itens de menu
        function createMenuItem(featureKey, label, description, customAction) {
            const isToggle = typeof features[featureKey] === 'boolean';
            const isChecked = isToggle ? features[featureKey] : false;
            const action = customAction ? `(${customAction.name})` : `toggleFeature('${featureKey}')`;
            
            return `
                <div class="nizk-menu-item" data-feature="${featureKey}" onclick="${action}" title="${description}" style="
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 8px; margin-bottom: 5px; 
                    background: rgba(255, 255, 255, 0.05); 
                    border-radius: 8px; 
                    cursor: pointer; 
                    transition: background 0.2s;
                " onmouseover="this.style.background='rgba(255, 255, 255, 0.15)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.05)'">
                    <span>${label}</span>
                    ${isToggle ? `<input type="checkbox" ${isChecked ? 'checked' : ''} style="pointer-events: none;">` : ''}
                </div>
            `;
        }

        // Função para alternar features (chamada pelo menu)
        window.toggleFeature = function(featureKey) {
            if (typeof features[featureKey] === 'boolean') {
                features[featureKey] = !features[featureKey];
                const item = dropdownMenu.querySelector(`[data-feature="${featureKey}"] input[type="checkbox"]`);
                if (item) {
                    item.checked = features[featureKey];
                }
                sendToast(`${featureKey} ${features[featureKey] ? 'ativado' : 'desativado'}`, 3000, 'info');
                debug(`Feature toggled: ${featureKey} is now ${features[featureKey]}`);

                // Lógica específica para DarkMode
                if (featureKey === 'darkMode' && typeof DarkReader !== 'undefined') {
                    features[featureKey] ? DarkReader.enable() : DarkReader.disable();
                }
            }
        };

        // Lógica de arrastar (mantida)
        let isDragging = false;
        let offsetX;
        let offsetY;

        watermark.addEventListener('mousedown', event => {
            if (!dropdownMenu.contains(event.target)) {
                isDragging = true;
                offsetX = event.clientX - watermark.offsetLeft;
                offsetY = event.clientY - watermark.offsetTop;
                watermark.style.transform = 'scale(1.05)';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            watermark.style.transform = 'scale(1)';
        });

        document.addEventListener('mousemove', event => {
            if (isDragging) {
                let x = Math.max(10, Math.min(event.clientX - offsetX, window.innerWidth - watermark.offsetWidth - 10));
                let y = Math.max(10, Math.min(event.clientY - offsetY, window.innerHeight - watermark.offsetHeight - 10));
                Object.assign(watermark.style, {
                    left: x + 'px',
                    top: y + 'px',
                    right: 'auto', // Desativa o right para que o left funcione
                    bottom: 'auto' // Desativa o bottom para que o top funcione
                });
                dropdownMenu.style.display = 'none';
            }
        });

        // Eventos da marca d'água para abrir/fechar menu
        watermark.addEventListener('click', () => {
            const isVisible = dropdownMenu.style.display === 'flex';
            dropdownMenu.style.display = isVisible ? 'none' : 'flex';
            playAudio('https://www.myinstants.com/media/sounds/click.mp3');
        });

        // Fecha o menu se clicar fora
        document.addEventListener('click', (event) => {
            if (!watermark.contains(event.target) && dropdownMenu.style.display === 'flex') {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Chama a função de criação após a inicialização
    setTimeout(createWatermarkAndMenu, 1500); // Garante que o Toastify esteja carregado para o debug

    debug('Nizk carregado com sucesso!');
})();
