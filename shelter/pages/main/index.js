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
    let oldPets = container.querySelectorAll(".pet");
    for (pet of oldPets) {
        oldIndexes.push(+pet.dataset.id);
    } 

    let petsCount;
    let clientWidth = document.documentElement.clientWidth;

    if (clientWidth >= 1280) {
        petsCount = 3;
    }
    else if (clientWidth >= 768 && clientWidth < 1280) {
        petsCount = 2;
    }
    else {
        petsCount = 1;
    }

    let newPets = [];
    while(indexes.length !== petsCount) {
        let index = Math.floor(Math.random() * 8);
        if(!indexes.includes(index) && !oldIndexes.includes(index)) {
            indexes.push(index);
            
            newPets.push(createPetCard(pets[index].img, pets[index].name, index));
        }
    }

    container.classList.add("pets_overflow");
    oldPets.forEach(pet => pet.classList.add("pet_hidden"));
    if (container.childElementCount === 0) {
        newPets.forEach(pet => {
            container.append(pet);
        });
        container.classList.remove("pets_overflow");
    }
    else {
        setTimeout(() => {
            container.textContent = "";
            newPets.forEach(pet => {
                container.append(pet);
            });
            container.classList.remove("pets_overflow");
        }, 400);
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
    cardElement.addEventListener("click", function() {

        fillPopup(pets[+this.dataset.id]);
        showPopup();
    });

    return cardElement;
}

function fillPopup(pet) {
    let petImage = document.querySelector(".popup-container__image");
    petImage.setAttribute("src", pet.img);
    
    let petTitle = document.querySelector(".popup-container__title");
    petTitle.textContent = pet.name;

    let petSubtitle = document.querySelector(".popup-container__subtitle");
    petSubtitle.textContent = `${pet.type} - ${pet.breed}`;

    let petDescription = document.querySelector(".popup-container__description");
    petDescription.textContent = pet.description;

    let usedProperties = ["img", "name", "type", "breed", "description"];
    let summary = document.querySelector(".popup-summary");
    summary.textContent = "";
    for(let property in pet) {
        if(usedProperties.includes(property)) {
            continue;
        }

        let summaryItem = document.createElement("li");
        summaryItem.classList.add("popup-summary__item");

        let propertyContent;
        if(Array.isArray(pet[property])) {
            propertyContent = pet[property].join(", ");
        } else {
            propertyContent = pet[property];
        }
        summaryItem.innerHTML = `<strong class="popup-summary__property">${property}: </strong>${propertyContent}`;
        summary.append(summaryItem);
    }
}

function showPopup() {
    document.querySelector(".popup").classList.add("popup_active");
    disableScrollBody();
}

function closePopup() {
    let popup = document.querySelector(".popup");
    popup.classList.remove("popup_active");
    enableScrollBody();
}

function popupMouseOverEvent(event) {
    let popup = document.querySelector(".popup");
    let button = popup.querySelector(".popup-container__close-button");
    
    if(event.target == popup) {
        button.classList.add("popup-container__close-button_active");
    } else {
        button.classList.remove("popup-container__close-button_active");
    }
}

function outsideClick(event) {
    let popup = document.querySelector(".popup");
    let mask = document.querySelector(".mask");
    if(event.target == popup) {
        closePopup();
    } else if (event.target == mask) {
        toggleMenu();
    }
}

function activeLinkClick() {
    window.scrollTo(0, 0);
    if(document.querySelector(".menu_active")) {
        toggleMenu();
    }

}

const mobileHeader = document.querySelector(".mobile-wrapper");

function toggleMenu() {
    document.querySelector(".menu-icon-wrapper").classList.toggle("menu-icon-wrapper_active");
    let isOpen = document.querySelector(".menu").classList.toggle("menu_active");
    document.querySelector(".mask").classList.toggle("mask_active");

    if (isOpen) {
        mobileHeader.style.position = "fixed";
        disableScrollBody();
    } else {
        mobileHeader.style.position = "";
        enableScrollBody();
    }
}

function disableScrollBody() {
    document.body.style.overflow = "hidden";
}

function enableScrollBody() {
    document.body.style.overflow = "";
}

document.querySelector(".menu-icon-wrapper").addEventListener("click", toggleMenu);
document.querySelector(".popup-container__close-button").addEventListener("click", closePopup);
document.querySelector(".menu__link_active").addEventListener("click", activeLinkClick);

window.addEventListener("mouseover", popupMouseOverEvent);
window.addEventListener("click", outsideClick);