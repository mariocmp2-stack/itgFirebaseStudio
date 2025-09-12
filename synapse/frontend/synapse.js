// Esperar a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    console.log('Synapse.js loaded and executing.');

    const API_BASE_URL = 'http://127.0.0.1:5001'; // URL del backend de Flask

    // --- 1. Inyectar la Barra de Intención (Intention Bar) ---
    const intentionBar = document.createElement('input');
    intentionBar.setAttribute('type', 'text');
    intentionBar.setAttribute('id', 'synapse-intention-bar');
    intentionBar.setAttribute('placeholder', 'Dime qué necesitas...');

    // Estilos para la barra (minimalista y flotante)
    Object.assign(intentionBar.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
        maxWidth: '500px',
        padding: '15px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '25px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: '10000'
    });

    document.body.appendChild(intentionBar);

    // --- 2. Crear el contenedor de resultados ---
    const resultsContainer = document.createElement('div');
    resultsContainer.setAttribute('id', 'synapse-results-container');
    Object.assign(resultsContainer.style, {
        position: 'fixed',
        bottom: '80px', // Justo encima de la barra
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
        maxWidth: '500px',
        maxHeight: '400px',
        overflowY: 'auto',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        zIndex: '9999',
        display: 'none' // Oculto por defecto
    });
    document.body.appendChild(resultsContainer);


    // --- 3. Implementar la comunicación con el Backend ---
    let searchTimeout;

    intentionBar.addEventListener('input', (e) => {
        // Cancelar el timeout anterior para no hacer una petición en cada tecla
        clearTimeout(searchTimeout);

        const query = e.target.value;

        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Esperar 300ms después de que el usuario deje de teclear
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    async function performSearch(query) {
        console.log(`Searching for: ${query}`);
        try {
            const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Search results:', data);
            displayResults(data.results);
        } catch (error) {
            console.error("Error performing search:", error);
            resultsContainer.style.display = 'none';
        }
    }

    function displayResults(results) {
        // Limpiar resultados anteriores
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p style="padding: 15px; text-align: center; color: #888;">No se encontraron resultados.</p>';
        } else {
            results.forEach(product => {
                const productDiv = document.createElement('div');
                Object.assign(productDiv.style, {
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                });

                // Si el producto tiene una URL, hacemos que el div sea un enlace
                productDiv.onclick = () => {
                    if(product.url) window.location.href = product.url;
                };

                const img = document.createElement('img');
                img.src = product.image;
                Object.assign(img.style, {
                    width: '50px',
                    height: '50px',
                    marginRight: '10px',
                    objectFit: 'cover'
                });

                const textDiv = document.createElement('div');
                textDiv.innerHTML = `<strong>${product.name}</strong><br><span style="color: #555;">${product.price}</span>`;

                productDiv.appendChild(img);
                productDiv.appendChild(textDiv);
                resultsContainer.appendChild(productDiv);
            });
        }

        resultsContainer.style.display = 'block';
    }

    // Ocultar resultados si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!intentionBar.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });


    // --- 4. Extraer y Enviar Datos de Productos (Ingesta) ---
    async function ingestProductData() {
        console.log("Synapse: Buscando productos en la página para aprender...");
        const productElements = document.querySelectorAll('.product');

        if (productElements.length === 0) {
            console.log("Synapse: No se encontraron elementos de producto con la clase '.product'.");
            return;
        }

        const products = Array.from(productElements).map(el => {
            const id = el.dataset.productId;
            const name = el.querySelector('.product-name')?.innerText;
            const price = el.querySelector('.product-price')?.innerText;
            const image = el.querySelector('img')?.src;
            const url = el.querySelector('a')?.href;

            return { id, name, price, image, url };
        });

        console.log(`Synapse: Se encontraron ${products.length} productos. Enviando al cerebro...`);

        try {
            const response = await fetch(`${API_BASE_URL}/api/ingest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("Synapse: Ingesta completada.", result.message);
        } catch (error) {
            console.error("Synapse: Error durante la ingesta de productos:", error);
        }
    }

    // Ejecutar la ingesta de datos tan pronto como el DOM esté listo.
    ingestProductData();

});
