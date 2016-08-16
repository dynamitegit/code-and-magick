'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formElem = document.querySelector('.review-form');
  var formRatingElems = formElem.querySelectorAll('input[name="review-mark"]');
  var formNameField = formElem.querySelector('#review-name');
  var formReviewField = formElem.querySelector('#review-text');
  var formSubmitBtn = formElem.querySelector('.review-submit');
  var formNameLabel = formElem.querySelector('.review-fields-name');
  var formReviewLabel = formElem.querySelector('.review-fields-text');
  var formReviewFields = formElem.querySelector('.review-fields');

  var form = {
    onClose: null,

    rating: null,

    minRating: 3,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    setRating: function() {
      [].forEach.call(formRatingElems, function(star) {
        if (star.checked) {
          form.rating = star.value;
        }
      });
    },

    isRatingNormal: function() {
      return form.rating >= form.minRating;
    },

    isNameSet: function() {
      return formNameField.value !== '' ? true : false;
    },

    isReviewSet: function() {
      return formReviewField.value !== '' ? true : false;
    },

    enable: function() {
      formSubmitBtn.disabled = false;
    },

    disable: function() {
      formSubmitBtn.disabled = true;
    },

    validate: function() {
      form.setRating();

      if (form.isNameSet() && form.isReviewSet()) {
        formReviewFields.style.display = 'none';
        form.enable();
      } else {
        formReviewFields.removeAttribute('style');
        form.disable();
      }

      if (form.isNameSet()) {
        formNameLabel.style.display = 'none';
      } else {
        formNameLabel.removeAttribute('style');
      }

      if (form.isRatingNormal()) {
        formReviewLabel.style.display = 'none';
        if (form.isNameSet()) {
          formReviewFields.style.display = 'none';
          form.enable();
        } else {
          formReviewFields.removeAttribute('style');
          form.disable();
        }
      } else {
        formReviewLabel.removeAttribute('style');

        if (form.isReviewSet()) {
          formReviewLabel.style.display = 'none';
        } else {
          formReviewLabel.removeAttribute('style');
        }
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  formNameField.oninput = function() {
    form.validate();
  };

  formReviewField.oninput = function() {
    form.validate();
  };

  [].forEach.call(formRatingElems, function(star) {
    star.onchange = function() {
      form.validate();
    };
  });

  form.validate();

  return form;
})();
