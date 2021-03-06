const URL_CONTROL = "../controleur.php";
const DEMANDER_INFO = "getInfo";

(function() {
  // Je récupère ma collection de bouton avec la class animal
  var buttons = document.querySelectorAll("button");
  // J'applique, avec une boucle sur cette collection (bouton), mon eventlistener
  for (const button of buttons) {
    button.addEventListener("click", afficherSection);
    button.addEventListener("click", recupInfo);
  }
})();

// Au déclenchement de mon event, je lance la fonction cacherSection en passant  l'event en paramètre
function afficherSection(event) {
  // Récupère les éléments à masquer
  const contents = document.getElementsByClassName("container");
  
  // On les parcours
  for (let index = 0; index < contents.length; index++) {
    // On cible un élément
    const elem = contents[index];
    
    // On le masque
    elem.style.display = "none";
  }

  // Récupèrer l'élément à afficher
  const displayElt = event.target.parentNode.getElementsByClassName(
    "container"
  );

  // On l'affiche
  displayElt[0].style.display = "block";
}
//envoie de la requete AJAX
function recupInfo(event) {
  // Je récupère mon espece dans la class du boutton
  const espece = event.target.id;

  var urlBdd = URL_CONTROL + "?action=" + DEMANDER_INFO + "&espece=" + espece;

  // console.log(urlBdd);

  var maRep = new XMLHttpRequest();

  maRep.onreadystatechange = function() {
    if (this.readyState === 4) {
// Catch datas from response
      const response = JSON.parse((this.responseText));
      
      // Display response
      afficherDatas(response, espece);
    }
  };
  maRep.open("GET", urlBdd, true);

  maRep.send();
}

function afficherDatas(datas, espece) {
 const bouton = document.getElementById(espece);

 const result = bouton.parentNode.getElementsByClassName("reponse");

    // Si il n'y a pas de datas
    if (datas.length === 0) {
        // J'affiche une alerte dans ma cible
        const warning = document.createElement('p');
        warning.textContent = 'Il n\'y a aucune données pour cette section';
        result[0].appendChild(warning);
    } else {
        // Je vide la cible
        result[0].innerHTML = "";
        // Si il y a des datas
        for (let index = 0; index < datas.length; index++) {
            // Je récupère chaque élément du tableau de datas
            const element = datas[index];
    
            // Je crée un container qui contiendra mes résultats
            const container = document.createElement('div');
            // Je lui donne un titre
            const nom = document.createElement('h3');
            nom.textContent = element.nom;
            container.appendChild(nom);
            // Je lui donne une date
            const date = document.createElement('span')
            date.textContent = element.date;
            container.appendChild(date);
            // Je lui donne une description
            const description = document.createElement('p');
            description.textContent = element.description;
            container.appendChild(description);
    
            const appercu = document.createElement('p');
            appercu.textContent = 'nombre apperçu: '+element.nbAppercu;
            container.appendChild(appercu);
    
            // J'ajoute mon container à ma cible
            result[0].appendChild(container);
           
        }
    } 
}




