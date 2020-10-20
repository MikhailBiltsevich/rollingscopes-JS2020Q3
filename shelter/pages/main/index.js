let pets;
let xhr = new XMLHttpRequest();
xhr.open("GET", "/assets/pets.json", true);
xhr.send();

xhr.onreadystatechange = function() {
    if (xhr.readyState !==4) {
        return;
    }

    if(xhr.status !== 200) {
        alert("Error on loading pets data");
    } else {
        pets = JSON.parse(xhr.responseText);
        setSlide();

        document.querySelectorAll(".slider__arrow").forEach(arrow => 
            arrow.addEventListener("click", setSlide));
        
        window.addEventListener("resize", setSlide); 
    }
};

function setSlide() {
    let indexes = [];
    let container = document.querySelector(".pets");
    
    let oldIndexes = [];
    for (pet of container.querySelectorAll(".pet")) {
        oldIndexes.push(+pet.dataset.id);
    } 
    
    container.textContent = "";

    let petsCount;
    let clientWidth = document.documentElement.clientWidth;
    document.documentElement.onresize
    if (clientWidth >= 1280) {
        petsCount = 3;
    }
    else if (clientWidth >= 768 && clientWidth < 1280) {
        petsCount = 2;
    }
    else {
        petsCount = 1;
    }

    while(indexes.length !== petsCount) {
        let index = Math.floor(Math.random() * 8);
        if(!indexes.includes(index) && !oldIndexes.includes(index)) {
            indexes.push(index);
            
            container.append(createPetCard(pets[index].img, pets[index].name, index));
        }
    }
}

function createPetCard(imgReference, title, id) {
    let cardElement = document.createElement("div");
    cardElement.classList.add("pet");
    cardElement.dataset.id = id;
    
    let imageElement = document.createElement("img");
    imageElement.classList.add("pet__photo");
    imageElement.src = imgReference;
    imageElement.alt = "Pet photo";

    let titleElement = document.createElement("div");
    titleElement.classList.add("pet__title");
    titleElement.innerText = title;

    let buttonElement = document.createElement("button");
    buttonElement.classList.add("pet__button");
    buttonElement.innerText = "Learn more";

    cardElement.append(imageElement, titleElement, buttonElement);

    return cardElement;
}