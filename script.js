"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelector(".buttons");

  let presentInput = "0";
  let previousInput = "";
  let operation = null;
  let resetScreen = false;

  function updateDisplay() {
    display.textContent = presentInput;
  }

  function numberInput(number) {
    if (presentInput === "0" || resetScreen) {
      presentInput = number;
      resetScreen = false;
    } else {
      presentInput += number;
    }
    updateDisplay();
  }

  function decimalInput() {
    if (resetScreen) {
      presentInput = "0.";
      resetScreen = false;
      updateDisplay();
      return;
    }
    if (!presentInput.includes(".")) {
      presentInput += ".";
      updateDisplay();
    }
  }

  function operatorInput(operator) {
    if (operation !== null) calculateResult();
    previousInput = presentInput;
    operation = operator;
    resetScreen = true;
  }

  function calculateResult() {
    if (operation === null || resetScreen) return;

    const prev = parseFloat(previousInput);
    const present = parseFloat(presentInput);
    let result;

    switch (operation) {
      case "+":
        result = prev + present;
        break;
      case "-":
        result = prev - present;
        break;
      case "×":
        result = prev * present;
        break;
      case "÷":
        result = prev / present;
        break;
      default:
        return;
    }

    presentInput = result.toString();
    operation = null;
    updateDisplay();
  }

  function clearCalculator() {
    presentInput = "0";
    previousInput = "";
    operation = null;
    updateDisplay();
  }

  function deleteCalculator() {
    presentInput = presentInput.slice(0, -1) || "0";
    updateDisplay();
  }

  function toggleSign() {
    presentInput = (parseFloat(presentInput) * -1).toString();
    updateDisplay();
  }

  function convertToPercentage() {
    presentInput = (parseFloat(presentInput) / 100).toString();
    updateDisplay();
  }

  buttons.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const action = e.target.dataset.action;
    const value = e.target.dataset.value;

    switch (action) {
      case "number":
        numberInput(value);
        break;
      case "decimal":
        decimalInput();
        break;
      case "operator":
        operatorInput(value);
        break;
      case "calculate":
        calculateResult();
        break;
      case "clear":
        clearCalculator();
        break;
      case "delete":
        deleteCalculator();
        break;
      case "percentage":
        convertToPercentage();
        break;
    }
  });
});
