// Sauvegarde des notes

let notes= JSON.parse(localStorage.getItem("notes")) || [];


//Affichage des notes
function displayNotes(){
	const notesContainer= document.getElementById('note');
	notesContainer.innerHTML="";
	notes.forEach((note, index)=>{
		notesContainer.innerHTML +=`
		<div class="notes">
			<h3>${note.titre}</h3>
			<p>${note.contenu}</p>
			<button class="edit-btn" onclick="editNote(${index})">M</button>
			<button class="delete-btn" onclick="deleteNote(${index})">X</button>
		</div>`;
	});
}


//Ajout des notes
function addNote(){
	const titre= document.getElementById('titre').value.trim();
	const contenu=document.getElementById('contenu').value.trim();

	if (titre && contenu) {
		notes.push({titre, contenu});
		localStorage.setItem("notes", JSON.stringify(notes));

		document.getElementById('titre').value="";
		document.getElementById('contenu').value="";

		displayNotes();
	} else{
		alert("Veuillez remplir tous les champs !");
	}
}

//Modification des notes
function editNote(index){

	document.getElementById('titre').value= notes.getElementById('titre').innerText;
	document.getElementById('contenu').value= notes.getElementById('contenu').innerText;
	notes.remove();
	document.getElementById('add-btn').textContent= "Mettre à jour";
	displayNotes();


	
}

//Suppression des notes
function deleteNote(index){
	notes.splice(index, 1);
	localStorage.setItem("notes", JSON.stringify(notes));
	displayNotes();
}

//Affichage au chargement
displayNotes();