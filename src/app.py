from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json

app = Flask(__name__)
CORS(app)

config = {
    'user': 'root',
    'password': 'zzzTorah21',
    'host': 'localhost',
    'database': 'dbsystems',
    'raise_on_warnings': True
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    employee_id = data['employeeID']

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT employeeName FROM employee WHERE employeeID = %s", (employee_id,))
    employee = cursor.fetchone()

    cursor.close()
    conn.close()

    if employee:
        return jsonify({'message': f'Welcome {employee[0]}'}), 200
    else:
        return jsonify({'message': 'Employee not found'}), 404
@app.route('/orders', methods=['GET'])
def get_orders():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM orders")
    orders = cursor.fetchall()
    for order in orders:
        order['amount'] = float(order['amount'])
    cursor.close()
    conn.close()
    return jsonify(orders)
@app.route('/order/<int:order_id>', methods=['GET'])
def get_order(order_id):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM orders WHERE orderID = %s", (order_id,))
    order = cursor.fetchone()
    cursor.close()
    conn.close()
    if order:
        return jsonify(order)
    else:
        return jsonify({'message': 'Order not found'}), 404
@app.route('/order/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    data = request.get_json()
    new_status = data['status']
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("UPDATE orders SET status = %s WHERE orderID = %s", (new_status, order_id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': 'Order status updated'}), 200
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

