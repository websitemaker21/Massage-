// ================= إعدادات الموقع =================

// الباسورد
const PASSWORD = "yara";

// تاريخ أول مقابلة
// غيّر التاريخ ده للتاريخ الحقيقي
const firstMeetingDate = new Date("October 22, 2016 20:00:00");


// ================= شاشة الباسورد =================

function checkPassword() {

    const input = document.getElementById("passwordInput");
    const message = document.getElementById("passwordMessage");

    if (input.value === PASSWORD) {

        document.getElementById("loginScreen").style.display = "none";

        document.getElementById("mainContent").classList.remove("hidden");

        document.body.style.overflowX = "hidden";

        startCounter();

    } else {

        message.textContent = "الباسورد غلط 😭❤️";

        input.classList.remove("wrong");

        void input.offsetWidth;

        input.classList.add("wrong");

        input.value = "";
        input.focus();
    }
}


// السماح بالضغط على Enter بدل زر الدخول
document.getElementById("passwordInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkPassword();
    }

});


// ================= عداد الوقت =================

function startCounter() {

    updateCounter();

    setInterval(updateCounter, 1000);

}


function updateCounter() {

    const now = new Date();

    let difference = now - firstMeetingDate;

    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor((totalSeconds % 86400) / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;


    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}


// ================= الموسيقى =================

const music = document.getElementById("music");

const musicButton = document.getElementById("musicButton");


function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(function() {

                musicButton.textContent = "⏸";

            })
            .catch(function() {

                alert("حط ملف الأغنية باسم music.mp3 جنب ملفات الموقع ❤️");

            });

    } else {

        music.pause();

        musicButton.textContent = "▶";

    }

}


// لما الأغنية تخلص
music.addEventListener("ended", function() {

    musicButton.textContent = "▶";

});


// ================= قلوب عند الضغط =================

document.addEventListener("click", function(event) {

    if (event.target.tagName === "BUTTON") {
        createHeart(event.clientX, event.clientY);
    }

});


function createHeart(x, y) {

    const heart = document.createElement("div");

    heart.textContent = "❤️";

    heart.style.position = "fixed";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.fontSize = "22px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);


    let position = 0;
    let opacity = 1;
    let scale = 1;


    const animation = setInterval(function() {

        position += 2;
        opacity -= 0.025;
        scale += 0.01;

        heart.style.transform =
            "translateY(-" + position + "px) scale(" + scale + ")";

        heart.style.opacity = opacity;


        if (opacity <= 0) {

            clearInterval(animation);

            heart.remove();

        }

    }, 30);

}


// ================= تكبير الصور =================

const photos = document.querySelectorAll(".photo-card img");


photos.forEach(function(photo) {

    photo.style.cursor = "pointer";

    photo.addEventListener("click", function() {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.background = "rgba(0,0,0,0.85)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.padding = "20px";
        overlay.style.zIndex = "10000";
        overlay.style.cursor = "pointer";


        const image = document.createElement("img");

        image.src = photo.src;

        image.style.maxWidth = "95%";
        image.style.maxHeight = "90vh";
        image.style.objectFit = "contain";
        image.style.borderRadius = "15px";


        overlay.appendChild(image);

        document.body.appendChild(overlay);


        overlay.addEventListener("click", function() {

            overlay.remove();

        });

    });

});


// ================= ظهور الأقسام أثناء النزول =================

const cards = document.querySelectorAll(".section-card, .final-card");


const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});


cards.forEach(function(card) {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(card);

});


// ================= رسالة ترحيب بسيطة =================

window.addEventListener("load", function() {

    console.log("Love website loaded ❤️");

});
