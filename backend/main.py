from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

DB_NAME = 'ecommerce'
DB_USER = 'tima'
DB_PASSWORD = 'tima2005'
DB_HOST = 'localhost'
DB_PORT = '5432'


def get_db_conn():
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn


@app.before_request
def before_request():
    request.conn = get_db_conn()


@app.route('/api/products', methods=['GET'])
def get_products():
    cur = request.conn.cursor()
    cur.execute("SELECT * FROM product")
    rows = cur.fetchall()
    products = []
    for row in rows:
        product = {
            "id": row[0],
            "name": row[1],
            "description": row[2],
            "price": row[3],
            "reviews": row[4],
            "image": row[5]
        }
        products.append(product)

    return jsonify(products)


@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    cur = request.conn.cursor()
    cur.execute("SELECT id, name, description, price, reviews, image FROM product WHERE id = %s", (id,))
    product = cur.fetchone()

    if not product:
        return jsonify({'error': 'Product not found'}), 404

    product_obj = {
        'id': product[0],
        'name': product[1],
        'description': product[2],
        'price': product[3],
        'reviews': product[4],
        'image': product[5]
    }

    return jsonify(product_obj)


@app.route('/api/product')
def get_products_search():
    search_query = request.args.get('search_query', None)

    cur = request.conn.cursor()

    if search_query:
        cur.execute("SELECT id, name, description, price, reviews, image FROM product WHERE name ILIKE %s", ('%' + search_query + '%',))
    else:
        cur.execute("SELECT id, name, description, price, reviews, image FROM product")

    rows = cur.fetchall()
    products = []
    for row in rows:
        product = {
            'id': row[0],
            'name': row[1],
            'description': row[2],
            'price': row[3],
            'reviews': row[4],
            'image': row[5]
        }
        products.append(product)

    cur.close()
    request.conn.cursor().close()

    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)