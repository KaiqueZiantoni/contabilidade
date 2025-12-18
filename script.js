document.getElementById('btnCalcular').addEventListener('click', adicionarLinha);

let dadosLancados = JSON.parse(localStorage.getItem('dadosSimples')) || [];

renderizarTabela();


function calcularSimplesNacional(rbt12, faturamentoMes) {
    let aliquotaNominal = 0;
    let deducao = 0;

    if (rbt12 <= 180000) {
        aliquotaNominal = 6.0;
        deducao = 0;
    } else if (rbt12 <= 360000) {
        aliquotaNominal = 11.2;
        deducao = 9360;
    } else if (rbt12 <= 720000) {
        aliquotaNominal = 13.5;
        deducao = 17640;
    } else if (rbt12 <= 1800000) {
        aliquotaNominal = 16.0;
        deducao = 35640;
    } else if (rbt12 <= 3600000) {
        aliquotaNominal = 21.0;
        deducao = 125640;
    } else {
        aliquotaNominal = 33.0;
        deducao = 648000; 
    }

    let aliquotaEfetiva = 0;

    if (rbt12 > 0) {
        aliquotaEfetiva = (((rbt12 * (aliquotaNominal / 100)) - deducao) / rbt12) * 100;
    } else {
        aliquotaEfetiva = 6.0;
    }

    if (aliquotaEfetiva < 0) aliquotaEfetiva = 0;

    let valorImposto = faturamentoMes * (aliquotaEfetiva / 100);

    return {
        aliquotaEfetiva: aliquotaEfetiva,
        valorImposto: valorImposto
    };
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarPorcentagem(valor) {
    return valor.toFixed(2).replace('.', ',') + '%';
}

function renderizarTabela() {
    const tbody = document.querySelector('#tabelaImpostos tbody');
    tbody.innerHTML = '';
    
    let totalFaturamento = 0;
    let totalImposto = 0;

    dadosLancados.sort((a, b) => a.mes.localeCompare(b.mes));

    dadosLancados.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.mesFormatado}</td>
            <td>${formatarMoeda(item.faturamento)}</td>
            <td>${formatarMoeda(item.rbt12)}</td>
            <td>${formatarPorcentagem(item.aliquotaEfetiva)}</td>
            <td>${formatarMoeda(item.imposto)}</td>
            <td style="text-align: center;">
                <button style="background: #e74c3c; padding: 5px 10px; width: auto; font-size: 12px;" onclick="removerLinha(${index})">X</button>
            </td>
        `;
        tbody.appendChild(tr);

        totalFaturamento += item.faturamento;
        totalImposto += item.imposto;
    });

    document.getElementById('totalFaturamento').innerText = formatarMoeda(totalFaturamento);
    document.getElementById('totalImposto').innerText = formatarMoeda(totalImposto);
    
    localStorage.setItem('dadosSimples', JSON.stringify(dadosLancados));
}

function adicionarLinha() {
    const mesInput = document.getElementById('mesCompetencia').value;
    const fatInput = parseFloat(document.getElementById('faturamentoMes').value);
    const rbtInput = parseFloat(document.getElementById('rbt12').value);
    const msgErro = document.getElementById('msgErro');

    if (!mesInput || isNaN(fatInput) || isNaN(rbtInput)) {
        msgErro.style.display = 'block';
        msgErro.innerText = 'Preencha todos os campos corretamente.';
        return;
    }
    msgErro.style.display = 'none';

    const resultado = calcularSimplesNacional(rbtInput, fatInput);

    const [ano, mes] = mesInput.split('-');
    const mesesNomes = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const mesFormatado = `${mesesNomes[parseInt(mes)-1]}/${ano.slice(2)}`;

    const novoLancamento = {
        mes: mesInput, 
        mesFormatado: mesFormatado,
        faturamento: fatInput,
        rbt12: rbtInput,
        aliquotaEfetiva: resultado.aliquotaEfetiva,
        imposto: resultado.valorImposto
    };

    dadosLancados.push(novoLancamento);
    renderizarTabela();
    
    document.getElementById('faturamentoMes').value = '';
    document.getElementById('faturamentoMes').focus();
}

function removerLinha(index) {
    if(confirm('Deseja remover este lançamento?')) {
        dadosLancados.splice(index, 1);
        renderizarTabela();
    }
}

function limparTabela() {
    if(confirm('Tem certeza que deseja apagar todos os dados?')) {
        dadosLancados = [];
        renderizarTabela();
    }
}

function exportarParaCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Mes;Faturamento;RBT12;Aliquota Efetiva;Imposto Devido\r\n";

    dadosLancados.forEach(function(rowArray) {
        let row = `${rowArray.mesFormatado};${rowArray.faturamento.toFixed(2).replace('.', ',')};${rowArray.rbt12.toFixed(2).replace('.', ',')};${rowArray.aliquotaEfetiva.toFixed(2).replace('.', ',')};${rowArray.imposto.toFixed(2).replace('.', ',')}`;
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "conferencia_simples.csv");
    document.body.appendChild(link);
    link.click();
}