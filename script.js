```javascript
/* =====================================
   BUBU BIRTHDAY WEBSITE
   MAIN JAVASCRIPT
===================================== */

const screens = [...document.querySelectorAll('.screen')];

const music = document.getElementById('birthdayMusic');

const musicToggle = document.getElementById('musicToggle');

let currentReason = 0;

let popped = 0;

let candlesBlown = false;


/* =====================================
   1. SCREEN NAVIGATION
===================================== */

function showScreen(id) {

    const current = document.querySelector('.screen.active');

    const next = document.getElementById(id);

    if (!next || current === next) return;

    current.classList.add('leaving');

    window.setTimeout(() => {

        current.classList.remove('active', 'leaving');

        next.classList.add('active');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }, 380);

}


/* NEXT BUTTONS */

document.querySelectorAll('[data-next]').forEach(button => {

    button.addEventListener('click', () => {

        showScreen(button.dataset.next);

    });

});


/* =====================================
   2. BACKGROUND MUSIC
===================================== */

function startMusic() {

    music.volume = 0.55;

    music.play().then(() => {

        musicToggle.innerHTML = '♫ <span>Music on</span>';

    }).catch(() => {

        musicToggle.innerHTML = '♫ <span>Tap for music</span>';

    });

}


/* MUSIC CONTROL */

musicToggle.addEventListener('click', () => {

    if (music.paused) {

        startMusic();

    } else {

        music.pause();

        musicToggle.innerHTML = '♫ <span>Music off</span>';

    }

});


/* =====================================
   3. GIFT BOX OPENING
===================================== */

document.getElementById('openGift').addEventListener('click', function() {

    this.classList.add('opening');

    startMusic();

    burstConfetti(65);

    window.setTimeout(() => {

        showScreen('birthday');

    }, 850);

});


/* =====================================
   4. FOUR BALLOON SURPRISE
===================================== */

const balloonWords = [

    'A LITTLE',

    'SURPRISE',

    'FOR',

    'YOU'

];


document.querySelectorAll('.balloon').forEach((balloon, index) => {

    balloon.addEventListener('click', () => {

        if (balloon.classList.contains('popped')) return;


        /* POP ANIMATION */

        balloon.classList.add('popped');


        /* REVEAL WORD */

        const item = balloon.closest('.balloon-item');

        const word = item.querySelector('.revealed-word');

        word.textContent = balloonWords[index];


        window.setTimeout(() => {

            word.classList.add('show');

        }, 170);


        popped++;


        /* CONFETTI */

        burstConfetti(16);


        /* UPDATE PROGRESS */

        const remaining = 4 - popped;

        document.getElementById('popProgress').textContent = remaining

            ? `${remaining} more ${remaining === 1 ? 'surprise is' : 'surprises are'} waiting…`

            : 'You found all four little surprises! ❤️';


        /* ALL FOUR BALLOONS POPPED */

        if (popped === 4) {

            window.setTimeout(() => {

                document.getElementById('balloonFinale')
                    .classList.add('show');

                document.getElementById('toMemories')
                    .classList.remove('hidden');

                burstConfetti(55);

            }, 550);

        }

    });

});


/* GO TO MEMORIES */

document.getElementById('toMemories').addEventListener('click', () => {

    showScreen('memories');

});


/* =====================================
   5. TEN REASONS WHY I LOVE YOU
===================================== */


/* ALL ORIGINAL MESSAGES */

const reasons = [

    'Tumhara mujhe “Mera Gulla, Chunnu, Goli, Ballu” bulana… pata nahi kyun, par tumhare muh se ye naam sunte hi saari tension aur worries gayab ho jaati hain. ❤️',

    'Mere endless mood swings, overthinking aur bina baat ke gussa hone ko jis patience se handle karte ho, uske liye tumhe special award milna chahiye. 😂',

    'Tumhara pehle mujhe gussa dilana aur phir khud hi manana… honestly, tumse bada troublemaker aur koi nahi! 😂❤️',

    'Meri har silly baat sunna, mere tantrums jhelna aur phir bhi mujhe utne hi pyaar se treat karna.',

    'Jab life mein sab kuch perfect nahi hota, tab bhi tumhara mere saath khade rehna. My highs, my lows, my good days and my worst days — you’ve been there.',

    'Tumhara bina kahe samajh jaana ki mujhe kab pyaar chahiye, kab attention aur kab bas ek tight hug.',

    'Thank you for believing in me, supporting me and reminding me that I’m never alone in anything.',

    'Tum mere husband hi nahi, mere best friend, biggest supporter, safe place aur favourite headache bhi ho. ❤️',

    'Kabhi kabhi sochti hoon ki kitni lucky hoon ki life mein tum mile. Aur phir tumhari harkatein dekh kar sochti hoon ki Bhagwan ne patience ka test bhi mere liye hi rakha hai! 😂',

    `Aur sabse important… agar mujhe zindagi mein dobara choose karne ka chance mile, toh main har baar tumhe hi choose karungi.

You are, and will always be, the BEST decision of my life. ❤️

Happy Birthday, my love! Bas aise hi hamesha mere saath rehna, mujhe hasana, manana, satana aur pyaar karte rehna.

Love you, Mera Gulla! ❤️🧿`

];


/* DISPLAY CURRENT REASON */

function renderReason() {

    document.getElementById('reasonCount').textContent =

        `${String(currentReason + 1).padStart(2, '0')} / 10`;


    document.getElementById('reasonNumber').textContent =

        String(currentReason + 1).padStart(2, '0');


    const text = document.getElementById('reasonText');


    text.style.opacity = 0;

    text.style.transform = 'translateY(8px)';


    window.setTimeout(() => {

        text.textContent = reasons[currentReason];

        text.style.transition = 'opacity .35s ease, transform .35s ease';

        text.style.opacity = 1;

        text.style.transform = 'translateY(0)';

    }, 180);


    document.getElementById('prevReason').disabled =

        currentReason === 0;


    const next = document.getElementById('nextReason');


    next.innerHTML = currentReason === 9

        ? 'Make a wish <span>→</span>'

        : 'Next <span>→</span>';

}


/* BACK BUTTON */

document.getElementById('prevReason').addEventListener('click', () => {

    if (currentReason > 0) {

        currentReason--;

        renderReason();

    }

});


/* NEXT BUTTON */

document.getElementById('nextReason').addEventListener('click', () => {

    if (currentReason < 9) {

        currentReason++;

        renderReason();

    } else {

        showScreen('cake');

    }

});


/* INITIAL MESSAGE */

renderReason();


/* =====================================
   6. BIRTHDAY CAKE AND CANDLES
===================================== */

document.getElementById('blowCandles').addEventListener('click', () => {

    if (candlesBlown) return;

    candlesBlown = true;


    /* EXTINGUISH ALL CANDLES */

    document.querySelectorAll('.candle').forEach((candle, index) => {

        window.setTimeout(() => {

            candle.classList.add('out');

        }, index * 180);

    });


    /* WISH MESSAGE */

    document.getElementById('wishMessage').textContent =

        'Wish made! May all your dreams come true, my Bubu. ❤️';


    document.getElementById('blowCandles').classList.add('hidden');


    /* FINAL BUTTON */

    window.setTimeout(() => {

        burstConfetti(85);

        document.getElementById('toFinal')
            .classList.remove('hidden');

    }, 650);

});


/* INDIVIDUAL CANDLE CLICK */

document.querySelectorAll('.candle').forEach(candle => {

    candle.addEventListener('click', () => {

        if (candlesBlown) return;

        candle.classList.add('out');


        const allCandles = [...document.querySelectorAll('.candle')];


        if (allCandles.every(c => c.classList.contains('out'))) {

            document.getElementById('blowCandles').click();

        }

    });

});


/* =====================================
   7. FINAL BIRTHDAY SURPRISE
===================================== */

document.getElementById('toFinal').addEventListener('click', () => {

    showScreen('final');

    burstConfetti(100);

});


/* =====================================
   8. REPLAY COMPLETE WEBSITE
===================================== */

document.getElementById('replay').addEventListener('click', () => {


    /* RESET VARIABLES */

    popped = 0;

    currentReason = 0;

    candlesBlown = false;


    /* RESET BALLOONS */

    document.querySelectorAll('.balloon').forEach(balloon => {

        balloon.classList.remove('popped');

    });


    document.querySelectorAll('.revealed-word').forEach(word => {

        word.classList.remove('show');

        word.textContent = '';

    });


    document.getElementById('balloonFinale')
        .classList.remove('show');


    document.getElementById('toMemories')
        .classList.add('hidden');


    document.getElementById('popProgress').textContent =

        '4 surprises are waiting to be revealed';


    /* RESET CANDLES */

    document.querySelectorAll('.candle').forEach(candle => {

        candle.classList.remove('out');

    });


    document.getElementById('wishMessage').textContent =

        'Make your wish… I hope all your dreams come true. ❤️';


    document.getElementById('blowCandles')
        .classList.remove('hidden');


    document.getElementById('toFinal')
        .classList.add('hidden');


    /* RESET REASONS */

    renderReason();


    /* BACK TO START */

    showScreen('welcome');

});


/* =====================================
   9. CONFETTI ANIMATION
===================================== */

function burstConfetti(count) {

    const colors = [

        '#d86f91',

        '#f5b7c8',

        '#fff1e9',

        '#bd82bb',

        '#e8a75e'

    ];


    for (let i = 0; i < count; i++) {

        const piece = document.createElement('i');

        piece.className = 'confetti';


        piece.style.background =

            colors[Math.floor(Math.random() * colors.length)];


        piece.style.setProperty(

            '--x',

            `${(Math.random() - .5) * window.innerWidth * 1.1}px`

        );


        piece.style.setProperty(

            '--y',

            `${window.innerHeight * (.45 + Math.random() * .7)}px`

        );


        piece.style.left = `${40 + Math.random() * 20}%`;

        piece.style.top = `${20 + Math.random() * 35}%`;


        document.body.appendChild(piece);


        window.setTimeout(() => {

            piece.remove();

        }, 1700);

    }

}


/* =====================================
   10. FLOATING HEARTS
===================================== */

const heartContainer = document.getElementById('floatingHearts');


function createHeart() {

    const heart = document.createElement('span');

    heart.className = 'heart-particle';


    heart.textContent = Math.random() > .5 ? '♡' : '♥';


    heart.style.left = `${Math.random() * 100}%`;


    heart.style.fontSize = `${12 + Math.random() * 19}px`;


    heart.style.animationDuration = `${9 + Math.random() * 9}s`;


    heart.style.opacity = `${.25 + Math.random() * .35}`;


    heartContainer.appendChild(heart);


    window.setTimeout(() => {

        heart.remove();

    }, 19000);

}


/* INITIAL HEARTS */

for (let i = 0; i < 12; i++) {

    window.setTimeout(createHeart, i * 500);

}


/* CONTINUOUS FLOATING HEARTS */

window.setInterval(createHeart, 1500);


/* =====================================
   WEBSITE COMPLETE ❤️
===================================== */
```
