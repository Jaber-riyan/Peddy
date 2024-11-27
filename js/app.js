// load all pets 
const loadAllPets = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const data = await res.json();
  handleLoader(data.pets);
}


// handle loader function 
const handleLoader = (data) => {
  document.getElementById('pets-container').innerHTML = "";
  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('pets-container').classList.remove('border','border-[#1313131A]');
  document.getElementById('fav-div').classList.remove('border','border-[#1313131A]');

  setTimeout(() => {
    displayData(data);
    sortData(data);
  }, 2000);
}

// add favorite list function 
const addFavList = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await res.json();
  const favPetsContainer = document.getElementById('favorite-pets');
  const finalData = data.petData;
  favPetsContainer.innerHTML += `
        <div class="border border-[#1313131A] p-2 rounded-xl">
            <img
            class="rounded-xl"
            src=${finalData.image}
            alt=${finalData.pet_name} />
        </div>
    `
}


// countdown function 
const startCountdown = () => {
  document.getElementById("adopt_pet").classList.remove('hidden');
  let countdownElement = document.getElementById("countdown");
  let countdown = 2;

  let interval = setInterval(() => {
    countdownElement.innerHTML = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(interval);
      closeModal();
    }
  }, 1000);
}

const closeModal = () => {

  let modal = document.getElementById("adopt_pet");
  modal.close();
}

// adopted pet function 
const adoptHandler = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await res.json();
  const pet = data.petData;
  document.getElementById('adopt-pet-data').innerHTML = `
        <div class="text-center">
            <div class="flex justify-center items-center">
                <img
                    src="https://img.icons8.com/?size=100&id=12208&format=png&color=000000"
                    alt="" />
            </div>
            <h2 class="text-4xl font-black mb-2">Congrates</h2>
            <p class="text-[1rem] font-semibold mb-2">Adoption Process is Start For Your Pet "${pet.pet_name}"</p>
            <h3 class="text-5xl font-black" id="countdown">3</h3>
        </div>
    `

  let modal = document.getElementById("adopt_pet");
  modal.showModal();
  startCountdown();
  let adoptedButton = document.getElementById(`adopt-btn-${id}`);
  adoptedButton.innerText = "Adopted";
  adoptedButton.disabled = true;
  adoptedButton.classList.remove(
    'hover:rounded-full',
    'hover:bg-[#0e79818e]',
    'hover:border-[#0e79815e]',
    'hover:text-white',
    'transition-all'
  );
  adoptedButton.classList.add('bg-slate-300', 'text-slate-700');

}

// details pets function 
const detailsPet = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await res.json();
  const pet = data.petData;
  console.log(pet);
  const modalDataContainer = document.getElementById('modal-data');
  modalDataContainer.innerHTML = `
        <figure>
                <img
                  class="rounded-md w-full"
                  src=${pet.image}
                  alt="" />
              </figure>
              <div class="card-body">
                <h2 class="font-[700] text-xl text-[#131313]">
                  ${pet.pet_name}
                </h2>
                <p class="text-[1rem] flex items-center gap-x-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=5R9l1P82XPDk&format=png&color=000000"
                    alt="" /><span class="">Breed: ${pet.breed ? pet.breed : "Not Available"}</span>
                </p>
                <p class="text-[1rem] flex items-center gap-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=23&format=png&color=000000"
                    alt="" /><span class="">Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available"}</span>
                </p>
                <p class="text-[1rem] flex items-center gap-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000"
                    alt="" /><span class="">Gender: ${pet.gender ? pet.gender : "Not Available"}</span>
                </p>
                <p class="text-[1rem] flex items-center gap-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=7165&format=png&color=000000"
                    alt="" /><span class="">Price: ${pet.price ? pet.price : "Not Available"}</span>
                </p>
                <div class="divider"></div>
                <h2 class="font-semibold text-[1rem]">Details Information:</h2>
                <p>${pet.pet_details}</p>
    `
  details_pet.showModal()
}


// display data function 
const displayData = (data) => {
  document.getElementById('loader').classList.add('hidden');
  const petsContainer = document.getElementById('pets-container');
  petsContainer.classList.add('grid', 'lg:grid-cols-3', 'md:grid-cols-2', 'grid-cols-1', 'md:gap-6', 'lg:w-[70%]','border','border-[#1313131A]');
  document.getElementById('fav-div').classList.add('border','border-[#1313131A]');
  if (data.length === 0) {
    petsContainer.classList.remove('grid', 'lg:grid-cols-3', 'md:grid-cols-2', 'grid-cols-1', 'md:gap-6', 'lg:w-[70%]');
    petsContainer.innerHTML = `
      <div class="bg-[#13131308] text-center p-24 rounded-xl">
        <div class="flex justify-center items-center">
          <img src="./images/error.webp" alt="" />
        </div>
        <h2 class="text-3xl font-extrabold mb-4 mt-7 text-[#131313]">No Information Available</h2>
        <p class="font-normal text-[1rem] w-[60%] mx-auto">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. 
        </p>
      </div>
    `
    return
  }
  petsContainer.innerHTML = "";
  data.forEach(pet => {
    petsContainer.innerHTML += `
            <div
              class="card py-5 md:px-5 card-compact bg-base-100 shadow-xl border border-[#1313131A] rounded-xl">
              <figure>
                <img
                  class="rounded-md lg:w-60 w-full"
                  src=${pet.image}
                  alt="" />
              </figure>
              <div class="card-body">
                <h2 class="font-[700] text-xl text-[#131313]">
                  ${pet.pet_name}
                </h2>
                <p class="text-[1rem] flex items-center gap-x-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=5R9l1P82XPDk&format=png&color=000000"
                    alt="" /><span class="">Breed: ${pet.breed ? pet.breed : "Not Available"}</span>
                </p>
                <p class="text-[1rem] flex items-center gap-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=23&format=png&color=000000"
                    alt="" /><span class="">Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Available"}</span>
                </p>
                <p class="text-[1rem] flex items-center gap-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=1665&format=png&color=000000"
                    alt="" /><span class="">Gender: ${pet.gender ? pet.gender : "Not Available"}</span>
                </p>
                <p class="text-[1rem] flex items-center gap-1">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=100&id=7165&format=png&color=000000"
                    alt="" /><span class="">Price: ${pet.price ? pet.price : "Not Available"}</span>
                </p>
                <div class="divider"></div>
                <div class="card-actions flex justify-between items-center">
                  <button
                  onclick="addFavList('${pet.petId}')"
                    class="border border-[#0E7A8126] py-1 px-3 rounded-md hover:bg-[#0e79818e] hover:border-[#0e79815e] hover:text-white transition-all">
                    <img
                      class="w-5"
                      src="https://img.icons8.com/?size=100&id=24816&format=png&color=000000"
                      alt="" />
                  </button>
                  <button
                  onclick="adoptHandler('${pet.petId}')"
                  id="adopt-btn-${pet.petId}"
                    class="border text-[#0E7A81] font-bold border-[#0E7A8126] py-1 px-3 rounded-md  hover:bg-[#0e79818e] hover:border-[#0e79815e] hover:text-white transition-all">
                    Adopt
                  </button>
                  <button
                  onclick="detailsPet('${pet.petId}')"
                    class="border text-[#0E7A81] border-[#0E7A8126] py-1 px-3 rounded-md hover:bg-[#0e79818e] hover:border-[#0e79815e] hover:text-white transition-all">
                    Details
                  </button>
                </div>
              </div>
            </div>
        `
  });
}

// remove all active class function 
const removeActiveClass = () => {
  const categoryBtnContainer = document.querySelectorAll(".category-btn");
  for (const btn of categoryBtnContainer) {
    btn.classList.remove('border-[#0e79819c]', 'rounded-[9999px]', 'bg-[#0E7A8126]');
  }
}
// category wish showing data function
const categoryWishData = async (name, id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`);
  const data = await res.json();
  const finalData = data.data;
  removeActiveClass();
  const activeButton = document.getElementById(`button-${id}`);
  activeButton.classList.add('border-[#0e79819c]', 'rounded-[9999px]', 'bg-[#0E7A8126]');
  handleLoader(finalData);
}

// load categories function 
const loadCategories = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
  const data = await res.json();
  const categoriesContainer = document.getElementById('categories');
  data.categories.forEach((category) => {
    categoriesContainer.innerHTML += `
        <button
        id="button-${category.id}"
        onclick="categoryWishData('${category.category}','${category.id}')"
          class="hover:bg-[#0E7A8126] hover:border-[#0e79819c] transition-all px-14 py-4 rounded-2xl border text-xl font-bold border-[#0E7A8126] flex justify-center items-center gap-2 category-btn">
          <img
            src=${category.category_icon}
            class="w-12 h-12"
            alt="" /><span>${category.category}</span>
        </button>
        `
  })
}


// sort functionality start
const sortData = (data) => {
  const sortBtn = document.querySelector('#sort-by-price-btn');
  sortBtn.addEventListener('click', () => {
    data.sort((a, b) => {
      return (b.price || 0) - (a.price || 0);
    })
    handleLoader(data);
  })
}


// load all default function 
loadAllPets();
loadCategories();


