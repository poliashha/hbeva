function startCountdown(targetDate) {
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("timer").style.display = "none";
            document.getElementById("datetime").textContent = "Мы стали семьей!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

const newYear = new Date(2026, 4, 21, 17, 0, 0).getTime();
startCountdown(newYear);

const scriptURL =
    "https://script.google.com/macros/s/AKfycbx0HywtHSf9SaDFqM8Jcx96zuhhhN6NGk7l4DYCPDHvdT-_FLSD4LupJd1MOgCPl_bG/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const formSendResult = document.querySelector(".form-send");
    formSendResult.textContent = "";
    const drinks = formData.getAll("drinks");
    const submitButton = document.querySelector(".button");
    const submitButtontext = document.querySelector(".button");
    submitButtontext.textContent = "Отправка...";

    const drinksString = drinks.join(", ");

    // Создаем новый FormData и добавляем все поля
    const newFormData = new FormData();
    newFormData.append("name", formData.get("name"));
    newFormData.append("presence", formData.get("presence"));

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            body: newFormData,
        });
        formSendResult.textContent = "Спасибо! Анкета отправлена.";
        form.reset(); // Очищаем форму
    } catch (error) {
        formSendResult.textContent = "Повторите попытку позже.";
        console.error(error);
    } finally {
        // Возвращаем кнопку в исходное состояние
        submitButtontext.textContent = "Подтвердить присутвие";
    }
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
    event.preventDefault();
    if (this.validity.valueMissing) {
        errorElement.classList.add("show");
    }
});

nameInput.addEventListener("input", function () {
    if (this.value.trim() !== "") {
        errorElement.classList.remove("show");
    }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
    radio.addEventListener("invalid", function (e) {
        e.preventDefault();
        document.getElementById("presenceError").classList.add("show");
        return false;
    });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        document.getElementById("presenceError").classList.remove("show");
    });
});

const button = document.querySelector(".button");
button.addEventListener("touchstart", function (e) {
    this.classList.add("touch-pressed");
});

button.addEventListener("touchend", function (e) {
    this.classList.remove("touch-pressed");
});

function initScrollAnimation() {
    const containers = document.querySelectorAll(".conteiner");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    });
    containers.forEach((container) => {
        observer.observe(container);
    });
}
document.addEventListener("DOMContentLoaded", initScrollAnimation);
document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.getElementById('envelope');
    const mainContent = document.getElementById('mainContent');

    document.body.classList.add('no-scroll');

    envelope.addEventListener('click', function () {
        envelope.classList.add('hide');

        setTimeout(() => {
            envelope.style.display = 'none';
            mainContent.style.display = 'block';
            document.body.classList.remove('no-scroll');
        }, 1000);
    });
});