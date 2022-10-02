const btns = document.querySelectorAll(".btn");
const result = document.querySelector(".result");
const calculator = document.querySelector(".calculator");
const buttons = document.querySelectorAll('input[type="radio"]');
const circlecontainer = document.querySelector(".btn-container");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.matches("button")) {
      const btn = e.target;
      const action = btn.dataset.action;
      const displayednum = result.textContent;
      const previoustype = calculator.dataset.previoustype;
      const keycontent = btn.textContent;
      if (!action) {
        if (displayednum === "0" || previoustype === "operator") {
          result.textContent = keycontent;
        } else if (previoustype === "number") {
          result.textContent = displayednum + keycontent;
        } else if (previoustype === "calculate") {
          result.textContent = keycontent;
          calculator.dataset.firstvalue = result.textContent;
          calculator.dataset.modvalue = "";
          calculator.dataset.action = "";
        }
        calculator.dataset.previoustype = "number";
      }
      if (
        action === "addition" ||
        action === "substraction" ||
        action === "divide" ||
        action === "multiply"
      ) {
        const firstvalue = calculator.dataset.firstvalue;
        const operator = calculator.dataset.action;
        const secondvalue = displayednum;
        if (firstvalue && operator && previoustype !== "calculate") {
          const calcvalue = calculate(firstvalue, operator, secondvalue);
          result.textContent = calcvalue;
          calculator.dataset.firstvalue = calcvalue;
        } else {
          calculator.dataset.firstvalue = displayednum;
        }

        calculator.dataset.previoustype = "operator";
        calculator.dataset.firstvalue = result.textContent;
        calculator.dataset.action = action;
      }
      if (action === "reset") {
        result.textContent = "0";
        calculator.dataset.firstvalue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previoustype = "";
        calculator.dataset.action = " ";
        if (calculator.dataset.modvalue) {
          calculator.dataset.modvalue = "";
        }
      }
      if (action === "decimal") {
        if (!displayednum.includes(".")) {
          result.textContent = result.textContent + ".";
        } else if (previoustype === "decimal" || previoustype === "calculate") {
          result.textContent = "0.";
        }
        calculator.dataset.previoustype = "decimal";
      }
      if (action === "calculate") {
        let firstvalue = calculator.dataset.firstvalue;
        const operator = calculator.dataset.action;
        let secondvalue = result.textContent;

        result.textContent = calculate(firstvalue, operator, secondvalue);

        if (previoustype === "calculate") {
          secondvalue = calculator.dataset.modvalue;
        }
        result.textContent = calculate(firstvalue, operator, secondvalue);
        calculator.dataset.firstvalue = result.textContent;
        calculator.dataset.modvalue = secondvalue;
        calculator.dataset.previoustype = "calculate";
      }
      if (action === "del") {
        result.textContent = result.textContent.slice(0, -1);
      }
    }
  });
});
function calculate(n1, operator, n2) {
  let result = "";
  if (operator === "addition") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "substraction") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  }
  return result;
}

// var arr = [...buttons];
// arr.forEach((element, index) => {
//   element.addEventListener("click", () => {
//     element.style.opacity = "1";
//     if (index == 0) {
//       btns.forEach((btn) => {
//         btn.style.backgroundColor = "hsl(30, 25%, 89%)";
//         if (btn.dataset.action === "reset") {
//           btn.classList.add("span");
//         }
//       });
//     } else if (index == 1) {
//       document.getElementsByTagName("body")[0].style.backgroundColor = "teal";
//     } else {
//       document.getElementsByTagName("body")[0].style.backgroundColor =
//         "rgb(92, 204, 125)";
//     }
//     arr
//       .filter(function (item) {
//         return item != element;
//       })
//       .forEach((item) => {
//         item.style.opacity = "0";
//       });
//   });
// });
