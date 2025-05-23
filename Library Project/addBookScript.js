urlParams = new URLSearchParams(window.location.search);
num_books = parseInt(urlParams.get("books"), 10);

var count = 0;
var emailSuggestions = [];

function printBook() {

   if (count >= num_books) {
       document.getElementById("add_book_form").style.display = "none";
       return;
   }

    name = document.getElementById("bookName").value;
    price = document.getElementById("price").value;
    author = document.getElementById("authorName").value;
    authorEmail = document.getElementById("authorEmail").value;

    namePattern = /^[a-zA-Z\s]+$/;
    pricePattern = /^\d+$/;
    authorPattern = /^[a-zA-Z\s]+$/;
    emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   if (!namePattern.test(name)) {
       alert('Invalid book name. Please enter only varters and spaces.');
       return;
   }
   if (!pricePattern.test(price) || price <= 0) {
       alert('Invalid book price. Please enter only digits greater than 0.');
       return;
   }
   if (!authorPattern.test(author)) {
       alert('Invalid author name. Please enter only varters and spaces.');
       return;
   }
   if (!emailPattern.test(authorEmail)) {
       alert('Invalid author email. Please enter a valid email address.');
       return;
   }

   //  duplicates?
    output = document.getElementById("output");
    rows = output.getElementsByTagName("tr");
   for (var i = 0; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName("td");
       if (cells[0].textContent === name && cells[2].textContent === author) {
           alert('This book with the same author already exists.');
           return;
       }
   }

   // email not exist? add it!
   if (!emailSuggestions.includes(authorEmail)) {
       emailSuggestions.push(authorEmail);
       updateEmailSuggestions();
   }

    newRow = output.insertRow();
   newRow.innerHTML = `
       <td>${name}</td>
       <td>${price}</td>
       <td>${author}</td>
       <td>${authorEmail}</td>
       <td><button onclick="editRow(this)">Edit</button></td>
       <td><button onclick="deleteRow(this)">Devare Book</button></td>
   `;

   count++;

   if (count >= num_books) {
       document.getElementById("add_book_form").style.display = "none";
   }
}

function updateEmailSuggestions() {
    datalist = document.getElementById("emailSuggestions");
   datalist.innerHTML = "";
   emailSuggestions.forEach(email => {
        option = document.createElement("option");
       option.value = email;
       datalist.appendChild(option);
   });
}

function deleteRow(button) {
    row = button.parentNode.parentNode;
   row.parentNode.removeChild(row);
   count--;
   // Show the form again if the limit is not reached
   if (count < num_books) {
       document.getElementById("add_book_form").style.display = "block";
   }
}

function editRow(button) {
    row = button.parentNode.parentNode;
    cells = row.getElementsByTagName('td');

   if (button.textContent === 'Edit') {
       for (var i = 0; i < 4; i++) {
            cellValue = cells[i].textContent;
           cells[i].innerHTML = `<input type="text" value="${cellValue}">`;
       }
       button.textContent = 'Save';
   } else {
       for (var i = 0; i < 4; i++) {
            inputValue = cells[i].getElementsByTagName('input')[0].value;
           cells[i].innerHTML = inputValue;
       }
       button.textContent = 'Edit';
   }
}
