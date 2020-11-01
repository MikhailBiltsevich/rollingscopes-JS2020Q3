import { KeyboardLayout } from './keyboard-layout.js';
import { KeyboardLayoutEN } from './en.js';
import { KeyboardLayoutRU } from './ru.js';

const BCP47 = {
    en: "en-US",
    ru: "ru-RU"
}

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        languageKey: null,
        input: null
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        keyValue: "",
        capsLock: false,
        shift: false,
        language: undefined,
        sound: true,
        speechRecord: false
    },

    recognition: null,

    init() {
        this.properties.language = localStorage.keyboardLang ? localStorage.keyboardLang : BCP47.en;

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "keyboard_hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.append(this._createKeys());

        this._refreshKeys();
        
        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("keydown", (e) => {
                const hasSpecificKey = 
                    (e.altKey && !e.code.startsWith("Alt")) || 
                    (e.ctrlKey && !e.code.startsWith("Control")) || 
                    (e.shiftKey && !e.code.startsWith("Shift"));
                    
                if (KeyboardLayout.includes(e.code)) {
                    if (!hasSpecificKey) {
                        e.preventDefault();
                    }
                }
                if (e.repeat && ["ShiftLeft", "ShiftRight", "CapsLock"].includes(e.code)) {
                    return;
                }

                const keyCode = e.code;
                const virtualKey = this.elements.keys.find(key => key.dataset.code === keyCode);
                if (!virtualKey) {
                    return;
                }
                virtualKey.classList.add("keyboard__key_pressed");
                
                if (!hasSpecificKey) {
                    virtualKey.click();
                }
            });

            element.addEventListener("keyup", (e) => {
                e.preventDefault();
                const keyCode = e.code;
                const virtualKey = this.elements.keys.find(key => key.dataset.code === keyCode);
                if (!virtualKey) {
                    return;
                }
                virtualKey.classList.remove("keyboard__key_pressed");
            });

            element.addEventListener("focus", () => {
                this.open((keyValue) => {
                    if (keyValue === "" && element.selectionStart !== 0 && element.selectionStart === element.selectionEnd) {
                        element.setRangeText(keyValue, element.selectionStart - 1, element.selectionEnd, "end");
                    } else {
                        element.setRangeText(keyValue, element.selectionStart, element.selectionEnd, "end");
                    }
                });
                this.elements.input = element;
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyCodesLayout = KeyboardLayout;

        const createIcon = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`
        }

        const createSoundIcon = () => {
            if (this.properties.sound) {
                return `<i class="material-icons">music_note</i>`;
            }
            else {
                return `<i class="material-icons">music_off</i>`;
            }
        }

        const createMicIcon = () => {
            if (!this.properties.speechRecord) {
                return `<i class="material-icons">mic</i>`;
            }
            else {
                return `<i class="material-icons">mic_off</i>`;
            }
        }

        keyCodesLayout.forEach(code => {
            const keyButton = document.createElement("button");
            keyButton.classList.add("keyboard__key");
            keyButton.setAttribute("type", "button");
            keyButton.dataset.code = code;

            switch (code) {
                case "Backspace":
                    keyButton.innerHTML = createIcon("backspace");

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "";
                        if (this.properties.sound) {
                            this._playSound(code);
                        }
                        this._triggerEvent("oninput");
                    });
                    break;
                case "CapsLock":
                    keyButton.innerHTML = createIcon("keyboard_capslock");
                    keyButton.classList.add("keyboard__key-activatable");

                    keyButton.addEventListener("click", () => {
                        this._toggleCapsLock();
                        if (this.properties.sound) {
                            this._playSound(code);
                        }
                        keyButton.classList.toggle("keyboard__key_active", this.properties.capsLock);
                    });

                    break;
                case "Tab":
                    keyButton.innerHTML = createIcon("keyboard_tab");

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "\t";
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                        this._triggerEvent("oninput");
                    });
                    break;
                case "Enter":
                    keyButton.innerHTML = createIcon("keyboard_return");

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "\n";
                        if (this.properties.sound) {
                            this._playSound(code);
                        }
                        this._triggerEvent("oninput");
                    });
                    break;
                case "Hide":
                    keyButton.innerHTML = createIcon("check_circle_outline");
                    keyButton.classList.add("keyboard__key_blue");

                    keyButton.addEventListener("click", () => {
                        this.close();
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                        this._triggerEvent("onclose");
                    });
                    break;
                case "Space":
                    keyButton.innerHTML = createIcon("space_bar")

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = " ";
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                        this._triggerEvent("oninput");
                    });
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    keyButton.innerHTML = createIcon("expand_less");

                    keyButton.addEventListener("click" ,() => {
                        if (this.properties.sound) {
                            this._playSound(code);
                        }
                        this._toggleShift();
                    });
                    break;
                case "ControlLeft":
                case "ControlRight":
                    keyButton.innerHTML = `<span>Ctrl</span>`;

                    keyButton.addEventListener("click" ,() => {
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                    });
                    break;
                case "AltLeft":
                case "AltRight":
                    keyButton.innerHTML = `<span>Alt</span>`;

                    keyButton.addEventListener("click" ,() => {
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                    });
                    break;
                case "Language":
                    this.elements.languageKey = keyButton;
                    keyButton.addEventListener("click", () => {
                        if (this.properties.sound) {
                            this._playSound(code);
                        }
                        this._changeLanguage();
                    });
                    break;
                case "ArrowLeft":
                    keyButton.innerHTML = createIcon("keyboard_arrow_left");
                    keyButton.addEventListener("click", () => {
                        if (this.elements.input.selectionStart === this.elements.input.selectionEnd) {
                            this.elements.input.setSelectionRange(this.elements.input.selectionStart - 1, this.elements.input.selectionEnd - 1);
                        } else {
                            this.elements.input.selectionEnd = this.elements.input.selectionStart;
                        }
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                    });
                    break;
                case "ArrowRight":
                    keyButton.innerHTML = createIcon("keyboard_arrow_right");
                    keyButton.addEventListener("click", () => {
                        if (this.elements.input.selectionStart === this.elements.input.selectionEnd) {
                            this.elements.input.setSelectionRange(this.elements.input.selectionStart + 1, this.elements.input.selectionEnd + 1);
                        } else {
                            this.elements.input.selectionStart = this.elements.input.selectionEnd;
                        }
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                    });
                    break;
                case "Sound":
                    keyButton.innerHTML = createSoundIcon();
                    keyButton.addEventListener("click", () => {
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }
                        this._toggleSound();
                        keyButton.innerHTML = createSoundIcon();
                    });
                    break;
                case "SpeechRecognition":
                    this._speechRecognitionInit();
                    this.recognition.addEventListener("result", (e) => {
                        let text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
            
                        this.elements.input.setRangeText(text, this.elements.input.selectionStart, this.elements.input.selectionEnd, "start");
                        this.elements.input.selectionEnd = this.elements.input.selectionStart + text.length;
                        if (e.results[0].isFinal) {
                            this.elements.input.setRangeText(`${text} `, this.elements.input.selectionStart, this.elements.input.selectionEnd, "end");
                        }
                    });
                    keyButton.innerHTML = createMicIcon();
                    keyButton.addEventListener("click", () => {
                        this._toggleMic();
                        keyButton.innerHTML = createMicIcon();
                    })
                    break;
                default:
                    keyButton.addEventListener("click", (e) => {
                        this.properties.keyValue = keyButton.textContent;
                        if (this.properties.sound) {
                            this._playSound(`${this.properties.language}Key`);
                        }

                        this._triggerEvent("oninput"); 
                    });
                    break;
            }

            if (code !== "Hide") {
                keyButton.addEventListener("click", () => {
                    this.elements.input.focus();
                });
            }
            
            this._setKeyColumnSpan(keyButton);
            this.elements.keys.push(keyButton);
            fragment.append(keyButton);
        });

        return fragment;
    },

    _speechRecognitionInit() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        this.recognition = new SpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.lang = this.properties.language;
        this.recognition.addEventListener("end", (e) => {
            if (this.properties.speechRecord) {
                this.recognition.start();
            }
        });
    },

    _setKeyColumnSpan(keyButton) {
        const span3 = ["Tab", "Backslash", "Hide", "ControlRight", "ControlLeft", "AltRight", "AltLeft"];
        const span4 = ["Enter", "ShiftLeft", "CapsLock", "ShiftRight", "Backspace"];
        const span9 = ["Sound", "Language", "SpeechRecognition"];
        const span14 = ["Space"];

        if (span3.includes(keyButton.dataset.code)) {
            keyButton.classList.add("keyboard__key_span-3-col");
        } else if (span4.includes(keyButton.dataset.code)) {
            keyButton.classList.add("keyboard__key_span-4-col");
        } else if (span9.includes(keyButton.dataset.code)) {
            keyButton.classList.add("keyboard__key_span-9-col");
        } else if (span14.includes(keyButton.dataset.code)) {
            keyButton.classList.add("keyboard__key_span-14-col");
        } else {
            keyButton.classList.add("keyboard__key_span-2-col");
        }
    },

    _toggleSound() {
        this.properties.sound = !this.properties.sound;
    },

    _playSound(keyCode) {
        const audio = document.querySelector(`audio[data-key-code="${keyCode}"]`);
        if (!audio) {
            return;
        }

        audio.currentTime = 0;
        audio.play();
    },

    _toggleMic() {
        this.properties.speechRecord = !this.properties.speechRecord;

        if (this.properties.speechRecord) {
            this.recognition.start();
        } else {
            this.recognition.stop();
        }
    },

    _changeLanguage() {
        this.properties.language = this.recognition.lang = 
            this.properties.language === BCP47.en ? BCP47.ru : BCP47.en;

            localStorage.setItem("keyboardLang", this.properties.language);
        
            this._refreshKeys();
    },

    _refreshKeys() {
        const keyboardLayout = 
            this.properties.language === BCP47.en ? KeyboardLayoutEN : KeyboardLayoutRU;

        this.elements.languageKey.innerHTML = `<strong>${this.properties.language.split('-')[0].toUpperCase()}</strong>`;

        for (const keyButton of this.elements.keys) {
            if (keyButton.childElementCount !== 0) {
                continue;
            }

            const keyCode = keyButton.dataset.code;
            const key = keyboardLayout.find(key => key.code === keyCode);

            if (this.properties.capsLock) {
                if (this.properties.shift) {
                    keyButton.textContent = key.shift.toLowerCase();
                } else {
                    keyButton.textContent = key.small.toUpperCase();
                }
            } else {
                if (this.properties.shift) {
                    keyButton.textContent = key.shift;
                } else {
                    keyButton.textContent = key.small;
                }
            }
        }
    },

    _triggerEvent(eventHandler) {
        if (typeof this.eventHandlers[eventHandler] === "function") {
            this.eventHandlers[eventHandler](this.properties.keyValue);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this._refreshKeys();
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        const key = this.elements.keys.find(key => key.dataset.code.startsWith("Shift"));
        key.classList.toggle("keyboard__key_active-shift", this.properties.shift);
        this._refreshKeys();
    },

    open(oninput, onclose) {
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard_hidden");
    },

    close() {
        this.eventHandlers.oninput = null;
        this.eventHandlers.oninput = null;        
        this.elements.main.classList.add("keyboard_hidden");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    Keyboard.init();
});