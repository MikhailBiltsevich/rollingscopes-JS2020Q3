const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "keyboard_hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.append(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, (currentValue) => {
                    element.value = currentValue;
                    element.focus();
                });
            });
        })
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keysLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        const createIcon = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`
        }

        keysLayout.forEach(key => {
            const keyButton = document.createElement("button");
            keyButton.classList.add("keyboard__key");
            keyButton.setAttribute("type", "button");

            const insertRowBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            switch (key) {
                case "backspace":
                    keyButton.innerHTML = createIcon("backspace");
                    keyButton.classList.add("keyboard__key_wide");

                    keyButton.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });
                    break;
                case "caps":
                    keyButton.innerHTML = createIcon("keyboard_capslock");
                    keyButton.classList.add("keyboard__key_wide", "keyboard__key-activatable");

                    keyButton.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyButton.classList.toggle("keyboard__key_active", this.properties.capsLock);
                    });

                    break;
                case "enter":
                    keyButton.classList.add("keyboard__key_wide");
                    keyButton.innerHTML = createIcon("keyboard_return");

                    keyButton.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "done":
                    keyButton.innerHTML = createIcon("check_circle_outline");
                    
                    keyButton.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;
                case "space":
                    keyButton.innerHTML = createIcon("space_bar");
                    keyButton.classList.add("keyboard__key_extra-wide");

                    keyButton.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    break;
                default:
                    keyButton.textContent = key.toLowerCase();

                    keyButton.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
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

    _triggerEvent(eventHandler) {
        if (typeof this.eventHandlers[eventHandler] === "function") {
            this.eventHandlers[eventHandler](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
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
})