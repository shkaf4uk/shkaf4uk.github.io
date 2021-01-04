let select = document.querySelector("#countries");

// Добавление в select Options
countries.map((country) => {
    let option = document.createElement('option');
    option.value = country.name;
    option.innerHTML = country.name;
    select.appendChild(option);
})

let inputPhone = document.querySelector("#input_phone");

function getCountry() {
    fetch('https://extreme-ip-lookup.com/json/')
        .then( res => res.json())
        .then(response => {
            countries.filter((option) => {
                if (option.country_code === response.countryCode) {
                    select.value = response.country.toUpperCase();
                    inputPhone.value = option.phone_code;
                }
            })
        })
        .catch((data) => {
            console.log('Request failed');
        })
}
getCountry();


//выбор телефона в зависимости от страны
const chooseCountry = () => {
    countries.filter(c => {
        if (select.value === c.name) {
            inputPhone.value = c.phone_code;
        }
    })
}

//форма для отправки
const form = document.querySelector('#send_form');
let Object = {};
if (form !== null) {
    form.onsubmit = (btn) => {
        btn.preventDefault();
        //запись в обьект
        let inputName = document.querySelector('#input_name');
        let inputEmail = document.querySelector('#input_email');
        Object.Name = inputName.value;
        Object.Email = inputEmail.value;
        Object.Phone = inputPhone.value;
        Object.Country = select.value;
        //замена формы на модальные окна старта
        let simulator = document.querySelector('.simulator');
        let simulatorBg = document.querySelector('.simulator_bg');
        let simulatorContainer = document.querySelector('.simulator_container');
        let simulatorStartContainer = document.querySelector('.simulator_start_container');
        simulatorContainer.style.display = 'none';
        simulatorStartContainer.style.display = 'block';
        if (simulator.offsetWidth > 320) {
            simulator.style.height = '885' + 'px';
            simulatorBg.style.height = '885' + 'px';
        }
    }
}

// модальное окно старта для начала опроса
const btn = document.querySelector('#btn_start_quiz');
if (btn !== null) {
    btn.onclick = (button) => {
        button.preventDefault();
        let simulatorStartContainer = document.querySelector('.simulator_start_container');
        let simulatorQuestions = document.querySelector('.simulator_questions');
        simulatorStartContainer.style.display = 'none';
        simulatorQuestions.style.display = 'block';
    }
}

// Изминение цвета иконки при наведении
let modalBorderDiv = document.querySelectorAll('.modal_border_div');
for (let i = 0; i < modalBorderDiv.length; i++) {
    makeHover(modalBorderDiv[i]);
}
function makeHover(item) {
    item.addEventListener("mouseover", function() {
        let arr = this.children[0].children
        Array.from(arr).map((value) => {
            value.attributes[1].value = '#4C1ED3';
        })
    });
    item.addEventListener("mouseout", function() {
        let arr = this.children[0].children
        Array.from(arr).map((value) => {
            value.attributes[1].value = '#8A919D';
        })
    });
}

// ОТПРАВКА ПЕРВОГО POST запроса
const btnFistPost = document.querySelectorAll('.btn_fist_post');
Array.from(btnFistPost).map(btn => {
    btn.onclick = async (btn) => {
        Object.Question_1 = btn.target.outerText;
        let simulatorFirstQuestionChange = document.querySelector('.simulator_first_question_change');
        let simulatorSecondQuestionChange = document.querySelector('.simulator_second_question_change');
        simulatorFirstQuestionChange.style.display = 'none';
        simulatorSecondQuestionChange.style.display = 'block';
        await fetch('https://some_url.com/send_obj_post1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Object)
        });
    }
})

// SECOND QUESTION
const btnSecondQuestion = document.querySelectorAll('.btn_second_question');
Array.from(btnSecondQuestion).map(SecBtn => {
    SecBtn.onclick = (SecBtn) => {
        delete Object.Name;
        delete Object.Country;
        delete Object.Email;
        delete Object.Phone;
        Object.Question_2 = SecBtn.target.outerText;
        let simulatorSecondQuestionChange = document.querySelector('.simulator_second_question_change');
        let simulatorThirdQuestionChange = document.querySelector('.simulator_third_question_change');
        simulatorSecondQuestionChange.style.display = 'none';
        simulatorThirdQuestionChange.style.display = 'block';
    }
})

// THIRD QUESTION
const btnThirdQuestion = document.querySelectorAll('.btn_third_question');
Array.from(btnThirdQuestion).map(ThirdBtn => {
    ThirdBtn.onclick = (ThirdBtn) => {
        Object.Question_3 = ThirdBtn.target.outerText;
        let simulatorThirdQuestionChange = document.querySelector('.simulator_third_question_change');
        let simulatorFourthQuestionChange = document.querySelector('.simulator_fourth_question_change');
        simulatorThirdQuestionChange.style.display = 'none';
        simulatorFourthQuestionChange.style.display = 'block';
        let first_question_modal_for_how = document.querySelector('#how_much_div');
        first_question_modal_for_how.style.marginBottom = '7' + 'px';
    }
})

// ОТПРАВКА ВТОРОГО POST запроса
const btnFourthQuestion = document.querySelectorAll('.btn_fourth_question');
Array.from(btnFourthQuestion).map(btn => {
    btn.onclick = async (btn) => {
        Object.Question_4 = btn.target.outerText;
        let simulatorFourthQuestionChange = document.querySelector('.simulator_fourth_question_change');
        let finishTest = document.querySelector('.finish_test');
        simulatorFourthQuestionChange.style.display = 'none';
        finishTest.style.display = 'block';
        await fetch('https://some_url.com/send_obj_post2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(Object)
        });
    }
})

// Валидация Email
let Email = $('#input_email').bind('keyup', function (event) {
    let str = Email.val();
    let firstRegExp = /^([^@\s\]\[\\/,/.]{1,128})$/;
    let secondRegExp = /^([^@\s\]\[\\/,/.]{1,128})@$/;
    let thirdRegExp = /^([^@\s\]\[\\/,/.]{1,128})@([^@\s\]\[\\/./,]{1,40})$/;
    let fourRegExp = /^([^@\s\]\[\\/,/.]{1,128})@([^@\s\]\[\\/./,]{1,40})\.$/;
    let fifthRegExp = /^([^@\s\]\[\\/,/.]{1,128})@([^@\s\]\[\\/./,]{1,40})\.([^@\s\]\[\\/,/.]{1,5})$/;
    if (!fifthRegExp.test(str) && !fourRegExp.test(str) && !thirdRegExp.test(str) && !secondRegExp.test(str) && !firstRegExp.test(str)) {
        $('#input_email').val(str.substr(0, str.length - 1));
    }
});

// Валидация Phone
let Phone = $('#input_phone').bind('keyup', function (event) {
    let phone = Phone.val();
    let regex = /^[+/0-9]{1,3}[-\s./0-9]*$/g;
    if(!regex.test(phone)) {
        $('#input_phone').val(phone.substr(0, phone.length - 1));
    }
})
