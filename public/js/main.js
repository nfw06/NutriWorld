console.log('NutriWorld caricato ✅');

// Feedback immediato sui form di ricerca
const searchForm = document.querySelector('.search-bar form');
if (searchForm) {
  searchForm.addEventListener('submit', () => {
    const btn = searchForm.querySelector('button');
    btn.textContent = 'Ricerca...';
    btn.disabled = true;
  });
}

// Conferma eliminazione diario
document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (!confirm('Eliminare questa voce dal diario?')) {
      e.preventDefault();
    }
  });
});
