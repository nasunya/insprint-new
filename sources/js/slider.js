// Слайдер

class SliderCarousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    infinity = false,
    position = 0,
    slidersToShow = 3,
    responsive = [],
  }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.sliders = document.querySelector(wrap).children;
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.slidersToShow = slidersToShow;

    this.options = {
      position,
      infinity,
      widthSlide: Math.floor(100 / this.slidersToShow),
    };
    this.responsive = responsive;
  }

  init() {
    // console.log(this.sliders);
    this.addGloClass();
    this.addstyle();

    if (this.prev && this.next) {
      this.controlSlider();
    }
    if (this.responsive) {
      this.responsiveInit();
    }
  }

  addGloClass() {
    this.main.classList.add("glo-slider");
    this.wrap.classList.add("glo-slider__wrap");

    for (const item of this.sliders) {
      item.classList.add("glo-slider__item");
    }
  }

  addstyle() {
    const style = document.createElement("style");
    style.id = "sliderCarousel-style";

    style.textContent = `
    .glo-slider {
      overflow:hidden !important;
    }
      .glo-slider__wrap {
      display: flex;
      transition: transform 0.5s;
      will-change: transform;
      width: 100%;
    }
    .glo-slider__item {
      flex:0 0 ${this.options.widthSlide}% !important;
      margin auto 0 !important;
    }

`;

    document.head.appendChild(style);
  }

  controlSlider() {
    this.prev.addEventListener("click", this.prevSlider.bind(this));
    this.next.addEventListener("click", this.nextSlider.bind(this));
  }

  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      console.log(this.options.position);
      if (this.options.position < 0) {
        this.options.position = this.sliders.length - this.slidersToShow;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }

  nextSlider() {
    if (
      this.options.infinity ||
      this.options.position < this.sliders.length - this.slidersToShow
    ) {
      ++this.options.position;
      console.log(this.options.position);
      if (this.options.position > this.sliders.length - this.slidersToShow) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }

  responsiveInit() {
    const slidersToShowDerault = this.slidersToShow;
    const allResponsive = this.responsive.map((item) => item.breakpoint);
    const maxResponse = Math.max(...allResponsive);

    const checkResponsive = () => {
      const widthWindow = document.documentElement.clientWidth;

      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponsive.length; i++) {
          if (widthWindow < allResponsive[i]) {
            this.slidersToShow = this.responsive[i].slidersToShow;
            this.options.widthSlide = Math.floor(100 / this.slidersToShow);
            this.addstyle();
          }
        }
      }
    };

    checkResponsive();
    window.addEventListener("resize", checkResponsive);
  }
}

const options = {
  main: ".photo__desc",
  wrap: ".photo__list",
  prev: "#left",
  next: "#right",
  slidersToShow: 3,
  infinity: true,

  responsive: [{
      breakpoint: 1100,
      slidersToShow: 3,
    },
    {
      breakpoint: 890,
      slidersToShow: 2,
    },
    {
      breakpoint: 480,
      slidersToShow: 1,
    },
  ],
};

const carousel = new SliderCarousel(options);
carousel.init();