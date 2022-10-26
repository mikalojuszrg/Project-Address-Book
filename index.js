const form = document.querySelector('form');
const createContact = document.querySelector('#create-btn')
const contactArr = JSON.parse(localStorage.getItem('Contact')) || [];
const favoritesArr = [];

createContact.addEventListener('click', () => {
    form.style.display = "block";
})

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
})

console.log(contactArr);