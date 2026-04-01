// ===============================
// ✅ Supprimer un patient
// ===============================
function supprimer(id) {

  // Affiche une boîte de confirmation à l'utilisateur
  if (confirm('Voulez-vous vraiment supprimer ce patient ?')) {

    // Envoie une requête HTTP DELETE au serveur avec l'id du patient
    fetch(`/api/patients/${id}`, {
      method: 'DELETE' // méthode DELETE pour supprimer
    })

      // Quand le serveur répond
      .then((res) => {

        // Vérifie si la réponse est correcte
        if (!res.ok) {
          throw new Error("Erreur lors de la suppression");
        }

        // Recharge la page pour mettre à jour la liste
        location.reload();
      })

      // Si une erreur se produit
      .catch((err) => {

        // Affiche l'erreur dans la console
        console.error(err);

        // Affiche un message à l'utilisateur
        alert("Impossible de supprimer le patient");
      });
  }
}



// ===============================
// ✅ Rechercher un patient
// ===============================
function rechercher() {

  // Récupère la valeur saisie dans le champ de recherche
  const valeur = document
    .getElementById('recherche') // champ input
    .value // valeur saisie
    .toLowerCase() // met en minuscule pour comparer
    .trim(); // enlève les espaces inutiles

  // Récupère toutes les lignes du tableau (patients)
  const lignes = document.querySelectorAll('#tableau tbody tr');

  // Parcourt chaque ligne du tableau
  lignes.forEach((ligne) => {

    // Récupère le contenu de la première colonne (nom)
    const nom = ligne.cells[0].textContent.toLowerCase();

    // Vérifie si le nom contient la valeur recherchée
    if (nom.includes(valeur)) {

      // Si oui → on affiche la ligne
      ligne.style.display = '';

    } else {

      // Sinon → on cache la ligne
      ligne.style.display = 'none';
    }
  });
}