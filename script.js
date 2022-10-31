const inputForm = document.getElementById("input-form");
const inputTitle = inputForm.elements.inputTitle;
const inputAuthor = inputForm.elements.inputAuthor;
const inputPages = inputForm.elements.inputPages;
const inputRead = inputForm.elements.inputRead;
const submitButton = inputForm.elements.inputSubmit;
const booksTable = document.getElementById("booksTable");

let test = [];
test.push(inputForm, inputTitle);
let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

myLibrary.push(new Book("The Hobbit", "JRR Tolkein", "350", "Read"));

populateTable();

function addBookToLibrary(){

    let title = inputTitle.value;
    let author = inputAuthor.value;
    let pages = inputPages.value;
    let read;
    if(inputRead.checked == true){
        read = "Read";
    }
    else{
        read = "Unread";
    }

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    inputTitle.value = null;
    inputAuthor.value = null;
    inputPages.value = null;
    inputRead.checked = false;

    populateTable();

}

submitButton.addEventListener("click", () => {addBookToLibrary();});

function populateTable(){

    clearTable();
    
    for (x=0; x<myLibrary.length; x++){
        let newRow = document.createElement("tr");
        for (y of Object.values(myLibrary[x])){
            let newCell = document.createElement("td")
            cellText = document.createTextNode(y);
            newCell.appendChild(cellText);
            newCell.classList.add("table-data");
            newRow.appendChild(newCell);
        }
        newRow.classList.add("table-row");
        booksTable.appendChild(newRow);
    }


}

function clearTable(){
    const tableRows = document.querySelectorAll(".table-row");
    tableRows.forEach(row => row.remove());

}