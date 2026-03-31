// ── Navegação, Dark Mode, Toast

// ── DARK MODE
const html = document.documentElement;
const savedTheme = localStorage.getItem('btoc-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
document.getElementById('darkToggle').addEventListener('click', () => {
  const cur = html.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('btoc-theme', next);
});

// ── PAGE NAV
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('page-' + tab.dataset.page).classList.add('active');
  });
});