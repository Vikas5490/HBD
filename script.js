document.addEventListener("DOMContentLoaded", () => {
    const $ = (id) => document.getElementById(id);

    // SCREEN NAVIGATION
    function showScreen(id) {
        const current = document.querySelector(".screen.active");
        const next = $(id);

        if (!next || current === next) return;

        if (current) {
            current.classList.remove("active", "leaving");
        }

        document.querySelectorAll(".screen").forEach(screen => {
            screen.classList.remove("active", "leaving");
        });

        next.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // FLOATING HEARTS
    const hearts = $("backgroundHearts");

    if (hearts) {
        for (let i = 0; i < 18; i++) {
            const heart = document.createElement("span");
            heart.className = "floating-heart";
            heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDuration = (9 + Math.random() * 12) + "s";
            heart.style.animationDelay = Math.random() * 10 + "s";
            hearts.appendChild(heart);
        }
    }

    // CONFETTI
    function launchConfetti() {
        const symbols = ["♡", "♥", "✦", "✧", "✨"];

        for (let i = 0; i < 55; i++) {
            const piece = document.createElement("div");
            piece.className = "confetti";
            piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            piece.style.left = Math.random() * 100 + "vw";
            piece.style.fontSize = (12 + Math.random() * 18) + "px";
            piece.style.animationDuration = (2 + Math.random() * 3) + "s";
            document.body.appendChild(piece);

            setTimeout(() => piece.remove(), 6000);
        }
    }

// MUSIC AND GIFT
const music = $("birthdayMusic");
const gift = $("openGift");
let giftOpened = false;

gift.addEventListener("click", () => {
    if (giftOpened) return;

    giftOpened = true;
    gift.classList.add("opened");

    if (music) {
        music.pause();
        music.currentTime = 0;
        music.volume = 1;
        music.muted = false;

        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("Birthday music started!");
                })
                .catch(error => {
                    alert("Music Error: " + error.message);
                    console.error(error);
                });
        }
    }

    setTimeout(() => {
        launchConfetti();
        showScreen("birthdayScreen");
    }, 1100);
});
        }

        setTimeout(() => {
            launchConfetti();
            showScreen("birthdayScreen");
        }, 1100);
    });

    // BIRTHDAY TO BALLOONS
    $("continueToBalloons").addEventListener("click", () => {
        resetBalloons();
        showScreen("balloonScreen");
    });

    // BALLOONS
    const balloons = document.querySelectorAll(".balloon");
    const balloonWords = ["A LITTLE", "SURPRISE", "FOR", "YOU ❤️"];

    let popped = 0;
    let balloonsFinished = false;

    function resetBalloons() {
        popped = 0;
        balloonsFinished = false;

        balloons.forEach(balloon => {
            balloon.classList.remove("popped");
        });

        for (let i = 0; i < 4; i++) {
            $("word" + i).textContent = "";
        }

        $("surpriseReveal").classList.remove("show");
    }

    balloons.forEach((balloon, index) => {
        balloon.addEventListener("click", () => {
            if (balloon.classList.contains("popped")) return;

            balloon.classList.add("popped");
            popped++;

            const word = $("word" + index);
            word.textContent = balloonWords[index];
            word.style.animation = "none";
            void word.offsetWidth;
            word.style.animation = "wordReveal 0.75s ease both";

            launchConfetti();

            if (popped === 4 && !balloonsFinished) {
                balloonsFinished = true;

                setTimeout(() => {
                    $("surpriseReveal").classList.add("show");
                    launchConfetti();
                }, 900);
            }
        });
    });

    // MEMORIES
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
        const image = $("memoryImage");
        const button = $("nextMemory");

        button.disabled = true;

        const newImage = new Image();

        newImage.onload = () => {
            image.src = memory.image;
            image.alt = memory.title;

            $("memoryNumber").textContent = memory.number;
            $("memoryTitle").textContent = memory.title;
            $("memoryDescription").textContent = memory.description;

            button.textContent = currentMemory === 3
                ? "Read My Heart ♡"
                : "Next Memory ♡";

            button.disabled = false;
        };

        newImage.onerror = () => {
            $("memoryTitle").textContent = "Photo not found";
            $("memoryDescription").textContent =
                "Please check the file: " + memory.image;
            button.disabled = false;
        };

        newImage.src = memory.image;
    }

    $("continueToMemories").addEventListener("click", () => {
        currentMemory = 0;
        showScreen("memoriesScreen");
        displayMemory();
    });

    $("nextMemory").addEventListener("click", () => {
        if ($("nextMemory").disabled) return;

        if (currentMemory < memories.length - 1) {
            currentMemory++;
            displayMemory();
        } else {
            currentReason = 0;
            displayReason();
            showScreen("reasonsScreen");
        }
    });

    // TEN LOVE MESSAGES
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
        $("reasonCounter").textContent =
            String(currentReason + 1).padStart(2, "0") + " / 10";

        $("reasonText").textContent = reasons[currentReason];

        $("nextReason").textContent =
            currentReason === 9
                ? "One Last Surprise ♡"
                : "Next Reason ♡";
    }

    $("nextReason").addEventListener("click", () => {
        if (currentReason < reasons.length - 1) {
            currentReason++;
            displayReason();
        } else {
            showScreen("cakeScreen");
        }
    });

    // CAKE AND CANDLES
    let candlesBlown = false;
    const candles = document.querySelectorAll(".candle");
    const blowButton = $("blowCandles");

    blowButton.addEventListener("click", () => {
        if (candlesBlown) return;

        candlesBlown = true;

        candles.forEach((candle, index) => {
            setTimeout(() => {
                candle.classList.add("out");
            }, index * 350);
        });

        blowButton.disabled = true;
        blowButton.style.display = "none";

        $("cakeMessage").textContent =
            "May all your wishes come true, my love! ❤️";

        launchConfetti();

        setTimeout(() => {
            showScreen("finalScreen");
            launchConfetti();
        }, 3500);
    });

    // REPLAY
    $("replayButton").addEventListener("click", () => {
        giftOpened = false;
        gift.classList.remove("opened");

        resetBalloons();

        currentMemory = 0;
        currentReason = 0;
        candlesBlown = false;

        candles.forEach(candle => candle.classList.remove("out"));

        blowButton.disabled = false;
        blowButton.style.display = "inline-flex";

        $("cakeMessage").textContent = "";

        showScreen("welcomeScreen");
    });

    console.log("Bubu Birthday Website Loaded Successfully ❤️");
});
