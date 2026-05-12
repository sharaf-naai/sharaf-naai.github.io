$(function () {
  $(window).on("scroll", function () {
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    $("#scroll-progress").css("width", (winScroll / height) * 100 + "%");
  });

  const $cur = $("#cursor");
  const $ring = $("#cursorRing");
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  $(document).on("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
    $cur.css({ left: mx - 5, top: my - 5 });
  });

  (function followRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    $ring.css({ left: rx - 20, top: ry - 20 });
    requestAnimationFrame(followRing);
  })();

  $("a, button, .tag, .acc-head, .tl-item, .magnetic")
    .not(".lang-btn")
    .on("mouseenter", function () {
      $cur.css({ transform: "scale(2.2)", background: "var(--text)" });
      $ring.css({
        transform: "scale(1.5)",
        opacity: "0.2",
        borderColor: "var(--text)",
      });
    })
    .on("mouseleave", function () {
      $cur.css({ transform: "scale(1)", background: "var(--accent)" });
      $ring.css({
        transform: "scale(1)",
        opacity: "1",
        borderColor: "rgba(232,131,58,0.6)",
      });
    });

  $(".magnetic")
    .on("mousemove", function (e) {
      const pos = $(this).offset();
      const x = e.pageX - pos.left - $(this).width() / 2;
      const y = e.pageY - pos.top - $(this).height() / 2;
      $(this).css("transform", `translate(${x * 0.3}px, ${y * 0.3}px)`);
    })
    .on("mouseleave", function () {
      $(this).css("transform", "translate(0px, 0px)");
    });

  $(".photo-box")
    .on("mousemove", function (e) {
      const x = e.pageX - $(this).offset().left;
      const y = e.pageY - $(this).offset().top;
      const cx = $(this).width() / 2;
      const cy = $(this).height() / 2;
      $(this).css(
        "transform",
        `perspective(1000px) rotateX(${((y - cy) / cy) * -10}deg) rotateY(${((x - cx) / cx) * 10}deg) scale3d(1.02, 1.02, 1.02)`,
      );
    })
    .on("mouseleave", function () {
      $(this).css(
        "transform",
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      );
    });

  $(window).on("scroll.nav", function () {
    $("#nav").toggleClass("scrolled", $(this).scrollTop() > 70);
  });

  $("#burger").on("click", function () {
    $(this).toggleClass("open");
    $("#mobileMenu").toggleClass("open");
  });

  $("#mobileMenu .mob-link").on("click", function () {
    $("#burger").removeClass("open");
    $("#mobileMenu").removeClass("open");
  });

  $('a[href^="#"]').on("click", function (e) {
    const t = $($(this).attr("href"));
    if (!t.length) return;
    e.preventDefault();
    $("html,body").animate({ scrollTop: t.offset().top - 75 }, 750);
  });

  function reveal() {
    const winBot = $(window).scrollTop() + $(window).height();
    let visibleReveals = $(".reveal:not(.in)").filter(function () {
      return $(this).offset().top < winBot - 60;
    });
    visibleReveals.each(function (i) {
      $(this)
        .css("transition-delay", i * 0.1 + "s")
        .addClass("in");
    });
  }
  reveal();
  $(window).on("scroll.reveal", reveal);

  let barsAnimated = false;
  function animateBars() {
    if (barsAnimated) return;
    const sTop = $("#skills").offset().top;
    if ($(window).scrollTop() + $(window).height() > sTop + 80) {
      barsAnimated = true;
      $(".skill-fill").each(function (i) {
        const w = $(this).data("w") + "%";
        const $b = $(this);
        setTimeout(function () {
          $b.css("width", w);
        }, i * 150);
      });
    }
  }
  animateBars();
  $(window).on("scroll.bars", animateBars);

  let pipsAnimated = false;
  $(window).on("scroll.pips", function () {
    if (pipsAnimated) return;
    const sTop = $("#skills").offset().top;
    if ($(window).scrollTop() + $(window).height() > sTop + 180) {
      pipsAnimated = true;
      $('.pip[data-lit="1"]').each(function (i) {
        const $p = $(this);
        setTimeout(function () {
          $p.addClass("lit");
        }, i * 100);
      });
    }
  });

  $(".tag").on("click", function () {
    $(this).css("transform", "scale(0.92)");
    setTimeout(() => $(this).css("transform", ""), 160);
  });

  $(".acc-head").on("click", function () {
    const $item = $(this).closest(".acc-item");
    const $body = $item.find(".acc-body");
    const isOpen = $item.hasClass("open");

    $(".acc-item").removeClass("open");
    $(".acc-body").slideUp(400, "swing");

    if (!isOpen) {
      $item.addClass("open");
      $body.slideDown(400, "swing");
    }
  });
  $(".acc-item:first .acc-head").trigger("click");

  $(window).on("mousemove.orbs", function (e) {
    const px = (e.clientX / $(window).width() - 0.5) * 30;
    const py = (e.clientY / $(window).height() - 0.5) * 30;
    $(".orb-1").css("transform", "translate(" + px + "px," + py + "px)");
    $(".orb-2").css(
      "transform",
      "translate(" + -px * 0.6 + "px," + -py * 0.6 + "px)",
    );
    $(".orb-3").css(
      "transform",
      "translate(" + px * 0.4 + "px," + py * 0.9 + "px)",
    );
  });

  const sections = [
    "hero",
    "about",
    "skills",
    "experience",
    "education",
    "projects",
    "contact",
  ];
  $(window).on("scroll.active", function () {
    const scroll = $(this).scrollTop() + 120;
    sections.forEach(function (id) {
      const el = $("#" + id);
      if (!el.length) return;
      if (
        scroll >= el.offset().top &&
        scroll < el.offset().top + el.outerHeight()
      ) {
        $(".nav-links > li > a").css("color", "");
        $('.nav-links a[href="#' + id + '"]').css("color", "var(--accent)");
      }
    });
  });

  $(".lang-btn").on("click", function () {
    const lang = $(this).data("lang");
    window.currentLang = lang;

    $(".lang-btn").removeClass("active");
    $(`.lang-btn[data-lang="${lang}"]`).addClass("active");

    $("[data-i18n]").each(function () {
      const key = $(this).data("i18n");
      if (window.translations[lang] && window.translations[lang][key]) {
        $(this).html(window.translations[lang][key]);
      }
    });

    const event = new CustomEvent("languageChanged", { detail: lang });
    window.dispatchEvent(event);
  });
});
