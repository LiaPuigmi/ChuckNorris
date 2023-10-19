"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const frase = document.getElementById('phrase1');
const frase2 = document.getElementById('phrase2');
const frase3 = document.getElementById('phrase3');
const button = document.getElementById('next');
const urlRandom = 'https://api.chucknorris.io/jokes/random';
button.addEventListener('click', () => {
    fetch(urlRandom)
        .then(Response => Response.json())
        .then(JSON => saveResult(JSON.value))
        .catch(function (error) {
        console.log("Hubo un problema con la petición:" + error.message);
    });
    function saveResult(json) {
        frase.innerHTML = json;
    }
});
const urlSelectCategory = 'https://api.chucknorris.io/jokes/categories';
let category = 'animal';
let urlCategory = `https://api.chucknorris.io/jokes/random?category=${category}`;
let dropdown = document.getElementById('default_select');
const getPost = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(urlSelectCategory)
        .then(Response => Response.json())
        .then(JSON => saveResultCategories(JSON))
        .catch(function (error) {
        console.log("Hubo un problema con la petición:" + error.message);
    });
    function saveResultCategories(json) {
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            const newOption = document.createElement("option");
            newOption.value = element;
            newOption.text = element;
            dropdown.appendChild(newOption);
        }
    }
    ;
});
getPost();
dropdown.addEventListener("change", function () {
    category = this.value;
    urlCategory = `https://api.chucknorris.io/jokes/random?category=${category}`;
    fetch(urlCategory)
        .then(Response => Response.json())
        .then(JSON => saveResult(JSON.value));
    function saveResult(json) {
        frase2.innerHTML = json;
    }
});
/* dropdown.addEventListener("change", showRandomJoke);   */
dropdown.addEventListener("click", showRandomJoke);
function showRandomJoke() {
    category = this.value;
    console.log(category);
    urlCategory = `https://api.chucknorris.io/jokes/random?category=${category}`;
    fetch(urlCategory)
        .then(Response => Response.json())
        .then(JSON => saveResult(JSON.value));
}
function saveResult(json) {
    frase2.innerHTML = json;
}
let query = 'fuck';
let urlSearch = `https://api.chucknorris.io/jokes/search?query=${query}`;
const input = document.getElementById('dark_field');
input.addEventListener('keypress', function (evt) {
    const getPost = (urlSearch) => __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(urlSearch);
            let data = yield response.json();
            const valor = data.result.length;
            console.log(valor);
            if (valor > 0) {
                let random = Math.floor(Math.random() * valor);
                frase3.innerHTML = data.result[random].value;
                console.log(data.result[random].value);
                console.log(data.result.value);
            }
            else {
                frase3.innerHTML = "No hay ninguna frase con esa palabra.";
            }
        }
        catch (error) {
            const mensaje = error.message;
            console.log("Hubo un problema con la petición:" + mensaje);
        }
        ;
    });
    if (evt.key === 'Enter') {
        query = this.value;
        urlSearch = `https://api.chucknorris.io/jokes/search?query=${query}`;
        getPost(urlSearch);
    }
    /*   fetch(urlSearch)
          .then(Response=>Response.json())
          .then(JSON=>saveResult(JSON.value));
  
      function saveResult(json:string){
          frase3.innerHTML=json;
      } */
});
