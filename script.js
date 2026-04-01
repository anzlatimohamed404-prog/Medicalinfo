// Supprimer un patient
function supprimer(id) {
  if (confirm('Voulez-vous vraiment supprimer ce patient ?')) {
    fetch(`/api/patients/${id}`, { method: 'DELETE' })
      .then(() => location.reload());
  }
}

// Rechercher un patient
function rechercher() {
  const valeur = document.getElementById('recherche').value.toLowerCase();
  const lignes = document.querySelectorAll('#tableau tbody tr');
  lignes.forEach(ligne => {
    const nom = ligne.cells[0].textContent.toLowerCase();
    ligne.style.display = nom.includes(valeur) ? '' : 'none';
  });
}