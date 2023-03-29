document.addEventListener("DOMContentLoaded", function () {
  const inputElem = document.getElementById("input");
  const exactMatchCheckbox = document.getElementById("exact-match");
  const addParenthesesCheckbox = document.getElementById("add-parentheses");
  const outputElem = document.getElementById("output");
  const clearButton = document.getElementById("clear-button");
  const combineButton = document.getElementById("combine-button");
  const copyButton = document.getElementById("copy-button");

  exactMatchCheckbox.checked = localStorage.getItem("exactMatch") === "true";
  addParenthesesCheckbox.checked = localStorage.getItem("addParentheses") === "true";

  const savedValue = localStorage.getItem("inputValue");
  inputElem.value = savedValue === null ? "Apple\nOrange\nBanana" : savedValue

  clearButton.addEventListener("click", () => {
    inputElem.value = "";
    outputElem.value = "";
    localStorage.setItem("inputValue", inputElem.value);
    inputElem.focus();
  });

  inputElem.addEventListener("input", function () {
    localStorage.setItem("inputValue", this.value);
  });

  exactMatchCheckbox.addEventListener("click", function () {
    localStorage.setItem("exactMatch", this.checked);
  });

  addParenthesesCheckbox.addEventListener("click", function () {
    localStorage.setItem("addParentheses", this.checked);
  });

  combineButton.addEventListener("click", () => {
    const lines = inputElem.value.trim().split("\n");
    const isExactMatch = exactMatchCheckbox.checked;
    const addParentheses = addParenthesesCheckbox.checked;

    let result = lines.map(function (line) {
      if (isExactMatch) {
        line = "\"" + line + "\"";
      }
      return line;
    }).join(" OR ");

    if (addParentheses) {
      result = "(" + result + ")";
    }

    outputElem.value = result;

    outputElem.style.height = "auto";
    outputElem.style.height = (outputElem.scrollHeight) + "px";
  });

  copyButton.addEventListener("click", () => {
    const text = outputElem.value.trim();
    navigator.clipboard.writeText(text);
  });
});