from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Permitir peticiones Cross-Origin para poder llamar a la API desde el frontend
CORS(app)

# Un diccionario en memoria para simular nuestra base de datos de productos "aprendidos"
products_db = {}

@app.route('/api/ingest', methods=['POST'])
def ingest_data():
    """
    Endpoint para "aprender" o recibir datos de productos desde el snippet.
    """
    data = request.json
    print("Datos recibidos para ingesta:", data)

    # Aquí iría la lógica para procesar y guardar los productos.
    # Por ahora, solo confirmamos la recepción.
    if not data or 'products' not in data:
        return jsonify({"status": "error", "message": "No products found in request"}), 400

    for product in data['products']:
        product_id = product.get('id')
        if product_id:
            products_db[product_id] = product

    return jsonify({"status": "success", "message": f"{len(data['products'])} products ingested"}), 200

@app.route('/api/search', methods=['GET'])
def search():
    """
    Endpoint para realizar una búsqueda.
    """
    query = request.args.get('q', '')
    print(f"Búsqueda recibida: '{query}'")

    # Lógica de búsqueda simple (MVP): buscar la consulta en el nombre del producto
    results = []
    if query:
        for product in products_db.values():
            if query.lower() in product.get('name', '').lower():
                results.append(product)

    # Por ahora, devolvemos una respuesta de ejemplo.
    return jsonify({
        "query": query,
        "results": results
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
