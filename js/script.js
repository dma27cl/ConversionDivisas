const userInput = document.getElementById('inputUser');
const resultado = document.getElementById('result');


//Llamado API

async function getDatos() {
    const res = await fetch('https://mindicador.cl/api');
    const data = await res.json();
    return data;
}
getDatos();

async function datosSelect() {
    const data = await getDatos();

    var monedas = (Object.keys(data));
    let html = '<select class="mt-3 mb-3" style="background-color: aliceblue;" id="selectUser">';
    for (var codigo_moneda of monedas) {
        var moneda = data[codigo_moneda];
        if (moneda.unidad_medida == 'Pesos') {
            html += `<option value="${moneda.valor}">${moneda.nombre}</option>`;
        }
    }
    html += '</select>'
    var selectUser = document.querySelector('#selectUser');
    selectUser.innerHTML = html;

}

const btnCalculo = document.querySelector('#convert');

btnCalculo.addEventListener('click', function () {
    const valor = document.querySelector('#inputUser').value;
    const valorConversion = document.querySelector('#selectUser').value;
    const selectText = selectUser.options[selectUser.selectedIndex].text;
    const resultado = valor / valorConversion;

    let resultadoCambio = '<div class="resultados" id="result">'
    resultadoCambio +=`<p> <span>${userInput.value}</span> Pesos Chilenos son equivalentes a:</p>
    <b><span>${resultado.toFixed(3)}</span> <span>${selectText}</span></p></b>
    </div>`
    
    const muestraResultado = document.querySelector('#result');
    muestraResultado.innerHTML = resultadoCambio;


})
datosSelect();


