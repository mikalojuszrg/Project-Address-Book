const form = document.querySelector('form');
const createContact = document.querySelector('#create-btn')
const contactDiv = document.querySelector('.contacts');
const favoriteDiv = document.querySelector('.favorites');

const contactArr = JSON.parse(localStorage.getItem('Contact')) || [];
const favoritesArr = [];


createContact.addEventListener('click', () => {
    form.style.display = "block";
})

const renderContacts = (contacts) => {
    contactDiv.innerHTML = '';
    contacts.forEach(contact => {
        const name = document.createElement('p');
        const phone = document.createElement('p');
        const email = document.createElement('p');
        const address = document.createElement('p');
        const deleteBtn = document.createElement('button');
        const addToFavBtn = document.createElement('button');
        const selectBtn = document.createElement('button');
        const EditBtn = document.createElement('button');

        deleteBtn.textContent = "Delete";
        addToFavBtn.textContent = "Add to favorites";
        selectBtn.textContent = "Select";
        EditBtn.textContent = "Edit";
        
        const div = document.createElement('div');
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

renderContacts(contactArr);

console.log(contactArr);
