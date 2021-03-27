// Header transform effect
(function () {
  const header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.pageYOffset > 40) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  };
})();

//Modal window init
let popup = document.querySelector('.popup');

if (popup) {
  const popups = new HystModal({
    linkAttributeName: 'data-hystmodal',
  });
}
