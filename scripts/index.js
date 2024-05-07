/*

    Создайте простую веб-страницу, где пользователь может вводить текст заметки. Рядом с полем ввода должна быть кнопка "Сохранить", которая сохраняет введенный текст в localStorage. Также добавьте блок, в котором будет отображаться последняя сохраненная заметка. При обновлении страницы заметка должна оставаться на месте.

*/

console.log("Hello world");
const notesPage = document.querySelector(".notes_page");
const saveBtn = document.querySelector(".save_btn");
const notesInput = document.querySelector("input");
const notesList = document.querySelector("#notes_list");

const responseContainer = document.querySelector(".response_container");
const notesArray = JSON.parse(localStorage.getItem("notes")) || [];

function responseStatus(type, obj, msg) {
  //   console.log(obj.textContent);
  //   console.log(msg);
  obj.textContent = msg;
  switch (type) {
    case "success":
      obj.style.color = "green";
      break;
    case "fail":
      obj.style.color = "red";
      break;
    case "unknown":
      obj.style.color = "orange";
      break;
  }
}
const par = document.createElement("p");

const createNote = (event) => {
  event.preventDefault();
  par.id = "responsePar";
  const noteStr = notesInput.value;
  console.log(par.textContent);
  if (noteStr === "") {
    responseStatus("fail", par, "Заметка не может быть пустая");
    return;
  }
  //   console.log(notesArray);
  if (!notesArray.includes(noteStr)) {
    notesArray.push(noteStr);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    addNoteToList(noteStr);
    responseStatus("success", par, `Заметка "${noteStr}" успешно добавлена!`);
  } else {
    //console.log(`Заметка с содержимым "${noteStr}" уже существует!!!`);
    responseStatus(
      "fail",
      par,
      `Заметка с содержимым "${noteStr}" уже существует!`
    );
  }
  responseContainer.append(par);
  notesInput.value = "";
};
saveBtn.addEventListener("click", createNote);
notesInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createNote(event);
  }
});
/**
 * Добавить заметку в список
 * @param {String} noteStr - заметка, которая будет добавлена в лст
 */
function addNoteToList(noteStr) {
  const newNote = document.createElement("li");
  newNote.textContent = noteStr;
  notesList.append(newNote);
}

/**
 * Удалить целевой элемент списка из листа
 * @param {Node} obj - элемент, который будет удален
 */
function removeFromNoteList(obj) {
  notesList.removeChild(obj);
}

/**
 * Данный метод обновляет список заметок при обновлении страницы
 */
function updateNotesList() {
  console.log(notesList.innerHTML);
  //   notesList.innerHTML = "";
  notesArray.forEach((noteStr) => {
    addNoteToList(noteStr);
  });
}

notesList.addEventListener("dblclick", (event) => {
  const clickedText = event.target.textContent;
  const indexToRemove = notesArray.indexOf(clickedText);
  if (indexToRemove !== -1) {
    notesArray.splice(indexToRemove, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    removeFromNoteList(event.target);
  }
});

updateNotesList();

// const arr = [1, 2, 3, 4];
// arr.splice;
