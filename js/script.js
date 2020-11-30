$(document).ready(function() {
  $('.carusel__inner').slick({
    speed: 1000,
    prevArrow: '<button type="button" class="slick-prev"><img src="/img/chevron-left-solid.png" alt=""></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="/img/chevron-right-solid.png"></button>',
    responsive: [{
        breakpoint: 970,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 680,
        settings: {
          autoplay: true,
          arrows: false
        }
      }
    ]
  });

  //Tabs

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toglleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };
  toglleSlide('.catalog-item__link');
  toglleSlide('.catalog-item__back');

  //Modal
  $('[data-modal=consultation]').on('click', function() {
    $('#consultation').fadeIn('slow')
  });
  $('.button_overlay').on('click', function() {
    $('#thanks').fadeIn('slow')
  });
  $('.modal__close').on('click', function() {
    $('#consultation, #order, #thanks').fadeOut('slow')
  });
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
      $('#order').fadeIn('slow')
    });
  });

  function validate(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Введить свое имя",
        phone: "Введить свой номер телефона",
        email: {
          required: "Нам потрібна ел.пошта для контакту з вами",
          email: "Ваша пошта має бути у форматі name@domain.com"
        }
      }

    });
  }
  validate('#order form');
  validate('#consultation-form');
  validate('#consultation form');

  $('input[name=phone]').mask("7 (999) 999-99-99");

  // send mail

  $('form').submit(function() {
    e.preventDefault();
    a.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow')

      $('form').trigger("reset");
    });
    return false;
  });
  //smooth scroll pageup
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn()
    } else {
      $('.pageup').fadeOut('slow');
    }
  });
  $("a[href^='#']").click(function() {
    var _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top + "px"
    });
    return false;
  });
  new WOW().init();
});
