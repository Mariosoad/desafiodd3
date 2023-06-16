import allPalabras from "../allWords.json";

interface GrillaControls {
    palabra: string;
    userPalabras: string[];
    userIntentos: number;
    intentos: number;
    userGanados: number;
    modal: boolean;

    ganar: boolean;
    perder: boolean;
    totalLetras: string[];
    letraAcertada: string[];
    letraIncorrecta: string[];

    iniciar(): void;
    enviarPalabraUser(): void;
    handleKeyUp(e: KeyboardEvent): void;
}

const jsonString = JSON.stringify(allPalabras);
// Filtra las palabras que tienen exactamente 5 letras
const personasOptimizadas = JSON.parse(jsonString).filter((persona) => persona.length === 5);
// Filtra las palabras sin acento
const palabrasSinAcento = personasOptimizadas.map((pal) => pal.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
const filteredWords = palabrasSinAcento;

const grillaControls: GrillaControls = {
    palabra: "",
    userPalabras: [],
    userIntentos: 0,
    intentos: 0,
    userGanados: 0,
    modal: false,

    get ganar() {
        return this.userPalabras[this.userIntentos - 1] === this.palabra;
    },

    get perder() {
        return this.userIntentos === 5;
    },

    get totalLetras() {
        return this.userPalabras.slice(0, this.userIntentos).join("").split("");
    },

    get letraAcertada() {
        return this.palabra
            .split("")
            .filter((letter, i) =>
                this.userPalabras
                    .slice(0, this.userIntentos)
                    .map((letra) => letra[i])
                    .includes(letter)
            );
    },

    get letraIncorrecta() {
        return this.palabra
            .split("")
            .filter((letter) => this.userPalabras.includes(letter));
    },

    iniciar() {
        this.palabra = filteredWords[Math.floor(Math.random() * filteredWords.length)];
        this.userPalabras = new Array(5).fill("");
        this.userIntentos = 0;
    },

    enviarPalabraUser() {
        if (this.userIntentos === 4) {
            this.modal = true;
            this.intentos += 1;
        }
        if (filteredWords.includes(this.userPalabras[this.userIntentos])) {
            this.intentos += 1;
            this.userGanados += 1;
            this.modal = true;
        } else {
            this.userIntentos += 1;
        }
    },

    handleKeyUp(e: KeyboardEvent) {
        if (this.ganar || this.perder) {
            return;
        }
        if (this.userPalabras[this.userIntentos].length === 5) {
            return this.enviarPalabraUser();
        }
        if (e.key === "Backspace") {
            this.userPalabras[this.userIntentos] = this.userPalabras[
                this.userIntentos
            ].slice(0, this.userPalabras[this.userIntentos].length - 1);
            return;
        }
        if (
            this.userPalabras[this.userIntentos].length < 5 &&
            e.key.match(/^[A-z]$/)
        ) {
            this.userPalabras[this.userIntentos] +=
                e.key.toLowerCase();
        }
    },
};

export default grillaControls;
