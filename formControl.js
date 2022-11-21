const formAction = (parent, successForm) => {
  const form = document.querySelector(parent);
  const usernameEl = form.querySelector("[name='username']");
  const emailEl = form.querySelector("[name='email']");
  const phoneEl = form.querySelector("[name='phone']");
  const countryEl = form.querySelector("[name='country']");
  const checkBoxEl = form.querySelector("[name='agree']");
  const submitBtn = form.querySelector("[name='submit']");
  const succesedForm = document.querySelector(successForm);
  const emailE = form.querySelector(".input-error");
  const phoneE = form.querySelector(".phone-error");
  const countryE = form.querySelector(".country-error");

  const checkUsername = () => {
    let valid = false;

    const min = 3,
      max = 25;

    const username = usernameEl.value.trim();

    if (!isBetween(username.length, min, max)) {
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  };

  phoneEl.addEventListener("focus", () => {
    if (!/^\+\d*$/.test(phoneEl.value)) phoneEl.value = "+";
  });

  phoneEl.addEventListener("keypress", (e) => {
    if (!/\d/.test(e.key)) e.preventDefault();
  });

  const checkPhone = () => {
    const min = 9,
      max = 19;
    const phone = phoneEl.value.trim();
    let isValidPhone = false;
    if (!isBetween(phone.length, min, max)) {
      isValidPhone = false;
    } else {
      isValidPhone = true;
    }
    return isValidPhone;
  };

  function phoneError() {
    if (checkPhone(phoneEl.value)) {
      phoneEl.style.borderColor = "#2CD652";
      phoneE.style.display = "none";
    } else {
      phoneEl.style.borderColor = "#EE8282";
      phoneE.style.display = "block";
    }
  }

  phoneEl.addEventListener("input", phoneError);

  const checkCheckBox = () => {
    let valid = checkBoxEl.checked;
    return valid;
  };

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (isRequired(email) && isEmailValid(email)) {
      valid = true;
    } else {
      valid = false;
    }
    return valid;
  };

  const checkCountry = () => Boolean(countryEl.value);

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return re.test(email);
  };

  function onInput() {
    if (isEmailValid(emailEl.value)) {
      emailEl.style.borderColor = "#2CD652";
      emailE.style.display = "none";
    } else {
      emailEl.style.borderColor = "#EE8282";
      emailE.style.display = "block";
    }
  }

  emailEl.addEventListener("input", onInput);

  //country Error
  function setCountryErr(countryEl, countryE) {
    countryE.style.display = "block";
    countryEl.style.borderColor = "#EE8282";
  }

  function removeCountryErr(countryEl, countryE) {
    countryEl.style.borderColor = "#fff";
    countryE.style.display = "none";
  }

  checkBoxEl.addEventListener("change", (event) => {
    if (event.target.checked && !countryEl.value) {
      setCountryErr(countryEl, countryE);
    } else {
      removeCountryErr(countryEl, countryE);
    }
  });

  const isRequired = (value) => (value === "" ? false : true);
  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  function formValidate() {
    let isUsernameValid = checkUsername(),
      isEmailValid = checkEmail(),
      isPhoneValid = checkPhone(),
      isCheckBoxValid = checkCheckBox(),
      isCheckCountry = checkCountry();

    let isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPhoneValid &&
      isCheckCountry &&
      isCheckBoxValid;

    if (isFormValid) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  [usernameEl, emailEl, phoneEl, countryEl, checkBoxEl].forEach((item) => {
    item.addEventListener("input", formValidate);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.disabled = true;
    setTimeout(() => (btn.disabled = false), 7000);
    sendPostData({
      email: emailEl.value,
      phone: phoneEl.value,
      username: usernameEl.value,
      country: countryEl.value,
    });
  });

  const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };

  form.addEventListener(
    "input",
    debounce((e) => {
      switch (e.target.id) {
        case "username":
          checkUsername();
          break;
        case "email":
          checkEmail();
          break;
        case "phone":
          checkPhone();
          break;
        case "country":
          checkCountry();
          break;
        case "checkbox":
          checkCheckBox();
          break;
        default:
          return;
      }
    })
  );

  async function sendPostData({ email, phone, username, country }) {
    try {
      const url =
        "https://docs.google.com/forms/u/3/d/e/1FAIpQLSdv8FyRCPxjLWyLHQt1xqAaNsTX6CxwB1ALLT66AbROFydNbg/formResponse";
      const formData = new FormData();
      formData.append("entry.724546656", username);
      formData.append("entry.369619181", email);
      formData.append("entry.1557246847", phone);
      formData.append("entry.1006869254", country);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      if (response) {
        form.reset();
        form.style.display = "none";
        succesedForm.style.display = "block";
      }
      setTimeout(
        () => (
          (succesedForm.style.display = "none"), (form.style.display = "flex")
        ),
        5000
      );
    } catch (err) {
      console.log("Виникла помилка при відправці!");
    }
  }

  const select = form.querySelector(".select-country");
  select.addEventListener("change", () => {
    if (select.value) {
      select.style.color = parent === ".footer-form" ? "#857dff" : "#fff";
      select
        .querySelectorAll("option")
        .forEach((opt) => (opt.style.color = "#7373b1"));
      removeCountryErr(countryEl, countryE);
    } else {
      select.style.color = "#7373b1";
    }
  });
};

formAction(".footer-form", ".footer-success");
formAction(".popup-form", ".popup-success");
