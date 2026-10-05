// ===== ANTI-INSPECT / ANTI-CHEAT & DEBUG =====
let rKeyTimer = null;
let rKeyPressed = false;
let isDebugMode = false;
let debugNationIndex = 0;

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'C' || event.key === 'J'))) {
    event.preventDefault();
  }
  
  if ((event.key === 'r' || event.key === 'R') && !rKeyPressed && _TR.phase === 'intro') {
    rKeyPressed = true;
    rKeyTimer = setTimeout(() => { _triggerDebugMode(); }, 7000);
  }

  if (isDebugMode) {
    const keysLength = Object.keys(_NATIONS).length;
    if (event.key === 'ArrowRight') {
      debugNationIndex = (debugNationIndex + 1) % keysLength;
      _renderDebugNation();
    } else if (event.key === 'ArrowLeft') {
      debugNationIndex = (debugNationIndex - 1 + keysLength) % keysLength;
      _renderDebugNation();
    }
  }
});

document.addEventListener('keyup', event => {
  if (event.key === 'r' || event.key === 'R') {
    rKeyPressed = false;
    clearTimeout(rKeyTimer); 
  }
});

function _triggerDebugMode() {
  isDebugMode = true;
  document.getElementById('main-wrap').style.display = 'none';
  document.getElementById('progressShell').style.display = 'none';
  
  document.getElementById('tracker-overlay').classList.add('show');
  document.getElementById('name-phase').style.display = 'none';
  document.getElementById('result-phase').style.display = 'block';
  
  _renderDebugNation();
}

function _renderDebugNation() {
  const keys = Object.keys(_NATIONS);
  var dummyStats = { totalSec: 300, avgRead: 15, correct: 10, tabs: 0, cpCount: 0, idles: 0, videoWatchSec: 600 };
  _renderResult("Admin (Debug)", { nation: keys[debugNationIndex], stats: dummyStats }, 999);
}

['copy', 'cut', 'paste'].forEach(ev => {
  document.addEventListener(ev, (e) => {
    e.preventDefault();
    if (_TR.phase !== 'watching') _TR.copyPasteCount++;
  });
});

// ===== 10 DOMAIN DATA SETS WITH GENERATORS =====
const domainData = [
  {
    isInput: false,
    title: "Chamber 1 — The Ancient Paradigm",
    lecture: `For thousands of years, philosophers tried to explain why objects fall. Aristotle believed that the Earth was the center of the universe and that objects have a "natural place." He thought that heavy objects fell simply because they were trying to reach the center of the Earth.`,
    question: "According to ancient philosophers like Aristotle, why did objects fall towards the ground?",
    correct: "They believed objects were trying to reach their natural place at the center of the universe.",
    wrong: [
      "They believed a magnetic field from the Earth's core pulled all matter downward.",
      "They thought that air pressure pushed heavier objects down faster than lighter objects.",
      "They theorized that space was curved around the Earth, forcing objects to slide down the curve."
    ],
    explanation: "Aristotle taught that objects had a 'natural place' and falling was just matter trying to return to the center of the universe (Earth)."
  },
  {
    isInput: false,
    title: "Chamber 2 — The Heliocentric Shift",
    lecture: `The geocentric (Earth-centered) view lasted for over a thousand years. It wasn't until the 16th century that Nicholas Copernicus proposed a radical new idea: the Earth was just another planet, and it revolved around the Sun.`,
    question: "What major astronomical shift was introduced by Nicholas Copernicus?",
    correct: "He proposed that the planets revolve around the Sun, rather than the Earth.",
    wrong: [
      "He discovered that the Moon is responsible for the tides on Earth.",
      "He proved that planetary orbits are perfect circles using early telescopes.",
      "He formulated the universal law of gravitation to explain planetary motion."
    ],
    explanation: "Copernicus shifted humanity from a geocentric (Earth-centered) model to a heliocentric (Sun-centered) model."
  },
  {
    isInput: false,
    title: "Chamber 3 — Kepler's Realization",
    lecture: `Even after astronomers accepted that the planets orbited the Sun, they assumed the orbits were perfect circles. By carefully tracking planetary motion, Johannes Kepler realized that the orbits were not perfect circles at all.`,
    question: "According to Kepler's observations, what is the actual shape of planetary orbits?",
    correct: "Ellipses",
    wrong: [
      "Perfect Circles",
      "Parabolas",
      "Hyperbolas"
    ],
    explanation: "Kepler's First Law of Planetary Motion states that planets travel in elliptical orbits around the Sun."
  },
  {
    isInput: false,
    title: "Chamber 4 — The Apple and the Moon",
    lecture: `Isaac Newton famously observed an apple falling from a tree and wondered why it didn't fall sideways or up. He realized that the exact same invisible force pulling the apple to the ground was also reaching out into space, pulling the Moon towards the Earth and keeping it in orbit.`,
    question: "What was Newton's crucial realization about the force of gravity?",
    correct: "The same force that pulls an apple to the ground also keeps the Moon in orbit around the Earth.",
    wrong: [
      "Gravity only affects small objects on Earth, while celestial bodies are moved by magnetism.",
      "Gravity is a force that pushes objects away from each other unless they are in a vacuum.",
      "The Moon's gravity is what causes apples to fall from trees on Earth."
    ],
    explanation: "Newton unified celestial and terrestrial mechanics by realizing gravity is a universal force acting on both the apple and the Moon."
  },
  {
    isInput: false,
    title: "Chamber 5 — The Distance Factor",
    lecture: `Newton's Law of Universal Gravitation states that the gravitational force is inversely proportional to the square of the distance between the centers of two objects ($F \\propto 1/r^2$). This means gravity weakens very quickly as objects move further apart.`,
    question: "If you double the distance ($r$) between two objects, what happens to the gravitational force between them?",
    correct: "The force is divided by four (it becomes four times weaker).",
    wrong: [
      "The force is divided by two (it becomes half as strong).",
      "The force doubles (it becomes twice as strong).",
      "The force remains the exact same."
    ],
    explanation: "Because distance is squared in the denominator ($r^2$), doubling the distance results in $2^2 = 4$, making the force four times weaker."
  },
  {
    isInput: false,
    title: "Chamber 6 — Mutual Attraction",
    lecture: `The gravitational force is directly proportional to the product of the two masses ($m_1 \\times m_2$). Furthermore, Newton's Third Law guarantees that the force is mutual. The Earth pulls on you, and you pull on the Earth with the exact same amount of force.`,
    question: "If you double the mass of one object, how does it affect the gravitational force acting on the other object?",
    correct: "The force on the other object also doubles.",
    wrong: [
      "The force on the other object is halved.",
      "The force on the other object remains completely unchanged.",
      "The force on the other object is multiplied by four."
    ],
    explanation: "The force is proportional to the mass. If one mass doubles, the total mutual force doubles, meaning both objects feel twice the pull."
  },
  {
    isInput: false,
    title: "Chamber 7 — Newton vs. Einstein",
    lecture: `Newton's theory of gravity works perfectly for almost all everyday situations and was even used to send astronauts to the Moon. However, in 1915, Albert Einstein published his theory of General Relativity, describing gravity not as a force, but as the warping of space and time.`,
    question: "Why did Einstein's theory of General Relativity technically replace Newton's theory of gravity?",
    correct: "Einstein's theory successfully explained phenomena that Newton's couldn't, like the exact orbit of Mercury and light bending around black holes.",
    wrong: [
      "Newton's theory was proven mathematically impossible by Henry Cavendish in the 18th century.",
      "Einstein proved that gravitational forces do not exist anywhere in the universe, only magnetic fields.",
      "Newton's equations were not accurate enough to send rockets to the Moon."
    ],
    explanation: "While Newton's equations are excellent for most applications, Einstein's warped spacetime model correctly predicted extremes (like Mercury's orbit and bent light) that Newton's model could not."
  },
  {
    isInput: true,
    title: "Chamber 8 — Abyssal Calculation I",
    lecture: `<b>WARNING: PROTOCOL OVERRIDE</b><br><br>You have entered the calculation chambers. For this trial, you must compute the gravitational force ($F_g$) using Newton's formula:<br><br>
    <div style="text-align:center; margin: 10px 0; font-size:1.1rem;">$F_g = G \\frac{m_1 m_2}{r^2}$</div>
    Where $G = 6.67 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$.<br><br>
    <b>PROMPT:</b> Your final answer must be written with <b>exactly two decimal places</b> and must include the unit (e.g., <code>123.45 N</code>).`,
    generate: () => {
      const m1 = (Math.floor(Math.random() * 40) + 10) * 10000;
      const m2 = (Math.floor(Math.random() * 40) + 10) * 10000;
      const r = Math.floor(Math.random() * 8) + 2; 
      const fg = (6.67e-11 * m1 * m2) / (r * r);
      const q = `Two massive mining freighters drift in the silent void of space. The first vessel has a mass of ${m1.toLocaleString()} kg, while the second vessel has a mass of ${m2.toLocaleString()} kg. Their centers of mass are currently separated by a distance of ${r} meters. Calculate the exact gravitational force pulling them together.`;
      const expl = `$F_g = (6.67 \\times 10^{-11}) \\times \\frac{(${m1.toLocaleString()} \\times ${m2.toLocaleString()})}{${r}^2} = ${fg.toFixed(2)} \\text{ N}$`;
      return { question: q, correctValue: fg, explanation: expl };
    }
  },
  {
    isInput: true,
    title: "Chamber 9 — Abyssal Calculation II",
    lecture: `<b>WARNING: PROTOCOL OVERRIDE</b><br><br>Remember to double check your exponents. $10^{-11}$ is a very small number, but massive objects still exert considerable force. <br><br>
    <b>PROMPT:</b> Your final answer must be written with <b>two decimal places</b>, including the unit (e.g., <code>123.45 N</code>).`,
    generate: () => {
      const m1 = (Math.floor(Math.random() * 50) + 20) * 100000; 
      const m2 = (Math.floor(Math.random() * 50) + 20) * 100000;
      const r = Math.floor(Math.random() * 40) + 10; 
      const fg = (6.67e-11 * m1 * m2) / (r * r);
      const q = `During a routine orbital maneuver, an abandoned satellite with a mass of ${m1.toLocaleString()} kg enters the vicinity of an abyssal research station with a mass of ${m2.toLocaleString()} kg. The distance between their centers is exactly ${r} meters. Determine the mutual gravitational force acting between the two bodies.`;
      const expl = `$F_g = (6.67 \\times 10^{-11}) \\times \\frac{(${m1.toLocaleString()} \\times ${m2.toLocaleString()})}{${r}^2} = ${fg.toFixed(2)} \\text{ N}$`;
      return { question: q, correctValue: fg, explanation: expl };
    }
  },
  {
    isInput: true,
    title: "Chamber 10 — The Final Calculation",
    lecture: `<b>WARNING: PROTOCOL OVERRIDE</b><br><br>This is the final trial of the domain. Ensure your computation is perfectly aligned. <br><br>
    <b>PROMPT:</b> Your final answer must be written with <b>two decimal places</b>, including the unit (e.g., <code>123.45 N</code>).`,
    generate: () => {
      const m1 = (Math.floor(Math.random() * 90) + 10) * 1000000; 
      const m2 = (Math.floor(Math.random() * 90) + 10) * 1000000;
      const r = Math.floor(Math.random() * 50) + 20; 
      const fg = (6.67e-11 * m1 * m2) / (r * r);
      const q = `In the deepest layer of the domain, two celestial fragments orbit a dark singularity. The first fragment boasts a mass of ${m1.toLocaleString()} kg, and the second has an immense mass of ${m2.toLocaleString()} kg. If they are separated by a precise distance of ${r} meters, what is the exact gravitational force exerted between them?`;
      const expl = `$F_g = (6.67 \\times 10^{-11}) \\times \\frac{(${m1.toLocaleString()} \\times ${m2.toLocaleString()})}{${r}^2} = ${fg.toFixed(2)} \\text{ N}$`;
      return { question: q, correctValue: fg, explanation: expl };
    }
  }
];

// ===== UI LOGIC & STATE =====
const TOTAL = domainData.length;
let current = -1;
let score = 0;

const container = document.getElementById('stage-container');
const intro = document.getElementById('introStage');
const shell = document.getElementById('progressShell');
const fill = document.getElementById('progressFill');
const hudSec = document.getElementById('hudSector');
const hudScr = document.getElementById('hudScore');

// ===== INTRO VIDEO LOGIC =====
const ytModal = document.getElementById('yt-modal');
const ytIframe = document.getElementById('yt-iframe');
const ytFallbackLink = document.getElementById('yt-fallback-link');
const closeYt = document.getElementById('close-yt');

const introYtBtn = document.getElementById('intro-yt-btn');
const commenceBtn = document.getElementById('commence-btn');

introYtBtn.addEventListener('click', () => {
    ytIframe.src = `https://www.youtube-nocookie.com/embed/IiBflHAZsb8?rel=0`;
    ytFallbackLink.href = `https://www.youtube.com/watch?v=IiBflHAZsb8`;
    ytModal.style.display = 'flex';
    
    _TR.introVideoOpenTime = Date.now();
    _TR.phase = 'watching'; 
});

closeYt.addEventListener('click', () => {
  ytModal.style.display = 'none';
  ytIframe.src = ""; 
  
  if (_TR.introVideoOpenTime > 0) {
    _TR.introVideoWatchTime += (Date.now() - _TR.introVideoOpenTime);
    _TR.introVideoOpenTime = 0;
  }
  
  _TR.phase = 'intro'; 
  
  // Unlock Commence Button
  commenceBtn.disabled = false;
  commenceBtn.style.opacity = 1;
  introYtBtn.innerHTML = "✅ ARCHIVE FOOTAGE VIEWED";
  introYtBtn.style.borderColor = "var(--accent-green)";
  introYtBtn.style.color = "var(--accent-green)";
});

function shuffleArray(array) {
  let curId = array.length;
  while (0 !== curId) {
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

function renderStage(index) {
  const data = domainData[index];
  let interactionHTML = '';
  let options = [];
  
  // Generate randomized calculation problem if available
  if (data.generate && !data.generated) {
      const gen = data.generate();
      data.question = gen.question;
      data.correctValue = gen.correctValue;
      data.explanation = gen.explanation;
      data.generated = true; 
  }

  // Intense red glitch trigger for the first calculation problem (Chamber 8 / index 7)
  if (index === 7) {
      document.body.classList.add('abyssal-glitch-active');
      setTimeout(() => {
          document.body.classList.remove('abyssal-glitch-active');
      }, 600);
  }
  
  if (data.isInput) {
    interactionHTML = `
      <div style="margin-bottom:16px;">
        <input type="text" class="text-input input-ans" placeholder="e.g. 123.45 N" autocomplete="off">
      </div>
      <button class="btn submit-input-btn" style="width:100%;">SUBMIT ANSWER</button>
    `;
  } else {
    options = data.wrong.map(txt => ({ text: txt, isCorrect: false }));
    options.push({ text: data.correct, isCorrect: true });
    options = shuffleArray(options);
    const letters = ['A', 'B', 'C', 'D'];
    
    interactionHTML = `
      <div class="choices">
        ${options.map((opt, i) => `
          <button class="choice" data-idx="${i}">
            <span class="key">${letters[i]}</span>
            <span class="text">${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  let html = `
    <div class="card stage active">
      <div class="guide-head"><span class="chip" style="color:var(--accent-cyan); border-color:var(--accent-cyan);">Abyssal Guide</span></div>
      <div class="lecture">
        <h3>${data.title}</h3>
        <p>${data.lecture}</p>
      </div>
      <div class="trial">
        <div class="trial-tag">Trial ${index + 1}</div>
        <div class="trial-q">${data.question}</div>
        ${interactionHTML}
        <div class="feedback"></div>
        <div class="next-row"><button class="btn">PROCEED TO NEXT CHAMBER ▸</button></div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
  renderMathInElement(container, { delimiters: [ {left: "$", right: "$", display: false} ] });

  const feedback = container.querySelector('.feedback');
  const nextBtn = container.querySelector('.next-row .btn');
  const nextRow = container.querySelector('.next-row');
  
  let answered = false;

  // Handle Input Solving
  if (data.isInput) {
    const inputField = container.querySelector('.input-ans');
    const submitBtn = container.querySelector('.submit-input-btn');
    
    submitBtn.addEventListener('click', () => {
      if (answered) return;
      const val = inputField.value.trim();
      if (!val) return;
      
      answered = true;
      inputField.disabled = true;
      submitBtn.disabled = true;
      submitBtn.style.display = 'none';

      // Parse numerical answer and unit (tolerates +/- 0.1)
      const match = val.match(/[-+]?[0-9]*\.?[0-9]+/);
      const num = match ? parseFloat(match[0]) : null;
      const hasUnit = val.toLowerCase().includes('n');
      
      const actual = data.correctValue;
      let isCorrect = false;
      if (num !== null && hasUnit && Math.abs(num - actual) <= 0.1) {
        isCorrect = true;
      }
      
      _recordAnswer(index, isCorrect);

      if (isCorrect) {
        score++;
        feedback.className = 'feedback show ok';
        feedback.innerHTML = `<span class="fb-title">✔ CORRECT</span>${data.explanation}`;
        inputField.style.borderColor = 'var(--accent-green)';
        inputField.style.backgroundColor = 'rgba(61, 220, 132, 0.1)';
      } else {
        feedback.className = 'feedback show no';
        feedback.innerHTML = `<span class="fb-title">✘ INCORRECT</span>The accepted value was approximately ${actual.toFixed(2)} N. <br><br> ${data.explanation}`;
        inputField.style.borderColor = 'var(--accent-red)';
        inputField.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
      }
      
      renderMathInElement(feedback, { delimiters: [ {left: "$", right: "$", display: false} ] });
      hudScr.textContent = score;
      nextRow.classList.add('show');
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitBtn.click();
    });

  // Handle Conceptual Choices
  } else {
    const choices = container.querySelectorAll('.choice');
    choices.forEach(btn => {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        
        const optIdx = this.getAttribute('data-idx');
        const isCorrect = options[optIdx].isCorrect;
        
        choices.forEach(c => {
          const cIdx = c.getAttribute('data-idx');
          if(options[cIdx].isCorrect) c.classList.add('correct');
          c.disabled = true;
        });
        
        if (!isCorrect) this.classList.add('wrong');

        _recordAnswer(index, isCorrect);

        if (isCorrect) {
          score++;
          feedback.className = 'feedback show ok';
          feedback.innerHTML = `<span class="fb-title">✔ CORRECT</span>${data.explanation}`;
        } else {
          feedback.className = 'feedback show no';
          feedback.innerHTML = `<span class="fb-title">✘ INCORRECT</span>${data.explanation}`;
        }
        
        renderMathInElement(feedback, { delimiters: [ {left: "$", right: "$", display: false} ] });
        hudScr.textContent = score;
        nextRow.classList.add('show');
      });
    });
  }

  nextBtn.addEventListener('click', () => {
    _recordNext(index);
    current++;
    if (current >= TOTAL) {
      finish();
    } else {
      updateHUD();
      renderStage(current);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function startQuest() {
  intro.classList.remove('active');
  setTimeout(() => intro.style.display = 'none', 600);
  shell.style.display = 'block';
  document.getElementById('main-wrap').style.minHeight = 'auto'; 
  
  _TR.startTime = Date.now();
  _TR.currentSector = 0;
  _TR.sectorStartTime = Date.now();
  _TR.phase = 'reading';

  current = 0;
  updateHUD();
  renderStage(0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateHUD() {
  hudSec.textContent = 'CHAMBER ' + (current + 1) + '/' + TOTAL;
  fill.style.width = ((current) / TOTAL * 100) + '%';
  hudScr.textContent = score;
}

function finish() {
  shell.style.display = 'none';
  container.innerHTML = '';
  _TR.totalTime = Date.now() - _TR.startTime;
  _TR.score = score;
  document.getElementById('tracker-overlay').classList.add('show');
  document.getElementById('tr-name-input').focus();
}

// ===== TRACKER LOGIC =====
var _TR = {
  startTime: null, sectorStartTime: null, currentSector: -1, sectorData: [],
  tabSwitches: 0, copyPasteCount: 0, scrollJumps: 0,
  lastScrollY: 0, lastScrollTime: Date.now(), idlePauses: 0,
  lastActivityTime: Date.now(), idleTimer: null, phase: 'intro',
  introVideoOpenTime: 0, introVideoWatchTime: 0
};

document.addEventListener('visibilitychange', () => { 
  if (document.hidden && _TR.phase !== 'watching') {
    _TR.tabSwitches++; 
  }
});

function _touchActivity() {
  _TR.lastActivityTime = Date.now();
  clearTimeout(_TR.idleTimer);
  _TR.idleTimer = setTimeout(() => { 
    if (_TR.phase === 'reading') _TR.idlePauses++; 
  }, 30000);
}
['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'].forEach(ev => {
  document.addEventListener(ev, _touchActivity, { passive: true });
});

document.addEventListener('scroll', () => {
  var now = Date.now();
  var dy = Math.abs(window.scrollY - _TR.lastScrollY);
  var dt = now - _TR.lastScrollTime;
  if (dy > 500 && dt < 400 && _TR.phase !== 'watching') _TR.scrollJumps++;
  _TR.lastScrollY = window.scrollY;
  _TR.lastScrollTime = now;
}, { passive: true });

function _recordAnswer(sec, isCorrect) {
  var now = Date.now();
  var rawReadTime = now - (_TR.sectorStartTime || now);
  
  if (!_TR.sectorData[sec]) {
    _TR.sectorData[sec] = {
      sector: sec + 1,
      readTime: rawReadTime,
      answerTime: now,
      correct: isCorrect,
    };
  }
  _TR.phase = 'answered';
}

function _recordNext(sec) {
  var now = Date.now();
  var sd = _TR.sectorData[sec];
  if (sd && !sd.continueTime) {
    sd.continueTime = now;
    sd.reviewTime = now - (sd.answerTime || now);
  }
  _TR.currentSector++;
  _TR.sectorStartTime = Date.now();
  _TR.phase = 'reading';
}

// SEAL RECORD BUTTON
const _nameInput = document.getElementById('tr-name-input');
const _submitBtn = document.getElementById('tr-submit');

_nameInput.addEventListener('input', (e) => {
  _submitBtn.disabled = e.target.value.trim().length === 0;
});

_nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !_submitBtn.disabled) {
    _runAnalysis();
  }
});

_submitBtn.addEventListener('click', () => {
  if (!_submitBtn.disabled) _runAnalysis();
});

function _runAnalysis() {
  var name = _nameInput.value.trim();
  if (!name) return;
  document.getElementById('name-phase').style.display = 'none';
  document.getElementById('result-phase').style.display = 'block';
  document.getElementById('tracker-overlay').scrollTo({top: 0, behavior: 'smooth'});
  
  let attempts = parseInt(localStorage.getItem('physics_domain_attempts') || '0', 10);
  attempts++;
  localStorage.setItem('physics_domain_attempts', attempts);
  
  _renderResult(name, _analyzeNation(name), attempts);
}

// ===== ANALYSIS ENGINE (UPDATED FOR ASYNC LECTURE) =====
function _analyzeNation(name) {
  var t = _TR;
  var totalSec = (t.totalTime || 1) / 1000; 
  var numSectors = 10;
  var correct = t.score;
  var tabs = t.tabSwitches;
  var cpCount = t.copyPasteCount;
  var idles = t.idlePauses;
  var videoWatchSec = (t.introVideoWatchTime || 0) / 1000;

  var validSectors = t.sectorData.filter(s => s != null);
  var avgRead = validSectors.reduce((a, s) => a + (s.readTime || 30000), 0) / numSectors / 1000;

  var skippedVideo = videoWatchSec < 120; 
  var watchedVideo = videoWatchSec > 480; 

  var isCheater = (tabs >= 3 || cpCount >= 2 || (skippedVideo && correct === 10 && avgRead < 15));
  var isImpulsive = (skippedVideo && correct < 7) || (avgRead < 10 && correct < 7);
  var isMethodical = (watchedVideo && avgRead > 30);
  var isFocused = (tabs === 0 && cpCount === 0);
  var isPerfect = (correct === 10);
  var isFast = (totalSec < 300); 

  var sc = { Mondstadt:0, Liyue:0, Inazuma:0, Sumeru:0, Fontaine:0, Natlan:0, Snezhnaya:0, NodKrai:0 };

  if (isCheater) {
      sc.Fontaine += 100;
  } else if (isImpulsive) {
      sc.Natlan += 50;
  } else if (isPerfect && isFocused && watchedVideo) {
      sc.Snezhnaya += 50;
  } else if (isMethodical && correct >= 8) {
      sc.Liyue += 50;
  } else if (isFocused && correct >= 7 && !isMethodical) {
      sc.Inazuma += 50;
  } else if (isFast && correct >= 8) {
      sc.Sumeru += 50;
  } else if (correct < 5 && !watchedVideo) {
      sc.NodKrai += 50;
  } else {
      sc.Mondstadt += 50;
  }

  sc.Mondstadt += (totalSec < 600 ? 5 : 0);
  sc.Liyue += (watchedVideo ? 10 : 0);
  sc.Inazuma += (tabs === 0 ? 10 : 0);
  sc.Sumeru += (skippedVideo && correct >= 8 ? 10 : 0);
  sc.Fontaine += (tabs * 5) + (cpCount * 10);
  sc.Natlan += (skippedVideo && correct < 7 ? 15 : 0);
  sc.Snezhnaya += (correct === 10 ? 10 : 0);
  sc.NodKrai += (idles > 3 ? 10 : 0);

  var best = Object.keys(sc).reduce((a, b) => sc[a] >= sc[b] ? a : b);
  return { nation: best, stats: { totalSec, avgRead, correct, tabs, cpCount, idles, videoWatchSec } };
}

// ===== LORE & IMAGES =====
var _NATIONS = {
  Mondstadt: { 
    emoji: '🌬', element: 'Anemo', color: '#7ed6f5', 
    image: 'https://static0.fextralifeimages.com/file/genshinimpact/5/5d/Anemo-element-genshin-impact-wiki-guide.png', 
    desc: (s, name) => [
      `Like the Anemo Archon Barbatos guiding a glider through a storm, ${name}'s pacing through this asynchronous module was breezy and wonderfully unburdened by overthinking. The data shows a smooth, relaxed traversal through the introductory concepts.`,
      "The City of Freedom values intuition over exhausting calculation. You navigated these foundational physics constraints with a free spirit, skipping tedious hesitation and letting your natural curiosity carry you. A true Outrider of the physical laws."
    ]
  },
  Liyue: { 
    emoji: '⚖', element: 'Geo', color: '#ffc94d', 
    image: 'https://static0.fextralifeimages.com/file/genshinimpact/5/51/Geo-element-genshin-impact-wiki-guide.png',
    desc: (s, name) => [
      `Deliberate, unyielding, and meticulous. The Archives indicate that ${name} assessed every part of this asynchronous module with the careful eye of an appraiser determining the worth of Cor Lapis. No sudden movements, just steady, calculated learning.`,
      "Liyue Harbor is built on solid stone under the watchful eye of Rex Lapis. You did not rush this assignment; you absorbed the fundamental laws of reality, ensuring your mathematical foundation was completely unshakable before locking in your final answers."
    ]
  },
  Inazuma: { 
    emoji: '⚡', element: 'Electro', color: '#c39dff', 
    image: 'https://static0.fextralifeimages.com/file/genshinimpact/5/53/Electro-element-genshin-impact-wiki-guide.png',
    desc: (s, name) => [
      `Striking with the focus of a drawn blade. ${name} cleared this self-paced module with zero distractions, maintaining a pacing that was sharp, intensely efficient, and lethal to error. The records show almost no straying from the active tab.`,
      "Inazuma reveres eternity through perfection. You shut out the noise of the outside world to focus on this introductory lecture, maintaining an ironclad discipline and unwavering resolve that the Almighty Raiden Shogun herself would commend."
    ]
  },
  Sumeru: { 
    emoji: '🌿', element: 'Dendro', color: '#3ddc84', 
    image: 'https://static0.fextralifeimages.com/file/genshinimpact/1/18/Dendro-element-genshin-impact-wiki-guide.png', 
    desc: (s, name) => {
      let text = s.outsideHelp 
        ? "Your tactical tab-switches and departures from the trial suggest you brilliantly interfaced with the Akasha—or external archives—to verify the truth during your study session." 
        : "Your blistering pace implies a devastatingly sharp intellect, slicing through complex logic before the ink on the lecture was even dry.";
      return [
        `Wisdom is a weapon, and ${name} wields it effortlessly. You deciphered the introductory mechanics of reality with terrifying speed. ${text}`,
        "Sumeru, the Nation of Wisdom, holds that knowledge is paramount above all else. Whether born of natural brilliance or highly resourceful study habits during this async task, your ability to extract correct universal laws is undeniable."
      ];
    }
  },
  Fontaine: { 
    emoji: '💧', element: 'Hydro', color: '#5bb8ff', 
    image: 'https://static0.fextralifeimages.com/file/genshinimpact/d/db/Hydro-element-genshin-impact-wiki-guide.png', 
    desc: (s, name) => [
      `Every lecture is a stage, and ${name} played their part with dramatic flair. The telemetry for your asynchronous session shows pauses for suspense, theatrical tab switches, and sudden flashes of insight that characterized this entire run.`,
      "In the Nation of Hydro, spectacle is just as important as the final verdict. You didn't merely complete a physics assignment—you performed it, turning a self-paced quiz into a chaotic masterpiece worthy of the Opera Epiclese."
    ]
  },
  Natlan: { 
    emoji: '🔥', element: 'Pyro', color: '#ff8c42', 
    image: 'https://static0.fextralifeimages.com/file/genshinimpact/2/2c/Pyro-element-genshin-impact-wiki-guide.png', 
    desc: (s, name) => [
      `Bold, impulsive, and burning with momentum. ${name} charged into the async trials before the dust settled, choosing swift action over careful deliberation. The pacing was aggressive, leaving little room for second-guessing the foundational concepts.`,
      "Natlan is forged in the fires of war and raw instinct. You proved that sometimes, surviving an introductory physics assignment requires leaping first and recalibrating the math later. The Pyro Archon favors the brave over the cautious."
    ]
  },
  Snezhnaya: { 
    emoji: '❄️', element: 'Cryo', color: '#a0d4ff', 
    image: 'https://static0.fextralifeimages.com/file/genshinimpact/f/fc/Cryo-element-genshin-impact-wiki-guide.png', 
    desc: (s, name) => [
      `Clinical, calculating, and coldly efficient. ${name} treated this foundational physics assignment as a strict mission objective—assessed, executed, and completed without wasted motion or unnecessary hesitation.`,
      "Snezhnaya demands absolute order and results. Even in an unmonitored asynchronous setup, you brought a chilling competence that left no room for sentimentality or doubt. The Tsaritsa and her Harbingers respect nothing but flawless execution."
    ]
  },
  NodKrai: { 
    emoji: '🌨️', element: 'Abyssal Frost', color: '#8b9bb4', 
    image: 'https://static.wikia.nocookie.net/gensin-impact/images/3/37/Talent_Law_of_the_New_Moon.png/revision/latest?cb=20260115185658',
    desc: (s, name) => [
      `Lost in the blinding snow of complex variables, ${name}'s traversal of this introductory module was marked by hesitation and wandering. The fundamental truths proved elusive, leading to a session defined by stillness and fragmented focus.`,
      "Nod'Krai represents the frozen edge of the map where travelers often lose their way. Yet, pushing through a difficult asynchronous lecture and arriving at the end—regardless of the final score—is its own form of abyssal victory."
    ]
  }
};

// ===== RENDER & IMAGE EXPORT =====
function _renderResult(name, analysis, attempts) {
  var n = analysis.nation;
  var info = _NATIONS[n];
  var s = analysis.stats;
  var paras = info.desc(s, name);
  var col = info.color;

  const bgm = document.getElementById('nation-bgm');
  if (bgm) {
    bgm.currentTime = 0;
    bgm.volume = 1.0;
    bgm.play().catch(e => console.log('Audio autoplay prevented by browser.'));
  }

  document.documentElement.style.setProperty('--nation-tint', col);

  var minsTotal = Math.floor(s.totalSec / 60);
  var secsTotal = Math.round(s.totalSec % 60);
  var avgStr = s.avgRead >= 60 ? Math.floor(s.avgRead/60) + 'm ' + Math.round(s.avgRead%60) + 's' : Math.round(s.avgRead) + 's';
  
  var scoreClass = s.correct >= 8 ? 'color: var(--accent-green)' : s.correct >= 5 ? 'color: var(--border-gold)' : 'color: var(--accent-red)';
  var displayNation = n === 'NodKrai' ? "Nod'Krai" : n;
  
  var sigilHTML = info.image 
      ? `<img class="tr-nation-img" src="${info.image}" alt="${displayNation}" crossorigin="anonymous">`
      : `<span class="tr-sigil" style="color: ${col}">${info.emoji}</span>`;

  var html = `
    <div id="screenshot-container" style="position: relative; overflow: hidden; background-color: var(--bg-base); border: 1px solid var(--border-glow); border-radius: 12px; padding: 40px; margin-bottom: 24px;">
      
      <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, var(--nation-tint) 0%, transparent 60%); opacity: 0.15; z-index: 1;"></div>
      
      <div class="stars"></div><div class="stars stars2"></div>
      
      <div class="attempt-stamp">Attempt: #${attempts}</div>

      <div class="rc-inner">
        <div class="tr-traveler">Abyssal Record Verified</div>
        <div class="tr-name-display">${_esc(name)}</div>
        <div class="tr-verdict">By observing your navigation of the physical laws,<br>the land of Teyvat resonates to you with the element of</div>
        <span class="tr-nation-name" style="color: ${col}">${_esc(displayNation)}</span>
        
        <div class="tr-sigil-container">${sigilHTML}</div>
        <span class="tr-element" style="color: ${col}">${info.element}</span>
        
        <div class="tr-stats">
          <div class="tr-stat"><span class="sv" style="color: ${col}">${minsTotal}m ${secsTotal}s</span><span class="sl">Clear Time</span></div>
          <div class="tr-stat"><span class="sv" style="${scoreClass}">${s.correct} / 10</span><span class="sl">Stars Collected</span></div>
          <div class="tr-stat"><span class="sv" style="color: var(--accent-cyan)">${avgStr}</span><span class="sl">Avg Read Pace</span></div>
          <div class="tr-stat"><span class="sv" style="color: ${s.tabs > 0 ? 'var(--border-gold)' : 'var(--accent-green)'}">${s.tabs}</span><span class="sl">Focus Breaks</span></div>
        </div>
        
        <div class="tr-lore-card">
          <span class="tr-section-label" style="color: ${col}">Mona's Astrological Reading</span>
          ${paras.map(p => `<p>${_esc(p)}</p>`).join('')}
        </div>
      </div>
    </div>
  `;

  document.getElementById('result-content').innerHTML = html;
}

function saveResultImage() {
  const target = document.getElementById('screenshot-container');
  html2canvas(target, {
    backgroundColor: '#0a0e1c',
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false
  }).then(canvas => {
    let link = document.createElement('a');
    link.download = 'abyssal_physics_record.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

function _esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
