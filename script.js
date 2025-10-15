// Sauvegarde des notes

let notes= JSON.parse(localStorage.getItem("notes")) || [];
function createNote(){

	// Création d'une note
	const notesContainer= document.getElementById('note');
	notesContainer.innerHTML="";
	notes.forEach((note, index)=>{
		notesContainer.innerHTML +=`
		<div class="notes">
			<h3>${note.titre}</h3>
			<p>${note.contenu}</p>
			<button class="edit-btn" onclick="editNote(${index})" title="Modifier">
				<i class="fa-solid fa-pen-to-square"></i>
			</button>
			<button class="delete-btn" onclick="deleteNote(${index})" title="Supprimer">
				<i class="fa-solid fa-trash"></i>
			</button>
		</div>`;
	});
}

//Suppression des notes
function deleteNote(index){
	notes.splice(index, 1);
	localStorage.setItem("notes", JSON.stringify(notes));
	createNote();
}

//Modification des notes
function editNote(index){
	const note = notes[index];

	// 1. Récupérer les valeurs de la notes pour les insérer dans les champs
	document.getElementById('titre').value= note.titre;
	document.getElementById('contenu').value= note.contenu;

	// 2. Changer le texte du bouton ajouter
	const bouton=document.getElementById('add-btn');
	bouton.innerHTML='<i class="fa-solid fa-pen-to-square"></i>Mettre à jour';

	// 3. Remplacer l'action du bouton temporairement
	bouton.onclick= function(){
		// Mettre à jour les valeurs
		notes[index].titre= document.getElementById('titre').value.trim();
		notes[index].contenu= document.getElementById('contenu').value.trim();

		// Sauvegarder dans le localStorage
		localStorage.setItem("notes", JSON.stringify(notes));

		// Re-affichage
		createNote();

		// Réintialiser les champs
		document.getElementById('titre').value="";
		document.getElementById('contenu').value="";

		// Restaure le bouton
		bouton.innerHTML='<i class="fa-solid fa-plus"></i>Ajouter';
		bouton.onclick= addNote;
	};
}

//Ajout des notes
function addNote(){
	const titre= document.getElementById('titre').value.trim();
	const contenu=document.getElementById('contenu').value.trim();

	if (titre && contenu) {
		notes.push({titre, contenu});
		localStorage.setItem("notes", JSON.stringify(notes));

		createNote();

		document.getElementById('titre').value="";
		document.getElementById('contenu').value="";	
	} else{
		alert("Veuillez remplir tous les champs !");
	}
}



//Affichage au chargement
createNote();