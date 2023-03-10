
class JogoDeCarta {
    constructor(numeroDeImagens, imagemDeEntrada = "") {
        this.jogo = document.querySelector("#caixa-de-cartas");
        this.numero = numeroDeImagens;
        this.imagems = imagemDeEntrada;
        this.quantidade = "";
        this.#colocaCartas();
    }

    #colocaCartas() {
        let locais = [];
        let j = this.numero * 2;
        while (j > 0) {
            locais.push(" ");
            j--;
        }
        for (let i = 0; i < (this.numero * 2); i++) {


            let quantidade = 0;
            locais.forEach(element => {
                if (element == " ")
                    quantidade++;
            })
            let escolhido = Math.round(Math.random() * quantidade);
            while (locais[escolhido] !== " ") {
                escolhido++;
                if (escolhido > locais.length)
                    escolhido = 0;
            }
            let numeroDaCarta = Math.floor(i / 2);
            locais[escolhido] = numeroDaCarta;
        }

        this.#criadorCartas(locais);
    }


    #criadorCartas(sequenciaDeCartas) {

        let medidas = this.#medidasCarta()
        this.jogo.innerHTML = "";
        let numero = this.numero * 2;
        let tamanhoFonte = (medidas[0]/2)  + "px";;


        for (let i = 0, j = 1; i < numero; i++, j = 0) {
            let carta = document.createElement("div");
            carta.className = "carta";
            carta.style.width = "" + medidas[0] + "px"
            carta.style.height = "" + medidas[1] + "px";
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
            this.#girarCarta(carta, sequenciaDeCartas[i]);
            carta.appendChild(cartasCostas);
            this.jogo.appendChild(carta);
        }

    }
    #medidasCarta() {
        let numeroDeCartas = this.numero * 2;
        let larguraDaJanela = window.innerWidth - 50;
        let tamanhoDaDiv = this.jogo.clientHeight;
        let altura;

        let i = 0, j = 1, somaTamanho;

        do {
          
            altura = (larguraDaJanela / i) * 1.2;
            somaTamanho = (Math.ceil(numeroDeCartas / i) * altura)
            console.log(larguraDaJanela / i)
            i++;
        } while ((larguraDaJanela / i) > 35 && somaTamanho > tamanhoDaDiv);

        somaTamanho = (numeroDeCartas / i) * (larguraDaJanela / (i)) * 1.5

        return [(larguraDaJanela / (i-1)), altura]

    }


    #girarCarta(carta, numero) {
        carta.addEventListener("click", () => {
            if (carta.className.includes("girar"));
            carta.className += " girar";
            this.quantidade += numero+":";
            this.#voltaGiro(carta, numero);
        });
    }

    #voltaGiro(carta, numero) {

        let cartasViradas = this.jogo.querySelectorAll(".girar")
        let numerosDiv = this.quantidade.split(":")
        numerosDiv.pop();
        if (numerosDiv.length > 1) {
            if (numerosDiv[0] !== numerosDiv[1]) {
                this.quantidade = "";
                setTimeout(() => {
                    cartasViradas.forEach(element => {
                        element.className = "carta";
                    })
                }, 500)

            }
            else {
                cartasViradas[0].className = "carta fica";
                cartasViradas[1].className = "carta fica";
                this.quantidade = "";
            }

        }
    }

    #adaptadorDeTexto(){
       return this.jogo.querySelectorAll(".carta")[0].clientWidth
    }
}



let inputs = document.querySelector("#caixa-de-escolha");
inputs.querySelector("#confirma").addEventListener("click", () => {

    let entrada = parseInt(inputs.querySelector("#entrada").value);

    let jogo = new JogoDeCarta(entrada);

});


