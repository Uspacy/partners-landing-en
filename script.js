
$(document).ready(function () {
  const body = document.body;
  const header = document.querySelector('header')
  
  /* INIT CAROUSEL */

  $(".testimonial-wrapper").slick({
    dots: true,
    speed: 600,
    slidesToShow: 1,
    arrows: false,
    fade: true
  });

  /* POPUP SCRIPTS */

  const overlay = document.querySelector(".overlay");
  const closePopupBtn = document.querySelectorAll(".close-popup");
  const openPopupBtn = document.querySelectorAll(".open-popup");
  const popup = document.querySelector(".pop-up-wrapper");

  const openPopup = (e) => {
    e.preventDefault();
    overlay.classList.add("active");
    body.classList.add("overflow");
    popup.classList.add("active");
  };

  const closePopup = (e) => {
    e.preventDefault();
    overlay.classList.remove("active");
    body.classList.remove("overflow");
    popup.classList.remove("active");
  };

  openPopupBtn.forEach((item) => {
    item.addEventListener("click", openPopup);
  });

  [overlay, ...closePopupBtn].forEach((item) => {
    item.addEventListener("click", closePopup);
  });

  /* SET MIN HEIGHT TO ELEMENTS */

  const setMinHeight = (parent, children) => {
    const elements = document.querySelector(parent).querySelectorAll(children);

    const minHeight = Array.from(elements)
      .map((item) => {
        const itemMinHeight = item.getBoundingClientRect();
        return itemMinHeight.height;
      })
      .sort((a, b) => b - a)[0];
    
    if (window.innerWidth > 575) {
      elements.forEach((item) => (item.style.minHeight = `${minHeight}px`));
    } else {
      elements.forEach((item) => item.style.removeProperty("minHeight"));
    }

  };

  setMinHeight(".list-wrapper", "h2");
  setMinHeight('.benefits', 'h5')


  /* CHANGE BODY COLOR ON SCROLL */

  const listenChangeColor = () => {

    const sections = document.querySelectorAll('[data-color]');
    const offsetSections = Array.from(sections).map( item => {
      return {
        color: item.getAttribute('data-color'),
        offset: item.offsetTop
      }
    })

    window.addEventListener('scroll', () => {

      const setColor = offsetSections.filter(item => window.scrollY >= item.offset).at(-1).color
      const classListClear = ['blue', 'white', 'dark'].filter(item => item !== setColor)
      header.classList.remove(...classListClear)
      !header.classList.contains(setColor) && header.classList.add(setColor)

    })

  }

  listenChangeColor()

  /* ACCORDION PANEL */

  const accordionPanel = (accordionItem, accordionContent, activeClass) => {

    const selectors = document.querySelectorAll(`.${accordionItem}`);
    const contents = document.querySelectorAll(`.${accordionContent}`);

    selectors.forEach((item, index) => {
      item.addEventListener('click', () => {
        
        if(item.classList.contains(activeClass)) return 

        document.querySelector(`.${accordionContent}.${activeClass}`).classList.remove(activeClass)
        document.querySelector(`.${accordionItem}.${activeClass}`).classList.remove(activeClass)
        item.classList.add(activeClass)
        contents[index].classList.add(activeClass)

      })
    })

  }

  accordionPanel('accordion-item-titleWrapper', 'accordion-item-expanded', 'active')

});
