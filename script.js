let mode = "math";

function setMode(selected) {
    mode = selected;
    renderButtons();
}

function addToInput(val) {
    document.getElementById("calcInput").value += val;
}

function renderButtons() {
    const c = document.getElementById("buttonsContainer");
    c.innerHTML = "";

    if (mode === "math") {
        const buttons = [
            "+","-","*","/","^","%",
            "sin(","cos(","tan(","log(","ln(",
            "π","e","(",")",
            "Square","Rectangle","Circle","Triangle",
            "3D Cube","Sphere",
            "Coordinate"
        ];

        buttons.forEach(b => {
            let btn = document.createElement("button");
            btn.innerText = b;

            btn.onclick = () => {
                if (b === "Coordinate") drawPlane();
                else addToInput(b);
            };

            c.appendChild(btn);
        });
    }

    else if (mode === "physics") {
        const buttons = [
            "v=d/t",
            "a=v/t",
            "F=m*a",
            "E=m*c^2",
            "p=m*v",
            "ρ=m/v",
            "Work=F*d"
        ];

        buttons.forEach(b => {
            let btn = document.createElement("button");
            btn.innerText = b;

            btn.onclick = () => solvePhysics(b);

            c.appendChild(btn);
        });
    }
}

function calculate() {
    let input = document.getElementById("calcInput").value;

    try {
        input = input.replace("π", Math.PI);
        input = input.replace("e", Math.E);
        input = input.replace("^", "**");

        let result = eval(input);
        document.getElementById("result").innerText = "Result: " + result;
    } catch {
        document.getElementById("result").innerText = "Error";
    }
}

function drawPlane() {
    let canvas = document.getElementById("coordCanvas");
    canvas.style.display = "block";
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,400,400);

    ctx.beginPath();
    ctx.moveTo(0,200);
    ctx.lineTo(400,200);
    ctx.moveTo(200,0);
    ctx.lineTo(200,400);
    ctx.stroke();
}

function solvePhysics(formula) {
    let input = prompt("Enter values like m=10,a=2");

    let values = {};
    input.split(",").forEach(p=>{
        let [k,v]=p.split("=");
        values[k.trim()] = parseFloat(v);
    });

    let result;

    if (formula==="F=m*a") result = values.m * values.a;
    if (formula==="v=d/t") result = values.d / values.t;
    if (formula==="a=v/t") result = values.v / values.t;
    if (formula==="ρ=m/v") result = values.m / values.v;

    document.getElementById("result").innerText = "Result: " + result;
}

renderButtons();