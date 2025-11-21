// Versão simplificada para execução via bookmarklet
(function() {
    // Verifica se o script já foi carregado
    if (window.khanwareLoaded) {
        console.log('Khanware já está carregado');
        return;
    }
    
    // Marca como carregado
    window.khanwareLoaded = true;
    
    // Objeto LEDy simplificado
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
        onekoJs: false
    };
    window.featureConfigs = {
        autoAnswerDelay: 3,
        repeatCount: 1
    };

    // Cria elementos DOM
    const dropdownMenu = document.createElement('div');
    const watermark = document.createElement('div');
    const splashScreen = document.createElement('div');

    // Funções utilitárias
    window.debug = function(message) {};
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const playAudio = url => {
        try {
            const audio = new Audio(url);
            audio.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
            debug('Playing audio: ' + url);
        } catch (e) {
            console.log('Erro ao criar áudio:', e);
        }
    };
    const findAndClickBySelector = selector => {
        try {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null && !element.disabled) {
                element.click();
                sendToast('Clicked element: ' + selector, 1000);
                return true;
            }
        } catch (e) {
            console.log('Erro ao clicar no elemento:', e);
        }
        return false;
    };

    function sendToast(message, duration = 5000, gravity = 'bottom') {
        try {
            if (typeof Toastify !== 'undefined') {
                Toastify({
                    text: message,
                    duration: duration,
                    gravity: gravity,
                    position: 'center',
                    stopOnFocus: true,
                    style: {
                        background: 'linear-gradient(to right, #00b09b, #96c93d)',
                        color: '#fff'
                    }
                }).showToast();
            } else {
                console.log(message);
            }
            debug(message);
        } catch (e) {
            console.log('Erro ao exibir toast:', e);
        }
    }

    // Funções da tela de apresentação
    async function showSplashScreen() {
        try {
            splashScreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #1a1a1a; display: flex; justify-content: center; align-items: center; z-index: 9999; opacity: 0; transition: opacity 0.5s;';
            splashScreen.innerHTML = '<div style="color: white; font-size: 24px;">Loading...</div>';
            document.body.appendChild(splashScreen);
            setTimeout(() => splashScreen.style.opacity = '1', 10);
        } catch (e) {
            console.log('Erro ao exibir tela de apresentação:', e);
        }
    }

    async function hideSplashScreen() {
        try {
            splashScreen.style.opacity = '0';
            setTimeout(() => splashScreen.remove(), 1000);
        } catch (e) {
            console.log('Erro ao ocultar tela de apresentação:', e);
        }
    }

    // Carrega recursos externos
    async function loadScript(url, name) {
        try {
            return fetch(url).then(response => response.text()).then(code => {
                loadedPlugins.push(name);
                eval(code);
            });
        } catch (e) {
            console.log('Erro ao carregar script:', e);
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
            console.log('Erro ao carregar CSS:', e);
        }
    }

    // Inicialização
    showSplashScreen();
    
    // Carrega recursos externos
    loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.44/darkreader.min.js', 'darkreader').then(() => {
        try {
            if (typeof DarkReader !== 'undefined') {
                DarkReader.setFetchMethod(window.fetch);
                DarkReader.enable();
            }
        } catch (e) {
            console.log('Erro ao ativar DarkReader:', e);
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
                    console.log('Erro ao processar dados do usuário:', e);
                }
            }).catch(e => {
                console.log('Erro ao obter dados do usuário:', e);
            });
            
            sendToast('Bem-vindo ao Khanware!');
            playAudio('https://www.myinstants.com/media/sounds/mission-impossible-theme-song.mp3');
            await delay(500);
            sendToast('Logado como: ' + user.nickname);
            if (device.apple) {
                await delay(500);
                sendToast('Detectado dispositivo Apple!');
            }
            loadedPlugins.forEach(plugin => sendToast('Plugin carregado: ' + plugin, 2000, 'top'));
            hideSplashScreen();
            sendToast('Pressione F12 para abrir o menu de opções', 5000, 'top');
            sendToast('Use as teclas de atalho para navegar', 5000, 'top');
            sendToast('Divirta-se!', 5000, 'top');
        } catch (e) {
            console.log('Erro na inicialização:', e);
        }
    });

    // Intercepta e modifica requisições de rede
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
                    
                    // Extrai respostas corretas de diferentes tipos de perguntas
                    for (const [widgetKey, widget] of Object.entries(questionData.question.widgets)) {
                        if (widget.type === 'multiple-choice' && widget.options?.choices) {
                            const choices = widget.options.choices.map((choice, index) => ({
                                ...choice,
                                id: choice.id || 'choice-' + index
                            }));
                            const correctChoice = choices.find(choice => choice.correct);
                            if (correctChoice) {
                                answers.push({
                                    type: 'multiple-choice',
                                    choiceId: correctChoice.id,
                                    widgetKey: widgetKey
                                });
                            }
                        } else if (widget.type === 'numeric-input' && widget.options?.answers) {
                            const correctAnswer = widget.options.answers.find(answer => answer.status === 'correct');
                            if (correctAnswer) {
                                const value = correctAnswer.answerForms?.some?.(form => form === 'exact' || form === 'percent') ?
                                    simplifyFraction(correctAnswer.value) : String(correctAnswer.value);
                                answers.push({
                                    type: 'numeric-input',
                                    value: value,
                                    widgetKey: widgetKey
                                });
                            }
                        } else if (widget.type === 'expression-input' && widget.options?.answerForms) {
                            const correctAnswer = widget.options.answerForms.find(answer => 
                                answer.considered === 'correct' || answer.form === true);
                            if (correctAnswer) {
                                answers.push({
                                    type: 'expression-input',
                                    value: correctAnswer.value,
                                    widgetKey: widgetKey
                                });
                            }
                        } else if (widget.type === 'grapher' && widget.options?.correct) {
                            const correctAnswer = widget.options.correct;
                            if (correctAnswer.type && correctAnswer.coords) {
                                answers.push({
                                    type: 'grapher',
                                    graphType: correctAnswer.type,
                                    coords: correctAnswer.coords,
                                    asymptote: correctAnswer.asymptote || null,
                                    widgetKey: widgetKey
                                });
                            }
                        }
                    }
                    
                    if (answers.length > 0) {
                        questionData.set(questionItem.id, answers);
                        sendToast('Encontradas ' + answers.length + ' respostas corretas!', 750);
                    }
                    
                    // Modifica a pergunta para uma mais fácil
                    if (questionData.question.content?.[0] === questionData.question.content[0].toUpperCase()) {
                        questionData.answerArea = {
                            calculator: false,
                            chi2Table: false,
                            periodicTable: false,
                            tTable: false,
                            zTable: false
                        };
                        questionData.question.content = 'Qual a capital do Brasil?';
                        questionData.question.widgets = {
                            'choices-1': {
                                type: 'multiple-choice',
                                alignment: 'center',
                                static: false,
                                graded: true,
                                options: {
                                    choices: [
                                        { content: 'Brasília', correct: true, id: 'choice-0' },
                                        { content: 'Rio de Janeiro', correct: false, id: 'choice-1' }
                                    ],
                                    randomize: false,
                                    multipleSelect: false,
                                    displayCount: null,
                                    deselectEnabled: false
                                },
                                version: {
                                    major: 1,
                                    minor: 0
                                }
                            }
                        };
                        const modifiedResponse = { ...responseData };
                        modifiedResponse.data.assessmentItem.item.itemData = JSON.stringify(questionData);
                        sendToast('Pergunta modificada com sucesso!', 750);
                        return new Response(JSON.stringify(modifiedResponse), {
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers
                        });
                    }
                } catch (error) {
                    debug('Erro ao processar pergunta: ' + error);
                }
                return response;
            }
            
            // Envio de respostas
            if (features.questionSpoof && requestBody?.includes?.('finishAssessment')) {
                try {
                    let requestData = JSON.parse(requestBody);
                    const assessmentItemId = requestData.variables?.input?.assessmentItemId;
                    const answers = questionData.get(assessmentItemId);
                    if (answers?.length > 0) {
                        const attemptData = [];
                        const userInput = {};
                        let attemptState = requestData.variables.input.attemptState ? 
                            JSON.parse(requestData.variables.input.attemptState) : null;
                        
                        answers.forEach(answer => {
                            if (answer.type === 'multiple-choice') {
                                attemptData.push({ selectedChoiceIds: [answer.choiceId] });
                                userInput[answer.widgetKey] = { selectedChoiceIds: [answer.choiceId] };
                            } else if (answer.type === 'numeric-input') {
                                attemptData.push({ currentValue: answer.value });
                                userInput[answer.widgetKey] = { currentValue: answer.value };
                                if (attemptState?.[answer.widgetKey]) {
                                    attemptState[answer.widgetKey].currentValue = answer.value;
                                }
                            } else if (answer.type === 'expression-input') {
                                attemptData.push(answer.value);
                                userInput[answer.widgetKey] = answer.value;
                                if (attemptState?.[answer.widgetKey]) {
                                    attemptState[answer.widgetKey].value = answer.value;
                                }
                            } else if (answer.type === 'grapher') {
                                const graphData = {
                                    type: answer.graphType,
                                    coords: answer.coords,
                                    asymptote: answer.asymptote
                                };
                                attemptData.push(graphData);
                                userInput[answer.widgetKey] = graphData;
                                if (attemptState?.[answer.widgetKey]) {
                                    attemptState[answer.widgetKey].plot = graphData;
                                }
                            }
                        });
                        
                        requestData.variables.input.attemptContent = JSON.stringify([attemptData, []]);
                        requestData.variables.input.userInput = JSON.stringify(userInput);
                        if (attemptState) {
                            requestData.variables.input.attemptState = JSON.stringify(attemptState);
                        }
                        requestBody = JSON.stringify(requestData);
                        if (url instanceof Request) {
                            url = new Request(url, { body: requestBody });
                        } else {
                            options.body = requestBody;
                        }
                        sendToast('Enviadas ' + answers.length + ' respostas corretas!', 750);
                    }
                } catch (error) {
                    debug('Erro ao enviar respostas: ' + error);
                }
            }
            
            // Spoofing de vídeo
            if (features.videoSpoof && requestBody && requestBody.includes('videoProgress')) {
                try {
                    let requestData = JSON.parse(requestBody);
                    if (requestData.variables && requestData.variables.input) {
                        const duration = requestData.variables.input.durationSeconds;
                        requestData.variables.input.secondsWatched = duration;
                        requestData.variables.input.lastSecondWatched = duration;
                        requestBody = JSON.stringify(requestData);
                        if (url instanceof Request) {
                            url = new Request(url, { body: requestBody });
                        } else {
                            options.body = requestBody;
                        }
                        sendToast('Vídeo marcado como assistido!', 1000);
                    }
                } catch (error) {
                    debug('Erro ao modificar vídeo: ' + error);
                }
            }
            
            // Minute farmer
            if (features.minuteFarmer && requestBody && requestUrl.includes('https://www.khanacademy.org/api/internal/graphql/UpdateGoalForUser')) {
                try {
                    if (requestBody.includes('minutesGoal')) {
                        sendToast('Minuto farming detectado, ignorando...', 1000);
                        return;
                    }
                } catch (error) {
                    debug('Erro no minute farmer: ' + error);
                }
            }
            
            return originalFetch.apply(this, arguments);
        } catch (e) {
            console.log('Erro na interceptação de requisições:', e);
            return originalFetch.apply(this, arguments);
        }
    };

    // Função para simplificar frações
    function simplifyFraction(num) {
        try {
            if (num === 0) return String(0);
            
            const numStr = String(num);
            const parts = numStr.split('.');
            if (parts.length === 1) {
                return String(num);
            }
            
            const denominator = Math.pow(10, parts[1].length);
            const numerator = num * denominator;
            
            const gcd = (a, b) => {
                while (b) {
                    [a, b] = [b, a % b];
                }
                return a;
            };
            
            const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
            if (denominator / divisor === 1) {
                return String(numerator / divisor);
            }
            return String(numerator / divisor) + '/' + String(denominator / divisor);
        } catch (e) {
            console.log('Erro ao simplificar fração:', e);
            return String(num);
        }
    }

    // Marca d'água
    try {
        Object.assign(watermark.style, {
            position: 'fixed',
            top: '10px',
            left: '10px',
            width: '200px',
            height: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '5px',
            borderRadius: '5px',
            zIndex: '9999',
            transition: 'all 0.3s',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        });

        if (device.mobile) {
            watermark.style.left = '50%';
            watermark.style.transform = 'translateX(-50%)';
        }

        watermark.innerHTML = 'Khanware v' + ver;
        document.body.appendChild(watermark);

        let isDragging = false;
        let offsetX;
        let offsetY;

        watermark.addEventListener('mousedown', event => {
            if (!dropdownMenu.contains(event.target)) {
                isDragging = true;
                offsetX = event.clientX - watermark.offsetLeft;
                offsetY = event.clientY - watermark.offsetTop;
                watermark.style.transform = 'scale(1.1)';
            }
        });

        watermark.addEventListener('mouseup', () => {
            isDragging = false;
            watermark.style.transform = 'scale(1)';
        });

        document.addEventListener('mousemove', event => {
            if (isDragging) {
                let x = Math.max(0, Math.min(event.clientX - offsetX, window.innerWidth - watermark.offsetWidth));
                let y = Math.max(0, Math.min(event.clientY - offsetY, window.innerHeight - watermark.offsetHeight));
                Object.assign(watermark.style, {
                    left: x + 'px',
                    top: y + 'px'
                });
                dropdownMenu.style.display = 'none';
            }
        });

        // Menu suspenso
        Object.assign(dropdownMenu.style, {
            position: 'absolute',
            top: '60px',
            left: '0',
            width: '200px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            display: 'none',
            flexDirection: 'column',
            zIndex: '9999',
            padding: '10px',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'all 0.3s',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        });

        dropdownMenu.innerHTML = '<div style="color: #fff; font-weight: bold; margin-bottom: 10px;">Khanware Menu</div>';
        watermark.appendChild(dropdownMenu);

        // Eventos da marca d'água
        watermark.addEventListener('click', () => {
            dropdownMenu.style.display = 'flex';
            playAudio('https://www.myinstants.com/media/sounds/click.mp3');
        });

        watermark.addEventListener('mouseleave', event => {
            if (!watermark.contains(event.relatedTarget)) {
                dropdownMenu.style.display = 'none';
            }
            playAudio('https://www.myinstants.com/media/sounds/click.mp3');
        });
    } catch (e) {
        console.log('Erro ao criar marca d\'água:', e);
    }

    console.log('Khanware carregado com sucesso!');
})();
