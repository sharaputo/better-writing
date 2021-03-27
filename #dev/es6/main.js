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

// Contact form validation
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#contact_form'),
    successPopup = document.querySelector('#contact_success'),
    warning = document.querySelector('.popup__error');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        removeWarning();
        form.reset();
        successPopup.classList.add('active');
      } else {
        alert('Error!');
      }
    } else {
      addWarning();
    }

    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];

        if (input.classList.contains('_email')) {
          if (emailCheck(input)) {
            formAddError(input);
            error++;
          }
        } else if (input.classList.contains('_phone')) {
          if (phoneCheck(input)) {
            formAddError(input);
            error++;
          }
        } else {
          if (input.value === '') {
            formAddError(input);
            error++;
          }
        }

        // Reset error state on input focus
        input.onfocus = function () {
          formRemoveError(input);
        };
      }

      return error;
    }

    function formAddError(input) {
      input.classList.add('_error');
    }
    function formRemoveError(input) {
      input.classList.remove('_error');
    }

    function addWarning() {
      warning.classList.add('_active');
    }
    function removeWarning() {
      warning.classList.remove('_active');
    }

    function emailCheck(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
    function phoneCheck(input) {
      return !/^[0-9]+$/.test(input.value);
    }
  }
});
