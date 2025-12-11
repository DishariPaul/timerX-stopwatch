//timer working
var timer=document.getElementById("timer");
var hr=0; var min=0; var sec=0;
var stopTime=true;
function startTimer() {
    if (stopTime == true) {
        stopTime = false;
        timeCycle();
        var btn = document.getElementById("start");
        btn.textContent = "Start"; 
    }
}
function pauseTimer() {
    if (stopTime == false) {
        stopTime = true;
        var msg = document.getElementById("start");
        msg.textContent = (msg.textContent === "Start") ? "Resume" : "Start";
    }
}
function timeCycle(){
    if (stopTime==false){
        sec=parseInt(sec);
        min=parseInt(min);
        hr=parseInt(hr);
        sec=sec+1;
        if (sec==60){ min=min+1; sec=0; }
        if (min==60){ hr=hr+1; min=0; }
        if (sec<10){ sec="0" + sec; }
        if (min<10){ min="0" + min; }
        if (hr<10) { hr="0" + hr; }
        timer.innerHTML= hr + " : " + min + " : " + sec;
        setTimeout("timeCycle()", 1000);
    }
}
function resetTimer(){
    timer.innerHTML="00 : 00 : 00";
    stopTime=true;
}
//lap count and logging
var count = 0;
function recordLap(currenttime) {
    count++;
    var list = document.getElementById("lapsCount");
    var lap = document.createElement("li");
    lap.textContent = `Lap ${count} - ${currenttime}`;
    list.prepend(lap);
    list.classList.add("record");
}
function clearLap(){
    var list = document.getElementById("lapsCount");
    list.classList.remove("record");
    list.textContent="";
    count=0;
}

// Theme toggle logic
(function () {
    const root = document.documentElement; // <html>
    const toggle = document.getElementById('themeToggle');
    // Read saved preference
    const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null

    // If user has saved pref, use it. Otherwise use OS preference.
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved ? saved : (prefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
        if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (toggle) { toggle.textContent = '☀️'; toggle.setAttribute('aria-pressed', 'true'); }
        } else {
        root.removeAttribute('data-theme');
        if (toggle) { toggle.textContent = '🌙'; toggle.setAttribute('aria-pressed', 'false'); }
        }
    }

    // init
    applyTheme(initialTheme);

    // toggle handler
    if (toggle) {
        toggle.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
        });
    }

    // Optional: if OS theme changes and user hasn't explicitly chosen, update automatically
    if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener && mq.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // only auto-change if user hasn't chosen
            applyTheme(e.matches ? 'dark' : 'light');
        }
        });
    }
    })();
