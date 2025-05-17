// Connect your JavaScript to your HTML by adding this script tag before </body> in your HTML file:
// <script src="indeex.javascript"></script>

// To connect your CSS, add this link tag inside the <head> of your HTML file:
// <link rel="stylesheet" href="styles.css">

// Example: You can now write your JavaScript code here
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is connected!');
});

    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
    function opentab(tabname) {
        for (tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }


document.querySelectorAll('.icon-container i').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    const randomX = Math.floor(Math.random() * 20 - 10); // -10 to +10
    const randomY = Math.floor(Math.random() * 20 - 10);
    const randomRotate = Math.floor(Math.random() * 60 - 30); // -30 to +30
    icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
  });

  icon.addEventListener('mouseleave', () => {
    icon.style.transform = 'translate(0, 0) rotate(0deg)';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.app-dev-service');
  const icons = Array.from(container.querySelectorAll('.icon-bounce'));
  const iconSize = 32;
  const containerW = container.offsetWidth;
  const containerH = container.offsetHeight;
  const NORMAL_SPEED = 0.18;
  const FAST_SPEED = 0.7;

  const state = icons.map(() => {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * (containerW - iconSize),
      y: Math.random() * (containerH - iconSize),
      vx: Math.cos(angle) * NORMAL_SPEED,
      vy: Math.sin(angle) * NORMAL_SPEED,
      hover: false
    };
  });

  // Kata-kata acak
  const angryWords = [
    "Ouch!", "Hey!!", "Careful!", "Jangan ganggu!", "Stop it!", "Aduh!", "Serius nih?", "Please no!", "Enough!", "Astaga!"
  ];

  // Kata-kata besar acak
  const bigMessages = [
    "STOP!", "ENOUGH!", "JANGAN GANGGU!", "SERIOUSLY?", "WOAH!", "HEY!!"
  ];

  icons.forEach((icon, idx) => {
    // Bubble pesan
    let msg = document.createElement('span');
    msg.className = 'angry-msg';
    msg.style.position = 'absolute';
    msg.style.left = '50%';
    msg.style.bottom = '110%';
    msg.style.transform = 'translateX(-50%)';
    msg.style.background = 'rgba(0,0,0,0.85)';
    msg.style.color = '#fff';
    msg.style.padding = '6px 14px';
    msg.style.borderRadius = '16px';
    msg.style.fontSize = '15px';
    msg.style.pointerEvents = 'none';
    msg.style.opacity = '0';
    msg.style.transition = 'opacity 0.2s';
    msg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    msg.style.whiteSpace = 'nowrap';
    msg.style.zIndex = '999';
    icon.style.zIndex = '1000';
    icon.style.position = 'absolute';
    icon.appendChild(msg);

    // Tambahkan penghitung klik untuk setiap icon
    let angryClickCount = 0;
    let angryTimeout = null;
    let speedTimeout = null;

    // Tambahkan efek flying saat mouse masuk
    icon.addEventListener('mouseenter', () => {
      state[idx].vx = 0;
      state[idx].vy = 0;
      state[idx].hover = true;
      icon.classList.add('angry');
      icon.classList.add('flying');
    });
    icon.addEventListener('mouseleave', () => {
      const angle = Math.random() * Math.PI * 2;
      state[idx].vx = Math.cos(angle) * NORMAL_SPEED;
      state[idx].vy = Math.sin(angle) * NORMAL_SPEED;
      state[idx].hover = false;
      icon.classList.remove('angry');
      icon.classList.remove('flying');
      msg.style.opacity = '0';
      angryClickCount = 0;
      if (angryTimeout) clearTimeout(angryTimeout);
      if (speedTimeout) clearTimeout(speedTimeout);
    });

    icon.addEventListener('click', (e) => {
      const word = angryWords[Math.floor(Math.random() * angryWords.length)];
      msg.textContent = word;
      msg.style.opacity = '1';
      setTimeout(() => {
        msg.style.opacity = '0';
      }, 1200);

      // Mainkan sound effect saat bubble pesan muncul
      // Array file audio
      const audioFiles = [
        'sounds/jangan bang.mp3',
        'sounds/oucheffect.mp3',
        'sounds/jangan bang.mp3'
      ];

      // Pilih salah satu secara acak
      const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      const audio = new Audio(randomAudio);
      audio.volume = 0.5;
      audio.currentTime = 0;
      audio.play();

      // Jika icon sedang marah (class angry), hitung klik
      if (icon.classList.contains('angry')) {
        angryClickCount++;
        if (angryTimeout) clearTimeout(angryTimeout);
        angryTimeout = setTimeout(() => { angryClickCount = 0; }, 1000);

        if (angryClickCount >= 2) {
          // Percepat pergerakan icon
          state[idx].vx *= (FAST_SPEED / NORMAL_SPEED);
          state[idx].vy *= (FAST_SPEED / NORMAL_SPEED);

          icon.classList.add('flying');

          // Setelah 3 detik, lambatkan lagi
          if (speedTimeout) clearTimeout(speedTimeout);
          speedTimeout = setTimeout(() => {
            const angle = Math.atan2(state[idx].vy, state[idx].vx);
            state[idx].vx = Math.cos(angle) * NORMAL_SPEED;
            state[idx].vy = Math.sin(angle) * NORMAL_SPEED;
            icon.classList.remove('flying');
          }, 3000);

          // Mainkan sound effect glitch besar (bisa sama atau beda)
          // const glitchAudio = new Audio('sounds/oucheffect.mp3');
          // glitchAudio.volume = 0.5;
          // glitchAudio.currentTime = 0;
          // glitchAudio.play();

          document.body.classList.add('glitch-bg');
          let bigMsg = document.createElement('div');
          bigMsg.className = 'glitch-big-message';
          bigMsg.textContent = bigMessages[Math.floor(Math.random() * bigMessages.length)];
          document.body.appendChild(bigMsg);

          setTimeout(() => {
            document.body.classList.remove('glitch-bg');
            if (bigMsg) bigMsg.remove();
          }, 1200);

          angryClickCount = 0;
        }
      }
    });
  });

  function animate() {
    for (let i = 0; i < state.length; i++) {
      let s = state[i];
      if (!s.hover) {
        s.x += s.vx;
        s.y += s.vy;
      }
      // Bounce left
      if (s.x <= 0) {
        s.x = 0;
        s.vx = Math.abs(s.vx);
        squish(icons[i], 'x');
      }
      // Bounce right
      if (s.x >= containerW - iconSize) {
        s.x = containerW - iconSize;
        s.vx = -Math.abs(s.vx);
        squish(icons[i], 'x');
      }
      // Bounce top
      if (s.y <= 0) {
        s.y = 0;
        s.vy = Math.abs(s.vy);
        squish(icons[i], 'y');
      }
      // Bounce bottom
      if (s.y >= containerH - iconSize) {
        s.y = containerH - iconSize;
        s.vy = -Math.abs(s.vy);
        squish(icons[i], 'y');
      }
      // Keep speed constant
      if (!s.hover) {
        const v = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (Math.abs(v - NORMAL_SPEED) > 0.001) {
          const angle = Math.atan2(s.vy, s.vx);
          s.vx = Math.cos(angle) * NORMAL_SPEED;
          s.vy = Math.sin(angle) * NORMAL_SPEED;
        }
      }
    }
    // Collision detection
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        let a = state[i], b = state[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < iconSize) {
          let angle = Math.atan2(dy, dx);
          a.vx = Math.cos(angle) * NORMAL_SPEED;
          a.vy = Math.sin(angle) * NORMAL_SPEED;
          b.vx = -Math.cos(angle) * NORMAL_SPEED;
          b.vy = -Math.sin(angle) * NORMAL_SPEED;
          squish(icons[i], Math.abs(dx) > Math.abs(dy) ? 'x' : 'y');
          squish(icons[j], Math.abs(dx) > Math.abs(dy) ? 'x' : 'y');
        }
      }
    }
    // Apply positions
    for (let i = 0; i < state.length; i++) {
      let s = state[i];
      s.x = Math.max(0, Math.min(s.x, containerW - iconSize));
      s.y = Math.max(0, Math.min(s.y, containerH - iconSize));
      icons[i].style.left = s.x + 'px';
      icons[i].style.top = s.y + 'px';
    }
    requestAnimationFrame(animate);
  }

  function squish(el, axis) {
    if (axis === 'x') {
      el.classList.add('squish-x');
      setTimeout(() => el.classList.remove('squish-x'), 150);
    } else if (axis === 'y') {
      el.classList.add('squish-y');
      setTimeout(() => el.classList.remove('squish-y'), 150);
    }
  }

  animate();
});

document.addEventListener('mousemove', function(e) {
  const bg = document.getElementById('parallax-bg');
  const x = Math.round((e.clientX / window.innerWidth) * 100);
  const y = Math.round((e.clientY / window.innerHeight) * 100);
  bg.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(11, 195, 219, 0.6) 0%, rgba(0, 0, 0, 0.95) 80%)`;
});

// === Partikel 3D Interaktif & Dinamis (Statis di Background) ===
(function() {
  const canvas = document.getElementById('bg-particles');
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });

  const PARTICLE_COUNT = 48;
  const colors = [
    'rgba(0,120,255,0.25)',
    'rgba(0,180,255,0.18)',
    'rgba(0,80,180,0.22)',
    'rgba(80,120,255,0.15)',
    'rgba(0,180,255,0.13)'
  ];
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      baseAngle: (i / PARTICLE_COUNT) * Math.PI * 2,
      color: colors[i % colors.length],
      r: Math.random() * 16 + 10,
      z: Math.random() * 400 + 100
    });
  }

  let time = 0;

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Efek gradasi radial di tengah
    let grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w / 1.2);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.07)');
    grad.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Gambar partikel membentuk bentuk dinamis di tengah
    const RADIUS = Math.min(w, h) / 3.2;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let p = particles[i];
      // Bentuk berubah: lingkaran, ellipse, gelombang
      let angle = p.baseAngle + time * 0.5 + Math.sin(time * 0.7 + i) * 0.2;
      let radius = RADIUS + Math.sin(time + i) * 40 + Math.cos(time * 0.7 + i * 2) * 20;
      let px = w/2 + Math.cos(angle) * radius;
      let py = h/2 + Math.sin(angle) * (radius * (0.7 + 0.3 * Math.sin(time * 0.5)));
      let scale = 200 / (p.z + 200);
      let pr = p.r * scale * (1.1 + 0.2 * Math.sin(time * 1.2 + i));

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 32 * scale;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.35 + 0.2 * scale; // Lebih transparan
      ctx.fill();
      ctx.restore();
    }
  }

  function update() {
    time += 0.012;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let p = particles[i];
      p.z += Math.sin(time + i) * 0.7;
      if (p.z < 60) p.z = 60;
      if (p.z > 500) p.z = 500;
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  loop();
})();

document.querySelectorAll('.photo-spotlight').forEach(wrapper => {
  const overlay = wrapper.querySelector('.photo-overlay');
  wrapper.addEventListener('mousemove', function(e) {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 90px, rgba(0,0,0,0.85) 180px)`;
  });
  wrapper.addEventListener('mouseleave', function() {
    overlay.style.background = 'rgba(0,0,0,0.85)';
  });
});

const spotlight = document.querySelector('.header-spotlight-overlay');
const header = document.getElementById('header');

header.addEventListener('mousemove', function(e) {
  const rect = header.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  spotlight.style.background = `
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(255,255,255,0.10) 0px,
      rgba(255,255,255,0.07) 80px,
      rgba(0,0,0,0.60) 180px,
      rgba(0,0,0,0.85) 350px
    )`;
});
header.addEventListener('mouseleave', function() {
  spotlight.style.background = 'rgba(0,0,0,0.85)';
});

const lampSwitch = document.getElementById('lampSwitch');
lampSwitch.addEventListener('click', function() {
  document.body.classList.toggle('lamp-on');
  lampSwitch.classList.toggle('on');
  lampSwitch.classList.remove('jelly'); // reset jika animasi belum selesai
  void lampSwitch.offsetWidth; // force reflow
  lampSwitch.classList.add('jelly');
  setTimeout(() => lampSwitch.classList.remove('jelly'), 600);
});

function updateClock() {
  const clock = document.getElementById('liveClock');
  if (!clock) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

var sidemenu = document.getElementById("sidemenu");
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

document.querySelectorAll('a[href]').forEach(link => {
  // Hanya untuk link internal (bukan #, bukan target="_blank", bukan mailto/tel)
  if (
    link.getAttribute('target') === '_blank' ||
    link.getAttribute('href').startsWith('mailto:') ||
    link.getAttribute('href').startsWith('tel:') ||
    link.getAttribute('href').startsWith('#')
  ) return;

  link.addEventListener('click', function(e) {
    // Cegah reload jika ctrl/cmd/shift/alt
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location = link.href;
    }, 400);
  });
});

const subtitleTexts = [
  "Crafting modern digital experiences.",
  "Passionate about design & technology.",
  "Let's build something amazing together!"
];
let subIdx = 0;
function showSubtitle() {
  const el = document.getElementById('animatedSubtitle');
  el.textContent = subtitleTexts[subIdx];
  subIdx = (subIdx + 1) % subtitleTexts.length;
}
showSubtitle();
setInterval(showSubtitle, 2500);

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

(function() {
  const layers = [
    { el: document.querySelector('.layer1'), factor: 0.25 },
    { el: document.querySelector('.layer2'), factor: 0.5 },
    { el: document.querySelector('.layer3'), factor: 0.8 }
  ];

  function setParallax(x, y) {
    layers.forEach(layer => {
      // Offset max 40px per layer
      const tx = x * 40 * layer.factor;
      const ty = y * 40 * layer.factor;
      layer.el.style.transform = `translate(${tx}px, ${ty}px) scale(1.05)`;
    });
  }

  // Gyro for mobile
  if (window.DeviceOrientationEvent) {
    let enabled = false;
    function handleOrientation(event) {
      // gamma: left/right, beta: front/back
      let x = (event.gamma || 0) / 45; // -1 to 1
      let y = (event.beta || 0 - 45) / 45; // -1 to 1, center at portrait
      x = Math.max(-1, Math.min(1, x));
      y = Math.max(-1, Math.min(1, y));
      setParallax(x, y);
    }
    // iOS 13+ permission
    function enableGyro() {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(function(response) {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
            enabled = true;
          }
        });
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
        enabled = true;
      }
    }
    // Only enable on mobile
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Show permission popup for iOS
      window.addEventListener('touchend', function once() {
        if (!enabled) enableGyro();
        window.removeEventListener('touchend', once);
      });
      // Fallback: enable for Android
      setTimeout(() => { if (!enabled) enableGyro(); }, 1200);
    }
  }

  // Fallback: mousemove parallax for desktop
  else {
    document.addEventListener('mousemove', function(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax(x, y);
    });
  }
})();

const audio = document.getElementById('backsoundAudio');
const btn = document.getElementById('backsoundBtn');
const icon = document.getElementById('backsoundIcon');
let isPlaying = false;

btn.addEventListener('click', function() {
  if (!isPlaying) {
    audio.volume = 0.6;
    audio.play();
    icon.classList.remove('fa-volume-off');
    icon.classList.add('fa-volume-up');
    isPlaying = true;
  } else {
    audio.pause();
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-volume-off');
    isPlaying = false;
  }
});

// Optional: Pause audio saat user keluar tab
document.addEventListener('visibilitychange', function() {
  if (document.hidden && isPlaying) {
    audio.pause();
  } else if (!document.hidden && isPlaying) {
    audio.play();
  }
});

const tabTitles = Array.from(document.querySelectorAll('.tab-links'));
const tabContents = Array.from(document.querySelectorAll('.tab-contents'));
let currentTab = 0;

function showTab(idx, direction = 0) {
  tabContents.forEach((tab, i) => {
    tab.classList.remove('active-tab', 'slide-left', 'slide-right');
    if (i === idx) {
      tab.classList.add('active-tab');
    } else if (i < idx) {
      tab.classList.add('slide-left');
    } else {
      tab.classList.add('slide-right');
    }
  });
  tabTitles.forEach((t, i) => t.classList.toggle('active-link', i === idx));
  currentTab = idx;
}

// Tab click
tabTitles.forEach((tab, i) => {
  tab.onclick = () => showTab(i);
});

// Swipe/drag support
let startX = null;
const slider = document.querySelector('.tab-slider');
slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slider.addEventListener('touchend', e => {
  if (startX === null) return;
  let dx = e.changedTouches[0].clientX - startX;
  if (dx > 50 && currentTab > 0) showTab(currentTab - 1); // swipe right
  if (dx < -50 && currentTab < tabContents.length - 1) showTab(currentTab + 1); // swipe left
  startX = null;
});
// Desktop drag (optional)
let dragX = null;
slider.addEventListener('mousedown', e => dragX = e.clientX);
slider.addEventListener('mouseup', e => {
  if (dragX === null) return;
  let dx = e.clientX - dragX;
  if (dx > 50 && currentTab > 0) showTab(currentTab - 1);
  if (dx < -50 && currentTab < tabContents.length - 1) showTab(currentTab + 1);
  dragX = null;
});

// Inisialisasi
showTab(currentTab);