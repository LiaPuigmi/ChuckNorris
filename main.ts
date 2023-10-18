

const frase=document.getElementById('phrase1') as HTMLInputElement;
const frase2=document.getElementById('phrase2') as HTMLInputElement;
const frase3=document.getElementById('phrase3') as HTMLInputElement;
const button=document.getElementById('next') as HTMLButtonElement;
const urlRandom='https://api.chucknorris.io/jokes/random';

button.addEventListener('click', ()=>{
    
    fetch(urlRandom)
        .then(Response=>Response.json())
        .then(JSON=>saveResult(JSON.value));

    function saveResult(json:string){
        frase.innerHTML=json;
    }

});

const urlSelectCategory='https://api.chucknorris.io/jokes/categories';

let category='animal';
let urlCategory=`https://api.chucknorris.io/jokes/random?category=${category}`;


let dropdown = document.getElementById('default_select') as HTMLSelectElement;
const getPost = async () => {
    await fetch(urlSelectCategory)
        .then(Response=>Response.json())
        .then(JSON=>saveResultCategories(JSON));

        function saveResultCategories(json:string[]){
            for (let index = 0; index < json.length; index++) {
                const element = json[index];
                const newOption = document.createElement("option");
                newOption.value = element;
                newOption.text = element;
                dropdown.appendChild(newOption);
            }
        };
};

getPost();


dropdown.addEventListener("change", function() {
    category=this.value;
    console.log(category);
    urlCategory=`https://api.chucknorris.io/jokes/random?category=${category}`;
    fetch(urlCategory)
        .then(Response=>Response.json())
        .then(JSON=>saveResult(JSON.value));

    function saveResult(json:string){
        frase2.innerHTML=json;
    }
});

let query='fuck';
let urlSearch=`https://api.chucknorris.io/jokes/search?query=${query}`;
const input=document.getElementById('dark_field') as HTMLInputElement;

input.addEventListener('keypress', function (evt) {
    
    const getPost = async (urlSearch:string) => {
        await fetch(urlSearch)
            .then(Response=>Response.json())
            .then(JSON=>saveResultCategories(JSON.result));
            console.log(urlSearch);
       
            function saveResultCategories(json:string[]){
                for (let index = 0; index < json.length; index++) {
                    let element = json[index];
                   console.log(element);
                }
            };
    };
    if (evt.key === 'Enter') {
        console.log('entro');
        query=this.value;
        urlSearch=`https://api.chucknorris.io/jokes/search?query=${query}`;
        getPost(urlSearch);
      }
    
  /*   fetch(urlSearch)
        .then(Response=>Response.json())
        .then(JSON=>saveResult(JSON.value));

    function saveResult(json:string){
        frase3.innerHTML=json;
    } */

});
 
