

const frase=document.getElementById('phrase1') as HTMLInputElement;
const frase2=document.getElementById('phrase2') as HTMLInputElement;
const frase3=document.getElementById('phrase3') as HTMLInputElement;
const button=document.getElementById('next') as HTMLButtonElement;
const urlRandom='https://api.chucknorris.io/jokes/random';

button.addEventListener('click', ()=>{
    
    fetch(urlRandom)
        .then(Response=>Response.json())
        .then(JSON=>saveResult(JSON.value))
        .catch(function (error) {
            console.log("Hubo un problema con la petición:" + error.message);
          });

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
        .then(JSON=>saveResultCategories(JSON))
        .catch(function (error) {
            console.log("Hubo un problema con la petición:" + error.message);
          });

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
    urlCategory=`https://api.chucknorris.io/jokes/random?category=${category}`;
    fetch(urlCategory)
        .then(Response=>Response.json())
        .then(JSON=>saveResult(JSON.value));

    function saveResult(json:string){
        frase2.innerHTML=json;
    }
});

/* dropdown.addEventListener("change", showRandomJoke);   */
dropdown.addEventListener("click", showRandomJoke);

function showRandomJoke(this: HTMLSelectElement) { 
    category=this.value;
    console.log(category);
    urlCategory=`https://api.chucknorris.io/jokes/random?category=${category}`;
    fetch(urlCategory)
        .then(Response=>Response.json())
        .then(JSON=>saveResult(JSON.value));
}
function saveResult(json:string){
    frase2.innerHTML=json;
}

let query='fuck';
let urlSearch=`https://api.chucknorris.io/jokes/search?query=${query}`;
const input=document.getElementById('dark_field') as HTMLInputElement;

input.addEventListener('keypress', function (evt) {
    
    const getPost = async (urlSearch:string) => {
        try {
            let response = await fetch(urlSearch);
            let data = await response.json();
            const valor = data.result.length;
            console.log(valor);
            if (valor > 0) {
                let random = Math.floor(Math.random() * valor);
                frase3.innerHTML = data.result[random].value;
                console.log(data.result[random].value);
                console.log(data.result.value);
            } else {
              frase3.innerHTML = "No hay ninguna frase con esa palabra.";
            }
          }catch(error) {
            const mensaje = (error as Error).message;
            console.log("Hubo un problema con la petición:" + mensaje);
          };
    };


    if (evt.key === 'Enter') {
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
 
