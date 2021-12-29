import hashlib
import datetime
import certifi
import jwt
from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request, session, redirect, url_for

ca = certifi.where()
client = MongoClient(
    'mongodb+srv://seongo:123456789!@instagram.o4wki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', tlsCAFile= ca)
db = client.instaClone

app = Flask(__name__)

SECRET_KEY = 'TEST'


@app.route('/')     # token 획득을 확인
def login_page():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login_check():
    user_id = request.form['id']
    user_password = request.form['password']

    user_check = list(db.user.find({'user_id': user_id}, {'_id': False}))
    print(user_check)
    return jsonify({'user': user_check})


@app.route('/profile_main')
def profile_main_page():
    return render_template('profile_main.html')


@app.route('/profile_main/load_info', methods=['POST'])
def load_info():
    user_id = request.form['user_id']
    user_info = list(db.user.find({'user_id': user_id}, {'_id': False}))
    return jsonify({'user_info': user_info})


@app.route('/profile_main/move_edit')
def move_edit_page():
    print('hello!')

    # 수정 필요!
    return redirect(url_for('profile_main_page'))


@app.route('/profile_main/move_add')
def move_addpage():

    # 수정 필요!
    return redirect(url_for('profile_main_page'))


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)