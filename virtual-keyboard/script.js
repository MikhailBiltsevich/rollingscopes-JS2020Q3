import { KeyboardLayout } from './keyboard-layout.js';
import { KeyboardLayoutEN } from './en.js';
import { KeyboardLayoutRU } from './ru.js';

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
        onclose: null,
        ondelete: null
    },

    properties: {
        value: "",
        keyValue: "",
        capsLock: false,
        shift: false,
        language: "en"
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "keyboard_hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.append(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this._refreshKeys();
        
        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, (keyValue) => {
                    if (keyValue === "" && element.selectionStart !== 0 && element.selectionStart === element.selectionEnd) {
                        element.setRangeText(keyValue, element.selectionStart - 1, element.selectionEnd, "end");
                    } else {
                        element.setRangeText(keyValue, element.selectionStart, element.selectionEnd, "end");
                    }
                    element.focus();
                    if (this.properties.shift) {
                        this._toggleShift();
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

        keyCodesLayout.forEach(code => {
            const keyButton = document.createElement("button");
            keyButton.classList.add("keyboard__key");
            keyButton.setAttribute("type", "button");
            keyButton.dataset.code = code;

            const insertRowBreak = ["Backspace", "BracketRight", "Enter", "Hide"].indexOf(code) !== -1;

            switch (code) {
                case "Backspace":
                    keyButton.innerHTML = createIcon("backspace");
                    keyButton.classList.add("keyboard__key_wide");

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "CapsLock":
                    keyButton.innerHTML = createIcon("keyboard_capslock");
                    keyButton.classList.add("keyboard__key_wide", "keyboard__key-activatable");

                    keyButton.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyButton.classList.toggle("keyboard__key_active", this.properties.capsLock);
                    });

                    break;
                case "Enter":
                    keyButton.classList.add("keyboard__key_wide");
                    keyButton.innerHTML = createIcon("keyboard_return");

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = "\n";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "Hide":
                    keyButton.innerHTML = createIcon("check_circle_outline");
                    keyButton.classList.add("keyboard__key_wide");

                    keyButton.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;
                case "Space":
                    keyButton.innerHTML = createIcon("space_bar");
                    keyButton.classList.add("keyboard__key_extra-wide");

                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = " ";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    keyButton.innerHTML = createIcon("expand_less");
                    keyButton.classList.add("keyboard__key_wide");

                    keyButton.addEventListener("click" ,() => {
                        this._toggleShift();
                    });
                    break;
                case "Language":
                    this.elements.languageKey = keyButton;
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
                        this.elements.input.focus();
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
                        this.elements.input.focus();
                    });
                    break;
                default:
                    keyButton.addEventListener("click", () => {
                        this.properties.keyValue = keyButton.textContent;
                        this._triggerEvent("oninput");
                    });
                    break;
            }

            fragment.append(keyButton);

            if(insertRowBreak) {
                fragment.append(document.createElement("br"));
            }
        });

        return fragment;
    },

    _changeLanguage() {
        this.properties.language = this.properties.language === "en" ? "ru" : "en";
        this._refreshKeys();
    },

    _refreshKeys() {
        const keyboardLayout = this.properties.language === "en" ? KeyboardLayoutEN : KeyboardLayoutRU;
        this.elements.languageKey.innerHTML = `<strong>${this.properties.language.toUpperCase()}</strong>`;
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

    open(value, oninput, onclose) {
        this.properties.value = value || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard_hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = null;
        this.eventHandlers.oninput = null;        
        this.elements.main.classList.add("keyboard_hidden");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    Keyboard.init();
});