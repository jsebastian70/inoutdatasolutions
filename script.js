document.addEventListener('DOMContentLoaded', function() {
  // Menú móvil
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
  }

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll para enlaces
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Inicializar gráfico
  const initChart = () => {
    const ctx = document.getElementById("heroChart");
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
          datasets: [{
            label: 'Crecimiento',
            data: [120, 190, 300, 250, 220, 400, 350, 450, 500],
            borderColor: '#4361ee',
            backgroundColor: 'rgba(67, 97, 238, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { 
            legend: { display: false },
            tooltip: {
              backgroundColor: '#14213d',
              titleFont: { size: 14, weight: 'bold' },
              bodyFont: { size: 12 },
              padding: 12,
              cornerRadius: 8,
              displayColors: false
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: { color: '#6c757d' }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#6c757d' }
            }
          }
        }
      });
    }
  };

  // Efectos para la sección predictiva
  const initPredictiveEffects = () => {
    const predictiveCards = document.querySelectorAll('.predictive-card');
    
    predictiveCards.forEach((card, index) => {
      // Retraso escalonado para las animaciones
      card.style.transitionDelay = `${index * 0.1}s`;
      
      // Efecto hover mejorado
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.predictive-icon i');
        if (icon) {
          icon.style.transform = 'rotate(10deg) scale(1.1)';
          icon.style.transition = 'all 0.3s ease';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.predictive-icon i');
        if (icon) {
          icon.style.transform = 'rotate(0) scale(1)';
        }
      });
    });

    // Animación para los casos de éxito
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const header = card.querySelector('.case-header');
        if (header) {
          header.style.filter = 'brightness(1.1)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const header = card.querySelector('.case-header');
        if (header) {
          header.style.filter = 'brightness(1)';
        }
      });
    });
  };

  // Inicializar todo
  initChart();
  initPredictiveEffects();
});