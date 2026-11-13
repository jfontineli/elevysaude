(() => {
  const config = window.ELEVY;
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  const form = document.querySelector('#contact-form');
  const categorySelect = document.querySelector('#category-select');
  const categoryButtons = [...document.querySelectorAll('[data-category]')];

  const messages = {
    atendimento: 'Olá! Conheci a Elevy pelo site e gostaria de receber mais informações sobre as suplementações.',
    localizacao: 'Olá! Conheci a Elevy pelo site e gostaria de confirmar a localização do atendimento no Gama.'
  };

  const whatsappUrl = message => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    const intent = link.dataset.intent || 'atendimento';
    link.href = whatsappUrl(messages[intent] || messages.atendimento);
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
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    }
  });

  const setCategory = category => {
    categorySelect.value = category;
    categoryButtons.forEach(button => {
      const selected = button.dataset.category === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  };
  categoryButtons.forEach(button => button.addEventListener('click', () => {
    setCategory(button.dataset.category);
    form.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center'});
  }));
  categorySelect?.addEventListener('change', () => setCategory(categorySelect.value));

  document.querySelectorAll('[data-set-intent]').forEach(link => link.addEventListener('click', () => {
    const input = form.querySelector(`[name="intent"][value="${link.dataset.setIntent}"]`);
    if (input) input.checked = true;
  }));

  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const intent = data.get('intent');
    const category = data.get('category');
    const name = String(data.get('name') || '').trim();
    const notes = String(data.get('notes') || '').trim();
    const action = intent === 'agendar' ? 'solicitar um agendamento' : 'comprar suplementações';
    const lines = [
      `Olá!${name ? ` Meu nome é ${name}.` : ''} Conheci a Elevy pelo site.`,
      `Gostaria de ${action} na categoria ${category}.`,
      notes ? `Observação: ${notes}` : '',
      'Pode me informar as opções, os valores e como funciona?'
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  });

  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
