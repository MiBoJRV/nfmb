document.addEventListener("DOMContentLoaded", () => {

    const radioInputs = document.querySelectorAll(".select-box__input");

    radioInputs.forEach(input => {
        input.addEventListener("change", () => {
            radioInputs.forEach(otherInput => otherInput.removeAttribute("checked"));
            input.setAttribute("checked", "checked");
        });
    });


    const stepper = document.querySelector('.stepper');
    // const dotsContainer = document.getElementById('dotsContainer');
    const dotsContainer = document.querySelector('.dots-container');
    const dots = dotsContainer.querySelectorAll('.dot');
    const stepText = document.querySelector('.current-step');
    const selectedValues = {};

    let currentStep = 1;

    const updateStepText = () => {
        const totalSteps = 6;
        const displayedStep = currentStep;

        stepText.textContent = `${displayedStep}/${totalSteps}`;
    };

    const updateDots = () => {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentStep);
        });
    };

    const showHideDots = () => {
        dotsContainer.style.display = /*currentStep === 1 ||*/ currentStep === 7 ? 'none' : 'flex';
    };

    const navigateToSlide = (slide) => {
        const slides = document.querySelectorAll('.step');

        if (slides[slide - 1]) {
            if (currentStep === 6 && slide === 7) {
                console.log("Saved data:", JSON.stringify(selectedValues));
            }

            slides.forEach((s) => {
                s.classList.remove('active');
            });

            slides[slide - 1].classList.add('active');

            currentStep = slide;
            updateStepText();
            updateDots();
            showHideDots();
        }
    };

    const saveSelectedValue = function () {
        const h3Text = this.closest('.step').querySelector('h3').textContent;
        selectedValues[h3Text] = this.textContent;


        // Додайте клас 'active' до обраного li
        this.classList.add('active');

        // Видаліть клас 'active' у сусідніх li
        const siblings = Array.from(this.parentNode.children);
        siblings.forEach((sibling) => {
            if (sibling !== this) {
                sibling.classList.remove('active');
            }
        });
    };

    // stepper.addEventListener('click', (event) => {
    //     const target = event.target;
    //
    //     // if (target.tagName === 'A' && target.id === 'nextButton') {
    //     //     navigateToSlide(2);
    //     // } else if (target.tagName === 'LI' && currentStep !== 7) {
    //     //     saveSelectedValue.call(target);
    //     //     navigateToSlide(currentStep + 1);
    //     // }
    //
    //     if (target.tagName === 'A' && target.id === 'nextButton') {
    //         if (target.tagName === 'LI.active' && currentStep !== 7) {
    //
    //             navigateToSlide(currentStep + 1);
    //         }
    //         saveSelectedValue.call(target);
    //     }
    // });

    // stepper.addEventListener('click', (event) => {
    //     const target = event.target;
    //
    //     if (target.tagName === 'A' && target.classList.contains('next-button')) {
    //         const activeLi = document.querySelector('li.active');
    //         console.log(activeLi)
    //         if (activeLi && currentStep !== 7) {
    //             navigateToSlide(currentStep + 1);
    //             saveSelectedValue.call(activeLi);
    //         }
    //     } else if (target.tagName === 'LI' && !target.classList.contains('active')) {
    //         saveSelectedValue.call(target);
    //     }
    // });


    // function getCurrentStep() {
    //     // Отримати поточний крок з вашого додатка
    //     // Наприклад, якщо ви зберігаєте поточний крок у змінній
    //     return currentStep;
    // }
    // stepper.addEventListener('click', (event) => {
    //     const target = event.target;
    //     const currentStep = getCurrentStep(); // Отримуємо поточний крок
    //
    //     if (target.tagName === 'A' && target.classList.contains('next-button')) {
    //         const activeLi = getCurrentStepActiveLi(currentStep); // Отримуємо активний елемент на поточному кроці
    //
    //         if (activeLi && currentStep !== 7) {
    //             navigateToSlide(currentStep + 1);
    //             saveSelectedValue.call(activeLi);
    //         }
    //     } else if (target.tagName === 'LI' && !target.classList.contains('active')) {
    //         saveSelectedValue.call(target);
    //     }
    // });
    //
    // function getCurrentStepActiveLi(step) {
    //     const stepContainer = document.querySelector(`.step-${step}`);
    //     return stepContainer.querySelector('li.active');
    // }

    function getCurrentStep() {
        // Отримати поточний крок з вашого додатка
        // Наприклад, якщо ви зберігаєте поточний крок у змінній
        return currentStep;
    }

    stepper.addEventListener('click', (event) => {
        const target = event.target;
        const currentStep = getCurrentStep(); // Отримуємо поточний крок
        const errorMessage = document.querySelector(`.step-${currentStep} .error-message`);

        if (target.tagName === 'A' && target.classList.contains('next-button')) {
            const activeLi = getCurrentStepActiveLi(currentStep); // Отримуємо активний елемент на поточному кроці

            if (activeLi && currentStep !== 7) {
                navigateToSlide(currentStep + 1);
                saveSelectedValue.call(activeLi);
                errorMessage.textContent = ''; // Очищаємо повідомлення про помилку
            } else {
                errorMessage.textContent = 'Please choose one of the answer options'; // Виводимо повідомлення про помилку
            }
        } else if (target.tagName === 'LI' && !target.classList.contains('active')) {
            saveSelectedValue.call(target);
            errorMessage.textContent = ''; // Очищаємо повідомлення про помилку
        }
    });

    function getCurrentStepActiveLi(step) {
        const stepContainer = document.querySelector(`.step-${step}`);
        return stepContainer.querySelector('li.active');
    }


    // stepper.addEventListener('click', (event) => {
    //     const target = event.target;
    //
    //     if (target.tagName === 'A' && target.id === 'startButton') {
    //         navigateToSlide(2);
    //     } else if (target.tagName === 'LI' && currentStep !== 5) {
    //         saveSelectedValue.call(target);
    //         navigateToSlide(currentStep + 1);
    //     }
    // });


    dotsContainer.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName === 'SPAN' && !target.classList.contains('active')) {
            const slide = Array.from(dots).indexOf(target) + 2;
            navigateToSlide(slide);
        }
    });

    updateStepText();
    updateDots();
    showHideDots();


    const form = document.querySelector('form.dr-form');

    function getFormElements(form) {
        const firstNameField = form.querySelector('.form__input.first-name');
        const lastNameField = form.querySelector('.form__input.last-name');
        const emailField = form.querySelector('.form__input.email');
        const phoneField = form.querySelector('.form__input.phone');
        // const areaCodeField = form.querySelector('.form__input.area_code');
        const areaCodeField = form.querySelector('.phone-input .select-box__input:checked');

        return {
            firstNameField,
            lastNameField,
            emailField,
            phoneField,
            areaCodeField
        };
    }

    function sendLeadData(event, form, formElements, selectedValues) {
        event.preventDefault();
        const firstName = formElements.firstNameField.value;
        const lastName = formElements.lastNameField.value;
        const email = formElements.emailField.value;
        const phone = formElements.phoneField.value;
        // const areaCodeField = formElements.areaCodeField.value;
        // const countryCode = '420';

        const checkedRadio = document.querySelector('.select-box__input:checked');
        const areaCodeField = checkedRadio ? checkedRadio.value : '';

        const fullNumber = `${areaCodeField}${phone}`;

        const data = {
            ApiKey: 'TnpRek1sODFNVEJmTnpRek1sOD0=',
            ApiPassword: 'c8UAV7s6G8',
            CampaignID: '11230',
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: fullNumber,
            Page: 'afc',
            Description: JSON.stringify(Object.values(selectedValues)),
        };


        const apiUrl = 'https://tracker.pablo.partners/repost.php?act=register';

        function encodeFormData(data) {
            return Object.keys(data)
                .map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                })
                .join('&')
        }

        fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeFormData(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('response received successfully! ');
                    navigateToSlide(8);
                    return response.json();
                } else {
                    throw new Error('Failed to send lead data');
                }
            })
            .then(responseJson => {

                // if (responseJson.ret_code !== 'OK') {
                //     console.log('Не OK')
                //     const message = document.querySelector('.message');
                //     message.textContent = responseJson.ret_message;
                // } else {
                //     navigateToSlide(8);
                // }


                // const message = document.querySelector('.message');
                // message.textContent = responseJson.ret_message;

                // if (responseJson.ret_code !== '404') {
                //     window.location.href = 'thank-you.html';
                //     const redirectUrl = responseJson.url;
                //     window.location.href = redirectUrl;
                //
                //     localStorage.setItem('responseJson', JSON.stringify(responseJson));
                //     window.location.href = 'thank-you.html';
                //
                //     const redirectUrl = responseJson.url;
                //     window.location.href = redirectUrl;
                //
                //     new Promise(resolve => setTimeout(resolve, 1000))
                //         .then(() => {
                //             const redirectUrl = responseJson.url;
                //             window.location.href = redirectUrl;
                //         });
                // } else {
                //     console.log('Problem with redirect.');
                // }
            })
            .catch(error => {
                console.error('An error occurred:', error.message);
            });
    }

    // const formElements = getFormElements(form);

    const submitBtns = document.querySelectorAll('.main-form-btn');

    // const submitBtn = document.querySelector('.main-form-btn');
    submitBtns.forEach(submitBtn => {
        submitBtn.addEventListener('click', (event) => {
            console.log('click', submitBtn);
            event.preventDefault();

            const form = submitBtn.closest('form.dr-form');
            const formElements = getFormElements(form);
            let isValid;
            ////////////////////////////
            const validForm = () => {
                const firstName = formElements.firstNameField.value;
                const lastName = formElements.lastNameField.value;
                const email = formElements.emailField.value;
                const phone = formElements.phoneField.value;

                const firstNameError = document.querySelector('.error.f-name');
                const lastNameError = document.querySelector('.error.l-name');
                const emailError = document.querySelector('.error.email');
                const phoneError = document.querySelector('.error.tel');

                const isNotEmpty = (value) => value.trim() !== '';
                const isMinLength = (value, minLength) => value.length >= minLength;
                const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                const isPhoneValid = (phone) => /^\d+$/.test(phone);

                const isValidFirstName = isNotEmpty(firstName) && isMinLength(firstName, 2);
                const isValidLastName = isNotEmpty(lastName) && isMinLength(lastName, 2);
                const isValidEmail = isNotEmpty(email) && isEmailValid(email);
                const isValidPhone = isNotEmpty(phone) && isPhoneValid(phone);

                if (!isValidFirstName) {
                    firstNameError.style.display = 'block'
                }

                if (!isValidLastName) {
                    lastNameError.style.display = 'block'
                }

                if (!isValidEmail) {
                    emailError.style.display = 'block'
                }

                if (!isValidPhone) {
                    phoneError.style.display = 'block';
                }


                isValid = isValidFirstName && isValidLastName && isValidEmail && isValidPhone;
                return isValid;
            };
            validForm();
            ////////////////////////////

            if (isValid) {
                // document.querySelector(".loader-sub").style.display = "flex";
                const spinner = document.querySelector(".loader-spinner ");
                // spinner.style.display = "flex";
                submitBtn.innerHTML = '<div id="loader-spinner" class="loader-spinner"></div>';
                submitBtn.disabled = true;
                const countdownElement = document.getElementById('countdown');
                let seconds = 5;

                // Disable back button
                // window.history.pushState(null, null, window.location.href);
                // window.onpopstate = function () {
                //     window.history.pushState(null, null, window.location.href);
                // };

                const updateCountdown = () => {
                    countdownElement.textContent = seconds;
                    if (seconds === 0) {
                        // document.getElementById('loader-sub').style.display = 'none';
                        document.getElementById('loader-spinner').style.display = 'none';
                        submitBtn.textContent = 'START RECOVERY'
                        // Re-enable back button
                        window.onpopstate = null;
                    } else {
                        seconds--;
                        setTimeout(updateCountdown, 1000);
                    }
                };

                setTimeout(updateCountdown, 1000);


                event.preventDefault();
                sendLeadData(event, form, formElements, selectedValues);

            }

        });
    });

    // form.addEventListener('submit', (event) => {
    //     document.querySelector(".loader-sub").style.display = "flex";
    //     const countdownElement = document.getElementById('countdown');
    //     let seconds = 3;
    //
    //     const updateCountdown = () => {
    //         countdownElement.textContent = seconds;
    //         if (seconds === 0) {
    //             document.getElementById('loader-sub').style.display = 'none';
    //         } else {
    //             seconds--;
    //             setTimeout(updateCountdown, 1000);
    //         }
    //     };
    //
    //     setTimeout(updateCountdown, 1000);
    //     console.log('click');
    //     event.preventDefault();
    //
    //     sendLeadData(event, form, formElements);
    // });

});


// -----------------------


    document.addEventListener("DOMContentLoaded", () => {

        const radioInputs = document.querySelectorAll(".select-box__input");

        radioInputs.forEach(input => {
            input.addEventListener("change", () => {
                radioInputs.forEach(otherInput => otherInput.removeAttribute("checked"));
                input.setAttribute("checked", "checked");
            });
        });


        const stepper = document.querySelector('.stepper');
        // const dotsContainer = document.getElementById('dotsContainer');
        const dotsContainer = document.querySelector('.dots-container');
        const dots = dotsContainer.querySelectorAll('.dot');
        const stepText = document.querySelector('.current-step');
        const selectedValues = {};

        let currentStep = 1;

        const updateStepText = () => {
            const totalSteps = 6;
            const displayedStep = currentStep;

            stepText.textContent = `${displayedStep}/${totalSteps}`;
        };

        const updateDots = () => {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentStep);
            });
        };

        const showHideDots = () => {
            dotsContainer.style.display = /*currentStep === 1 ||*/ currentStep === 7 ? 'none' : 'flex';
        };

        const navigateToSlide = (slide) => {
            const slides = document.querySelectorAll('.step');

            if (slides[slide - 1]) {
                if (currentStep === 6 && slide === 7) {
                    console.log("Saved data:", JSON.stringify(selectedValues));
                }

                slides.forEach((s) => {
                    s.classList.remove('active');
                });

                slides[slide - 1].classList.add('active');

                currentStep = slide;
                updateStepText();
                updateDots();
                showHideDots();
            }
        };

        const saveSelectedValue = function () {
            const h3Text = this.closest('.step').querySelector('h3').textContent;
            selectedValues[h3Text] = this.textContent;


            // Додайте клас 'active' до обраного li
            this.classList.add('active');

            // Видаліть клас 'active' у сусідніх li
            const siblings = Array.from(this.parentNode.children);
            siblings.forEach((sibling) => {
                if (sibling !== this) {
                    sibling.classList.remove('active');
                }
            });
        };


        function getCurrentStep() {
            // Отримати поточний крок з вашого додатка
            // Наприклад, якщо ви зберігаєте поточний крок у змінній
            return currentStep;
        }

        stepper.addEventListener('click', (event) => {
            const target = event.target;
            const currentStep = getCurrentStep(); // Отримуємо поточний крок
            const errorMessage = document.querySelector(`.step-${currentStep} .error-message`);

            if (target.tagName === 'A' && target.classList.contains('next-button')) {
                const activeLi = getCurrentStepActiveLi(currentStep); // Отримуємо активний елемент на поточному кроці

                if (activeLi && currentStep !== 7) {
                    navigateToSlide(currentStep + 1);
                    saveSelectedValue.call(activeLi);
                    errorMessage.textContent = ''; // Очищаємо повідомлення про помилку
                } else {
                    errorMessage.textContent = 'Please choose one of the answer options'; // Виводимо повідомлення про помилку
                }
            } else if (target.tagName === 'LI' && !target.classList.contains('active')) {
                saveSelectedValue.call(target);
                errorMessage.textContent = ''; // Очищаємо повідомлення про помилку
            }
        });

        function getCurrentStepActiveLi(step) {
            const stepContainer = document.querySelector(`.step-${step}`);
            return stepContainer.querySelector('li.active');
        }


        dotsContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.tagName === 'SPAN' && !target.classList.contains('active')) {
                const slide = Array.from(dots).indexOf(target) + 2;
                navigateToSlide(slide);
            }
        });

        updateStepText();
        updateDots();
        showHideDots();


        const form = document.querySelector('form.dr-form');

        function getFormElements(form) {
            try {
                const firstNameField = form.querySelector('.form__input.first-name');
                const lastNameField = form.querySelector('.form__input.last-name');
                const emailField = form.querySelector('.form__input.email');
                const phoneField = form.querySelector('.form__input.phone');

                if (!firstNameField || !lastNameField || !emailField || !phoneField) {
                    throw new Error("One or more form fields are missing.");
                }

                return {
                    firstNameField,
                    lastNameField,
                    emailField,
                    phoneField,
                };
            } catch (error) {
                console.error(error.message);
                return null;
            }
        }


        function sendLeadData(event, form, formElements, selectedValues) {
            event.preventDefault();
            const firstName = formElements.firstNameField.value;
            const lastName = formElements.lastNameField.value;
            const email = formElements.emailField.value;
            const phone = formElements.phoneField.value;
            // const areaCodeField = formElements.areaCodeField.value;
            // const countryCode = '420';

            const checkedRadio = document.querySelector('.select-box__input:checked');
            const areaCodeField = checkedRadio ? checkedRadio.value : '';

            const fullNumber = `${areaCodeField}${phone}`;

            const data = {
                ApiKey: 'TnpRek1sODFNVEJmTnpRek1sOD0=',
                ApiPassword: 'c8UAV7s6G8',
                CampaignID: '11230',
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                PhoneNumber: fullNumber,
                Page: 'afc',
                Description: JSON.stringify(Object.values(selectedValues)),
            };


            const apiUrl = 'https://tracker.pablo.partners/repost.php?act=register';

            function encodeFormData(data) {
                return Object.keys(data)
                    .map(function (key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                    })
                    .join('&')
            }

            fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encodeFormData(data)
            })
                .then(response => {
                    if (response.ok) {
                        console.log('response received successfully! ');
                        navigateToSlide(8);
                        return response.json();
                    } else {
                        throw new Error('Failed to send lead data');
                    }
                })
                .then(responseJson => {
                })
                .catch(error => {
                    console.error('An error occurred:', error.message);
                });
        }

        // const formElements = getFormElements(form);

        const submitBtns = document.querySelectorAll('.main-form-btn');

        // const submitBtn = document.querySelector('.main-form-btn');
        submitBtns.forEach(submitBtn => {
            submitBtn.addEventListener('click', (event) => {
                console.log('click', submitBtn);
                event.preventDefault();

                const form = submitBtn.closest('form.dr-form');
                const formElements = getFormElements(form);

                const validForm = (form, formElements) => {

                    const firstName = formElements.firstNameField.value;
                    const lastName = formElements.lastNameField.value;
                    const email = formElements.emailField.value;
                    const phone = formElements.phoneField.value;

                    const firstNameError = form.querySelector('.error.f-name');
                    const lastNameError = form.querySelector('.error.l-name');
                    const emailError = form.querySelector('.error.email');
                    const phoneError = form.querySelector('.error.tel');

                    const isNotEmpty = (value) => value.trim() !== '';
                    const isMinLength = (value, minLength) => value.length >= minLength;
                    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                    const isPhoneValid = (phone) => /^\d+$/.test(phone);

                    const isValidFirstName = isNotEmpty(firstName) && isMinLength(firstName, 2);
                    const isValidLastName = isNotEmpty(lastName) && isMinLength(lastName, 2);
                    const isValidEmail = isNotEmpty(email) && isEmailValid(email);
                    const isValidPhone = isNotEmpty(phone) && isPhoneValid(phone);

                    if (!isValidFirstName) {
                        firstNameError.style.display = 'block'
                    } else {
                        firstNameError.style.display = 'none'
                    }

                    if (!isValidLastName) {
                        lastNameError.style.display = 'block'
                    } else {
                        lastNameError.style.display = 'none'
                    }

                    if (!isValidEmail) {
                        emailError.style.display = 'block'
                    } else {
                        emailError.style.display = 'none'
                    }

                    if (!isValidPhone) {
                        phoneError.style.display = 'block';
                    } else {
                        phoneError.style.display = 'none';
                    }

                    const isValid = isValidFirstName && isValidLastName && isValidEmail && isValidPhone;
                    return isValid;
                };

                const isValid = validForm(form, formElements);
                ////////////////////////////


                validForm(form, formElements);
                ////////////////////////////

                if (isValid) {
                    // document.querySelector(".loader-sub").style.display = "flex";
                    const spinner = form.querySelector(".loader-spinner ");
                    // spinner.style.display = "flex";
                    submitBtn.innerHTML = '<div id="loader-spinner" class="loader-spinner"></div>';
                    submitBtn.disabled = true;
                    const countdownElement = form.getElementById('countdown');
                    let seconds = 5;

                    // Disable back button
                    // window.history.pushState(null, null, window.location.href);
                    // window.onpopstate = function () {
                    //     window.history.pushState(null, null, window.location.href);
                    // };

                    const updateCountdown = () => {
                        countdownElement.textContent = seconds;
                        if (seconds === 0) {
                            // document.getElementById('loader-sub').style.display = 'none';
                            form.getElementById('loader-spinner').style.display = 'none';
                            submitBtn.textContent = 'START RECOVERY'
                            // Re-enable back button
                            window.onpopstate = null;
                        } else {
                            seconds--;
                            setTimeout(updateCountdown, 1000);
                        }
                    };

                    setTimeout(updateCountdown, 1000);


                    event.preventDefault();
                    sendLeadData(event, form, formElements, selectedValues);

                }

            });
        });


    });








