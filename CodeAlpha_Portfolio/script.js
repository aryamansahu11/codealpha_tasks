const exp = document.getElementById("expression");
const res = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let input = "";

buttons.forEach(btn => {
  btn.onclick = () => handle(btn.innerText);
});

function handle(val) {
  if (val === "AC") {
    input = "";
    exp.textContent = "";
    res.textContent = "";
    return;
  }

  if (val === "⌫") {
    input = input.slice(0, -1);
    exp.textContent = input;
    return;
  }

  if (val === "%") {
    handlePercentage();
    return;
  }

  if (val === "=") {
    try {
      const finalResult = eval(input);
      res.textContent = finalResult;
      input = finalResult.toString();
      exp.textContent = input;
    } catch {
      res.textContent = "Error";
    }
    return;
  }

  if (val === "×") val = "*";
  if (val === "÷") val = "/";
  if (val === "−") val = "-";

  input += val;
  exp.textContent = input;
}

function handlePercentage() {
  try {
    // Example: 200+10%  → 200+20
    const parts = input.match(/(.+)([+\-*/])(.+)/);

    if (parts) {
      let base = parseFloat(parts[1]);
      let operator = parts[2];
      let percent = parseFloat(parts[3]);

      let percentValue = (base * percent) / 100;
      input = base + operator + percentValue;
    } else {
      // Example: 50% → 0.5
      input = (parseFloat(input) / 100).toString();
    }

    exp.textContent = input;
  } catch {
    res.textContent = "Error";
  }
}

/* Keyboard Support */
document.addEventListener("keydown", e => {
  if ("0123456789+-*/.%".includes(e.key)) handle(e.key);
  if (e.key === "Enter") handle("=");
  if (e.key === "Backspace") handle("⌫");
  if (e.key === "Escape") handle("AC");
});
