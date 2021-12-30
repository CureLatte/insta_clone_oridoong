import hashlib
import datetime
import certifi
import jwt
from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request, session, redirect, url_for

ca = certifi.where()

client = MongoClient(
    'mongodb+srv://seongo:123456789!@instagram.o4wki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', tlsCAFile=ca)

db = client.instaClone

app = Flask(__name__)

SECRET_KEY = 'TEST'


@app.route('/')  # token 획득을 확인
def login_page():
    return render_template('login.html')


# 내가 작업한거~~
@app.route('/index_page')
def index_page():
    return render_template('index.html')


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

    # 현재 이용자의 컴퓨터에 저장된 cookie 에서 mytoken 을 가져옵니다.
    token_receive = request.cookies.get('mytoken')
    try:
        # 암호화되어있는 token의 값을 우리가 사용할 수 있도록 디코딩(암호화 풀기)해줍니다!
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"id": payload['id']})
        return render_template('index.html', nickname=user_info["nick"])
        # 만약 해당 token의 로그인 시간이 만료되었다면, 아래와 같은 코드를 실행합니다.
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        # 만약 해당 token이 올바르게 디코딩되지 않는다면, 아래와 같은 코드를 실행합니다.
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/api/login', methods=['POST'])
def api_login():

    id_receive = request.form['id_give']
    pwd_receive = request.form['pwd_give']

    user_ifo = db.users.find_one({'user_id': 'id_receive'})
    user_ifo = db.users.find_one({'user_pwd': 'pwd_receive'})

    return jsonify({'msg': '등록 완료!'})


@app.route('/sign_up/check_dup', methods=['POST'])
def check_user_id():
    # 아이디 중복 체크
    user_id_receive = request.form['user_id_give']
    check_id = not bool(db.user.find_one({'user_id': user_id_receive}))

    return jsonify({'check_id': check_id})


@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    # 회원가입
    user_dict_receive = request.form.to_dict()

    # 비밀번호 해쉬256으로 암호화
    user_dict_receive['pwd'] = hashlib.sha256(
        user_dict_receive['pwd'].encode('utf-8')).hexdigest()

    db.user.insert_one(user_dict_receive)

    return jsonify({'msg': '회원가입 완료'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
