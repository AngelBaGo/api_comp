const publicKey = 'cabb89eb3a6473f6e9ae270fac2cff8f';
const privateKey = '297caa6d6f10014b1af59099cd3743184e8848f4';
document.getElementById('btnbuscar').addEventListener("click",() =>{
// Generar timestamp y hash
const ts = Date.now().toString();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Generar el hash

// Nombre del personaje que deseas buscar

let nombrePersonaje = document.getElementById('Buscar').value;

// URL de la API
const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(nombrePersonaje)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta');
        return response.json();
    })
    .then(data => {
        const Nombre = document.getElementById('Nombre');
        const Descripcion = document.getElementById('descripcion');
        const imagenPerso = document.getElementById('ImagenPersonaje');

        const Personajes = data.data.results[0]; // Tomar el primer personaje encontrado
        const nombre = Personajes.name;
        const descripcion = Personajes.description;
        const imageUrl = Personajes.thumbnail.path + '.' + Personajes.thumbnail.extension; // URL de la imagen


        Nombre.innerHTML = nombre;
        Descripcion.innerHTML = descripcion;
        imagenPerso.src = imageUrl;
        imagenPerso.style.display = 'block';


        fetchComics(Personajes.id);



    
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

function fetchComics(Peronsaje_ID) {

    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${Peronsaje_ID}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(comicsUrl)
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta de cómics');
            return response.json();
        })
        .then(data => {
            const comicsLista = document.getElementById('comicsList');
            comicsLista.innerHTML = ''; // Limpiar lista anterior

            data.data.results.forEach(comic => {
                const comicCopia = comicTemplate.content.cloneNode(true); // Clonar el template
                
                // Llenar los datos del cómic en el template clonado
                comicCopia.querySelector('.comic_Titulo').textContent = comic.title;
                comicCopia.querySelector('#comic-image').src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
                comicCopia.querySelector('.comic_Descripcion').textContent = comic.description || "Sin descripción disponible";
                
                // Añadir el template clonado a la lista de cómics
                comicsList.appendChild(comicCopia);
            });
        })
        .catch(error => {
            console.error('Error al buscar cómics:', error);
        });
}


document.getElementById('btnbuscarAW').addEventListener("click", async() =>{
    console.log("hola");
    // Generar timestamp y hash
    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Generar el hash
    
    // Nombre del personaje que deseas buscar
    
    let nombrePersonaje = document.getElementById('Buscar').value;
    
    // URL de la API
    const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(nombrePersonaje)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    let respuesta = await fetch(url)
    const data = await respuesta.json();
    const Personajes = data.data.results[0]; // Tomar el primer personaje encontrado

    const Nombre = document.getElementById('Nombre');
    const Descripcion = document.getElementById('descripcion');
    const imagenPerso = document.getElementById('ImagenPersonaje');

    const nombre = Personajes.name;
    const descripcion = Personajes.description;
    const imageUrl = Personajes.thumbnail.path + '.' + Personajes.thumbnail.extension; // URL de la imagen


    Nombre.innerHTML = nombre;
    Descripcion.innerHTML = descripcion;
    imagenPerso.src = imageUrl;
    imagenPerso.style.display = 'block';


    await fetchComics_AS(Personajes.id);

    });
    
    async function fetchComics_AS(Peronsaje_ID) {
        const ts = Date.now().toString();
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
        const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${Peronsaje_ID}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
        const respuesta = await fetch(comicsUrl);                
        const data = await respuesta.json();


        const comicsLista = document.getElementById('comicsList');
                comicsLista.innerHTML = ''; // Limpiar lista anterior
    
                data.data.results.forEach(comic => {
                    const comicCopia = comicTemplate.content.cloneNode(true); // Clonar el template
                    
                    // Llenar los datos del cómic en el template clonado
                    comicCopia.querySelector('.comic_Titulo').textContent = comic.title;
                    comicCopia.querySelector('#comic-image').src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
                    comicCopia.querySelector('.comic_Descripcion').textContent = comic.description || "Sin descripción disponible";
                    
                    // Añadir el template clonado a la lista de cómics
                    comicsList.appendChild(comicCopia);
                });
    }
    
    


    document.getElementById('btnbuscarxml').addEventListener("click",() =>{
        // Generar timestamp y hash
        const ts = Date.now().toString();
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Generar el hash
        
        // Nombre del personaje que deseas buscar
        
        let nombrePersonaje = document.getElementById('Buscar').value;
        
        // URL de la API
        const url = `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(nombrePersonaje)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    const personaje = data.data.results[0];

                const Nombre = document.getElementById('Nombre');
                const Descripcion = document.getElementById('descripcion');
                const imagenPerso = document.getElementById('ImagenPersonaje');
        
                const Personajes = data.data.results[0]; // Tomar el primer personaje encontrado
                const nombre = Personajes.name;
                const descripcion = Personajes.description;
                const imageUrl = Personajes.thumbnail.path + '.' + Personajes.thumbnail.extension; // URL de la imagen
        
        
                Nombre.innerHTML = nombre;
                Descripcion.innerHTML = descripcion;
                imagenPerso.src = imageUrl;
                imagenPerso.style.display = 'block';
        
        
                fetchComicsxml(Personajes.id);

                } else {
                    console.error("Error en la respuesta");
                    alert("No se encontró el personaje o hubo un error en la búsqueda.");
                }
            }
        };
        xhr.send();
    });
        
        function fetchComicsxml(Peronsaje_ID) {
        
            const ts = Date.now().toString();
            const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
            const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${Peronsaje_ID}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

            const xhr = new XMLHttpRequest();
            xhr.open("GET", comicsUrl, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        const comicsLista = document.getElementById('comicsList');
                        comicsLista.innerHTML = ''; // Limpiar lista anterior
            
                        data.data.results.forEach(comic => {
                            const comicCopia = comicTemplate.content.cloneNode(true); // Clonar el template
                            
                            // Llenar los datos del cómic en el template clonado
                            comicCopia.querySelector('.comic_Titulo').textContent = comic.title;
                            comicCopia.querySelector('#comic-image').src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
                            comicCopia.querySelector('.comic_Descripcion').textContent = comic.description || "Sin descripción disponible";
                            
                            // Añadir el template clonado a la lista de cómics
                            comicsList.appendChild(comicCopia);
                        });
                    } else {
                        console.error("Error en la respuesta de cómics");
                    }
                }
            };
            xhr.send();
        }


