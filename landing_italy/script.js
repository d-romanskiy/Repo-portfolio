function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            
            // ПЕРЕВІРКА: Якщо це блок лічильника і він ще не рахував
            if (reveals[i].classList.contains("hero-counter") && !reveals[i].classList.contains("counted")) {
                reveals[i].classList.add("counted"); // Помітка, щоб не запускати повторно
                animateCounter();
            }
        }
    }
}

// Функція плавного набігання цифр
function animateCounter() {
    const counter = document.getElementById("population-count");
    if (!counter) return;

    const target = parseInt(counter.getAttribute("data-target"), 10);
    const duration = 2200; // Тривалість анімації в мілісекундах (2.2 секунди)
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            
            // Математичний ефект сповільнення швидкості під кінець (Ease Out Cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(easeOut * target);
            
            // Форматуємо число з гарними пробілами (58 940 000)
            counter.innerText = currentNumber.toLocaleString('uk-UA');
            
            requestAnimationFrame(updateNumber);
        } else {
            // В кінці чітко ставимо фінальне число
            counter.innerText = target.toLocaleString('uk-UA');
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Запуск перевірки при завантаженні сторінки
window.onload = function() {
    setTimeout(reveal, 100);
};

// Запуск перевірки при скролі
window.addEventListener("scroll", reveal);