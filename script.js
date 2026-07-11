/* ============================================================
   Nader Samir Alsouqi — Portfolio logic
   - Bilingual EN / AR with full RTL
   - Theme (paper / blackboard) toggle
   - Data-driven experience / skills / education render
   - Scroll reveal, active nav, mobile menu
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- UI strings ---------------- */
  var UI = {
    en: {
      "brand": "Nader",
      "nav.about": "About", "nav.skills": "Skills", "nav.experience": "Experience",
      "nav.education": "Education", "nav.contact": "Contact",
      "hero.eyebrow": "Hi, I'm",
      "hero.name": "Nader Samir Alsouqi",
      "hero.role": "Software Engineer",
      "hero.exp": "8+ years",
      "hero.tagline": "I build scalable, high-performance systems for fintech, blockchain and ERP — turning complex business requirements into robust, real-world software.",
      "hero.cv": "Download CV",
      "hero.contact": "Get in touch",
      "hero.location": "Amman, Jordan",
      "hero.tag": "Software Engineer",
      "about.kicker": "a little", "about.title": "About me",
      "about.lead": "Software Engineer with 8+ years designing, developing and optimizing enterprise-grade applications.",
      "about.p1": "My work spans the fintech, blockchain and ERP domains — specialized in .NET Core and C#, with a proven record of delivering scalable, high-performance systems for real-time financial trading, decentralized platforms and multi-branch business operations.",
      "about.p2": "I'm skilled at translating complex business requirements into robust technical solutions and collaborating effectively within cross-functional, multinational teams.",
      "skills.kicker": "my", "skills.title": "Toolbox",
      "exp.kicker": "where I've", "exp.title": "Experience",
      "edu.kicker": "how I", "edu.title": "Education",
      "contact.kicker": "say", "contact.title": "Hello",
      "contact.lead": "Open to opportunities and collaboration. Let's build something reliable together.",
      "contact.email": "Email", "contact.phone": "Phone", "contact.location": "Location",
      "footer.text": "Built with care — pencil, paper & a lot of C#.",
      "role": "Software Engineer"
    },
    ar: {
      "brand": "نادر",
      "nav.about": "نبذة", "nav.skills": "المهارات", "nav.experience": "الخبرات",
      "nav.education": "التعليم", "nav.contact": "تواصل",
      "hero.eyebrow": "مرحبًا، أنا",
      "hero.name": "نادر سمير السوقي",
      "hero.role": "مهندس برمجيات",
      "hero.exp": "أكثر من 8 سنوات",
      "hero.tagline": "أُصمّم أنظمة قابلة للتوسّع وعالية الأداء في مجالات التكنولوجيا المالية والبلوك تشين وأنظمة تخطيط موارد المؤسسات، محوّلًا متطلبات العمل المعقّدة إلى برمجيات متينة تخدم الواقع.",
      "hero.cv": "تحميل السيرة الذاتية",
      "hero.contact": "تواصل معي",
      "hero.location": "عمّان، الأردن",
      "hero.tag": "مهندس برمجيات",
      "about.kicker": "نبذة", "about.title": "من أنا",
      "about.lead": "مهندس برمجيات يمتلك أكثر من 8 سنوات من الخبرة في تصميم وتطوير وتحسين تطبيقات على مستوى المؤسسات.",
      "about.p1": "تمتدّ أعمالي عبر مجالات التكنولوجيا المالية والبلوك تشين وأنظمة تخطيط موارد المؤسسات (ERP)، مع تخصّص في ‎.NET Core وC#‎، وسجلّ حافل في تسليم أنظمة قابلة للتوسّع وعالية الأداء للتداول المالي في الوقت الفعلي والمنصّات اللامركزية والعمليات التجارية متعددة الفروع.",
      "about.p2": "أمتلك القدرة على ترجمة متطلبات العمل المعقّدة إلى حلول تقنية متينة، والتعاون بفاعلية ضمن فرق متعددة التخصصات ومتعددة الجنسيات.",
      "skills.kicker": "أدواتي", "skills.title": "المهارات التقنية",
      "exp.kicker": "مسيرتي", "exp.title": "الخبرات المهنية",
      "edu.kicker": "دراستي", "edu.title": "التعليم",
      "contact.kicker": "قل", "contact.title": "مرحبًا",
      "contact.lead": "منفتح على الفرص والتعاون. لنبنِ معًا شيئًا موثوقًا.",
      "contact.email": "البريد الإلكتروني", "contact.phone": "الهاتف", "contact.location": "الموقع",
      "footer.text": "صُنع بعناية — قلم رصاص وورقة والكثير من ‎C#‎.",
      "role": "مهندس برمجيات"
    }
  };

  /* ---------------- Data ---------------- */
  var STATS = [
    { num: "8<span>+</span>", label: { en: "Years of experience", ar: "سنوات الخبرة" } },
    { num: "7", label: { en: "Companies & teams", ar: "شركات وفِرق عمل" } },
    { num: "3", label: { en: "Industry domains", ar: "قطاعات صناعية" } },
    { num: "20<span>+</span>", label: { en: "Technologies & tools", ar: "تقنيات وأدوات" } }
  ];

  var SKILLS = [
    { title: { en: "Programming Languages", ar: "لغات البرمجة" },
      items: ["C#", "Java", "JavaScript", "SQL", "HTML", "CSS", "C++", "C"] },
    { title: { en: "Frameworks & Libraries", ar: "أُطر العمل والمكتبات" },
      items: ["ASP.NET", ".NET Core", "Spring Boot", "Angular", "SignalR", "Razor"] },
    { title: { en: "Databases", ar: "قواعد البيانات" },
      items: ["Microsoft SQL Server", "MySQL", "Redis"] },
    { title: { en: "Protocols", ar: "البروتوكولات" },
      items: ["HTTP", "TCP", "UDP", "SOAP"] },
    { title: { en: "Tools & Platforms", ar: "الأدوات والمنصّات" },
      items: ["Visual Studio", "Git", "RabbitMQ", "JMeter", "MetaTrader", "cTrader", "cAlgo", "Android Studio", "Eclipse", "NetBeans"] },
    { title: { en: "Concepts & Patterns", ar: "المفاهيم وأنماط التصميم" },
      items: ["SDLC", "Automated Testing", "Requirements Engineering", "Real-Time Data", "Data Analytics", "Repository", "Factory", "MVC", "Builder", "Proxy"] }
  ];

  var EXPERIENCE = [
    {
      company: "Skyline",
      dates: { en: "Feb 2026 – Present", ar: "فبراير 2026 – حتى الآن" },
      project: { en: "Accounting System Modernization & ERP Support", ar: "تحديث نظام محاسبي ودعم أنظمة ERP" },
      location: { en: "", ar: "" },
      bullets: {
        en: [
          "Spearheaded the modernization of a legacy VB6 accounting system, re-engineering it into a modern architecture built on .NET and Angular.",
          "Designed and developed a maintenance management system tailored to client-specific operational requirements.",
          "Provided ongoing support and resolved critical issues across the company's ERP platform, ensuring system stability and reliability."
        ],
        ar: [
          "قُدت عملية تحديث نظام محاسبي قديم مبني بلغة VB6، وأعدت هندسته إلى بنية حديثة قائمة على ‎.NET وAngular.",
          "صمّمت وطوّرت نظامًا لإدارة الصيانة مُصمّمًا وفق المتطلبات التشغيلية الخاصة بالعميل.",
          "قدّمت دعمًا مستمرًا وعالجت مشكلات حرجة عبر منصّة ERP الخاصة بالشركة، بما يضمن استقرار النظام وموثوقيته."
        ]
      }
    },
    {
      company: "ACS-Tech",
      dates: { en: "Sep 2025 – Feb 2026", ar: "سبتمبر 2025 – فبراير 2026" },
      project: { en: "Car Rental ERP Platform (.NET Core)", ar: "منصّة ERP لتأجير السيارات (.NET Core)" },
      location: { en: "", ar: "" },
      bullets: {
        en: [
          "Developed and maintained a comprehensive Car Rental ERP system in .NET Core, engineered to streamline rental operations and optimize fleet management.",
          "Built core modules for vehicle reservations, rental agreements, invoicing, and customer relationship management.",
          "Architected a scalable, multi-branch solution capable of supporting high transaction volumes and concurrent operations.",
          "Integrated secure payment gateways and third-party APIs to enable real-time vehicle tracking and reporting.",
          "Improved system performance through asynchronous programming, strategic caching, and database query optimization.",
          "Partnered closely with product managers and clients to deliver ERP features precisely aligned with business objectives."
        ],
        ar: [
          "طوّرت وصُنت نظام ERP متكاملًا لتأجير السيارات باستخدام ‎.NET Core، مُصمّمًا لتبسيط عمليات التأجير وتحسين إدارة الأسطول.",
          "بنيت وحداتٍ أساسية لحجوزات المركبات وعقود التأجير والفوترة وإدارة علاقات العملاء.",
          "صمّمت حلًّا قابلًا للتوسّع متعدد الفروع قادرًا على دعم أحجام معاملات كبيرة وعمليات متزامنة.",
          "دمجت بوابات دفع آمنة وواجهات برمجية خارجية (APIs) لتمكين تتبّع المركبات وإعداد التقارير في الوقت الفعلي.",
          "حسّنت أداء النظام عبر البرمجة غير المتزامنة والتخزين المؤقت الاستراتيجي وتحسين استعلامات قاعدة البيانات.",
          "عملت عن قرب مع مديري المنتجات والعملاء لتسليم ميزات ERP متوافقة تمامًا مع أهداف العمل."
        ]
      }
    },
    {
      company: "GTA Startup",
      dates: { en: "Mar 2024 – Dec 2024", ar: "مارس 2024 – ديسمبر 2024" },
      project: { en: "Ethereum-like Cryptocurrency Platform", ar: "منصّة عملة رقمية شبيهة بالإيثيريوم" },
      location: { en: "Turkey", ar: "تركيا" },
      bullets: {
        en: [
          "Contributed to a blockchain-based financial platform modeled on Ethereum, focusing on decentralized applications (dApps) and smart contract integration.",
          "Designed and optimized core modules for transaction validation, wallet management, and secure API communication.",
          "Collaborated with a multinational team to implement token standards and uphold blockchain security best practices.",
          "Strengthened system scalability and reliability by introducing performance monitoring and automated testing frameworks.",
          "Played a pivotal role in aligning product functionality with real-world financial use cases, supporting the startup's go-to-market strategy in the cryptocurrency sector."
        ],
        ar: [
          "ساهمت في منصّة مالية قائمة على البلوك تشين ومستوحاة من الإيثيريوم، مع التركيز على التطبيقات اللامركزية (dApps) ودمج العقود الذكية.",
          "صمّمت وحسّنت وحداتٍ أساسية للتحقق من المعاملات وإدارة المحافظ والتواصل الآمن عبر الواجهات البرمجية.",
          "تعاونت مع فريق متعدد الجنسيات لتطبيق معايير الرموز (Tokens) والالتزام بأفضل ممارسات أمن البلوك تشين.",
          "عزّزت قابلية توسّع النظام وموثوقيته عبر إدخال مراقبة الأداء وأُطر الاختبار الآلي.",
          "لعبت دورًا محوريًا في مواءمة وظائف المنتج مع حالات الاستخدام المالية الواقعية، بما يدعم استراتيجية إطلاق الشركة الناشئة في قطاع العملات الرقمية."
        ]
      }
    },
    {
      company: "Equiti JO",
      dates: { en: "May 2019 – Oct 2022", ar: "مايو 2019 – أكتوبر 2022" },
      project: { en: "Financial Trading Technology", ar: "تقنيات التداول المالي" },
      location: { en: "Amman, Jordan", ar: "عمّان، الأردن" },
      bullets: {
        en: [
          "Developed and enhanced a high-performance financial trading application that enabled brokers to display real-time prices and efficiently manage profit and loss, directly improving trading operations.",
          "Integrated Equiti's proprietary tools with MetaTrader 4 (MT4), streamlining trading workflows and expanding platform capabilities.",
          "Designed, developed, and rigorously tested a range of trader-facing tools, elevating user experience and operational efficiency."
        ],
        ar: [
          "طوّرت وحسّنت تطبيق تداول مالي عالي الأداء مكّن الوسطاء من عرض الأسعار في الوقت الفعلي وإدارة الأرباح والخسائر بكفاءة، بما حسّن عمليات التداول مباشرةً.",
          "دمجت أدوات Equiti الخاصة مع منصّة MetaTrader 4 (MT4)، مما بسّط سير عمل التداول ووسّع قدرات المنصّة.",
          "صمّمت وطوّرت واختبرت بدقّة مجموعة من الأدوات الموجّهة للمتداولين، بما ارتقى بتجربة المستخدم والكفاءة التشغيلية."
        ]
      }
    },
    {
      company: "Aspire Services",
      dates: { en: "Mar 2018 – Sep 2018", ar: "مارس 2018 – سبتمبر 2018" },
      project: { en: "Test Automation Tooling", ar: "أدوات أتمتة الاختبارات" },
      location: { en: "Amman, Jordan", ar: "عمّان، الأردن" },
      bullets: {
        en: [
          "Engineered a custom development tool that empowered QA testers to author and automatically translate test cases into executable scripts, significantly reducing manual effort and accelerating release cycles.",
          "Authored comprehensive test cases and scenarios using the in-house automation tool, ensuring high quality and reliability across client software solutions.",
          "Generated dynamic reports from automated test results, delivering critical insights into software performance and quality assurance."
        ],
        ar: [
          "طوّرت أداة تطوير مخصّصة مكّنت مختبري الجودة من كتابة حالات الاختبار وتحويلها آليًا إلى نصوص برمجية قابلة للتنفيذ، مما قلّل الجهد اليدوي بشكل كبير وسرّع دورات الإصدار.",
          "كتبت حالات وسيناريوهات اختبار شاملة باستخدام أداة الأتمتة الداخلية، بما يضمن جودة وموثوقية عالية عبر حلول العملاء البرمجية.",
          "أنشأت تقارير ديناميكية من نتائج الاختبارات الآلية، موفّرًا رؤى جوهرية حول أداء البرمجيات وضمان الجودة."
        ]
      }
    },
    {
      company: "Aspire Infotech",
      dates: { en: "Jan 2017 – Mar 2018", ar: "يناير 2017 – مارس 2018" },
      project: { en: "Client Tools & Analytics", ar: "أدوات العملاء والتحليلات" },
      location: { en: "Amman, Jordan", ar: "عمّان، الأردن" },
      bullets: {
        en: [
          "Developed and maintained administrative tools for a diverse client base, enhancing operational efficiency and client management capabilities.",
          "Collaborated with US-based teams to build advanced analytics tools, providing data-driven insights that supported strategic decision-making.",
          "Revamped and maintained client websites, ensuring optimal performance, security, and a refined user experience."
        ],
        ar: [
          "طوّرت وصُنت أدوات إدارية لقاعدة عملاء متنوّعة، بما عزّز الكفاءة التشغيلية وقدرات إدارة العملاء.",
          "تعاونت مع فرق مقرّها الولايات المتحدة لبناء أدوات تحليلات متقدّمة، موفّرًا رؤى قائمة على البيانات دعمت اتخاذ القرارات الاستراتيجية.",
          "أعدت تصميم وصيانة مواقع العملاء الإلكترونية، بما يضمن الأداء الأمثل والأمان وتجربة مستخدم متقنة."
        ]
      }
    }
  ];

  var EDUCATION = {
    degree: { en: "Bachelor of Software Engineering", ar: "بكالوريوس هندسة البرمجيات" },
    school: { en: "Jordan University of Science and Technology", ar: "جامعة العلوم والتكنولوجيا الأردنية" },
    location: { en: "Ar Ramtha, Jordan", ar: "الرمثا، الأردن" }
  };

  /* ---------------- Helpers ---------------- */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var docEl = document.documentElement;

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m];
    });
  }

  // Update text of an element that may contain non-text children (e.g. SVG underline)
  function setI18nText(el, str) {
    if (el.children.length) {
      var first = el.firstChild;
      if (first && first.nodeType === 3) { first.nodeValue = str; }
      else { el.insertBefore(document.createTextNode(str), el.firstChild); }
    } else {
      el.textContent = str;
    }
  }

  /* ---------------- Renderers ---------------- */
  function renderStats(lang) {
    $("#stats").innerHTML = STATS.map(function (s) {
      return '<li class="stat"><div class="stat__num">' + s.num + '</div>' +
        '<div class="stat__label">' + esc(s.label[lang]) + '</div></li>';
    }).join("");
  }

  function renderSkills(lang) {
    $("#skillsGrid").innerHTML = SKILLS.map(function (g, i) {
      var idx = ("0" + (i + 1)).slice(-2);
      var chips = g.items.map(function (t) {
        return '<span class="chip" dir="ltr">' + esc(t) + '</span>';
      }).join("");
      return '<div class="skill-card">' +
        '<div class="skill-card__head"><span class="skill-card__idx">' + idx + '</span>' +
        '<h3 class="skill-card__title">' + esc(g.title[lang]) + '</h3></div>' +
        '<div class="chips">' + chips + '</div></div>';
    }).join("");
  }

  function renderExperience(lang) {
    var role = UI[lang]["role"];
    $("#timeline").innerHTML = EXPERIENCE.map(function (e) {
      var sub = [e.project[lang], e.location[lang]].filter(Boolean).join(" · ");
      var bullets = e.bullets[lang].map(function (b) {
        return "<li>" + esc(b) + "</li>";
      }).join("");
      return '<li class="tl-item"><div class="tl-card">' +
        '<div class="tl-top"><span class="tl-company" dir="ltr">' + esc(e.company) + '</span>' +
        '<span class="tl-dates" dir="auto">' + esc(e.dates[lang]) + '</span></div>' +
        '<div class="tl-role">' + esc(role) + '</div>' +
        '<div class="tl-sub">' + esc(sub) + '</div>' +
        '<ul class="tl-bullets">' + bullets + '</ul></div></li>';
    }).join("");
  }

  function renderEducation(lang) {
    var e = EDUCATION;
    $("#education-card").innerHTML =
      '<div class="edu-card">' +
      '<div class="edu-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg></div>' +
      '<div><div class="edu-card__title">' + esc(e.degree[lang]) + '</div>' +
      '<div class="edu-card__meta">' + esc(e.school[lang]) + ' — ' + esc(e.location[lang]) + '</div></div></div>';
  }

  /* ---------------- Language ---------------- */
  var lang = docEl.getAttribute("lang") === "ar" ? "ar" : "en";
  var firstRender = true;

  function applyLang(next) {
    lang = next;
    docEl.setAttribute("lang", lang);
    docEl.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    try { localStorage.setItem("lang", lang); } catch (e) {}

    // static strings
    $$("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = UI[lang][key];
      if (val != null) setI18nText(el, val);
    });

    // dynamic sections
    renderStats(lang);
    renderSkills(lang);
    renderExperience(lang);
    renderEducation(lang);
    // Only the very first render should play the staggered fade-in; a later
    // language switch just swaps text and must not re-animate the cards.
    if (!firstRender) {
      $$(".stagger").forEach(function (el) { el.classList.add("no-stagger"); });
    }
    firstRender = false;
    observeReveals();

    // language button shows the OTHER language
    var lb = $("#langBtn");
    lb.querySelector("span").textContent = lang === "en" ? "العربية" : "English";
    lb.setAttribute("aria-label", lang === "en" ? "التبديل إلى العربية" : "Switch to English");

    document.title = (lang === "ar"
      ? "نادر سمير السوقي — مهندس برمجيات"
      : "Nader Samir Alsouqi — Software Engineer");
  }

  /* ---------------- Theme ---------------- */
  function applyTheme(next) {
    docEl.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#16161a" : "#f3efe6");
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealObserver;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    }
    $$(".reveal:not(.in)").forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- Active nav link ---------------- */
  function setupActiveNav() {
    var links = $$(".nav__links a");
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if (!("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("active"); });
          var a = map[en.target.id];
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["about", "skills", "experience", "education", "contact"].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }

  /* ---------------- Init ---------------- */
  function init() {
    // portrait fallback
    var img = $("#portraitImg");
    if (img) {
      img.addEventListener("error", function () { $("#portrait").classList.add("no-img"); });
      if (img.complete && img.naturalWidth === 0) $("#portrait").classList.add("no-img");
    }

    // Sync <meta name="theme-color"> to the theme the inline head script resolved,
    // so the browser chrome matches from first paint (not just after a manual toggle).
    applyTheme(docEl.getAttribute("data-theme") === "dark" ? "dark" : "light");

    applyLang(lang);

    // toggles
    $("#langBtn").addEventListener("click", function () { applyLang(lang === "en" ? "ar" : "en"); });
    $("#themeBtn").addEventListener("click", function () {
      applyTheme(docEl.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    // mobile menu
    var menuBtn = $("#menuBtn"), links = $("#navLinks");
    if (menuBtn) {
      menuBtn.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$(".nav__links a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // nav shadow on scroll
    var nav = $("#nav");
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    setupActiveNav();

    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
