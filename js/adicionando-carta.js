
class JogoDeCarta {
    constructor(input) {
        this.jogo = input.querySelector("#caixa-de-cartas")
        this.caixa = input.querySelector("#textinho")
        this.input = input.querySelector("#entrada")
        this.limite = this.#limiteDeCartas();
        this.numero;
        this.quantidade = "";

    }

    colocaCartas() {

        this.numero = parseInt(this.input.value);
        if (this.numero > this.limite){
            return;
        }
        console.log(this.numero);
        this.jogo.innerHTML = "";
        let locais = [];
        let quantidade = this.numero * 2;
        console.log(quantidade);
        let j = quantidade;

        for (let i = 0; i < quantidade; i++) {
            let escolhido;
            do {
                escolhido = Math.round(Math.random() * (quantidade - 1));
            } while (locais[escolhido] !== undefined);
            let numeroDaCarta = Math.floor(i / 2);
            locais[escolhido] = numeroDaCarta;
        }

        this.#criadorCartas(locais);
    }


    #criadorCartas(sequenciaDeCartas) {

        let [altura, largura] = this.#medidasCarta()
        let numero = this.numero * 2;
        let tamanhoFonte = (altura / numero.toString().length) + 'px'

        for (let i = 0, j = 1; i < numero; i++, j = 0) {

            let carta = document.createElement("div");
            carta.className = "carta";
            carta.style.height = "" + altura + "px";
            carta.style.width = "" + largura + "px";

            let quadradocarta = document.createElement("div");
            quadradocarta.className = "carta__quadrado";


            while (j < 5) {
                let enfeite = document.createElement("div");
                enfeite.className = `carta__simbolo${j}`
                quadradocarta.appendChild(enfeite);
                j++;
            }


            let cartasCostas = document.createElement("div");
            cartasCostas.className = "carta__costas"

            let numeroCarta = document.createElement("p");
            numeroCarta.innerText = sequenciaDeCartas[i];
            numeroCarta.className = "texto__fundos"
            numeroCarta.style.fontSize = tamanhoFonte;

            cartasCostas.appendChild(numeroCarta);


            carta.appendChild(quadradocarta);
            carta.appendChild(cartasCostas);
            this.jogo.appendChild(carta);
            this.#girarCarta(carta, sequenciaDeCartas[i]);
        }

    }

    #girarCarta(carta, numero) {
        carta.addEventListener("click", () => {
            carta.className += " girar";
            this.quantidade += numero + ":";
            this.#voltaGiro();
        });
    }

    #voltaGiro() {

        let cartasViradas = this.jogo.querySelectorAll(".girar");

        let numerosDivididas = this.quantidade.split(":")
        numerosDivididas.pop();

        if (numerosDivididas.length > 1) {

            if (numerosDivididas[0] !== numerosDivididas[1]) {

                setTimeout(() => {
                    cartasViradas.forEach(element => {
                        element.className = "carta";
                    })
                }, 500)

            }
            else {
                cartasViradas[0].className = "carta fica";
                cartasViradas[1].className = "carta fica";
            }
            this.quantidade = "";
        }
    }

    #medidasCarta(opcao = "0") {
        let quantidade
        if (opcao == "1")
            quantidade = 1000;
        else {
            quantidade = this.numero * 2;
        }
        let larguraDaJanela = this.jogo.clientWidth - 10;
        let alturaDaJanela = this.jogo.clientHeight;
        let cartasPorLinha = 0, cartasPorColuna;
        let altura, largura;
        let somaTamanho;

        do {
            cartasPorLinha++;
            cartasPorColuna = Math.ceil(quantidade / cartasPorLinha);
            largura = (larguraDaJanela / cartasPorLinha);
            altura = Math.floor((larguraDaJanela / cartasPorLinha) * 1.2);
            somaTamanho = cartasPorColuna * altura;
        } while ((largura) > 50 && somaTamanho > alturaDaJanela);

        if (opcao == "1") {
            let maximo = Math.floor(Math.floor(alturaDaJanela / altura) * cartasPorLinha / 2);
            return [maximo];
        }
        return [altura, largura]
    }

    #limiteDeCartas() {
        let maximo = this.#medidasCarta("1");
        let entrada = parseInt(inputs.querySelector("#entrada").value);
        this.caixa.innerText = "Maximo na sua tela: " + maximo;
        return maximo;
    }
}

let inputs = document.querySelector("#jogo-da-memoria");
let jogo = new JogoDeCarta(inputs);
inputs.querySelector("#confirma").addEventListener("click", () => {
    jogo.colocaCartas();
});


