const form = document.querySelector('form');
const createContact = document.querySelector('#create-btn')
const clearContacts = document.querySelector('#clear-btn')
const contactDiv = document.querySelector('.contacts');
let favoriteDiv = document.querySelector('.favorites');

const searchContacts = document.querySelector('#search-btn');

let contactArr = JSON.parse(localStorage.getItem('Contact')) || [];
let favoritesArr = JSON.parse(localStorage.getItem('Favorite')) || [];

const asd = localStorage.setItem('Contact', JSON.stringify(contactArr));

createContact.addEventListener('click', () => {
    form.style.display = "block";
})

clearContacts.addEventListener('click', () => {
    localStorage.clear();
    contactArr = [];
    favoritesArr = [];
    contactDiv.innerHTML = '';
    favoriteDiv.innerHTML = '';
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
            renderContacts(favoritesArr);
            renderContacts(contactArr, contactDiv);
            renderContacts(favoritesArr, favoriteDiv);
            localStorage.setItem('Favorite', JSON.stringify(favoritesArr));
            favoriteDiv.innerHTML = '';

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
            // placeToRender.append(div); 
            favoriteDiv.innerHTML = '';
           
            favoritesArr.push(contactArr[index]);
            renderContacts(favoritesArr, favoriteDiv);
            localStorage.setItem('Favorite', JSON.stringify(favoritesArr));

            // renderContacts(contactArr, contactDiv);
            // div.appendChild(RemoveBtn)
            // addToFavBtn.style.display = 'none';
            // renderContacts(favoritesArr, favoriteDiv);
        })

        const RemoveBtn = document.createElement('button');
        RemoveBtn.addEventListener('click', (event) => {
            const index = +event.target.parentElement.id;
            favoritesArr.splice(index);
            // renderContacts(favoritesArr);
            renderContacts(contactArr, contactDiv);
            renderContacts(favoritesArr, favoriteDiv);
            localStorage.setItem('Favorite', JSON.stringify(favoritesArr));
            // favoriteDiv.innerHTML = '';

            if (favoritesArr.length === 0) {
                favoritesArr = [];
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
        div.appendChild(RemoveBtn)
        placeToRender.append(div); 
        // placeToRender.append(favoriteDiv)

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

    // renderContacts(favoritestArr);
})

// if(renderContacts(favoritesArr)) {
//     renderContacts(contactArr);
// }

// renderContacts(favoritesArr);
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

