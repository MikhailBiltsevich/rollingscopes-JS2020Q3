let pets;
let fullPets = [];
const petsElement = document.querySelector(".pets");
const paginationButtons = document.querySelectorAll(".pagination-nav__button");
const pageNumElement = document.querySelector(".pagination-nav__current-page");
const popup = document.querySelector(".popup");

let xhr = new XMLHttpRequest();
xhr.open("GET", "../../assets/pets.json", true);
xhr.send();

xhr.onreadystatechange = function() {
    if (xhr.readyState !==4) {
        return;
    }

    if(xhr.status !== 200) {
        alert("Error on loading pets data");
    } else {
        pets = JSON.parse(xhr.responseText);
        
        for(let i = 0; i < 6; i++) {
            const tempPets = pets;

            for(let j = pets.length; j > 0; j--) {
                let randomIndex = Math.floor(Math.random() * j);
                tempPets.push(tempPets.splice(randomIndex, 1)[0]);
            }

            fullPets = [...fullPets, ...tempPets];
        }

        fullPets = sortPets(fullPets);

        setPets();
    }
};

function setPets(pageIndex = 0) {
    const petsCount = getPetsCountOnPage();
    const indexStart = petsCount * pageIndex;

    petsElement.textContent = "";
    for (let i = indexStart; i < indexStart + petsCount; i++) {
        petsElement.append(createPetCard(i, fullPets[i]));
    }

    pageNumElement.dataset.pageIndex = pageIndex;
    pageNumElement.textContent = pageIndex + 1;
}

function paginationButtonClick(e) {
    const firstPageButton = document.querySelector("#first-page");
    const prevPageButton = document.querySelector("#prev-page");
    const nextPageButton = document.querySelector("#next-page");
    const lastPageButton = document.querySelector("#last-page");
    
    let pageIndex = +pageNumElement.dataset.pageIndex;
    switch(e.target) {

        case firstPageButton:
            setPets(0);
            break;
        case prevPageButton:
            setPets(pageIndex - 1);
            break;
        case nextPageButton: 
            setPets(pageIndex + 1);
            break;
        case lastPageButton:
            setPets(fullPets.length / getPetsCountOnPage() - 1);
            break;
    }

    refreshStatePaginationButtons();
}

function refreshStatePaginationButtons() {
    const firstPageButton = document.querySelector("#first-page");
    const prevPageButton = document.querySelector("#prev-page");
    const nextPageButton = document.querySelector("#next-page");
    const lastPageButton = document.querySelector("#last-page");

    let pageIndex = +pageNumElement.dataset.pageIndex;

    if(pageIndex === 0) {
        setDisabledPaginationButton(firstPageButton);
        setDisabledPaginationButton(prevPageButton);

        setEnabledPaginationButton(lastPageButton);
        setEnabledPaginationButton(nextPageButton);
    } else if (pageIndex === fullPets.length / getPetsCountOnPage() - 1) {
        setDisabledPaginationButton(lastPageButton);
        setDisabledPaginationButton(nextPageButton);

        setEnabledPaginationButton(firstPageButton);
        setEnabledPaginationButton(prevPageButton);
    } else {
        paginationButtons.forEach(setEnabledPaginationButton);
    }
}

function setDisabledPaginationButton(button) {
    button.disabled = true;
    button.classList.add("pagination-nav__button_disabled");
}

function setEnabledPaginationButton(button) {
    button.disabled = false;
    button.classList.remove("pagination-nav__button_disabled");
}

function sortPets(array) {
    for(let i = 0; i < array.length / 6; i++) {
        const pageIndexStart = i * 6;
        let petsPage = array.slice(pageIndexStart, pageIndexStart + 6);
        
        for(let j = 0; j < petsPage.length; j++) {
            let duplicatedPet = petsPage.find((item, index) => {
                return item.name === petsPage[j].name && j !== index;
            });

            if(duplicatedPet) {
                const index = pageIndexStart + j;
                const whichSet = Math.trunc(index / 8);

                array.splice(whichSet * 8, 0, array.splice(index, 1)[0]);

                i = i - 2;
                break;
            }
        }
    }

    return array;
}

function getPetsCountOnPage() {
    const documentWidth = document.documentElement.clientWidth;

    if(documentWidth >= 1280) {
        return 8;
    } else if (documentWidth >= 768) {
        return 6;
    } else {
        return 3;
    }
}

function createPetCard(id, pet) {
    let cardElement = document.createElement("div");
    cardElement.classList.add("pet");
    cardElement.dataset.id = id;

    cardElement.innerHTML = 
        `<img class="pet__photo" src="${pet.img}" alt="${pet.name} photo">
        <div class="pet__title">${pet.name}</div>
        <button class="pet__button">Learn more</button>`;

    cardElement.addEventListener("click", function() {

        fillPopup(fullPets[+this.dataset.id]);
        showPopup();
    });
    return cardElement;
}

function toggleMenu() {
    document.querySelector(".menu-icon-wrapper").classList.toggle("menu-icon-wrapper_active");
    let isOpen = document.querySelector('.menu').classList.toggle('menu_active');
    document.querySelector('.outside-cover').classList.toggle('outside-cover_active');

    if (isOpen) {
        disableScrollBody();
    } else {
        enableScrollBody();
    }
}

function disableScrollBody() {
    document.body.style.overflow = "hidden";
}

function enableScrollBody() {
    document.body.style.overflow = "";
}

function activeLinkClick() {
    window.scrollTo(0, 0);
    if(document.querySelector(".menu_active")) {
        toggleMenu();
    }
}

function redirectToMainPage() {
    window.location.href = "../main/index.html";
}

function outsideClick(event) {
    let outsideCover = document.querySelector(".outside-cover");
    if (event.target == outsideCover) {
        toggleMenu();
    } else if (event.target == popup) {
        closePopup();
    }
}

function fillPopup(pet) {
    popup.innerHTML = 
        `<div class="popup-container">
            <img src="${pet.img}" alt="${pet.name} photo" class="popup-container__image">
            <div class="popup-container__text">
                <div class="popup-container__header">
                    <h3 class="popup-container__title">${pet.name}</h3>
                    <h4 class="popup-container__subtitle">${pet.type} - ${pet.breed}</h4>
                </div>
                <div class="popup-container__description">${pet.description}</div>
                <ul class="popup-summary">
                    <li class="popup-summary__item"><strong class="popup-summary__property">Age: </strong>${pet.age}</li>
                    <li class="popup-summary__item"><strong class="popup-summary__property">Inoculations: </strong>${pet.inoculations.join(", ")}</li>
                    <li class="popup-summary__item"><strong class="popup-summary__property">Diseases: </strong>${pet.diseases.join(", ")}</li>
                    <li class="popup-summary__item"><strong class="popup-summary__property">Parasites: </strong>${pet.parasites.join(", ")}</li>
                </ul>
            </div>
            <button class="popup-container__close-button">
                <img src="../../assets/icons/vector.svg" alt="Close popup icon">
            </button>
        </div>`

    document.querySelector(".popup-container__close-button").addEventListener("click", closePopup);
}

function showPopup() {
    popup.classList.add("popup_active");
    disableScrollBody();
}

function closePopup() {
    popup.classList.remove("popup_active");
    enableScrollBody();
}

function popupMouseOverEvent(event) {
    let button = popup.querySelector(".popup-container__close-button");
    
    if(event.target == popup) {
        button.classList.add("popup-container__close-button_active");
    } else {
        button.classList.remove("popup-container__close-button_active");
    }
}

document.querySelector(".menu__link_active").addEventListener("click", activeLinkClick);
document.querySelector(".logo").addEventListener("click", redirectToMainPage);
document.querySelector('.menu-icon-wrapper').addEventListener("click", toggleMenu);

paginationButtons.forEach((button) => button.addEventListener("click", paginationButtonClick));

popup.addEventListener("mouseover", popupMouseOverEvent);
window.addEventListener("click", outsideClick);
window.addEventListener("resize", () => {
    setPets();
    refreshStatePaginationButtons();
});