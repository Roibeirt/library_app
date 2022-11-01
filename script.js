/* Declare elements */
/* Header elements */
const openFormButton = document.getElementById("open-form-button");
/* Form elements */
const inputForm = document.getElementById("input-form");
const inputTitle = inputForm.elements.inputTitle;
const inputAuthor = inputForm.elements.inputAuthor;
const inputPages = inputForm.elements.inputPages;
const inputRead = inputForm.elements.inputRead;
const submitButton = inputForm.elements.inputSubmit;
const forms = document.getElementById("forms");
const formCloseButton = document.getElementById("add-book-close");
/* Body elements */
const contentArea = document.getElementById("content-area");
/* Card Elements */
const card = document.getElementsByClassName("card");

/* Form should be hidden by default, so remove it when loading the page */
removeBookForm();

/* Initialize library array for book objects */
let myLibrary = [];

/* Declare book object */
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/* Add listener to button that opens input form */
openFormButton.addEventListener("click", () => displayBookForm() );

/* Add book to library from form inputs */
function addBookToLibrary(){

    

    /* Get user input */
    let title = inputTitle.value;
    let author = inputAuthor.value;
    let pages = inputPages.value;

    /* We are bypassing submit button by writing our own submit functions, so need to validate input field ourself */
    if(title.trim() == "" || author.trim() == "" || pages.trim() == ""){
        return(console.log("required fields not filled out"));
    }

    let read;
    if(inputRead.checked == true){
        read = "Read";
    }
    else{
        read = "Unread";
    }

    /* Call book constructor and pass user input */
    const newBook = new Book(title, author, pages, read);
    /* Push book to library */
    myLibrary.push(newBook);

    /* Reset user input fields to null */
    inputTitle.value = null;
    inputAuthor.value = null;
    inputPages.value = null;
    inputRead.checked = false;

    /* Call populate cards to add new book object to screen */
    populateCards();

    /* Remove form from page */
    removeBookForm();


}

/* Add listener to form submit button*/
submitButton.addEventListener("click", (event) => {
    /* not using preventDefault() as I still want it to validate fields
    event.preventDefault();*/
    addBookToLibrary()
});

/* Function to display input form */
function displayBookForm(){

    contentArea.appendChild(forms);

}

/* Function to hide input form */
function removeBookForm(){

    forms.remove();

}

/* sets close button on form to close form */
formCloseButton.addEventListener("click", () => removeBookForm());

/* function to create new card */
function createCard(title, author, pages, read, cardIndex){

    /* add card info with same styling to array so we can loop creation of these elements and save some typing*/
    let textInfo = [title, author, pages];

    /* create main card container and assign class */
    let card = document.createElement("div");
    card.classList.add("card");

    /* create delete button */
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-card-button");
    let buttonIcon = document.createElement("span");
    buttonIcon.classList.add("material-icons");
    let iconIdentifier = document.createTextNode("close");
    buttonIcon.appendChild(iconIdentifier);
    deleteButton.appendChild(buttonIcon);
    card.appendChild(deleteButton);
    /* delete button should remove book from object array and delete its own card */
    deleteButton.addEventListener("click", () => {
        myLibrary.splice(cardIndex,1);
        card.remove();
    });

    /* loop through creation of elements for info in textInfo array */
    for(text of textInfo){
        let cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info")
        let cardText = document.createTextNode(text)
        cardInfo.appendChild(cardText);
        card.appendChild(cardInfo);
    }
    /* create read element */
    let cardRead = document.createElement("button");
    cardRead.classList.add("card-read");
    let readText = document.createTextNode(read);
    cardRead.appendChild(readText);
    /* assign function for changing read / unread on button */
    cardRead.addEventListener("click", () => readUnread(cardIndex));
    card.appendChild(cardRead);
    
    /* append card to page */
    contentArea.appendChild(card);
}

/* find all card elements on page and remove them */
function clearCards(){

    let cardList = document.querySelectorAll(".card");
    cardList.forEach(card => card.remove());

}

/* firstly clear cards so we don't create duplicates, then call cardCreate on every object in myLibrary */
function populateCards(){

    clearCards();
    
    for (x=0; x<myLibrary.length; x++){
        
        createCard(myLibrary[x].title, myLibrary[x].author, myLibrary[x].pages, myLibrary[x].read, x);

    }

}

/*check book object referenced by index, if read, change unread and repopulate (or vice versa)*/
function readUnread(index){
    if (myLibrary[index].read =="Read"){
        myLibrary[index].read = "Unread";
    }
    else{
        myLibrary[index].read = "Read";
    }

    populateCards();
}