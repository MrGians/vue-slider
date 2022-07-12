
// Array di oggetti [Carosello]
const images = [
  {
    url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
    title: 'Svezia',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
  },

  {
    url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
    title: 'Perù',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
  },

  {
    url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
    title: 'Chile',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
  },
  {
    url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
    title: 'Argentina',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
  },
  {
    url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
    title: 'Colombia',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
  },
];

// ------------------------------ FUNZIONI ------------------------------ //

// Creo una funzione per generare il singolo elemento da inserire nella Gallery
const createGalleryElement = (myArray) => {
  // Eseguo il Destructoring dell'array
  const {url, title, description} = myArray

  // Genero l'elemento tramite template-literal
  const galleryElement = `
  <div class="gallery-element">
    <img src="${url}" alt="${title}">
    <div class="image-content">
      <h2>${title}</h2>
      <p>${description}</p>
    </div>
  </div>
  `;
  
  // Restituisco l'elemento creato
  return galleryElement;
}

// Creo una funzione per generare il singolo elemento da inserire nella Thumb-box
const createThumbnailElement = (myArray) => {
  // Eseguo il Destructoring dell'array
  const {url, title} = myArray

  // Genero l'elemento tramite template-literal
  const thumbnailElement = `<img src="${url}" alt="thumbnail-${title}">`;

  // Restituisco l'elemento creato
  return thumbnailElement;
}

// Creo una funzione che mostri l'immagine successiva
const showNextImage = () => {
  // Tolgo la classe active dall'immagine corrente
  galleryElements[galleryIndex].classList.remove("active");
  thumbnailElements[galleryIndex++].classList.remove("active");

  // SE siamo all'ultimo elemento della gallery, allora riparte dal primo
  if (galleryIndex > images.length - 1) galleryIndex = 0;

  // Aggiungo la classe active all'immagine successiva
  galleryElements[galleryIndex].classList.add("active")
  thumbnailElements[galleryIndex].classList.add("active")
}
// Creo una funzione che mostri l'immagine precedente
const showPrevImage = () => {
  // Tolgo la classe active dall'immagine corrente
  galleryElements[galleryIndex].classList.remove("active");
  thumbnailElements[galleryIndex--].classList.remove("active");

  // SE siamo al primo elemento della gallery, allora riparte dall'ultimo
  if (galleryIndex < 0) galleryIndex = images.length - 1;

  // Aggiungo la classe active all'immagine successiva
  galleryElements[galleryIndex].classList.add("active")
  thumbnailElements[galleryIndex].classList.add("active")
}

// ------------------------------ CAROUSEL ------------------------------ //


// Recupero variabili DOM
const gallery = document.getElementById("gallery");
const thumbBox = document.getElementById("thumb-box");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const autoplayBtn = document.getElementById("autoplay-btn");
const reverseAutoplayBtn = document.getElementById("reverse-autoplay-btn");

// Creo gli elementi del Carosello e li aggiungo rispettivamente alla Gallery ed alla Thumb-box
let galleryElement  = "";
let thumbnailElement = "";

images.forEach((image) => {
  galleryElement += createGalleryElement(image)
  thumbnailElement += createThumbnailElement(image)
});

gallery.innerHTML = galleryElement;
thumbBox.innerHTML = thumbnailElement;


// Recupero tutti gli elementi della Gallery e della Thumb-box
const galleryElements = document.querySelectorAll(".gallery-element");
const thumbnailElements = document.querySelectorAll("#thumb-box img");


// Creo una variabile di appoggio per indicare l'immagine "active"
let galleryIndex = 0;
// Aggiungo la classe "active" all'elemento in posizione [galleryIndex]
galleryElements[galleryIndex].classList.add("active");
thumbnailElements[galleryIndex].classList.add("active");


// Aggiungo un evento al click del bottone "Next"
nextBtn.addEventListener("click", showNextImage);

// Aggiungo un evento al click del bottone "Next"
prevBtn.addEventListener("click", showPrevImage);


// Creo una variabile di appoggio per i controlli dell'autoplay
let isReverse = false;

// Aggiunto un evento al click del bottone "autoplay"
autoplayBtn.addEventListener("click", () => {
  
  // Aggiungo/Rimuovo la classe "active" al bottone Autoplay
  autoplayBtn.classList.toggle("active");
  
   
    // Genero l'autoplay con un intervallo di 3 secondi
    const autoplay = setInterval(() => {

      // Se l'autoplay contiene la classe "active" viene avviato
      if (autoplayBtn.classList.contains("active")) {
        
        // Controllo il verso in cui dovrà girare l'autoplay
        if (isReverse) showPrevImage();
        else showNextImage();
      }
      // Altrimenti se NON contiene la classe "active" Termino l'autoplay
      else clearInterval(autoplay);
      

    }, 3000);
  
});

// Aggiungo un evento al click del bottone "Reverse"
reverseAutoplayBtn.addEventListener("click", () => {
  
  // Aggiungo/Rimuovo la classe "active" al bottone "Reverse"
  reverseAutoplayBtn.classList.toggle("active");

  // Verifico che il bottone "reverse" abbia la classe "active" o meno
  if (reverseAutoplayBtn.classList.contains("active")) isReverse = true;
  else isReverse = false;
})