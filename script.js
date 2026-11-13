const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('main-menu');

if(btn && menu){
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if(isOpen) menu.querySelector('a').focus();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && menu.classList.contains('open')){
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
}