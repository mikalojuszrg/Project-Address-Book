const form = document.querySelector('form');
const createContact = document.querySelector('#create-btn')
const clearContacts = document.querySelector('#clear-btn')
const contactDiv = document.querySelector('.contacts');
const favoriteDiv = document.querySelector('.favorites');

let contactArr = JSON.parse(localStorage.getItem('Contact')) || [];
const favoritesArr = JSON.parse(localStorage.getItem('Favorite')) || [];

const asd = localStorage.setItem('Contact', JSON.stringify(contactArr));

createContact.addEventListener('click', () => {
    form.style.display = "block";
})

clearContacts.addEventListener('click', () => {
    localStorage.clear();
    contactDiv.innerHTML = '';
})

const renderContacts = (contacts) => {
    contactDiv.innerHTML = '';
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
        })


        const addToFavBtn = document.createElement('button');
        addToFavBtn.textContent = "Add to favorites";
        addToFavBtn.addEventListener('click', () => {
            favoriteDiv.innerHTML = '';
            favoritesArr.push(contactArr[index]);
            localStorage.setItem('Favorite', JSON.stringify(favoritesArr));
            favoritesArr.forEach((favorite) => {
                let newFavorite = new Contact(name, phone, email, address);
                favoritesArr.push(newFavorite);
                localStorage.setItem('Favorite', JSON.stringify(favoritesArr));
                renderContacts(favoritesArr);
                favoriteDiv.append(div);  
                console.log(favorite);
            })

        })

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
        contactDiv.append(div);  
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

if (contactArr.length === 0) {
    contactArr.length === 0;
    localStorage.clear();
}


renderContacts(contactArr);

