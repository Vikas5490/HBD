
/* =========================================
   BUBU BIRTHDAY WEBSITE
   FINAL JAVASCRIPT
========================================= */


/* =========================================
   1. SCREEN NAVIGATION
========================================= */

let screenTimer;

function showScreen(screenId) {

    const currentScreen = document.querySelector(".screen.active");
    const nextScreen = document.getElementById(screenId);

    if (!nextScreen || currentScreen === nextScreen) return;

    clearTimeout(screenTimer);

    if (currentScreen) {

        currentScreen.classList.add("leaving");

        screenTimer = setTimeout(() => {

            currentScreen.classList.remove("active", "leaving");

            nextScreen.classList.add("active");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 450);

    } else {

        nextScreen.classList.add("active");

    }

}


/* =========================================
   2. FLOATING HEARTS
========================================= */

const backgroundHearts = document.getElementById("backgroundHearts");

function createFloatingHearts() {

    if (!backgroundHearts) return;

    for (let i = 0; i < 18; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize = (14 + Math.random() * 20) + "px";

        heart.style.animationDuration = (9 + Math.random() * 12) + "s";

        heart.style.animationDelay = (Math.random() * 10) + "s";

        backgroundHearts.appendChild(heart);

    }

}

createFloatingHearts();


/* =========================================
   3. MUSIC + GIFT OPENING
========================================= */

const music = document.getElementById("birthdayMusic");

const openGift = document.getElementById("openGift");

let musicStarted = false;
let giftOpened = false;

openGift.addEventListener("click", async function () {

    if (giftOpened) return;

    giftOpened = true;

    openGift.classList.add("opened");

    // Music starts on gift click
    try {

        await music.play();

        musicStarted = true;

    } catch (error) {

        console.error("Music playback issue:", error);

    }

    setTimeout(() => {

        launchConfetti();

        showScreen("birthdayScreen");

    }, 1100);

});


/* =========================================
   4. BIRTHDAY SCREEN
========================================= */

document.getElementById("continueToBalloons")
    .addEventListener("click", function () {

        resetBalloons();

        // Directly open balloons.
        // No extra welcome text or heading.

        showScreen("balloonScreen");

    });


/* =========================================
   5. BALLOONS - WORD REVEAL
========================================= */

const balloons = document.querySelectorAll(".balloon");

const balloonWords = [
    "A LITTLE",
    "SURPRISE",
    "FOR",
    "YOU ❤️"
];

let poppedBalloons = 0;

let balloonsFinished = false;


function popBalloon(balloon, index) {

    if (balloon.classList.contains("popped")) return;

    balloon.classList.add("popped");

    poppedBalloons++;

    const word = document.getElementById("word" + index);

    word.textContent = balloonWords[index];

    // Restart word animation
    word.style.animation = "none";

    void word.offsetWidth;

    word.style.animation = "wordReveal 0.75s cubic-bezier(.16,1,.3,1) both";

    createMiniConfetti();

    if (poppedBalloons === 4 && !balloonsFinished) {

        balloonsFinished = true;

        setTimeout(() => {

            document.getElementById("surpriseReveal")
                .classList.add("show");

            launchConfetti();

        }, 900);

    }

}


balloons.forEach((balloon, index) => {

    balloon.addEventListener("click", function () {

        popBalloon(balloon, index);

    });

});


function resetBalloons() {

    poppedBalloons = 0;

    balloonsFinished = false;

    balloons.forEach((balloon) => {

        balloon.classList.remove("popped");

    });

    for (let i = 0; i < 4; i++) {

        const word = document.getElementById("word" + i);

        word.textContent = "";

        word.style.animation = "";

    }

    document.getElementById("surpriseReveal")
        .classList.remove("show");

}


/* =========================================
   6. CONTINUE TO MEMORIES
========================================= */

document.getElementById("continueToMemories")
    .addEventListener("click", function () {

        currentMemory = 0;

        showScreen("memoriesScreen");

        displayMemory();

    });


/* =========================================
   7. MEMORY SLIDESHOW
========================================= */

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

let memoryLoading = false;


function displayMemory() {

    if (memoryLoading) return;

    const memory = memories[currentMemory];

    const image = document.getElementById("memoryImage");

    const card = document.getElementById("memoryCard");

    const nextButton = document.getElementById("nextMemory");

    memoryLoading = true;

    nextButton.disabled = true;

    nextButton.style.opacity = "0.5";

    image.style.opacity = "0";

    // Create a fresh image object to verify the next photo.
    // This prevents the previous photo from remaining visible
    // if the next photo is still loading.

    const newImage = new Image();

    newImage.onload = function () {

        image.src = memory.image;

        image.alt = memory.title;

        document.getElementById("memoryNumber").textContent =
            memory.number;

        document.getElementById("memoryTitle").textContent =
            memory.title;

        document.getElementById("memoryDescription").textContent =
            memory.description;

        image.style.opacity = "1";

        card.style.animation = "none";

        void card.offsetWidth;

        card.style.animation = "revealText 0.7s ease";

        nextButton.textContent =
            currentMemory === 3
                ? "Read My Heart ♡"
                : "Next Memory ♡";

        nextButton.disabled = false;

        nextButton.style.opacity = "1";

        memoryLoading = false;

    };

    newImage.onerror = function () {

        image.style.opacity = "1";

        image.alt = "Unable to load " + memory.image;

        document.getElementById("memoryTitle").textContent =
            "Photo not found";

        document.getElementById("memoryDescription").textContent =
            "Please check the file: " + memory.image;

        nextButton.disabled = false;

        nextButton.style.opacity = "1";

        memoryLoading = false;

        console.error("Image loading failed:", memory.image);

    };

    // Load exact next image
    newImage.src = memory.image;

}


document.getElementById("nextMemory")
    .addEventListener("click", function () {

        if (memoryLoading) return;

        if (currentMemory < memories.length - 1) {

            currentMemory++;

            displayMemory();

        } else {

            currentReason = 0;

            displayReason();

            showScreen("reasonsScreen");

        }

    });


/* =========================================
   8. TEN REASONS
========================================= */

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

    const counter = document.getElementById("reasonCounter");

    const text = document.getElementById("reasonText");

    const button = document.getElementById("nextReason");

    counter.textContent =
        String(currentReason + 1).padStart(2, "0") + " / 10";

    text.textContent = reasons[currentReason];

    button.textContent =
        currentReason === 9
            ? "One Last Surprise ♡"
            : "Next Reason ♡";

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


/* =========================================
   9. BIRTHDAY CAKE & CANDLES
========================================= */

let candlesBlown = false;

const blowButton = document.getElementById("blowCandles");

const candles = document.querySelectorAll(".candle");


blowButton.addEventListener("click", function () {

    if (candlesBlown) return;

    candlesBlown = true;

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.add("out");

        }, index * 350);

    });

    blowButton.disabled = true;

    blowButton.style.display = "none";

    document.getElementById("cakeMessage").textContent =
        "May all your wishes come true, my love! ❤️";

    launchConfetti();

    setTimeout(() => {

        showScreen("finalScreen");

        launchConfetti();

    }, 3500);

});


/* =========================================
   10. CONFETTI
========================================= */

function launchConfetti() {

    const symbols = ["♡", "♥", "✦", "✧", "✨"];

    for (let i = 0; i < 65; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.fontSize =
            (12 + Math.random() * 18) + "px";

        piece.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            Math.random() * 1.2 + "s";

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 6000);

    }

}


/* =========================================
   11. MINI CONFETTI
========================================= */

function createMiniConfetti() {

    for (let i = 0; i < 12; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.textContent = "♡";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.fontSize = "18px";

        piece.style.animationDuration = "2s";

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 2500);

    }

}


/* =========================================
   12. REPLAY ENTIRE WEBSITE
========================================= */

document.getElementById("replayButton")
    .addEventListener("click", function () {

        // Reset gift
        giftOpened = false;

        openGift.classList.remove("opened");

        // Reset balloons
        resetBalloons();

        // Reset memories
        currentMemory = 0;

        memoryLoading = false;

        // Reset reasons
        currentReason = 0;

        // Reset cake
        candlesBlown = false;

        candles.forEach((candle) => {

            candle.classList.remove("out");

        });

        blowButton.disabled = false;

        blowButton.style.display = "inline-flex";

        document.getElementById("cakeMessage").textContent = "";

        // Music continues playing
        // No pause or stop control.

        showScreen("welcomeScreen");

    });


/* =========================================
   WEBSITE READY
========================================= */

console.log("Bubu's Birthday Surprise is Ready! ❤️");
