(() => {
  const config = window.ELEVY;
  const products = [...(window.ELEVY_PRODUCTS || [])];
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  const form = document.querySelector('#contact-form');
  const grid = document.querySelector('#product-grid');
  const search = document.querySelector('#product-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const filterLinks = [...document.querySelectorAll('[data-filter-link]')];
  const status = document.querySelector('#catalog-status');
  const empty = document.querySelector('#catalog-empty');
  const dock = document.querySelector('#selection-dock');
  const selectedList = document.querySelector('#selected-products-list');
  const selectedEmpty = document.querySelector('#selected-products-empty');
  const clearTop = document.querySelector('#clear-selection-top');
  const selected = new Set();
  let activeFilter = 'todos';

  const categoryNames = {vitaminas:'Vitaminas',minerais:'Minerais',aminoacidos:'Aminoácidos',bioativos:'Bioativos e antioxidantes'};
  const messages = {
    atendimento: 'Olá, Priscila! Conheci a Elevy pelo site e gostaria de receber mais informações sobre suplementação injetável.',
    localizacao: 'Olá, Priscila! Conheci a Elevy pelo site e gostaria de confirmar o atendimento na MedGarden.'
  };
  const whatsappUrl = message => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const ampoule = '<svg viewBox="0 0 48 80" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M18 4h12M19 9h10v10l5 9v37a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V28l5-9V9Z"/><path d="M15 36h18M15 58h18"/></svg>';

  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(messages[link.dataset.intent] || messages.atendimento); });
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

  const visibleProducts = () => {
    const term = normalize(search.value.trim());
    return products.filter(product => {
      const inCategory = activeFilter === 'todos' || product.category === activeFilter;
      const searchable = normalize(`${product.name} ${product.alias} ${product.description}`);
      return inCategory && (!term || searchable.includes(term));
    });
  };

  const renderProducts = () => {
    const visible = visibleProducts();
    grid.innerHTML = visible.map(product => {
      const isSelected = selected.has(product.id);
      return `<article class="product-card${isSelected ? ' selected' : ''}" data-product-id="${product.id}">
        <div class="product-art" data-category="${product.category}"><span class="product-mark">${product.mark}</span>${ampoule}</div>
        <div class="product-body"><span class="product-category">${categoryNames[product.category]}</span><h3>${product.name}</h3><p class="product-alias">${product.alias}</p><p class="product-description">${product.description}</p><button class="product-select" type="button" data-select-product="${product.id}" aria-pressed="${isSelected}">${isSelected ? '✓ Selecionado' : '+ Selecionar'}</button></div>
      </article>`;
    }).join('');
    status.textContent = `${visible.length} ${visible.length === 1 ? 'opção encontrada' : 'opções encontradas'}`;
    empty.hidden = visible.length > 0;
  };

  const updateSelection = () => {
    const chosen = products.filter(product => selected.has(product.id));
    const count = chosen.length;
    dock.hidden = count === 0;
    document.body.classList.toggle('has-selection', count > 0);
    document.querySelector('#selection-count').textContent = String(count);
    document.querySelector('#selection-preview').textContent = chosen.map(product => product.name).join(', ');
    selectedEmpty.hidden = count > 0;
    selectedList.innerHTML = chosen.map(product => `<li>${product.name}</li>`).join('');
    clearTop.hidden = count === 0;
    renderProducts();
  };

  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-select-product]');
    if (!button) return;
    const id = button.dataset.selectProduct;
    if (selected.has(id)) selected.delete(id); else selected.add(id);
    updateSelection();
  });

  const setFilter = filter => {
    activeFilter = filter;
    filters.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    filterLinks.forEach(link => link.classList.toggle('active', link.dataset.filterLink === filter));
    renderProducts();
  };
  filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  filterLinks.forEach(link => link.addEventListener('click', () => setFilter(link.dataset.filterLink)));
  search.addEventListener('input', renderProducts);

  const clearSelection = () => { selected.clear(); updateSelection(); };
  document.querySelector('#clear-selection')?.addEventListener('click', clearSelection);
  clearTop?.addEventListener('click', clearSelection);
  document.querySelector('#review-selection')?.addEventListener('click', () => form.scrollIntoView({behavior:'smooth', block:'center'}));
  document.querySelector('#edit-selection')?.addEventListener('click', () => document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'}));

  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const intent = data.get('intent');
    const name = String(data.get('name') || '').trim();
    const notes = String(data.get('notes') || '').trim();
    const chosen = products.filter(product => selected.has(product.id));
    const actions = {
      comprar: 'consultar opções para compra',
      agendar: 'solicitar um agendamento',
      duvida: 'tirar uma dúvida'
    };
    const action = actions[intent] || actions.comprar;
    const lines = [
      `Olá, Priscila!${name ? ` Meu nome é ${name}.` : ''} Conheci a Elevy pelo site.`,
      `Gostaria de ${action}.`,
      chosen.length ? `Produtos selecionados:\n${chosen.map(product => `• ${product.name}`).join('\n')}` : 'Ainda não selecionei um produto específico.',
      notes ? `Dúvida/observação: ${notes}` : '',
      'Pode me informar a disponibilidade, os valores e como funciona?'
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join('\n\n')), '_blank', 'noopener,noreferrer');
  });

  renderProducts();
  updateSelection();
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
