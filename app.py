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


@app.route('/edit_profile')
def edit_profile():
    return render_template('edit_profile.html')


@app.route("/edit_profile", methods=["POST"])
def edit_profile_post():
    username_receive = request.form['username_receive']
    email_receive = request.form['email_receive']
    phone_number_receive = request.form['phone_number_receive']
    gender_receive = request.form['gender_receive']
    avatar_receive = request.form['avatar_receive']
    bio_receive = request.form['bio_receive']

    # 생성 로직
    # doc = {
    #     "user_id": "여기에는 login에서 넘겨준 user_id를 줘야함. 테스트 용임",
    #     "username": username_receive,
    #     "email": email_receive,
    #     "phone_number": phone_number_receive,
    #     "gender": gender_receive,
    #     "avatar": avatar_receive,
    #     "bio": bio_receive,
    # }
    # db.user.insert_one(doc)

    # 업데이트 로직
    
    updatestmt = ({"user_id": "kyoung"}, {
        "$set": {
            "username": username_receive,
            "email": email_receive,
            "phone_number": phone_number_receive,
            "gender": gender_receive,
            "avatar": avatar_receive,
            "bio": bio_receive,
        }})
    db.user.update_one(*updatestmt)
    return jsonify({'msg': 'DB등록 완료!'})



@app.route("/sign_in", methods=["POST"])
def user():
    id_receive = request.form['id_give']
    pwd_receive = request.form['pwd_give']

    user_ifo = db.users.find_one({'user_id': 'id_receive'})
    user_ifo = db.users.find_one({'user_pwd': 'pwd_receive'})

    return jsonify({'msg': '등록 완료!'})


@app.route("/sign_up/check_dup", methods=['POST'])
def check_dup():
    # ID 중복확인
    user_id_receive = request.form['user_id_give']
    check_id = db.user.find_one({'user_id': user_id_receive})

    if check_id:
        check_id = False
    else:
        check_id = True

    return jsonify({'check_id': check_id})


@app.route("/writing_new")
def writing():
    return render_template('writing_new.html')


@app.route("/writing_new", methods=["POST"])
def new_writing():
    text_receive = request.form['text_receive']

    doc = {
        "desc": text_receive,
    }
    db.post_content.insert_one(doc)

    return jsonify({'msg': '등록완료'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)


