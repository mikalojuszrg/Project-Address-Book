const form = document.querySelector('form');
const createContact = document.querySelector('#create-btn')
const clearContacts = document.querySelector('#clear-btn')
const contactDiv = document.querySelector('.contacts');
let favoriteDiv = document.querySelector('.favorites');

const searchContacts = document.querySelector('#search-btn');
const inputSearch = document.querySelector('#search');

let contactArr = JSON.parse(localStorage.getItem('Contact')) || [];
let favoritesArr = JSON.parse(localStorage.getItem('Favorite')) || [];
let searchedArr = [];

const asd = localStorage.setItem('Contact', JSON.stringify(contactArr));

createContact.addEventListener('click', () => {
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
})

clearContacts.addEventListener('click', () => {
    localStorage.clear();
    contactArr = [];
    favoritesArr = [];
    contactDiv.innerHTML = '';
    favoriteDiv.innerHTML = '';
})

searchContacts.addEventListener('click', () => {
    if (inputSearch.style.display === "none") {
        inputSearch.style.display = "block";
    } else {
        inputSearch.style.display = "none";
    }

    inputSearch.addEventListener('input', (event) => {
        event.preventDefault();
        let b = inputSearch.value;
        if (b) {
            searchedArr = contactArr.filter((item) => {
                console.log(item.name);
                return item.name.includes(b) || item.email.includes(b)|| item.address.includes(b);
            })

            renderContacts(searchedArr, contactDiv);
        } else {
            renderContacts(contactArr, contactDiv);
            renderContacts(favoritesArr, favoriteDiv);
        }

        if (b) {
            searchedArr = favoritesArr.filter((item) => {
                console.log(item.name);
                return item.name.includes(b) || item.email.includes(b)|| item.address.includes(b);
            })

            renderContacts(searchedArr, favoriteDiv);
        } else {
            renderContacts(contactArr, contactDiv);
            renderContacts(favoritesArr, favoriteDiv);
        }

        if (inputSearch.style.display === "none") {
            searchedArr = [];
        }
    })

})

const renderContacts = (contacts, placeToRender = contactDiv) => {
    placeToRender.innerHTML = '';
    contacts.forEach((contact, index) => {
        const name = document.createElement('p');
        const phone = document.createElement('p');
        const email = document.createElement('p');
        const address = document.createElement('p');
        const selectBtn = document.createElement('button');
        const EditBtn = document.createElement('button');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', (event) => {
            const index = +event.target.parentElement.id;
            contactArr.splice(index, 1);
            localStorage.setItem('Contact', JSON.stringify(contactArr));
            renderContacts(contactArr);
            if (contactArr.length === 0) {
                contactArr.length === 0;
                localStorage.clear();
            }

            favoritesArr.splice(index);
            renderContacts(contactArr, contactDiv);
            renderContacts(favoritesArr, favoriteDiv);
            localStorage.setItem('Favorite', JSON.stringify(favoritesArr));

            if (favoritesArr.length === 0 || favoriteDiv.innerHTML === '') {
                favoritesArr = [];
                localStorage.removeItem('Favorite');
            }
        })

        let addToFavBtn = document.createElement('button');
        addToFavBtn.textContent = "Add to favorites";

        addToFavBtn.addEventListener('click', () => {
            RemoveBtn.style.display = "block";
            div.appendChild(RemoveBtn)
            addToFavBtn.style.display = 'none';
            favoriteDiv.innerHTML = '';
           
            favoritesArr.push(contactArr[index]);
            renderContacts(favoritesArr, favoriteDiv);
            localStorage.setItem('Favorite', JSON.stringify(favoritesArr));
        })

        const RemoveBtn = document.createElement('button');
        RemoveBtn.addEventListener('click', () => {
            favoritesArr.splice(index, 1);
            renderContacts(contactArr, contactDiv);
            renderContacts(favoritesArr, favoriteDiv);
            localStorage.setItem('Favorite', JSON.stringify(favoritesArr));    

            if (favoritesArr.length === 0) {
                favoritesArr.length === 0;
                localStorage.removeItem('Favorite');
            }
        })

        RemoveBtn.textContent = 'Remove from favorites';
        RemoveBtn.style.display = "none";
        
        selectBtn.textContent = "Select";
        EditBtn.textContent = "Edit";
        
        const div = document.createElement('div');
        div.setAttribute('id', index);
        div.style.border = '1px solid black';
        div.style.padding = '10px';
        div.style.marginBottom = '10px';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.width = '250px';

        const contactValue = JSON.stringify(contact);
        const extractedValues = contactValue.replace('{', '').replace('}','').replaceAll('"', ' ').split(",") ;
        console.log(contactValue)
        name.textContent = extractedValues[0];
        phone.textContent = extractedValues[1];
        email.textContent = extractedValues[2];
        address.textContent = extractedValues[3];
     
        div.appendChild(name);
        div.appendChild(phone);
        div.appendChild(email);
        div.appendChild(address);
        div.appendChild(deleteBtn);
        div.appendChild(addToFavBtn);
        div.appendChild(selectBtn);
        div.appendChild(EditBtn);
        placeToRender.append(div); 

             if (favoritesArr[index]) {
            RemoveBtn.style.display = "block";
            div.appendChild(RemoveBtn)
            addToFavBtn.style.display = 'none';
        }

    });
}

class Contact {
    constructor(name, phone, email, address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }
}

class Favorite {
    constructor(name, phone, email, address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault;
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const address = document.querySelector('#home-address').value;

    let newContact = new Contact(name, phone, email, address);
    contactArr.push(newContact);
    localStorage.setItem('Contact', JSON.stringify(contactArr));
    renderContacts(contactArr);
})

if(renderContacts(favoritesArr)) {
    renderContacts(contactArr);
}

renderContacts(contactArr, contactDiv);
renderContacts(favoritesArr, favoriteDiv);
 
if (contactArr.length === 0) {
    contactArr.length === 0;
    localStorage.clear();
}

if (favoritesArr.length === 0) {
    favoritesArr.length === 0;
    localStorage.removeItem('Favorite');
}

