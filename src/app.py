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
    employee_id = data.get('employeeID')
    password = data.get('password')
    
    if not employee_id or not password:
        return jsonify({'message': 'Employee ID and password are required'}), 400

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT employeeName, password FROM employee WHERE employeeID = %s AND password = %s", (employee_id, password))
    employee = cursor.fetchone()

    cursor.close()
    conn.close()

    if employee:
        return jsonify({'message': f'Welcome {employee[0]}'}), 200
    else:
        return jsonify({'message': 'Invalid login credentials'}), 401
@app.route('/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    employee_id = data.get('employeeID')
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')
    
    if not employee_id or not old_password or not new_password:
        return jsonify({'message': 'All fields are required'}), 400
    
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    cursor.execute("SELECT password FROM employee WHERE employeeID = %s", (employee_id,))
    result = cursor.fetchone()

    if not result:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Employee not found'}), 404

    if old_password != result[0]:
        cursor.close()
        conn.close()
        return jsonify({'message': 'Old password is incorrect'}), 401

    cursor.execute("UPDATE employee SET password = %s WHERE employeeID = %s", (new_password, employee_id))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Password changed successfully'}), 200

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

