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

        const togglePressedKey = (keyCode, isKeyDown) => {
            const virtualKey = this.elements.keys.find(key => key.dataset.code === keyCode);
            if (!virtualKey) {
                return;
            }
            virtualKey.classList.toggle("keyboard__key_pressed", isKeyDown);
            return virtualKey;
        };

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            this._updatePlaceholder(element);
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

                const virtualKey = togglePressedKey(e.code, true);

                if (!hasSpecificKey && virtualKey) {
                    virtualKey.dispatchEvent(new MouseEvent("click"));
                }
            });

            element.addEventListener("keyup", (e) => {
                e.preventDefault();
                togglePressedKey(e.code, false);
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
                return `<i class="material-icons">music_off</i>`;
            }
            else {
                return `<i class="material-icons">music_note</i>`;
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
                    keyButton.dataset.soundId = code;

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "CapsLock":
                    keyButton.innerHTML = createIcon("keyboard_capslock");
                    keyButton.classList.add("keyboard__key-activatable");
                    keyButton.dataset.soundId = code;

                    keyButton.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyButton.classList.toggle("keyboard__key_active", this.properties.capsLock);
                    });

                    break;
                case "Tab":
                    keyButton.innerHTML = createIcon("keyboard_tab");

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "\t";
                        keyButton.dataset.soundId = this.properties.language;
                        this._triggerEvent("oninput");
                    });
                    break;
                case "Enter":
                    keyButton.innerHTML = createIcon("keyboard_return");
                    keyButton.dataset.soundId = code;

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "\n";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "Hide":
                    keyButton.innerHTML = createIcon("check_circle_outline");
                    keyButton.classList.add("keyboard__key_blue");

                    keyButton.addEventListener("click", () => {
                        this.close();
                        keyButton.dataset.soundId = this.properties.language;
                        this._triggerEvent("onclose");
                    });
                    break;
                case "Space":
                    keyButton.innerHTML = createIcon("space_bar")

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = " ";
                        keyButton.dataset.soundId = this.properties.language;
                        this._triggerEvent("oninput");
                    });
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    keyButton.innerHTML = createIcon("expand_less");
                    keyButton.dataset.soundId = code;

                    keyButton.addEventListener("click" ,() => {
                        this._toggleShift();
                        if (this.properties.shift) {
                            keyButton.classList.toggle("keyboard__key_active-shift", this.properties.shift);
                        } else {
                            this.elements.keys
                                .filter(key => key.dataset.code.startsWith("Shift"))
                                .forEach(shiftKey => shiftKey.classList.toggle("keyboard__key_active-shift", this.properties.shift));
                        }
                    });
                    break;
                case "ControlLeft":
                case "ControlRight":
                    keyButton.innerHTML = `<span>Ctrl</span>`;

                    keyButton.addEventListener("click" ,() => {
                        keyButton.dataset.soundId = this.properties.language;
                    });
                    break;
                case "AltLeft":
                case "AltRight":
                    keyButton.innerHTML = `<span>Alt</span>`;

                    keyButton.addEventListener("click" ,() => {
                        keyButton.dataset.soundId = this.properties.language;
                    });
                    break;
                case "Language":
                    this.elements.languageKey = keyButton;
                    keyButton.dataset.soundId = code;

                    keyButton.addEventListener("click", () => {
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
                        keyButton.dataset.soundId = this.properties.language;
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
                        keyButton.dataset.soundId = this.properties.language;
                    });
                    break;
                case "Sound":
                    keyButton.innerHTML = createSoundIcon();
                    keyButton.addEventListener("click", () => {
                        keyButton.dataset.soundId = this.properties.language;
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
                        keyButton.dataset.soundId = this.properties.language;
                        this._toggleMic();
                        keyButton.innerHTML = createMicIcon();
                    })
                    break;
                default:
                    keyButton.addEventListener("click", (e) => {
                        this.properties.keyValue = keyButton.textContent;
                        keyButton.dataset.soundId = this.properties.language;

                        this._triggerEvent("oninput"); 
                    });
                    break;
            }

            keyButton.addEventListener("click", (e) => {
                if (e.isTrusted && this.properties.sound) {
                    this._playSound(keyButton.dataset.soundId);
                }
            })

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

    _playSound(id) {
        const audio = document.querySelector(`audio[data-id="${id}"]`);
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
            this._updatePlaceholder();
    },

    _updatePlaceholder(input) {
        const placeholderText = this.properties.language === BCP47.ru ? "Нажмите здесь" : "Click here";
        if (input) {
            input.placeholder = placeholderText
        } else {
            this.elements.input.placeholder = placeholderText;
        }
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

const ModalWindow = {
    elements: {
        main: null,
        text: null,
        close: null
    },

    hiddenClass: "modal-window_hidden",
    timerId: undefined,

    init() {
        this.elements.main = document.querySelector(".modal-window");
        this.elements.text = document.querySelector(".modal-window__text");
        this.elements.close = document.querySelector(".modal-window__close-button");
        this.elements.close.addEventListener("click", this.close);
    },

    show(text) {
        this.elements.text.textContent = text;
        this.elements.main.classList.toggle(this.hiddenClass, false);

        this.timerId = setTimeout(this.close, 10000);
    },

    close() {
        clearTimeout(ModalWindow.timerId);
        ModalWindow.elements.main.classList.toggle(ModalWindow.hiddenClass, true);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    ModalWindow.init();
    Keyboard.init();
});