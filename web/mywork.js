document.addEventListener('DOMContentLoaded', function() {
  const previews = [
    {
      selector: '.mywork-item:nth-child(1)',
      video: 'video/0207.mp4',
      title: 'Social Media App'
    },
    {
      selector: '.mywork-item:nth-child(2)',
      video: 'video/preview2.mp4',
      title: 'CANVA Designer'
    },
    {
      selector: '.mywork-item:nth-child(3)',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Web Development'
    },
    {
      selector: '.mywork-item:nth-child(4)',
      video: 'https://www.w3schools.com/html/movie.mp4',
      title: 'Mobile App UI'
    }
  ];

  const holo = document.getElementById('hologramPreview');
  const holoVideo = document.getElementById('holoVideo');
  const holoTitle = document.getElementById('holoTitle');

  previews.forEach((item) => {
    const el = document.querySelector(item.selector);
    if (!el) return;
    el.addEventListener('mouseenter', () => {
      holo.classList.add('active');
      holoVideo.pause();
      holoVideo.src = item.video;
      holoVideo.load();
      holoVideo.oncanplay = () => {
        holoVideo.play();
      };
      holoTitle.textContent = item.title;
    });
    el.addEventListener('mouseleave', () => {
      holo.classList.remove('active');
      holoVideo.pause();
      holoVideo.src = '';
      holoTitle.textContent = '';
    });
  });

  const items = document.querySelectorAll('.mywork-item');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('popup');
    });
    item.addEventListener('mousemove', (e) => {
      // 3D tilt effect
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
      const rotateY = ((x - centerX) / centerX) * -10;
      item.style.setProperty('--tilt-x', `${rotateY}deg`);
      item.style.setProperty('--tilt-y', `${rotateX}deg`);
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('popup');
      item.style.setProperty('--tilt-x', `0deg`);
      item.style.setProperty('--tilt-y', `0deg`);
    });
  });

  function createShootingStar(container) {
    const star = document.createElement('span');
    star.className = 'star';

    // Randomize vertical start (top), length, color, and scale
    const top = Math.random() * 60 + 5; // 5% - 65% vertical
    const height = Math.random() * 2 + 1.5; // 1.5px - 3.5px
    const width = Math.random() * 24 + 18; // 18px - 42px
    const scale = 0.7 + Math.random() * 0.7; // 0.7 - 1.4
    // Random color: cyan, gold, pink, green
    const colors = ['#00fff0', '#ffd700', '#ff3c6f', '#5aff3c'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    star.style.top = top + '%';
    star.style.width = width + 'px';
    star.style.height = height + 'px';
    star.style.setProperty('--star-color', color);
    star.style.setProperty('--star-scale', scale);

    container.appendChild(star);

    // Remove after animation
    star.addEventListener('animationend', () => {
      star.remove();
    });
  }

  document.querySelectorAll('.mywork-item').forEach(item => {
    const link = item.querySelector('.work-link');
    const starsContainer = link.querySelector('.shooting-stars');
    let interval;
    item.addEventListener('mouseenter', () => {
      interval = setInterval(() => {
        createShootingStar(starsContainer);
      }, 250); // spawn every 0.25s
    });
    item.addEventListener('mouseleave', () => {
      clearInterval(interval);
    });
  });
});