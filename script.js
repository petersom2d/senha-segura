document.addEventListener('DOMContentLoaded', () => {
    const campoSenha = document.getElementById('campo-senha');
    const btnCopiar = document.getElementById('btn-copiar');
    const tamanhoTexto = document.getElementById('tamanho-texto');
    const btnMenos = document.getElementById('btn-menos');
    const btnMais = document.getElementById('btn-mais');
    const chkMaiusculas = document.getElementById('chk-maiusculas');
    const chkMinusculas = document.getElementById('chk-minusculas');
    const chkNumeros = document.getElementById('chk-numeros');
    const chkSimbolos = document.getElementById('chk-simbolos');
    const barraForca = document.getElementById('barra-forca');
    const textoForca = document.getElementById('texto-forca');

    let tamanhoSenha = 12;

    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    function gerarSenha() {
        let caracteresPermitidos = '';
        
        if (chkMaiusculas.checked) caracteresPermitidos += letrasMaiusculas;
        if (chkMinusculas.checked) caracteresPermitidos += letrasMinusculas;
        if (chkNumeros.checked) caracteresPermitidos += numeros;
        if (chkSimbolos.checked) caracteresPermitidos += simbolos;
        
        if (caracteresPermitidos === '') {
            campoSenha.value = 'Selecione uma opção';
            atualizarForca(0);
            return;
        }
        
        let senhaGerada = '';
        for (let i = 0; i < tamanhoSenha; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
            senhaGerada += caracteresPermitidos[indiceAleatorio];
        }
        
        campoSenha.value = senhaGerada;
        avaliarForca();
    }

    function avaliarForca() {
        let pontos = 0;
        
        if (tamanhoSenha >= 8) pontos++;
        if (tamanhoSenha >= 14) pontos++;
        
        let tiposSelecionados = 0;
        if (chkMaiusculas.checked) tiposSelecionados++;
        if (chkMinusculas.checked) tiposSelecionados++;
        if (chkNumeros.checked) tiposSelecionados++;
        if (chkSimbolos.checked) tiposSelecionados++;
        
        pontos += tiposSelecionados;
        
        if (pontos <= 3) {
            atualizarForca(1);
        } else if (pontos <= 5) {
            atualizarForca(2);
        } else {
            atualizarForca(3);
        }
    }

    function atualizarForca(nivel) {
        barraForca.className = '';
        if (nivel === 0) {
            barraForca.style.width = '0%';
            textoForca.textContent = 'Vazio';
            textoForca.style.color = '#888';
        } else if (nivel === 1) {
            barraForca.classList.add('forca-fraca');
            textoForca.textContent = 'Fraca';
            textoForca.style.color = 'var(--perigo)';
        } else if (nivel === 2) {
            barraForca.classList.add('forca-media');
            textoForca.textContent = 'Média';
            textoForca.style.color = 'var(--alerta)';
        } else if (nivel === 3) {
            barraForca.classList.add('forca-forte');
            textoForca.textContent = 'Forte';
            textoForca.style.color = 'var(--sucesso)';
        }
    }

    btnMenos.addEventListener('click', () => {
        if (tamanhoSenha > 4) {
            tamanhoSenha--;
            tamanhoTexto.textContent = tamanhoSenha;
            gerarSenha();
        }
    });

    btnMais.addEventListener('click', () => {
        if (tamanhoSenha < 32) {
            tamanhoSenha++;
            tamanhoTexto.textContent = tamanhoSenha;
            gerarSenha();
        }
    });

    btnCopiar.addEventListener('click', () => {
        if (campoSenha.value === '' || campoSenha.value === 'Selecione uma opção') return;
        
        navigator.clipboard.writeText(campoSenha.value).then(() => {
            const bgOriginal = btnCopiar.style.background;
            btnCopiar.style.background = 'var(--sucesso)';
            setTimeout(() => {
                btnCopiar.style.background = bgOriginal;
            }, 1000);
        });
    });

    [chkMaiusculas, chkMinusculas, chkNumeros, chkSimbolos].forEach(checkbox => {
        checkbox.addEventListener('change', gerarSenha);
    });

    gerarSenha();
});
