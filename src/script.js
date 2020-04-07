const capsLockOn = false;
const cursor = 0;

const keyLayout = {
  Backquote: { keyCode: "`", shiftOn: "~" },
  Digit1: { keyCode: "1", shiftOn: "!" },
  Digit2: { keyCode: "2", shiftOn: "@" },
  Digit3: { keyCode: "3", shiftOn: "#" },
  Digit4: { keyCode: "4", shiftOn: "$" },
  Digit5: { keyCode: "5", shiftOn: "%" },
  Digit6: { keyCode: "6", shiftOn: "^" },
  Digit7: { keyCode: "7", shiftOn: "&" },
  Digit8: { keyCode: "8", shiftOn: "*" },
  Digit9: { keyCode: "9", shiftOn: "(" },
  Digit0: { keyCode: "0", shiftOn: ")" },
  Minus: { keyCode: "-", shiftOn: "_" },
  Equal: { keyCode: "=", shiftOn: "+" },
  Backspace: { keyCode: "delete" },
  Tab: { keyCode: "tab" },
  KeyQ: { keyCode: "q", shiftOn: "Q" },
  KeyW: { keyCode: "w", shiftOn: "W" },
  KeyE: { keyCode: "e", shiftOn: "E" },
  KeyR: { keyCode: "r", shiftOn: "R" },
  KeyT: { keyCode: "t", shiftOn: "T" },
  KeyY: { keyCode: "y", shiftOn: "Y" },
  KeyU: { keyCode: "u", shiftOn: "U" },
  KeyI: { keyCode: "i", shiftOn: "I" },
  KeyO: { keyCode: "o", shiftOn: "O" },
  KeyP: { keyCode: "p", shiftOn: "P" },
  BracketLeft: { keyCode: "[", shiftOn: "{" },
  BracketRight: { keyCode: "]", shiftOn: "}" },
  backslash: { keyCode: "|", shiftOn: "|" },
  CapsLock: { keyCode: "caps lock" },
  KeyA: { keyCode: "a", shiftOn: "A" },
  KeyS: { keyCode: "s", shiftOn: "S" },
  KeyD: { keyCode: "d", shiftOn: "D" },
  KeyF: { keyCode: "f", shiftOn: "F" },
  KeyG: { keyCode: "g", shiftOn: "G" },
  KeyH: { keyCode: "h", shiftOn: "H" },
  KeyJ: { keyCode: "j", shiftOn: "J" },
  KeyK: { keyCode: "k", shiftOn: "K" },
  KeyL: { keyCode: "l", shiftOn: "L" },
  Semicolon: { keyCode: ";", shiftOn: ":" },
  Quote: { keyCode: "'", shiftOn: " " },
  Enter: { keyCode: "return" },
  ShiftLeft: { keyCode: "shift" },
  KeyZ: { keyCode: "z", shiftOn: "Z" },
  KeyX: { keyCode: "x", shiftOn: "X" },
  KeyC: { keyCode: "c", shiftOn: "C" },
  KeyV: { keyCode: "v", shiftOn: "V" },
  KeyB: { keyCode: "b", shiftOn: "B" },
  KeyN: { keyCode: "n", shiftOn: "N" },
  KeyM: { keyCode: "m", shiftOn: "M" },
  Comma: { keyCode: ",", shiftOn: "<" },
  Period: { keyCode: ".", shiftOn: ">" },
  Slash: { keyCode: "/", shiftOn: "?" },
  ArrowUp: { keyCode: "↑" },
  ShiftRight: { keyCode: "shift" },
  ControlLeft: { keyCode: "control" },
  AltLeft: { keyCode: "option" },
  Command: { keyCode: "command" },
  Space: { keyCode: "_" },
  command: { keyCode: "command" },
  ArrowLeft: { keyCode: "←" },
  ArrowDown: { keyCode: "↓" },
  ArrowRight: { keyCode: "→" },
};

const initKeyboard = () => {
  const keyBoardElements = [];
  Object.keys(keyLayout).forEach((keyValue) => {
    const button = document.createElement("button");
    button.className = "button";
    button.innerHTML = keyLayout[keyValue][capsLockOn ? "shiftOn" : "keyCode"]
      ? keyLayout[keyValue][capsLockOn ? "shiftOn" : "keyCode"]
      : keyLayout[keyValue];
    button.setAttribute("data-id", keyValue);

    keyBoardElements.push(button);
    if (
      keyValue === "Backspace" ||
      keyValue === "backslash" ||
      keyValue === "Enter" ||
      keyValue === "ShiftRight"
    ) {
      const br = document.createElement("br");
      keyBoardElements.push(br);
    }
  });

  return keyBoardElements;
};

const capsLockSet = () => {
  const keyBoard = document.createElement("div");
  keyBoard.className = "keyBoard";
  capsLockOn = !capsLockOn;
  keyBoard.append(...initKeyboard());
  document.querySelector(".keyBoard").replaceWith(keyBoard);
};

const addCharacter = (character) => {
  const oldString = document.querySelector("textarea");
  const textareaValue = oldString.value;
  const position = oldString.selectionStart;
  document.querySelector("textarea").value =
    textareaValue.slice(0, position) +
    character +
    textareaValue.slice(position);
  cursor = position + 1;
};

const onMouseUp = (e) => {
  const keyValue = e.target.dataset.id;
  const textarea = document.querySelector("textarea");
  if (keyValue) {
    textarea.setSelectionRange(cursor, cursor);
    textarea.focus();
  } else {
    cursor = textarea.selectionStart;
  }
};

const onMouseDown = (e) => {
  const keyValue = e.target.dataset.id;
  if (keyValue) {
    switch (keyValue) {
      case "Backspace": {
        const textarea = document.querySelector("textarea");
        const oldString = textarea;
        const positionStart = oldString.selectionStart;
        const positionEnd = oldString.selectionEnd;
        const textareaValue = oldString.value;
        if (positionStart === positionEnd && positionStart > 0) {
          textarea.value =
            textareaValue.slice(0, positionStart - 1) +
            textareaValue.slice(positionStart);
          cursor = positionStart > 0 ? positionStart - 1 : 0;
        } else {
          textarea.value =
            textareaValue.slice(0, positionStart) +
            textareaValue.slice(positionEnd);
          cursor = positionStart;
        }
        break;
      }
      case "CapsLock": {
        capsLockSet();
        break;
      }
      case "Space": {
        addCharacter(" ");
        break;
      }
      case "ArrowUp": {
        cursor = 0;
        break;
      }
      case "ArrowDown": {
        cursor = document.querySelector("textarea").value.length;
        break;
      }
      case "ArrowLeft": {
        const text = document.querySelector("textarea");
        const position = text.selectionStart;
        if (position > 0) {
          cursor = position - 1;
        } else {
          cursor = 0;
        }
        break;
      }
      case "ArrowRight": {
        const text = document.querySelector("textarea");
        const position = text.selectionStart;
        const positionEnd = text.value.length;
        if (position < positionEnd) {
          cursor = position + 1;
        } else {
          cursor = positionEnd;
        }
        break;
      }
      case "AltLeft":
      case "ControlLeft":
      case "ShiftLeft": {
        break;
      }
      case "Enter": {
        addCharacter("\n");
        break;
      }
      case "Tab": {
        addCharacter("\t");
        break;
      }
      default: {
        let shiftOn;
        if (e.shiftKey) {
          shiftOn = "shiftOn";
        } else {
          shiftOn = capsLockOn ? "shiftOn" : "keyCode";
        }
        const newCharacter = keyLayout[keyValue][shiftOn];
        addCharacter(newCharacter);
      }
    }
  }
};

const onKeyUp = (e) => {
  const { code } = e;
  if (code in keyLayout) {
    const keyboardElement = document.querySelector(`[data-id=${code}]`);
    keyboardElement.classList.remove("active");
  }
};

const onKeyDown = (e) => {
  const { code } = e;
  document.querySelector("textarea").focus();
  if (code in keyLayout) {
    const keyboardElement = document.querySelector(`[data-id=${code}]`);
    keyboardElement.classList.add("active");
  }
};

const init = () => {
  const main = document.createElement("main");
  document.body.appendChild(main);
  const textarea = document.createElement("textarea");
  main.appendChild(textarea);
  const keyBoard = document.createElement("div");
  keyBoard.className = "keyBoard";
  main.appendChild(keyBoard);
  keyBoard.append(...initKeyboard());

  document.addEventListener("keyup", (e) => onKeyUp(e));
  document.addEventListener("keydown", (e) => onKeyDown(e));
  main.addEventListener("mousedown", (e) => onMouseDown(e));
  main.addEventListener("mouseup", (e) => onMouseUp(e));
};

window.addEventListener("DOMContentLoaded", () => {
  init();
});
