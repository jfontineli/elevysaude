(() => {
  const config = window.ELEVY;
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  const form = document.querySelector('#contact-form');
  const categorySelect = document.querySelector('#category-select');
  const categoryButtons = [...document.querySelectorAll('[data-category]')];
  const messages = {
    atendimento: 'Olá, Priscila! Conheci a Elevy pelo site e gostaria de receber mais informações sobre suplementação injetável.',
    localizacao: 'Olá, Priscila! Conheci a Elevy pelo site e gostaria de confirmar o local do atendimento.'
  };
  const whatsappUrl = message => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.href = whatsappUrl(messages[link.dataset.intent] || messages.atendimento);
  });
  document.querySelectorAll('[data-instagram]').forEach(link => link.href = config.instagram);
  document.querySelectorAll('[data-map]').forEach(link => link.href = config.maps);

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    nav.classList.toggle('open', !open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    }
  });

  const selectCategory = category => {
    categorySelect.value = category;
    categoryButtons.forEach(button => {
      const selected = button.dataset.category === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  };
  categoryButtons.forEach(button => button.addEventListener('click', () => {
    selectCategory(button.dataset.category);
    form.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'center'});
  }));
  categorySelect?.addEventListener('change', () => selectCategory(categorySelect.value));

  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const intent = data.get('intent');
    const category = data.get('category');
    const objective = data.get('objective');
    const name = String(data.get('name') || '').trim();
    const notes = String(data.get('notes') || '').trim();
    const action = intent === 'agendar' ? 'solicitar um agendamento' : 'conhecer as opções para compra';
    const lines = [
      `Olá, Priscila!${name ? ` Meu nome é ${name}.` : ''} Conheci a Elevy pelo site.`,
      `Gostaria de ${action} na categoria ${category}.`,
      `Meu interesse: ${objective}.`,
      notes ? `Dúvida/observação: ${notes}` : '',
      'Pode me informar as opções disponíveis, os valores e como funciona?'
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
