// --- LÓGICA DE LA APLICACIÓN ---

document.addEventListener('DOMContentLoaded', () => {

  // --- FUNCIÓN PARA CREAR MODAL DE VIDEO ---
  const createVideoModal = (videoSrc) => {
    // Inyecta estilos para la animación del modal
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .modal-fade-in { animation: fadeIn 0.3s ease-out; }
    `;
    document.head.appendChild(style);

    // Crea el overlay del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] p-4 modal-fade-in';
    
    // Contenedor del contenido del modal
    const modalContent = document.createElement('div');
    modalContent.className = 'relative w-full max-w-4xl';
    modalContent.innerHTML = `
        <button class="absolute -top-2 -right-2 h-10 w-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white text-2xl z-10 hover:bg-opacity-75 transition-colors" aria-label="Cerrar video">&times;</button>
        <video src="${videoSrc}" class="w-full h-auto max-h-[85vh] rounded-lg shadow-2xl" controls autoplay></video>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden'; // Evita el scroll del fondo

    // Función para cerrar el modal
    const close = () => {
        modalOverlay.remove();
        style.remove(); // Limpia los estilos inyectados
        document.body.style.overflow = '';
    };

    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escapeHandler);
      }
    };

    // Event listeners para cerrar
    modalContent.querySelector('button').addEventListener('click', close);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) close();
    });
    document.addEventListener('keydown', escapeHandler);
  };

  // --- PORTAFOLIO ---
  const mediaItems = [
    { id: 1, type: 'image', src: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Amanecer en las montañas', description: 'Una toma matutina capturando la primera luz.' },
    { id: 2, type: 'video', src: 'https://images.pexels.com/videos/4784401/pexels-photo-4784401.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', videoSrc: 'https://videos.pexels.com/video-files/4784401/4784401-hd_1280_720_25fps.mp4', title: 'Ciclista en el bosque', description: 'Atravesando un sendero forestal.' },
    { id: 3, type: 'image', src: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Costa Escondida', description: 'Explorando las joyas ocultas de la costa.' },
    { id: 4, type: 'video', src: 'https://images.pexels.com/videos/854412/pexels-photo-854412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', videoSrc: 'https://videos.pexels.com/video-files/854412/854412-hd_1280_720_24fps.mp4', title: 'Vuelo de Dron Urbano', description: 'Una vista de pájaro del paisaje de la ciudad.' },
    { id: 5, type: 'image', src: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Olas del Océano', description: 'El poder y la serenidad del mar.' },
    { id: 6, type: 'video', src: 'https://images.pexels.com/videos/4434246/pexels-photo-4434246.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', videoSrc: 'https://videos.pexels.com/video-files/4434246/4434246-hd_1280_720_25fps.mp4', title: 'Café por la Mañana', description: 'Un momento tranquilo para empezar el día.' },
  ];

  const portfolioContainer = document.querySelector('#portfolio-section .grid');

  if (portfolioContainer) {
    mediaItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 h-64';
      itemElement.setAttribute('aria-label', item.title);

      let mediaElementHTML = '';
      if (item.type === 'image') {
        mediaElementHTML = `<img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">`;
      } else if (item.type === 'video') {
        mediaElementHTML = `
          <video 
            src="${item.videoSrc}" 
            poster="${item.src}" 
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            muted 
            loop 
            playsinline
          ></video>
          <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white opacity-70" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
          </div>
        `;
      }

      itemElement.innerHTML = `
        ${mediaElementHTML}
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div class="absolute bottom-0 left-0 p-4 w-full">
          <h3 class="text-xl font-bold text-white truncate">${item.title}</h3>
          <p class="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">${item.description}</p>
        </div>
      `;

      if (item.type === 'video') {
        const video = itemElement.querySelector('video');
        if (video) {
          itemElement.addEventListener('mouseenter', () => {
             // La reproducción devuelve una promesa, que puede ser rechazada si el usuario aún no ha interactuado con la página.
             video.play().catch(error => console.log("Auto-play prevented: ", error));
          });
          itemElement.addEventListener('mouseleave', () => {
             video.pause();
             video.currentTime = 0; // Rebobina el video
          });
          itemElement.addEventListener('click', () => {
            createVideoModal(item.videoSrc);
          });
        }
      }
      
      portfolioContainer.appendChild(itemElement);
    });
  }
});
