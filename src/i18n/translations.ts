import type { Locale, Product, ProductCategory } from '../types';

export interface Translations {
  nav: {
    experience: string;
    menu: string;
    howToOrder: string;
    about: string;
    location: string;
    myOrder: string;
    openMenu: string;
    closeMenu: string;
    homeAria: string;
    mainNavAria: string;
    mobileNavAria: string;
    languageLabel: string;
  };
  hero: {
    country: string;
    headlineLine1: string;
    headlineLine2Prefix: string;
    headlineLine2Accent: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust1: string;
    trust2: string;
    trust3: string;
    posterAlt: string;
  };
  experience: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Accent: string;
    lede: string;
    cta: string;
    cards: Array<{ num: string; title: string; body: string }>;
  };
  menu: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    subtitle: string;
    ownerPrompt: string;
    ownerButton: string;
    ownerLogout: string;
    filterAria: string;
    allCategory: string;
    categories: Record<ProductCategory, string>;
    priceLabel: string;
    valueLabel: string;
    onRequest: string;
    add: string;
    added: string;
    askTeam: string;
    editProduct: string;
    decreaseQty: string;
    increaseQty: string;
    quantity: string;
    defaultDesc: string;
    emptyTitle: string;
    emptyBody: string;
    viewAll: string;
    createProduct: string;
  };
  steps: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    items: Array<{ num: string; title: string; body: string }>;
  };
  story: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleLine2Accent: string;
    lede: string;
    points: string[];
    wallAlt: string;
    handAlt: string;
  };
  reviews: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleLine2Accent: string;
    body: string;
    cta: string;
    whatsappText: string;
    panelTitleLine1: string;
    panelTitleLine2: string;
    panelBody: string;
    keywords: string[];
  };
  location: {
    eyebrow: string;
    titleLine1: string;
    titleLine2Prefix: string;
    titleLine2Accent: string;
    lede: string;
    regionLabel: string;
    regionValue: string;
    whatsappLabel: string;
    hoursLabel: string;
    hoursValue: string;
    cta: string;
    mapTitle: string;
    finalCtaTitle: string;
    finalCtaBody: string;
    finalCtaButton: string;
    footerHome: string;
    footerMenu: string;
    footerHowToOrder: string;
    footerLocation: string;
    footerOwnerLogin: string;
    footerAdmin: string;
    footerNavAria: string;
    copyrightSuffix: string;
    footerClosing: string;
    developedByPrefix: string;
  };
  ownerAuth: {
    modalTitle: string;
    modalSubtitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    showPassword: string;
    hidePassword: string;
    submit: string;
    cancel: string;
    closeAria: string;
    invalidCredentials: string;
    logoutButton: string;
    changePasswordToggle: string;
    newPasswordLabel: string;
    confirmPasswordLabel: string;
    savePasswordButton: string;
    passwordMinLengthError: string;
    passwordMismatchError: string;
    toastLoggedIn: string;
    toastLoggedOut: string;
    toastPasswordUpdated: string;
  };
  cart: {
    title: string;
    closeAria: string;
    emptyTitle: string;
    emptyBody: string;
    viewMenu: string;
    each: string;
    remove: string;
    totalLabel: string;
    deliveryQuestion: string;
    table: string;
    pickup: string;
    delivery: string;
    tableNumberLabel: string;
    tableNumberPlaceholder: string;
    tablePayTitle: string;
    tablePayBody: string;
    pickupNotePrefix: string;
    pickupRegion: string;
    pickupNoteSuffix: string;
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
    fullName: string;
    phone: string;
    phoneOptional: string;
    phonePlaceholder: string;
    email: string;
    emailOptional: string;
    notes: string;
    notesPlaceholder: string;
    pixTitle: string;
    pixSubtitle: string;
    pixWarningPrefix: string;
    pixWarningBody1: string;
    pixWarningHighlight: string;
    pixWarningBody2: string;
    pixAgreeText: string;
    errEmptyCart: string;
    errTable: string;
    errTableName: string;
    errContact: string;
    errAddress: string;
    errPix: string;
    previewLabel: string;
    copySummary: string;
    copied: string;
    openWhatsApp: string;
    newOrderButton: string;
    ctaEmpty: string;
    ctaUpdate: string;
    ctaGenerate: string;
    ctaGenerateTable: string;
    toastReady: (protocol: string) => string;
    toastTableSaved: (table: string, protocol: string) => string;
    toastCopied: string;
    toastCopyManual: string;
  };
  admin: {
    title: string;
    closeAria: string;
    warningPrefix: string;
    warningBeforeCode: string;
    warningAfterCode: string;
    editTitle: string;
    newTitle: string;
    cancelEdit: string;
    nameLabel: string;
    priceLabel: string;
    pricePlaceholder: string;
    categoryLabel: string;
    badgeLabel: string;
    badgePlaceholder: string;
    descLabel: string;
    imageUrlLabel: string;
    imageFileLabel: string;
    chooseFile: string;
    previewAlt: string;
    saveChanges: string;
    saveProduct: string;
    clear: string;
    registeredTitle: (count: number) => string;
    noProducts: string;
    edit: string;
    deleteAria: (name: string) => string;
    editAria: (name: string) => string;
    restoreButton: string;
    errFileSize: string;
    errNameRequired: string;
    errInvalidPrice: string;
    toastUpdated: (name: string) => string;
    toastCreated: (name: string) => string;
  };
  confirm: {
    deleteTitle: string;
    restoreTitle: string;
    deleteDesc: (name: string) => string;
    restoreDesc: string;
    deleteConfirm: string;
    restoreConfirm: string;
    cancel: string;
    closeAria: string;
  };
  cashier: {
    tabMenu: string;
    tabCashier: string;
    dateLabel: string;
    todayButton: string;
    allDatesButton: string;
    exportCsv: string;
    copyClosing: string;
    kpiTotal: string;
    kpiPaid: string;
    kpiPending: string;
    kpiOrders: string;
    avgTicket: string;
    byModeTitle: string;
    topItemsTitle: string;
    noStatsYet: string;
    filterAll: string;
    filterPending: string;
    filterPaid: string;
    modeTable: string;
    modePickup: string;
    modeDelivery: string;
    tablePrefix: string;
    statusPaid: string;
    statusPendingTable: string;
    statusPendingPix: string;
    markPaid: string;
    reopenOrder: string;
    deleteOrderAria: (protocol: string) => string;
    emptyOrders: string;
    toastMarkedPaid: (protocol: string) => string;
    toastReopened: (protocol: string) => string;
    toastOrderDeleted: (protocol: string) => string;
    toastClosingCopied: string;
    toastCsvExported: string;
    closingReportTitle: string;
    confirmDeleteOrderTitle: string;
    confirmDeleteOrderDesc: (protocol: string) => string;
    confirmDeleteOrderAction: string;
  };
  floating: {
    whatsappAria: string;
    openCartAria: string;
    backToTopAria: string;
    backToTopLabel: string;
    itemSingular: string;
    itemPlural: string;
    viewOrder: string;
  };
  toasts: {
    addedToCart: (qty: number, name: string) => string;
    removedProduct: (name: string) => string;
    restoredCatalog: string;
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  pt: {
    nav: {
      experience: 'A experiência',
      menu: 'Cardápio',
      howToOrder: 'Como pedir',
      about: 'Sobre',
      location: 'Localização',
      myOrder: 'Meu pedido',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      homeAria: 'Menk’s Burger, início',
      mainNavAria: 'Navegação principal',
      mobileNavAria: 'Menu mobile',
      languageLabel: 'Idioma',
    },
    hero: {
      country: 'BRASIL',
      headlineLine1: 'O sabor da rua.',
      headlineLine2Prefix: 'O calor de ',
      headlineLine2Accent: 'casa.',
      description:
        'Burgers, pinsas e street food com personalidade. Escolha seus favoritos, monte seu pedido e fale com a gente pelo WhatsApp.',
      ctaPrimary: 'Montar meu pedido',
      ctaSecondary: 'Ver cardápio',
      trust1: 'Feito para compartilhar',
      trust2: 'Pedido rápido',
      trust3: 'Atendimento pelo WhatsApp',
      posterAlt:
        'Fame Davvero? — Hambúrguer artesanal Menk’s Burger servido na tábua de madeira',
    },
    experience: {
      eyebrow: 'Do nosso jeito',
      titleLine1: 'Uma pausa com',
      titleLine2Accent: 'mais sabor.',
      lede: 'Da primeira mordida ao último papo da noite, Menk’s é feito para curtir sem pressa — com atitude de rua e clima de casa.',
      cta: 'Conheça a Menk’s',
      cards: [
        {
          num: '01',
          title: 'Caráter de rua',
          body: 'Burger, pinsa e street food no mesmo lugar, para escolher no seu ritmo.',
        },
        {
          num: '02',
          title: 'Clima de casa',
          body: 'Uma mesa boa pede comida gostosa e gente querida por perto.',
        },
        {
          num: '03',
          title: 'Seu pedido, do seu jeito',
          body: 'Monte a seleção, deixe suas observações e confira tudo antes de enviar.',
        },
        {
          num: '04',
          title: 'Conversa direta',
          body: 'O pedido segue para o WhatsApp da casa para confirmar os detalhes.',
        },
      ],
    },
    menu: {
      eyebrow: 'Escolha sem pressa',
      titlePrefix: 'O cardápio ',
      titleAccent: 'Menk’s',
      subtitle:
        'Monte seu pedido abaixo e finalize pelo WhatsApp. Consulte sabores do dia e disponibilidade direto com a equipe.',
      ownerPrompt:
        'Modo proprietário ativo: edite itens, preços e fotos do cardápio diretamente neste navegador.',
      ownerButton: 'Editar cardápio',
      ownerLogout: 'Sair',
      filterAria: 'Filtrar cardápio por categoria',
      allCategory: 'Todos',
      categories: {
        Burgers: 'Burgers',
        Pinsas: 'Pinsas',
        'Street Food': 'Street Food',
        Acompanhamentos: 'Acompanhamentos',
        Bebidas: 'Bebidas',
      },
      priceLabel: 'Preço',
      valueLabel: 'Valor',
      onRequest: 'Sob consulta',
      add: 'Adicionar',
      added: 'Adicionado',
      askTeam: 'Consulte',
      editProduct: 'Editar produto',
      decreaseQty: 'Diminuir quantidade de',
      increaseQty: 'Aumentar quantidade de',
      quantity: 'Quantidade',
      defaultDesc:
        'Consulte composição e disponibilidade com a equipe pelo WhatsApp.',
      emptyTitle: 'Nenhum item nesta categoria',
      emptyBody:
        'Escolha outra categoria acima ou cadastre novos itens pela área do proprietário.',
      viewAll: 'Ver todo o cardápio',
      createProduct: 'Cadastrar produto',
    },
    steps: {
      eyebrow: 'Simples assim',
      titleLine1: 'Do seu jeito,',
      titleLine2: 'em três passos.',
      lede: 'Faça sua seleção e envie as informações pelo canal direto da casa.',
      items: [
        {
          num: '01',
          title: 'Escolha seus favoritos',
          body: 'Explore o cardápio e adicione ao pedido o que deu vontade.',
        },
        {
          num: '02',
          title: 'Retirada ou entrega',
          body: 'Informe seus dados, selecione a modalidade e confira o resumo.',
        },
        {
          num: '03',
          title: 'Confirme no WhatsApp',
          body: 'Envie o pedido e combine os detalhes diretamente com a equipe.',
        },
      ],
    },
    story: {
      eyebrow: 'Il gusto di strada',
      titleLine1: 'Menk’s: rua',
      titleLine2Prefix: 'com ',
      titleLine2Accent: 'calor de casa.',
      lede: 'Uma marca com alma urbana e um convite simples: reunir boa companhia em volta de burger, pinsa e street food. O resto da experiência é construído a cada visita.',
      points: [
        'Burger • Pinsa • Street Food',
        'Escolha livre pelo cardápio',
        'Atendimento direto pelo WhatsApp',
      ],
      wallAlt:
        'Ambiente aconchegante com mesas e identidade visual Menk’s Burger',
      handAlt: 'Hambúrguer servido com vegetais frescos',
    },
    reviews: {
      eyebrow: 'Sua voz importa',
      titleLine1: 'A próxima',
      titleLine2Prefix: 'história é ',
      titleLine2Accent: 'sua.',
      body: 'Ainda não temos avaliações verificadas para publicar aqui. Depois de experimentar, conte para a equipe o que achou — sua opinião ajuda a Menk’s a melhorar sempre.',
      cta: 'Enviar opinião pelo WhatsApp',
      whatsappText: 'Oi, Menk’s! Quero deixar uma avaliação.',
      panelTitleLine1: 'Uma mesa boa',
      panelTitleLine2: 'fica melhor junto.',
      panelBody:
        'Chame quem você gosta, escolha o que deu vontade e transforme o intervalo em momento. A experiência é feita de cada encontro.',
      keywords: ['Burger', 'Pinsa', 'Street food', 'Boa companhia'],
    },
    location: {
      eyebrow: 'Onde encontrar',
      titleLine1: 'A gente se fala',
      titleLine2Prefix: 'na ',
      titleLine2Accent: 'Itália.',
      lede: 'Para endereço, horário de atendimento e disponibilidade de delivery, fale com a equipe pelo WhatsApp.',
      regionLabel: 'Região',
      regionValue: 'Itália',
      whatsappLabel: 'WhatsApp',
      hoursLabel: 'Horários',
      hoursValue: 'Consulte a equipe',
      cta: 'Chamar no WhatsApp',
      mapTitle: 'Mapa da Itália',
      finalCtaTitle: 'Bateu a vontade?',
      finalCtaBody: 'Escolha no cardápio e mande seu pedido para a Menk’s.',
      finalCtaButton: 'Explorar cardápio',
      footerHome: 'Início',
      footerMenu: 'Cardápio',
      footerHowToOrder: 'Como pedir',
      footerLocation: 'Localização',
      footerOwnerLogin: 'Área do proprietário',
      footerAdmin: 'Admin cardápio',
      footerNavAria: 'Links do rodapé',
      copyrightSuffix: 'Menk’s Burger. Conteúdo sujeito a confirmação pela equipe.',
      footerClosing: 'Feito para quem gosta de comer bem, sem cerimônia.',
      developedByPrefix: 'Desenvolvido por',
    },
    ownerAuth: {
      modalTitle: 'Acesso do proprietário',
      modalSubtitle:
        'Informe seu usuário e senha de administrador para liberar a gestão do cardápio e manutenção dos itens.',
      usernameLabel: 'Usuário',
      usernamePlaceholder: 'Digite o usuário',
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Digite a senha',
      showPassword: 'Mostrar senha',
      hidePassword: 'Ocultar senha',
      submit: 'Entrar',
      cancel: 'Cancelar',
      closeAria: 'Fechar acesso do proprietário',
      invalidCredentials:
        'Usuário ou senha inválidos. Apenas o proprietário tem acesso à manutenção do cardápio.',
      logoutButton: 'Sair do modo proprietário',
      changePasswordToggle: 'Alterar senha',
      newPasswordLabel: 'Nova senha (mín. 4 caracteres)',
      confirmPasswordLabel: 'Confirmar nova senha',
      savePasswordButton: 'Atualizar senha',
      passwordMinLengthError: 'A nova senha deve ter pelo menos 4 caracteres.',
      passwordMismatchError: 'As senhas digitadas não coincidem.',
      toastLoggedIn: 'Modo proprietário ativado.',
      toastLoggedOut: 'Sessão do proprietário encerrada.',
      toastPasswordUpdated: 'Senha do proprietário atualizada neste navegador.',
    },
    cart: {
      title: 'Meu pedido',
      closeAria: 'Fechar pedido',
      emptyTitle: 'Seu pedido está esperando.',
      emptyBody: 'Adicione seus favoritos pelo cardápio para começar.',
      viewMenu: 'Ver cardápio',
      each: 'cada',
      remove: 'Remover',
      totalLabel: 'Total do pedido',
      deliveryQuestion: 'Como vamos combinar?',
      table: 'Mesa',
      pickup: 'Buscar no local',
      delivery: 'Delivery',
      tableNumberLabel: 'Número / identificação da mesa *',
      tableNumberPlaceholder: 'Ex.: 01, 05, Varanda 2',
      tablePayTitle: 'Pagamento na mesa (ao final do atendimento)',
      tablePayBody:
        'O pedido fica registrado no controle da casa e na sua mesa. O pagamento será realizado somente ao final do serviço, direto na mesa.',
      pickupNotePrefix: 'Retirada na ',
      pickupRegion: 'Itália',
      pickupNoteSuffix: '. Confirme endereço e horário com a equipe pelo WhatsApp.',
      street: 'Rua / Avenida *',
      number: 'Número *',
      neighborhood: 'Bairro *',
      complement: 'Complemento / referência',
      fullName: 'Nome completo *',
      phone: 'WhatsApp com DDD *',
      phoneOptional: 'WhatsApp (opcional na mesa)',
      phonePlaceholder: '(71) 99999-9999',
      email: 'E-mail *',
      emailOptional: 'E-mail (opcional na mesa)',
      notes: 'Observações do pedido',
      notesPlaceholder: 'Ex.: ponto da carne, tirar cebola, sem molho...',
      pixTitle: 'Pagamento via PIX',
      pixSubtitle: 'A chave e o pagamento serão combinados com a equipe no WhatsApp.',
      pixWarningPrefix: 'IMPORTANTE:',
      pixWarningBody1:
        'O pedido só será liberado para retirada no estabelecimento ou saída para entrega (delivery) mediante o envio e confirmação do ',
      pixWarningHighlight: 'COMPROVANTE DE PAGAMENTO via PIX',
      pixWarningBody2: ' no nosso WhatsApp.',
      pixAgreeText:
        'Estou ciente de que o pagamento será via PIX e que o pedido só será retirado/entregue mediante apresentação do comprovante de pagamento.',
      errEmptyCart: 'Adicione itens com preço cadastrado antes de continuar.',
      errTable: 'Informe o número ou identificação da mesa.',
      errTableName: 'Informe o seu nome para identificar o pedido na mesa.',
      errContact:
        'Confira seu nome completo, WhatsApp com DDD (10 ou 11 dígitos) e e-mail válido.',
      errAddress: 'Para delivery, preencha rua/avenida, número e bairro.',
      errPix:
        'Marque a caixa de ciência sobre o pagamento via PIX para liberar o pedido.',
      previewLabel: 'Prévia do pedido',
      copySummary: 'Copiar resumo',
      copied: 'Copiado',
      openWhatsApp: 'Abrir WhatsApp com este pedido',
      newOrderButton: 'Iniciar novo pedido',
      ctaEmpty: 'Adicionar itens ao pedido',
      ctaUpdate: 'Atualizar resumo do pedido',
      ctaGenerate: 'Gerar pedido para o WhatsApp',
      ctaGenerateTable: 'Registrar pedido da mesa',
      toastReady: (protocol) => `Pedido ${protocol} registrado e pronto para envio no WhatsApp.`,
      toastTableSaved: (table, protocol) =>
        `Mesa ${table} (${protocol}) registrada no caixa para pagamento ao final.`,
      toastCopied: 'Resumo do pedido copiado.',
      toastCopyManual: 'Selecione e copie o texto do resumo manualmente.',
    },
    admin: {
      title: 'Área do proprietário',
      closeAria: 'Fechar administração',
      warningPrefix: 'Importante:',
      warningBeforeCode: 'alterações ficam salvas apenas neste navegador (',
      warningAfterCode:
        '). As alterações de produtos e senha não são sincronizadas automaticamente entre dispositivos. Configure preços, descrições e fotos reais antes de divulgar o cardápio.',
      editTitle: 'Editar produto',
      newTitle: 'Novo produto',
      cancelEdit: 'Cancelar edição',
      nameLabel: 'Nome do produto *',
      priceLabel: 'Preço unitário (R$)',
      pricePlaceholder: 'Vazio = Sob consulta',
      categoryLabel: 'Categoria',
      badgeLabel: 'Selo / destaque',
      badgePlaceholder: 'Ex.: Clássico, Duplo, Novo',
      descLabel: 'Descrição',
      imageUrlLabel: 'URL de imagem (opcional)',
      imageFileLabel: 'Ou envie uma foto (até 3 MB)',
      chooseFile: 'Escolher arquivo',
      previewAlt: 'Prévia da foto do produto',
      saveChanges: 'Salvar alterações',
      saveProduct: 'Salvar produto',
      clear: 'Limpar',
      registeredTitle: (count) => `Produtos cadastrados (${count})`,
      noProducts: 'Sem produtos cadastrados.',
      edit: 'Editar',
      deleteAria: (name) => `Excluir ${name}`,
      editAria: (name) => `Editar ${name}`,
      restoreButton: 'Restaurar catálogo inicial (9 itens)',
      errFileSize: 'Escolha uma imagem de até 3 MB.',
      errNameRequired: 'Informe o nome do produto.',
      errInvalidPrice:
        'Informe um preço maior que zero ou deixe em branco para "Sob consulta".',
      toastUpdated: (name) => `"${name}" atualizado no cardápio.`,
      toastCreated: (name) => `"${name}" adicionado ao cardápio.`,
    },
    confirm: {
      deleteTitle: 'Excluir produto?',
      restoreTitle: 'Restaurar catálogo inicial?',
      deleteDesc: (name) =>
        `Tem certeza que deseja excluir "${name}" do cardápio? Ele também será removido do pedido atual.`,
      restoreDesc:
        'Isso substituirá o catálogo atual pelos 9 produtos padrão da Menk’s Burger e limpará o pedido atual.',
      deleteConfirm: 'Excluir produto',
      restoreConfirm: 'Restaurar',
      cancel: 'Cancelar',
      closeAria: 'Fechar confirmação',
    },
    cashier: {
      tabMenu: 'Cardápio',
      tabCashier: 'Caixa & Estatísticas',
      dateLabel: 'Dia do caixa',
      todayButton: 'Hoje',
      allDatesButton: 'Todos os dias',
      exportCsv: 'Exportar CSV',
      copyClosing: 'Copiar fechamento',
      kpiTotal: 'Total movimentado',
      kpiPaid: 'Recebido (pago)',
      kpiPending: 'Em aberto (mesas / pendentes)',
      kpiOrders: 'Pedidos registrados',
      avgTicket: 'Ticket médio',
      byModeTitle: 'Resumo por modalidade',
      topItemsTitle: 'Itens mais pedidos',
      noStatsYet: 'Sem dados suficientes no período selecionado.',
      filterAll: 'Todos',
      filterPending: 'Em aberto',
      filterPaid: 'Pagos',
      modeTable: 'Mesa',
      modePickup: 'Retirada',
      modeDelivery: 'Delivery',
      tablePrefix: 'Mesa',
      statusPaid: 'Pago',
      statusPendingTable: 'Em aberto · Pagar na mesa',
      statusPendingPix: 'Aguardando confirmação PIX',
      markPaid: 'Fechar / Marcar pago',
      reopenOrder: 'Reabrir',
      deleteOrderAria: (protocol) => `Excluir registro ${protocol}`,
      emptyOrders: 'Nenhum pedido registrado neste filtro.',
      toastMarkedPaid: (protocol) => `Pedido ${protocol} marcado como pago no caixa.`,
      toastReopened: (protocol) => `Pedido ${protocol} reaberto como pendente.`,
      toastOrderDeleted: (protocol) => `Registro ${protocol} removido do caixa.`,
      toastClosingCopied: 'Resumo de fechamento do caixa copiado.',
      toastCsvExported: 'Planilha CSV de pedidos exportada.',
      closingReportTitle: 'FECHAMENTO DO CAIXA — MENK’S BURGER',
      confirmDeleteOrderTitle: 'Excluir registro do caixa?',
      confirmDeleteOrderDesc: (protocol) =>
        `Deseja remover o pedido ${protocol} do histórico do caixa? Esta ação não pode ser desfeita.`,
      confirmDeleteOrderAction: 'Excluir registro',
    },
    floating: {
      whatsappAria: 'Falar com a Menk’s Burger pelo WhatsApp',
      openCartAria: 'Abrir meu pedido',
      backToTopAria: 'Voltar para o início da página',
      backToTopLabel: 'Início',
      itemSingular: 'item',
      itemPlural: 'itens',
      viewOrder: 'Ver pedido',
    },
    toasts: {
      addedToCart: (qty, name) =>
        `${qty}× ${name} adicionado${qty > 1 ? 's' : ''} ao pedido.`,
      removedProduct: (name) => `"${name}" removido do cardápio.`,
      restoredCatalog: 'Catálogo inicial restaurado (9 produtos).',
    },
  },

  it: {
    nav: {
      experience: 'L’esperienza',
      menu: 'Menù',
      howToOrder: 'Come ordinare',
      about: 'Chi siamo',
      location: 'Dove siamo',
      myOrder: 'Il mio ordine',
      openMenu: 'Apri menù',
      closeMenu: 'Chiudi menù',
      homeAria: 'Menk’s Burger, inizio',
      mainNavAria: 'Navigazione principale',
      mobileNavAria: 'Menù mobile',
      languageLabel: 'Lingua',
    },
    hero: {
      country: 'ITALIA',
      headlineLine1: 'Il gusto di strada.',
      headlineLine2Prefix: 'Il calore di ',
      headlineLine2Accent: 'casa.',
      description:
        'Burger, pinse e street food con carattere. Scegli i tuoi preferiti, componi l’ordine e scrivici su WhatsApp.',
      ctaPrimary: 'Componi il mio ordine',
      ctaSecondary: 'Vedi il menù',
      trust1: 'Fatto per condividere',
      trust2: 'Ordine veloce',
      trust3: 'Assistenza su WhatsApp',
      posterAlt:
        'Fame Davvero? — Burger artigianale Menk’s Burger servito su tagliere di legno',
    },
    experience: {
      eyebrow: 'A modo nostro',
      titleLine1: 'Una pausa con',
      titleLine2Accent: 'più gusto.',
      lede: 'Dal primo morso all’ultima chiacchiera della serata, Menk’s è pensato per godersi il momento senza fretta — con spirito di strada e calore di casa.',
      cta: 'Scopri Menk’s',
      cards: [
        {
          num: '01',
          title: 'Spirito di strada',
          body: 'Burger, pinsa e street food nello stesso posto, da scegliere al tuo ritmo.',
        },
        {
          num: '02',
          title: 'Calore di casa',
          body: 'Una buona tavola chiede cibo genuino e le persone giuste accanto.',
        },
        {
          num: '03',
          title: 'Il tuo ordine, a modo tuo',
          body: 'Componi la selezione, aggiungi le tue note e controlla tutto prima di inviare.',
        },
        {
          num: '04',
          title: 'Contatto diretto',
          body: 'L’ordine arriva direttamente sul WhatsApp del locale per confermare ogni dettaglio.',
        },
      ],
    },
    menu: {
      eyebrow: 'Scegli con calma',
      titlePrefix: 'Il menù ',
      titleAccent: 'Menk’s',
      subtitle:
        'Componi il tuo ordine qui sotto e invialo su WhatsApp. Chiedi al team i gusti del giorno e la disponibilità.',
      ownerPrompt:
        'Modalità titolare attiva: aggiorna piatti, prezzi e foto del menù direttamente da questo browser.',
      ownerButton: 'Modifica menù',
      ownerLogout: 'Esci',
      filterAria: 'Filtra il menù per categoria',
      allCategory: 'Tutti',
      categories: {
        Burgers: 'Burger',
        Pinsas: 'Pinse',
        'Street Food': 'Street Food',
        Acompanhamentos: 'Contorni',
        Bebidas: 'Bevande',
      },
      priceLabel: 'Prezzo',
      valueLabel: 'Prezzo',
      onRequest: 'Su richiesta',
      add: 'Aggiungi',
      added: 'Aggiunto',
      askTeam: 'Chiedi',
      editProduct: 'Modifica prodotto',
      decreaseQty: 'Diminuisci quantità di',
      increaseQty: 'Aumenta quantità di',
      quantity: 'Quantità',
      defaultDesc:
        'Chiedi composizione e disponibilità al nostro team su WhatsApp.',
      emptyTitle: 'Nessun prodotto in questa categoria',
      emptyBody:
        'Scegli un’altra categoria qui sopra oppure aggiungi nuovi piatti dall’area titolare.',
      viewAll: 'Vedi tutto il menù',
      createProduct: 'Aggiungi prodotto',
    },
    steps: {
      eyebrow: 'Semplice così',
      titleLine1: 'A modo tuo,',
      titleLine2: 'in tre passi.',
      lede: 'Scegli cosa ti va e invia il riepilogo direttamente sul nostro WhatsApp.',
      items: [
        {
          num: '01',
          title: 'Scegli i tuoi preferiti',
          body: 'Esplora il menù e aggiungi all’ordine tutto ciò che ti fa venire fame.',
        },
        {
          num: '02',
          title: 'Ritiro o consegna',
          body: 'Inserisci i tuoi dati, scegli la modalità e controlla il riepilogo.',
        },
        {
          num: '03',
          title: 'Conferma su WhatsApp',
          body: 'Invia l’ordine e concorda i dettagli direttamente con il nostro team.',
        },
      ],
    },
    story: {
      eyebrow: 'Il gusto di strada',
      titleLine1: 'Menk’s: strada',
      titleLine2Prefix: 'con ',
      titleLine2Accent: 'calore di casa.',
      lede: 'Un marchio dall’anima urbana con un invito semplice: riunire buona compagnia intorno a burger, pinsa e street food. Il resto nasce a ogni visita.',
      points: [
        'Burger • Pinsa • Street Food',
        'Scelta libera dal menù',
        'Contatto diretto su WhatsApp',
      ],
      wallAlt:
        'Ambiente accogliente con tavoli e identità visiva Menk’s Burger',
      handAlt: 'Burger servito con verdure fresche',
    },
    reviews: {
      eyebrow: 'La tua voce conta',
      titleLine1: 'La prossima',
      titleLine2Prefix: 'storia è ',
      titleLine2Accent: 'tua.',
      body: 'Non abbiamo ancora recensioni verificate da pubblicare qui. Dopo aver provato i nostri piatti, raccontaci cosa ne pensi — la tua opinione aiuta Menk’s a migliorare sempre.',
      cta: 'Invia opinione su WhatsApp',
      whatsappText: 'Ciao Menk’s! Vorrei lasciare una recensione.',
      panelTitleLine1: 'Una buona tavola',
      panelTitleLine2: 'è più bella insieme.',
      panelBody:
        'Chiama chi ami, scegli ciò che ti ispira e trasforma la pausa in un momento speciale. L’esperienza nasce da ogni incontro.',
      keywords: ['Burger', 'Pinsa', 'Street food', 'Buona compagnia'],
    },
    location: {
      eyebrow: 'Dove trovarci',
      titleLine1: 'Ci troviamo',
      titleLine2Prefix: 'in ',
      titleLine2Accent: 'Italia.',
      lede: 'Per indirizzo, orari di apertura e copertura consegne, scrivi al nostro team su WhatsApp.',
      regionLabel: 'Zona',
      regionValue: 'Italia',
      whatsappLabel: 'WhatsApp',
      hoursLabel: 'Orari',
      hoursValue: 'Chiedi al team',
      cta: 'Scrivici su WhatsApp',
      mapTitle: 'Mappa dell’Italia',
      finalCtaTitle: 'Ti è venuta fame?',
      finalCtaBody: 'Scegli dal menù e manda il tuo ordine a Menk’s.',
      finalCtaButton: 'Esplora il menù',
      footerHome: 'Inizio',
      footerMenu: 'Menù',
      footerHowToOrder: 'Come ordinare',
      footerLocation: 'Dove siamo',
      footerOwnerLogin: 'Area titolare',
      footerAdmin: 'Gestione menù',
      footerNavAria: 'Link del piè di pagina',
      copyrightSuffix: 'Menk’s Burger. Contenuti soggetti a conferma dal team.',
      footerClosing: 'Fatto per chi ama mangiare bene, senza formalità.',
      developedByPrefix: 'Sviluppato da',
    },
    ownerAuth: {
      modalTitle: 'Accesso titolare',
      modalSubtitle:
        'Inserisci nome utente e password di amministratore per accedere alla gestione del menù e dei prodotti.',
      usernameLabel: 'Utente',
      usernamePlaceholder: 'Inserisci utente',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Inserisci password',
      showPassword: 'Mostra password',
      hidePassword: 'Nascondi password',
      submit: 'Accedi',
      cancel: 'Annulla',
      closeAria: 'Chiudi accesso titolare',
      invalidCredentials:
        'Utente o password non validi. Solo il titolare può accedere alla gestione del menù.',
      logoutButton: 'Esci dalla modalità titolare',
      changePasswordToggle: 'Cambia password',
      newPasswordLabel: 'Nuova password (min. 4 caratteri)',
      confirmPasswordLabel: 'Conferma nuova password',
      savePasswordButton: 'Aggiorna password',
      passwordMinLengthError: 'La nuova password deve avere almeno 4 caratteri.',
      passwordMismatchError: 'Le password inserite non coincidono.',
      toastLoggedIn: 'Modalità titolare attivata.',
      toastLoggedOut: 'Sessione titolare terminata.',
      toastPasswordUpdated: 'Password del titolare aggiornata in questo browser.',
    },
    cart: {
      title: 'Il mio ordine',
      closeAria: 'Chiudi ordine',
      emptyTitle: 'Il tuo ordine ti sta aspettando.',
      emptyBody: 'Aggiungi i tuoi preferiti dal menù per iniziare.',
      viewMenu: 'Vedi il menù',
      each: 'cad.',
      remove: 'Rimuovi',
      totalLabel: 'Totale dell’ordine',
      deliveryQuestion: 'Come preferisci riceverlo?',
      table: 'Tavolo',
      pickup: 'Ritiro in sede',
      delivery: 'Consegna',
      tableNumberLabel: 'Numero / nome del tavolo *',
      tableNumberPlaceholder: 'Es.: 01, 05, Terrazza 2',
      tablePayTitle: 'Pagamento al tavolo (a fine servizio)',
      tablePayBody:
        'L’ordine viene registrato sul tuo tavolo e in cassa. Il pagamento avverrà solo al termine del servizio, direttamente al tavolo.',
      pickupNotePrefix: 'Ritiro in ',
      pickupRegion: 'Italia',
      pickupNoteSuffix: '. Conferma indirizzo e orario con il team su WhatsApp.',
      street: 'Via / Viale *',
      number: 'Civico *',
      neighborhood: 'Quartiere *',
      complement: 'Interno / riferimento',
      fullName: 'Nome completo *',
      phone: 'WhatsApp con prefisso *',
      phoneOptional: 'WhatsApp (opzionale al tavolo)',
      phonePlaceholder: '(71) 99999-9999',
      email: 'E-mail *',
      emailOptional: 'E-mail (opzionale al tavolo)',
      notes: 'Note dell’ordine',
      notesPlaceholder: 'Es.: cottura carne, senza cipolla...',
      pixTitle: 'Pagamento tramite PIX',
      pixSubtitle:
        'La chiave PIX e il pagamento verranno concordati con il team su WhatsApp.',
      pixWarningPrefix: 'IMPORTANTE:',
      pixWarningBody1:
        'L’ordine sarà preparato per il ritiro in sede o per la consegna a domicilio solo dopo l’invio e la conferma della ',
      pixWarningHighlight: 'RICEVUTA DI PAGAMENTO PIX',
      pixWarningBody2: ' sul nostro WhatsApp.',
      pixAgreeText:
        'Confermo di essere consapevole che il pagamento avviene via PIX e che l’ordine sarà consegnato/ritirato solo dopo l’invio della ricevuta.',
      errEmptyCart: 'Aggiungi prodotti con prezzo prima di continuare.',
      errTable: 'Inserisci il numero o il nome del tavolo.',
      errTableName: 'Inserisci il tuo nome per identificare l’ordine al tavolo.',
      errContact:
        'Controlla nome completo, WhatsApp con prefisso (10 o 11 cifre) ed e-mail valida.',
      errAddress: 'Per la consegna, compila via/viale, civico e quartiere.',
      errPix:
        'Seleziona la conferma sul pagamento via PIX per generare l’ordine.',
      previewLabel: 'Anteprima ordine',
      copySummary: 'Copia riepilogo',
      copied: 'Copiato',
      openWhatsApp: 'Apri WhatsApp con questo ordine',
      newOrderButton: 'Nuovo ordine',
      ctaEmpty: 'Aggiungi prodotti all’ordine',
      ctaUpdate: 'Aggiorna riepilogo ordine',
      ctaGenerate: 'Genera ordine per WhatsApp',
      ctaGenerateTable: 'Registra ordine al tavolo',
      toastReady: (protocol) =>
        `Ordine ${protocol} registrato e pronto per l’invio su WhatsApp.`,
      toastTableSaved: (table, protocol) =>
        `Tavolo ${table} (${protocol}) registrato in cassa per il saldo a fine servizio.`,
      toastCopied: 'Riepilogo dell’ordine copiato.',
      toastCopyManual: 'Seleziona e copia manualmente il riepilogo qui sopra.',
    },
    admin: {
      title: 'Area titolare',
      closeAria: 'Chiudi pannello titolare',
      warningPrefix: 'Importante:',
      warningBeforeCode: 'le modifiche vengono salvate solo in questo browser (',
      warningAfterCode:
        '). Le modifiche ai prodotti e alla password non si sincronizzano automaticamente tra dispositivi. Imposta prezzi, descrizioni e foto reali prima di condividere il menù.',
      editTitle: 'Modifica prodotto',
      newTitle: 'Nuovo prodotto',
      cancelEdit: 'Annulla modifica',
      nameLabel: 'Nome del prodotto *',
      priceLabel: 'Prezzo unitario (R$)',
      pricePlaceholder: 'Vuoto = Su richiesta',
      categoryLabel: 'Categoria',
      badgeLabel: 'Etichetta / evidenza',
      badgePlaceholder: 'Es.: Classico, Doppio, Novità',
      descLabel: 'Descrizione',
      imageUrlLabel: 'URL immagine (opzionale)',
      imageFileLabel: 'Oppure carica una foto (max 3 MB)',
      chooseFile: 'Scegli file',
      previewAlt: 'Anteprima foto del prodotto',
      saveChanges: 'Salva modifiche',
      saveProduct: 'Salva prodotto',
      clear: 'Pulisci',
      registeredTitle: (count) => `Prodotti nel menù (${count})`,
      noProducts: 'Nessun prodotto inserito.',
      edit: 'Modifica',
      deleteAria: (name) => `Elimina ${name}`,
      editAria: (name) => `Modifica ${name}`,
      restoreButton: 'Ripristina catalogo iniziale (9 prodotti)',
      errFileSize: 'Scegli un’immagine fino a 3 MB.',
      errNameRequired: 'Inserisci il nome del prodotto.',
      errInvalidPrice:
        'Inserisci un prezzo maggiore di zero oppure lascia vuoto per "Su richiesta".',
      toastUpdated: (name) => `"${name}" aggiornato nel menù.`,
      toastCreated: (name) => `"${name}" aggiunto al menù.`,
    },
    confirm: {
      deleteTitle: 'Eliminare prodotto?',
      restoreTitle: 'Ripristinare catalogo iniziale?',
      deleteDesc: (name) =>
        `Vuoi davvero eliminare "${name}" dal menù? Verrà rimosso anche dall’ordine attuale.`,
      restoreDesc:
        'Questa azione sostituirà il catalogo attuale con i 9 prodotti iniziali di Menk’s Burger e svuoterà l’ordine in corso.',
      deleteConfirm: 'Elimina prodotto',
      restoreConfirm: 'Ripristina',
      cancel: 'Annulla',
      closeAria: 'Chiudi conferma',
    },
    cashier: {
      tabMenu: 'Menù',
      tabCashier: 'Cassa & Statistiche',
      dateLabel: 'Giorno cassa',
      todayButton: 'Oggi',
      allDatesButton: 'Tutti i giorni',
      exportCsv: 'Esporta CSV',
      copyClosing: 'Copia chiusura',
      kpiTotal: 'Totale movimento',
      kpiPaid: 'Incassato (pagato)',
      kpiPending: 'Aperto (tavoli / in attesa)',
      kpiOrders: 'Ordini registrati',
      avgTicket: 'Scontrino medio',
      byModeTitle: 'Riepilogo per modalità',
      topItemsTitle: 'Prodotti più richiesti',
      noStatsYet: 'Nessun dato disponibile nel periodo selezionato.',
      filterAll: 'Tutti',
      filterPending: 'Aperti',
      filterPaid: 'Pagati',
      modeTable: 'Tavolo',
      modePickup: 'Ritiro',
      modeDelivery: 'Consegna',
      tablePrefix: 'Tavolo',
      statusPaid: 'Pagato',
      statusPendingTable: 'Aperto · Saldo al tavolo',
      statusPendingPix: 'In attesa conferma PIX',
      markPaid: 'Chiudi / Segna pagato',
      reopenOrder: 'Riapri',
      deleteOrderAria: (protocol) => `Elimina registrazione ${protocol}`,
      emptyOrders: 'Nessun ordine registrato per questo filtro.',
      toastMarkedPaid: (protocol) => `Ordine ${protocol} segnato come pagato in cassa.`,
      toastReopened: (protocol) => `Ordine ${protocol} riaperto come in attesa.`,
      toastOrderDeleted: (protocol) => `Registrazione ${protocol} rimossa dalla cassa.`,
      toastClosingCopied: 'Riepilogo di chiusura cassa copiato.',
      toastCsvExported: 'File CSV degli ordini esportato.',
      closingReportTitle: 'CHIUSURA CASSA — MENK’S BURGER',
      confirmDeleteOrderTitle: 'Eliminare ordine dalla cassa?',
      confirmDeleteOrderDesc: (protocol) =>
        `Vuoi rimuovere l’ordine ${protocol} dallo storico cassa? Questa azione non può essere annullata.`,
      confirmDeleteOrderAction: 'Elimina ordine',
    },
    floating: {
      whatsappAria: 'Scrivi a Menk’s Burger su WhatsApp',
      openCartAria: 'Apri il mio ordine',
      backToTopAria: 'Torna all’inizio della pagina',
      backToTopLabel: 'Inizio',
      itemSingular: 'articolo',
      itemPlural: 'articoli',
      viewOrder: 'Vedi ordine',
    },
    toasts: {
      addedToCart: (qty, name) =>
        `${qty}× ${name} aggiunt${qty > 1 ? 'i' : 'o'} all’ordine.`,
      removedProduct: (name) => `"${name}" rimosso dal menù.`,
      restoredCatalog: 'Catalogo iniziale ripristinato (9 prodotti).',
    },
  },
};

interface SeedTranslation {
  name: string;
  badge: string;
  description: string;
}

const SEED_IT_TRANSLATIONS: Record<string, SeedTranslation> = {
  'mb-1': {
    name: 'Menk’s Classic',
    badge: 'Burger',
    description:
      'Pane morbido al sesamo, burger artigianale succoso, formaggio fuso e verdure fresche della casa.',
  },
  'mb-2': {
    name: 'Double Trouble',
    badge: 'Doppio',
    description:
      'Doppio burger scottato alla piastra, doppio formaggio filante e salsa speciale Menk’s.',
  },
  'mb-3': {
    name: 'Cheese Burger',
    badge: 'Classico',
    description:
      'La ricetta essenziale: carne alla griglia, formaggio generoso e pane tostato al burro.',
  },
  'mb-4': {
    name: 'Pinsa della Casa',
    badge: 'Pinsa',
    description:
      'Impasto leggero e croccante in stile romano con farcitura artigianale della casa. Chiedi i gusti del giorno.',
  },
  'mb-5': {
    name: 'Pinsa Speciale',
    badge: 'Speciale',
    description:
      'La nostra pinsa a lunga lievitazione con selezione speciale di ingredienti freschi e tocco italiano.',
  },
  'mb-6': {
    name: 'Patatine Croccanti',
    badge: 'Contorno',
    description:
      'Porzione dorata e asciutta, condita al momento per condividere a tavola.',
  },
  'mb-7': {
    name: 'Street Dog',
    badge: 'Street food',
    description:
      'Hot dog artigianale dal gusto di strada, pane soffice e salsa della casa.',
  },
  'mb-8': {
    name: 'Bibita',
    badge: 'Fresca',
    description:
      'Lattina ghiacciata. Chiedi i gusti disponibili al nostro team su WhatsApp.',
  },
  'mb-9': {
    name: 'Birra',
    badge: 'Bevande',
    description:
      'Birra fresca per accompagnare il burger o la pinsa. Chiedi le etichette disponibili.',
  },
};

/**
 * Returns localized display fields for seed products when viewing in Italian,
 * while preserving any custom edits made by the owner in Admin.
 */
export function getLocalizedProduct(
  product: Product,
  locale: Locale,
  seedMap: Record<string, Product>
): { name: string; badge: string; description: string } {
  if (locale === 'pt') {
    return {
      name: product.name,
      badge: product.badge,
      description: product.description,
    };
  }

  const itSeed = SEED_IT_TRANSLATIONS[product.id];
  const ptSeed = seedMap[product.id];
  if (!itSeed || !ptSeed) {
    return {
      name: product.name,
      badge: product.badge,
      description: product.description,
    };
  }

  return {
    name: product.name === ptSeed.name ? itSeed.name : product.name,
    badge: product.badge === ptSeed.badge ? itSeed.badge : product.badge,
    description:
      product.description === ptSeed.description
        ? itSeed.description
        : product.description,
  };
}
