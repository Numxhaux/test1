// Job ID: dar3o8zzdcl3
let LEDy = {
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
let isDev = false;
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

// Cria elementos DOM
const unloader = document.createElement('div');
const dropdownMenu = document.createElement('div');
const watermark = document.createElement('div');
const statsPanel = document.createElement('div');
const splashScreen = document.createElement('div');

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

// Configura listeners de eventos
document.addEventListener('contextmenu', e => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', e => {
    if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)))) {
        e.preventDefault();
    }
});

// Configura tratamento de erros
console.log(Object.defineProperties(new Error(), {
    toString: {
        value() {
            if (new Error().stack.includes('debugger')) {
                location.reload();
            }
        }
    },
    message: {
        get() {
            location.reload();
        }
    }
}));

// Adiciona estilos à página
document.head.appendChild(Object.assign(document.createElement('style'), {
    innerHTML: '/* Estilos CSS */'
}));
document.head.appendChild(Object.assign(document.createElement('style'), {
    innerHTML: '/* Mais estilos CSS */'
}));
document.querySelector('link[rel="icon"]').href = 'data:image/png;base64,...';

// Classe EventEmitter
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, callback) {
        if (!Array.isArray(event)) {
            event = [event];
        }
        event.forEach(eventName => {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(callback);
        });
    }
    off(event, callback) {
        if (!Array.isArray(event)) {
            event = [event];
        }
        event.forEach(eventName => {
            if (this.events[eventName]) {
                this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
            }
        });
    }
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                callback(...args);
            });
        }
    }
    once(event, callback) {
        if (!Array.isArray(event)) {
            event = [event];
        }
        const onceWrapper = (...args) => {
            callback(...args);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }
}

const plppdo = new EventEmitter();

// Observa mudanças no DOM
new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            plppdo.emit('domChanged');
        }
    }
}).observe(document.body, {
    childList: true,
    subtree: true
});

// Funções utilitárias
window.debug = function(message) {};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => {
    const audio = new Audio(url);
    audio.play();
    debug('Playing audio: ' + url);
};
const findAndClickBySelector = selector => {
    const element = document.querySelector(selector);
    if (element && element.offsetParent !== null && !element.disabled) {
        element.click();
        sendToast('Clicked element: ' + selector, 1000);
        return true;
    }
    return false;
};

function sendToast(message, duration = 5000, gravity = 'bottom') {
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
    debug(message);
}

// Funções da tela de apresentação
async function showSplashScreen() {
    splashScreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #1a1a1a; display: flex; justify-content: center; align-items: center; z-index: 9999; opacity: 0; transition: opacity 0.5s;';
    splashScreen.innerHTML = '<div style="color: white; font-size: 24px;">Loading...</div>';
    document.body.appendChild(splashScreen);
    setTimeout(() => splashScreen.style.opacity = '1', 10);
}

async function hideSplashScreen() {
    splashScreen.style.opacity = '0';
    setTimeout(() => splashScreen.remove(), 1000);
}

// Carrega recursos externos
async function loadScript(url, name) {
    return fetch(url).then(response => response.text()).then(code => {
        loadedPlugins.push(name);
        eval(code);
    });
}

async function loadCss(url) {
    return new Promise(resolve => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.onload = () => resolve();
        document.head.appendChild(link);
    });
}

// Inicialização
showSplashScreen();
loadScript('https://cdn.jsdelivr.net/gh/adryd325/oneko.js@latest/oneko.js', 'oneko').then(() => {
    onekoEl = document.getElementById('oneko');
    onekoEl.style.backgroundImage = 'url("https://raw.githubusercontent.com/adryd325/oneko.js/master/oneko.gif")';
    onekoEl.style.display = 'block';
});
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.44/darkreader.min.js', 'darkreader').then(() => {
    DarkReader.setFetchMethod(window.fetch);
    DarkReader.enable();
});
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastify');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastify').then(async () => {
    // Carrega informações do usuário
    fetch('https://www.khanacademy.org/api/internal/graphql/GetUserProfile', {
        referrer: 'https://www.khanacademy.org/',
        body: '{"operationName":"GetUserProfile","variables":{},"query":"query GetUserProfile { user { nickname username id } }"}',
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
    }).then(async response => {
        let userData = await response.json();
        user = {
            nickname: userData.data.user.nickname,
            username: userData.data.user.username,
            UID: userData.data.user.id.slice(-8)
        };
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
});

// Intercepta e modifica requisições de rede
const originalFetch = window.fetch;
const questionData = new Map();

window.fetch = async function(url, options) {
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
};

// Função para simplificar frações
function simplifyFraction(num) {
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
}

// Manipulação do DOM para auto-resposta
plppdo.on('domChanged', () => {
    const logo = document.querySelector('.header-logo').querySelector('img');
    const style = document.createElement('style');
    style.className = 'rgb-logo';
    style.textContent = '@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } } .rgb-logo { animation: rainbow 5s linear infinite; }';
    if (features.rgbLogo && logo) {
        if (!document.getElementsByClassName('rgb-logo')[0]) {
            document.head.appendChild(style);
        }
        if (logo.getAttribute('style') != null) {
            logo.removeAttribute('style');
        }
        logo.style.animation = 'rainbow 5s linear infinite';
    }
});

console.clear();

// Gerenciamento de recursos
const setFeatureByPath = (path, value) => {
    let obj = window;
    const keys = path.split('.');
    while (keys.length > 1) {
        obj = obj[keys.shift()];
    }
    obj[keys[0]] = value;
};

function addFeature(features) {
    const container = document.createElement('div');
    features.forEach(feature => {
        let element = feature.type === 'label' ? 
            document.createElement('label') : document.createElement('input');
        
        if (feature.type === 'label') {
            element.innerHTML = feature.name;
        } else {
            element.type = feature.type;
            element.id = feature.name;
        }
        
        if (feature.attributes) {
            feature.attributes.split(',')
                .map(attr => attr.split('='))
                .forEach(([name, value]) => {
                    value = value ? value.replace(/"/g, '') : '';
                    if (name === 'style') {
                        element.style.cssText = value;
                    } else {
                        element.setAttribute(name, value);
                    }
                });
        }
        
        if (feature.variable) {
            element.setAttribute('data-variable', feature.variable);
        }
        
        if (feature.dependent) {
            element.setAttribute('data-dependent', feature.dependent);
        }
        
        if (feature.className) {
            element.classList.add(feature.className);
        }
        
        if (feature.labeled) {
            const label = document.createElement('label');
            if (feature.className) {
                label.classList.add(feature.className);
            }
            if (feature.attributes) {
                feature.attributes.split(',')
                    .map(attr => attr.split('='))
                    .forEach(([name, value]) => {
                        value = value ? value.replace(/"/g, '') : '';
                        if (name === 'style') {
                            label.style.cssText = value;
                        } else {
                            label.setAttribute(name, value);
                        }
                    });
            }
            label.innerHTML = element.outerHTML + ',' + feature.label;
            container.appendChild(label);
        } else {
            container.appendChild(element);
        }
    });
    dropdownMenu.innerHTML += container.outerHTML;
}

function handleInput(ids, callback = null) {
    (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
        .forEach(element => {
            if (!element) return;
            
            const variable = element.getAttribute('data-variable');
            const dependent = element.getAttribute('data-dependent');
            const handleChange = (event, value) => {
                setFeatureByPath(variable, value);
                if (callback) {
                    callback(value, event);
                }
            };
            
            if (element.type === 'checkbox') {
                element.addEventListener('change', event => {
                    playAudio('https://www.myinstants.com/media/sounds/click.mp3');
                    handleChange(event, event.target.checked);
                    if (dependent) {
                        dependent.split('.').forEach(dep => 
                            document.querySelectorAll('.' + dep).forEach(el => 
                                el.style.display = event.target.checked ? null : 'none'));
                    }
                });
            } else if (element.type === 'number') {
                element.addEventListener('input', event => {
                    let value = parseInt(event.target.value);
                    if (value < 0) value = 0;
                    if (value > 10) value = 10;
                    event.target.value = value;
                    handleChange(event, value);
                });
            } else {
                element.addEventListener('input', event => handleChange(event, event.target.value));
            }
        });
}

// Marca d'água
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

// Lista de recursos
let featuresList = [
    {
        name: 'Auto Start',
        type: 'checkbox',
        variable: 'features.autoStart',
        attributes: 'checked',
        labeled: true,
        label: 'Iniciar automaticamente'
    },
    {
        name: 'Question Spoof',
        type: 'checkbox',
        variable: 'features.questionSpoof',
        attributes: 'checked',
        labeled: true,
        label: 'Modificar perguntas'
    },
    {
        name: 'Video Spoof',
        type: 'checkbox',
        variable: 'features.videoSpoof',
        attributes: 'checked',
        labeled: true,
        label: 'Marcar vídeos como assistidos'
    },
    {
        name: 'Show Answers',
        type: 'checkbox',
        variable: 'features.showAnswers',
        labeled: true,
        label: 'Mostrar respostas'
    },
    {
        name: 'Auto Answer',
        type: 'checkbox',
        variable: 'features.autoAnswer',
        dependent: 'features.questionSpoof',
        labeled: true,
        label: 'Responder automaticamente'
    },
    {
        name: 'repeatCount',
        className: 'repeatCount',
        type: 'checkbox',
        variable: 'features.repeatQuestion',
        attributes: 'checked',
        labeled: true,
        label: 'Repetir pergunta'
    },
    {
        name: 'repeatDelay',
        className: 'repeatDelay',
        type: 'number',
        variable: 'featureConfigs.repeatCount',
        attributes: 'min="1", max="10", value="1"',
        labeled: true,
        label: 'Número de repetições'
    },
    {
        name: 'Next Recommendation',
        type: 'checkbox',
        variable: 'features.nextRecomendation',
        attributes: 'checked',
        labeled: true,
        label: 'Próxima recomendação'
    },
    {
        name: 'Minute Farmer',
        type: 'checkbox',
        variable: 'features.minuteFarmer',
        labeled: true,
        label: 'Farmer de minutos'
    },
    {
        name: 'RGB Logo',
        type: 'checkbox',
        variable: 'features.rgbLogo',
        labeled: true,
        label: 'Logo animado'
    },
    {
        name: 'Dark Mode',
        type: 'checkbox',
        variable: 'features.darkMode',
        attributes: 'checked',
        labeled: true,
        label: 'Modo escuro'
    },
    {
        name: 'Oneko',
        type: 'checkbox',
        variable: 'features.onekoJs',
        labeled: true,
        label: 'Gato animado'
    }
];

// Adiciona informações do usuário
featuresList.push({
    name: user.username + ' - ' + user.UID,
    type: 'label',
    attributes: 'style="color: #0f0; margin: 10px 0;"'
});

featuresList.push({
    name: 'Status: Online',
    type: 'label',
    attributes: 'style="color: #0f0; margin-bottom: 10px;"'
});

addFeature(featuresList);

// Configura handlers de input
handleInput(['Question Spoof', 'Video Spoof', 'Show Answers', 'Dark Mode', 'RGB Logo', 'Oneko']);
handleInput('Auto Answer', value => {
    if (value && !features.questionSpoof) {
        document.querySelector('#Question\\ Spoof').checked = features.questionSpoof = true;
    }
});

handleInput('repeatDelay', value => {
    featureConfigs.autoAnswerDelay = 5 - value;
});

handleInput('Dark Mode', value => {
    if (value) {
        DarkReader.setFetchMethod(window.fetch);
        DarkReader.enable();
    } else {
        DarkReader.disable();
    }
});

handleInput('Oneko', value => {
    onekoEl = document.getElementById('oneko');
    if (onekoEl) {
        onekoEl.style.display = value ? null : 'none';
    }
});

handleInput('repeatCount', value => {
    if (value) {
        sendToast('Repetição ativada');
    } else {
        sendToast('Repetição desativada');
    }
});

handleInput('repeatDelay');
handleInput('Auto Start');

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

// Auto-resposta automática
plppdo.on('domChanged', async () => {
    if (features.autoStart && features.nextRecomendation && window.location.href.includes('/exercise')) {
        await delay(1000);
        const nextButton = document.querySelector('.next-button');
        if (nextButton && nextButton.offsetParent !== null && !nextButton.disabled) {
            findAndClickBySelector('.next-button');
        } else {
            sendToast('Próxima pergunta não encontrada', 2000);
        }
    }
});

// Loop principal de automação
const selectors = [
    '.submit-button',
    '.check-answer-button',
    '.try-again-button',
    '.next-question-button',
    '.start-over-button',
    '.continue-button'
];

const vamosLaSelector = '.vamos-la-button';
const repeatSelector = '.repeat-button';

(async () => {
    while (true) {
        // Auto-resposta
        if (features.autoAnswer && features.questionSpoof) {
            const submitButtons = document.querySelectorAll('.submit-button');
            if (submitButtons.length > 0) {
                sendToast('Procurando botão de envio...', 3000);
                let clicked = false;
                for (const selector of ['button[type="submit"]', '.submit-button', '.check-answer']) {
                    if (findAndClickBySelector(selector)) {
                        clicked = true;
                        sendToast('Botão de envio encontrado!', 2000);
                        break;
                    }
                }
                if (!clicked) {
                    sendToast('Nenhum botão de envio encontrado', 5000);
                    await delay(5000);
                    if (document.querySelectorAll('.submit-button').length > 0) {
                        continue;
                    }
                }
            }
        }
        
        // Navegação automática
        const navigationSelectors = [...selectors];
        if (features.nextRecomendation) {
            navigationSelectors.push('.next-button');
        }
        if (features.repeatQuestion) {
            navigationSelectors.push(repeatSelector);
        }
        if (features.autoStart && window.location.href.includes('/exercise')) {
            navigationSelectors.push('.start-button');
        }
        
        for (const selector of navigationSelectors) {
            if (findAndClickBySelector(selector)) {
                if (selector === repeatSelector) {
                    featureConfigs.repeatCount--;
                    sendToast('Repetições restantes: ' + featureConfigs.repeatCount, 3000);
                    if (featureConfigs.repeatCount <= 0) {
                        features.repeatQuestion = false;
                        const repeatCheckbox = document.getElementById('repeatCount');
                        if (repeatCheckbox) {
                            repeatCheckbox.checked = false;
                        }
                        sendToast('Repetição concluída', 3000);
                    }
                    await delay(1000);
                    if (features.autoStart) {
                        findAndClickBySelector('.start-button');
                    }
                }
                const buttonText = document.querySelector(selector + ' span');
                if (buttonText && buttonText.innerText === 'Próxima') {
                    sendToast('Próxima pergunta!', 3000);
                    playAudio('https://www.myinstants.com/media/sounds/success.mp3');
                }
            }
        }
        
        await delay(featureConfigs.autoAnswerDelay * 800);
    }
})();

// Modificação do JSON.parse para mostrar respostas
const originalParse = JSON.parse;
JSON.parse = function(text, reviver) {
    let result = originalParse(text, reviver);
    try {
        if (result?.data) {
            Object.keys(result.data).forEach(key => {
                const item = result.data[key];
                if (features.showAnswers && key === 'assessmentItem' && item?.item) {
                    const questionData = JSON.parse(item.item.itemData);
                    if (questionData.question && questionData.question.widgets && 
                        questionData.question.content[0] === questionData.question.content[0].toUpperCase()) {
                        Object.keys(questionData.question.widgets).forEach(widgetKey => {
                            const widget = questionData.question.widgets[widgetKey];
                            if (widget.options && widget.options.choices) {
                                widget.options.choices.forEach(choice => {
                                    if (choice.correct) {
                                        choice.content = '✅ ' + choice.content;
                                        sendToast('Resposta destacada!', 1000);
                                    }
                                });
                            }
                        });
                        item.item.itemData = JSON.stringify(questionData);
                    }
                }
            });
        }
    } catch (error) {
        debug('Erro ao modificar JSON: ' + error);
    }
    return result;
};
