import { KeyboardLayoutEN } from './en.js';

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
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
        shift: false
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
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keysLayout = KeyboardLayoutEN;

        const createIcon = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`
        }

        keysLayout.forEach(key => {
            const keyButton = document.createElement("button");
            keyButton.classList.add("keyboard__key");
            keyButton.setAttribute("type", "button");
            keyButton.dataset.code = key.code;

            const insertRowBreak = ["Backspace", "BracketRight", "Enter", "Hide"].indexOf(key.code) !== -1;

            switch (key.code) {
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
                default:
                    keyButton.dataset.code = key.code;

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

    _refreshKeys() {
        for (const keyButton of this.elements.keys) {
            if (keyButton.childElementCount !== 0) {
                continue;
            }

            const keyCode = keyButton.dataset.code;
            const key = KeyboardLayoutEN.find(key => key.code === keyCode);

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