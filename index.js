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
        
        const div = document.createElement('div');
        div.style.border = '1px solid black';
        div.style.padding = '10px';
        div.style.marginBottom = '10px';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.width = '250px';

        const contactValue = JSON.stringify(contact);
        const extractedValues = contactValue.replace('{', '').replace('}','').replaceAll('"', ' ').split(",") ;
        const nameValue = extractedValues[0];
        const phoneValue = extractedValues[1];
        const emailValue = extractedValues[2];
        const addressValue = extractedValues[3];
        console.log(extractedValues)
        name.textContent = nameValue;
        phone.textContent = phoneValue;
        email.textContent = emailValue;
        address.textContent = addressValue;
      
        div.appendChild(name);
        div.appendChild(phone);
        div.appendChild(email);
        div.appendChild(address);
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
