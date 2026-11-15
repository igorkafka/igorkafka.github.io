$(function () {
  "use strict";

  /* ---------- Skill modal data ---------- */
  var SKILL_DETAILS = {
    backend: {
      title: "Backend",
      description: "Construção de APIs e aplicações backend robustas, com foco em manutenibilidade e performance.",
      items: [
        { name: "ASP.NET MVC", desc: "Framework da Microsoft para aplicações web seguindo o padrão Model-View-Controller." },
        { name: "ASP.NET Core", desc: "Versão moderna e multiplataforma do ASP.NET, usada para construir APIs e serviços web performáticos." },
        { name: "ASP.NET WebAPI", desc: "Framework para criação de serviços HTTP/REST dentro do ecossistema .NET." },
        { name: "Ruby on Rails", desc: "Framework web em Ruby focado em convenção sobre configuração e produtividade no desenvolvimento." }
      ]
    },
    frontend: {
      title: "Frontend",
      description: "Interfaces modernas, componentizadas e responsivas, do SPA ao JavaScript puro.",
      items: [
        { name: "React", desc: "Biblioteca para construção de interfaces baseadas em componentes reutilizáveis." },
        { name: "Angular 2+", desc: "Framework completo da Google para aplicações web robustas em TypeScript." },
        { name: "AngularJS", desc: "Versão anterior do Angular (1.x), usada em projetos legados de SPA." },
        { name: "JavaScript", desc: "Linguagem base para interatividade e lógica no navegador." },
        { name: "Bootstrap", desc: "Framework CSS para construção rápida de layouts responsivos." }
      ]
    },
    mobile: {
      title: "Mobile",
      description: "Desenvolvimento mobile multiplataforma, unindo tecnologias web a apps nativos em iOS e Android.",
      items: [
        { name: "React Native", desc: "Framework para construir apps nativos para iOS e Android usando React e JavaScript." },
        { name: "Flutter", desc: "Framework do Google para desenvolvimento multiplataforma com uma única base de código em Dart." },
        { name: "Ionic 3", desc: "Framework híbrido baseado em Angular para construção de apps mobile a partir de tecnologias web." }
      ]
    },
    cloud: {
      title: "Cloud & DevOps",
      description: "Deploy, escalabilidade e automação de infraestrutura na nuvem.",
      items: [
        { name: "Azure", desc: "Plataforma de nuvem da Microsoft usada para hospedar aplicações, bancos de dados e serviços." },
        { name: "Docker", desc: "Containerização de aplicações para garantir consistência entre ambientes." },
        { name: "Kubernetes", desc: "Orquestração de containers para escalar e gerenciar aplicações distribuídas." },
        { name: "CI/CD", desc: "Pipelines de integração e entrega contínua para automatizar build, testes e deploy." }
      ]
    },
    arquitetura: {
      title: "Arquitetura",
      description: "Modelagem de domínio e organização de sistemas para escalar com qualidade.",
      items: [
        { name: "Clean Architecture", desc: "Organização de código em camadas que isolam regras de negócio de detalhes de infraestrutura." },
        { name: "DDD", desc: "Domain-Driven Design — modelagem de software a partir do domínio de negócio." },
        { name: "CQRS", desc: "Separação entre operações de leitura e escrita para otimizar responsabilidades distintas." },
        { name: "Microsserviços", desc: "Arquitetura que divide um sistema em serviços independentes e desacoplados." },
        { name: "Microfrontends", desc: "O mesmo conceito de microsserviços aplicado ao frontend, dividindo a UI em partes independentes." }
      ]
    },
    analise: {
      title: "Análise",
      description: "Base analítica que sustenta decisões técnicas antes de qualquer linha de código.",
      items: [
        { name: "Análise de Requisitos", desc: "Levantamento, documentação e validação de requisitos funcionais e não funcionais junto a stakeholders." },
        { name: "Modelagem de Dados", desc: "Modelagem conceitual, lógica e física de bancos de dados, definindo entidades, relacionamentos e normalização." }
      ]
    },
    automacao: {
      title: "Automação",
      description: "Um dos meus focos principais: projetar e automatizar fluxos de trabalho ponta a ponta.",
      items: [
        { name: "N8N", desc: "Ferramenta de automação de workflows com integrações visuais entre sistemas e APIs." },
        { name: "Elsa Workflows", desc: "Biblioteca .NET para modelagem e execução de workflows e máquinas de estado." },
        { name: "Airflow", desc: "Orquestrador de pipelines de dados e tarefas agendadas baseado em DAGs." }
      ]
    },
    dados: {
      title: "Bancos de dados",
      description: "Armazenamento e consulta de dados, do relacional ao NoSQL.",
      items: [
        { name: "SQL Server", desc: "Sistema de gerenciamento de banco de dados relacional da Microsoft." },
        { name: "MySQL", desc: "Sistema de gerenciamento de banco de dados relacional open-source amplamente usado." },
        { name: "NoSQL (básico)", desc: "Conhecimento inicial em bancos não relacionais para casos de uso específicos." }
      ]
    }
  };

  var $skillModal = $("#skill-modal");
  var $skillModalPanel = $(".skill-modal-panel");
  var lastFocusedEl = null;

  function openSkillModal(key) {
    var detail = SKILL_DETAILS[key];
    if (!detail) return;

    $("#skill-modal-title").text(detail.title);
    $("#skill-modal-description").text(detail.description);

    var $items = $("#skill-modal-items").empty();
    detail.items.forEach(function (item) {
      var $row = $('<div class="border-l-2 border-brand-500/40 pl-3"></div>');
      $('<p class="text-sm font-semibold text-zinc-900 dark:text-white"></p>').text(item.name).appendTo($row);
      $('<p class="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400"></p>').text(item.desc).appendTo($row);
      $items.append($row);
    });

    lastFocusedEl = document.activeElement;
    $skillModal.removeClass("hidden");
    $("body").addClass("overflow-hidden");
    $skillModalPanel.trigger("focus");
  }

  function closeSkillModal() {
    $skillModal.addClass("hidden");
    $("body").removeClass("overflow-hidden");
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
    lastFocusedEl = null;
  }

  function trapSkillModalFocus(e) {
    var focusables = $skillModalPanel.find('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])').get();
    if (!focusables.length) return;

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  $(document).on("click", "[data-category]", function () {
    openSkillModal($(this).data("category"));
  });

  $(document).on("keydown", "[data-category]", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSkillModal($(this).data("category"));
    }
  });

  $("#skill-modal-close").on("click", closeSkillModal);

  $skillModal.on("click", function (e) {
    if (!$(e.target).closest(".skill-modal-panel").length) {
      closeSkillModal();
    }
  });

  $(document).on("keydown", function (e) {
    if ($skillModal.hasClass("hidden")) return;

    if (e.key === "Escape") {
      closeSkillModal();
    } else if (e.key === "Tab") {
      trapSkillModalFocus(e);
    }
  });

  /* ---------- Hero code tabs ---------- */
  var $tabJson = $("#tab-json");
  var $tabTs = $("#tab-ts");
  var $codeJson = $("#code-json");
  var $codeTs = $("#code-ts");

  function activateTab(tab) {
    var showJson = tab === "json";
    $tabJson.toggleClass("border-brand-400 text-zinc-100", showJson).toggleClass("border-transparent text-zinc-500", !showJson);
    $tabTs.toggleClass("border-brand-400 text-zinc-100", !showJson).toggleClass("border-transparent text-zinc-500", showJson);
    $codeJson.toggleClass("hidden", !showJson);
    $codeTs.toggleClass("hidden", showJson);
  }

  $tabJson.on("click", function () {
    activateTab("json");
  });
  $tabTs.on("click", function () {
    activateTab("ts");
  });

  /* ---------- Theme toggle ---------- */
  var $html = $("html");
  var $sun = $("#icon-sun");
  var $moon = $("#icon-moon");

  function applyTheme(theme) {
    if (theme === "dark") {
      $html.addClass("dark");
      $sun.removeClass("hidden");
      $moon.addClass("hidden");
    } else {
      $html.removeClass("dark");
      $moon.removeClass("hidden");
      $sun.addClass("hidden");
    }
  }

  var storedTheme = localStorage.getItem("theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

  $("#theme-toggle").on("click", function () {
    var isDark = $html.hasClass("dark");
    var next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  /* ---------- Mobile menu ---------- */
  var $mobileMenu = $("#mobile-menu");
  var $burger = $("#icon-burger");
  var $closeIcon = $("#icon-close");

  $("#mobile-menu-btn").on("click", function () {
    $mobileMenu.slideToggle(200);
    $burger.toggleClass("hidden");
    $closeIcon.toggleClass("hidden");
  });

  $(".mobile-nav-link").on("click", function () {
    $mobileMenu.slideUp(200);
    $burger.removeClass("hidden");
    $closeIcon.addClass("hidden");
  });

  /* ---------- Smooth anchor scroll ---------- */
  $('a[href^="#"]').on("click", function (e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: target.offset().top - 64 }, 500);
    }
  });

  /* ---------- Back to top ---------- */
  var $backToTop = $("#back-to-top");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 400) {
      $backToTop.fadeIn(150);
    } else {
      $backToTop.fadeOut(150);
    }
  });
  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  /* ---------- Navbar shadow on scroll ---------- */
  var $navbar = $("#navbar");
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 10) {
      $navbar.addClass("shadow-sm");
    } else {
      $navbar.removeClass("shadow-sm");
    }
  });

  /* ---------- Scrollspy ---------- */
  var sections = $("main section[id]");
  var $navLinks = $(".nav-link, .mobile-nav-link");

  function updateActiveLink() {
    var scrollPos = $(window).scrollTop() + 120;
    var currentId = null;
    sections.each(function () {
      if ($(this).offset().top <= scrollPos) {
        currentId = $(this).attr("id");
      }
    });
    $navLinks.removeClass("active");
    if (currentId) {
      $navLinks.filter('[href="#' + currentId + '"]').addClass("active");
    }
  }
  $(window).on("scroll", updateActiveLink);
  updateActiveLink();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            $(entry.target).addClass("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    $(".reveal").addClass("is-visible");
  }

  /* ---------- Skill bars fill ---------- */
  var skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var $bar = $(entry.target);
          var years = parseFloat($bar.data("years"));
          var max = parseFloat($bar.data("max"));
          var pct = Math.min(100, (years / max) * 100);
          $bar.find(".skill-bar-fill").css("width", pct + "%");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".skill-bar").forEach(function (el) {
    skillObserver.observe(el);
  });

  /* ---------- Typed role effect ---------- */
  var roles = [
    "Data Engineer",
    "Fullstack Engineer",
    "Automation Engineer",
    "Automation Analyst"
  ];
  var $typed = $("#typed-role");
  var roleIndex = 0;
  var charIndex = 0;
  var deleting = false;

  function typeLoop() {
    var current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      $typed.text(current.slice(0, charIndex));
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 55);
    } else {
      charIndex--;
      $typed.text(current.slice(0, charIndex));
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(typeLoop, 30);
    }
  }
  typeLoop();

  /* ---------- Footer year ---------- */
  $("#year").text(new Date().getFullYear());
});
