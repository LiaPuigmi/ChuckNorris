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
        .then(JSON => saveResult(JSON.value));
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
        .then(JSON => saveResultCategories(JSON));
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
    console.log(category);
    urlCategory = `https://api.chucknorris.io/jokes/random?category=${category}`;
    fetch(urlCategory)
        .then(Response => Response.json())
        .then(JSON => saveResult(JSON.value));
    function saveResult(json) {
        frase2.innerHTML = json;
    }
});
let query = 'fuck';
let urlSearch = `https://api.chucknorris.io/jokes/search?query=${query}`;
const input = document.getElementById('dark_field');
input.addEventListener('keypress', function (evt) {
    const getPost = (urlSearch) => __awaiter(this, void 0, void 0, function* () {
        yield fetch(urlSearch)
            .then(Response => Response.json())
            .then(JSON => saveResultCategories(JSON.result));
        console.log(urlSearch);
        function saveResultCategories(json) {
            for (let index = 0; index < json.length; index++) {
                let element = json[index];
                console.log(element);
            }
        }
        ;
    });
    if (evt.key === 'Enter') {
        console.log('entro');
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
