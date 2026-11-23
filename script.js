/* =====================================
   BUBU BIRTHDAY WEBSITE
   COMPLETE JAVASCRIPT
===================================== */


/* =====================================
   ELEMENTS
===================================== */

const screens = document.querySelectorAll(".screen");

const music = document.getElementById("birthdayMusic");

const openGift = document.getElementById("openGift");

const backgroundHearts = document.getElementById("backgroundHearts");


/* =====================================
   SCREEN NAVIGATION
===================================== */

function showScreen(screenId) {

    const currentScreen = document.querySelector(".screen.active");
    const nextScreen = document.getElementById(screenId);

    if (!nextScreen || currentScreen === nextScreen) return;

    if (currentScreen) {

        currentScreen.classList.add("leaving");

        setTimeout(() => {

            currentScreen.classList.remove("active");
            currentScreen.classList.remove("leaving");

        }, 650);

    }

    setTimeout(() => {

        nextScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, currentScreen ? 300 : 0);

}


/* =====================================
   BACKGROUND FLOATING HEARTS
===================================== */

function createFloatingHearts() {

    if (!backgroundHearts) return;

    for (let i = 0; i < 18; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.innerHTML = Math.random() > 0.5 ? "♡" : "♥";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize = (14 + Math.random() * 20) + "px";

        heart.style.animationDuration = (9 + Math.random() * 12) + "s";

        heart.style.animationDelay = (Math.random() * 10) + "s";

        backgroundHearts.appendChild(heart);

    }

}

createFloatingHearts();


/* =====================================
   MUSIC + GIFT OPENING
===================================== */

let musicStarted = false;

openGift.addEventListener("click", async function () {

    if (openGift.classList.contains("opened")) return;

    openGift.classList.add("opened");

    // Music starts automatically on first gift click
    if (!musicStarted) {

        try {

            await music.play();

            musicStarted = true;

        } catch (error) {

            console.log("Music could not start:", error);

        }

    }

    setTimeout(() => {

        showScreen("birthdayScreen");

        launchConfetti();

    }, 1100);

});


/* =====================================
   SCREEN 2 - CONTINUE
===================================== */

document.getElementById("continueToBalloons")
    .addEventListener("click", function () {

        showScreen("balloonScreen");

    });


/* =====================================
   SCREEN 3 - BALLOONS
===================================== */

const balloons = document.querySelectorAll(".balloon");

const balloonWords = [
    "A LITTLE",
    "SURPRISE",
    "FOR",
    "YOU"
];

let poppedBalloons = 0;

balloons.forEach((balloon, index) => {

    balloon.addEventListener("click", function () {

        if (balloon.classList.contains("popped")) return;

        balloon.classList.add("popped");

        poppedBalloons++;

        // Show word at the balloon's position
        document.getElementById("word" + index).textContent =
            balloonWords[index];

        // Small confetti celebration
        createMiniConfetti();

        if (poppedBalloons === 4) {

            setTimeout(() => {

                document.getElementById("surpriseReveal")
                    .classList.add("show");

                launchConfetti();

            }, 600);

        }

    });

});


/* =====================================
   CONTINUE TO MEMORIES
===================================== */

document.getElementById("continueToMemories")
    .addEventListener("click", function () {

        showScreen("memoriesScreen");

        currentMemory = 0;

        displayMemory();

    });


/* =====================================
   SCREEN 4 - MEMORY SLIDESHOW
===================================== */

const memories = [

    {
        image: "memory-1.jpg",
        number: "MEMORY 01",
        title: "First Meeting",
        description: "The day our beautiful story began. ❤️"
    },

    {
        image: "memory-2.jpg",
        number: "MEMORY 02",
        title: "Our Roka",
        description: "The beginning of forever together. 💍"
    },

    {
        image: "memory-3.jpg",
        number: "MEMORY 03",
        title: "Engagement",
        description: "One step closer to our forever. ❤️"
    },

    {
        image: "memory-4.jpg",
        number: "MEMORY 04",
        title: "Our Wedding",
        description: "The day two hearts became one. 🧿"
    }

];

let currentMemory = 0;


function displayMemory() {

    const memory = memories[currentMemory];

    const image = document.getElementById("memoryImage");

    const card = document.getElementById("memoryCard");

    image.src = memory.image;

    image.alt = memory.title;

    document.getElementById("memoryNumber").textContent =
        memory.number;

    document.getElementById("memoryTitle").textContent =
        memory.title;

    document.getElementById("memoryDescription").textContent =
        memory.description;

    card.style.animation = "none";

    void card.offsetWidth;

    card.style.animation = "revealText 0.7s ease";

    const nextButton = document.getElementById("nextMemory");

    if (currentMemory === memories.length - 1) {

        nextButton.textContent = "Read My Heart ♡";

    } else {

        nextButton.textContent = "Next Memory ♡";

    }

}


document.getElementById("nextMemory")
    .addEventListener("click", function () {

        if (currentMemory < memories.length - 1) {

            currentMemory++;

            displayMemory();

        } else {

            showScreen("reasonsScreen");

            currentReason = 0;

            displayReason();

        }

    });


/* =====================================
   SCREEN 5 - TEN REASONS
===================================== */

const reasons = [

    "Tumhara mujhe ‘Mera Gulla, Chunnu, Goli, Ballu’ bulana… pata nahi kyun, par tumhare muh se ye naam sunte hi saari tension aur worries gayab ho jaati hain. ❤️",

    "Mere endless mood swings, overthinking aur bina baat ke gussa hone ko jis patience se handle karte ho, uske liye tumhe special award milna chahiye. 😂",

    "Tumhara pehle mujhe gussa dilana aur phir khud hi manana… honestly, tumse bada troublemaker aur koi nahi! 😂❤️",

    "Meri har silly baat sunna, mere tantrums jhelna aur phir bhi mujhe utne hi pyaar se treat karna.",

    "Jab life mein sab kuch perfect nahi hota, tab bhi tumhara mere saath khade rehna. My highs, my lows, my good days and my worst days — you've been there.",

    "Tumhara bina kahe samajh jaana ki mujhe kab pyaar chahiye, kab attention aur kab bas ek tight hug.",

    "Thank you for believing in me, supporting me and reminding me that I'm never alone in anything.",

    "Tum mere husband hi nahi, mere best friend, biggest supporter, safe place aur favourite headache bhi ho. ❤️",

    "Kabhi kabhi sochti hoon ki kitni lucky hoon ki life mein tum mile. Aur phir tumhari harkatein dekh kar sochti hoon ki Bhagwan ne patience ka test bhi mere liye hi rakha hai! 😂",

    "Aur sabse important… agar mujhe zindagi mein dobara choose karne ka chance mile, toh main har baar tumhe hi choose karungi.\n\nYou are, and will always be, the BEST decision of my life. ❤️\n\nHappy Birthday, my love! Bas aise hi hamesha mere saath rehna, mujhe hasana, manana, satana aur pyaar karte rehna.\n\nLove you, Mera Gulla! ❤️🧿"

];

let currentReason = 0;


function displayReason() {

    document.getElementById("reasonCounter").textContent =
        String(currentReason + 1).padStart(2, "0") + " / 10";

    document.getElementById("reasonText").textContent =
        reasons[currentReason];

    const nextButton = document.getElementById("nextReason");

    if (currentReason === reasons.length - 1) {

        nextButton.textContent = "One Last Surprise ♡";

    } else {

        nextButton.textContent = "Next Reason ♡";

    }

    const card = document.querySelector(".reason-card");

    card.style.animation = "none";

    void card.offsetWidth;

    card.style.animation = "revealText 0.7s ease";

}


document.getElementById("nextReason")
    .addEventListener("click", function () {

        if (currentReason < reasons.length - 1) {

            currentReason++;

            displayReason();

        } else {

            showScreen("cakeScreen");

        }

    });


/* =====================================
   SCREEN 6 - BIRTHDAY CAKE
===================================== */

let candlesBlown = false;

const blowButton = document.getElementById("blowCandles");

const candles = document.querySelectorAll(".candle");

blowButton.addEventListener("click", function () {

    if (candlesBlown) return;

    candlesBlown = true;

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add("out");

        }, index * 300);

    });

    blowButton.style.display = "none";

    document.getElementById("cakeMessage").textContent =
        "May all your wishes come true, my love! ❤️";

    launchConfetti();

    setTimeout(() => {

        showScreen("finalScreen");

        launchConfetti();

    }, 3500);

});


/* =====================================
   CONFETTI CELEBRATION
===================================== */

function launchConfetti() {

    const confettiSymbols = ["♡", "♥", "✦", "✧", "✨"];

    for (let i = 0; i < 65; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.textContent =
            confettiSymbols[
                Math.floor(Math.random() * confettiSymbols.length)
            ];

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.fontSize =
            (12 + Math.random() * 18) + "px";

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 6000);

    }

}


/* =====================================
   MINI CONFETTI
===================================== */

function createMiniConfetti() {

    for (let i = 0; i < 12; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.textContent = "♡";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.fontSize = "17px";

        piece.style.animationDuration = "2s";

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 2500);

    }

}


/* =====================================
   REPLAY WEBSITE
===================================== */

document.getElementById("replayButton")
    .addEventListener("click", function () {

        // Reset gift
        openGift.classList.remove("opened");

        // Reset balloons
        balloons.forEach((balloon) => {

            balloon.classList.remove("popped");

        });

        poppedBalloons = 0;

        // Reset balloon words
        for (let i = 0; i < 4; i++) {

            document.getElementById("word" + i).textContent = "";

        }

        document.getElementById("surpriseReveal")
            .classList.remove("show");

        // Reset memories
        currentMemory = 0;

        // Reset reasons
        currentReason = 0;

        // Reset cake
        candlesBlown = false;

        candles.forEach((candle) => {

            candle.classList.remove("out");

        });

        blowButton.style.display = "inline-flex";

        document.getElementById("cakeMessage").textContent = "";

        // Return to welcome screen
        showScreen("welcomeScreen");

    });


/* =====================================
   END
===================================== */

console.log("Happy Birthday, Bubu! ❤️");
