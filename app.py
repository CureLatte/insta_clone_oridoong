
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


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/')
def home():
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


@app.route('/profile_main')
def profile_main_page():
    return render_template('profile_main.html')


@app.route('/profile_main/load_info', methods=['POST'])
def load_info():
    user_id = request.form['user_id']
    user_info = list(db.user.find({'user_id': user_id}, {'_id': False}))
    return jsonify({'user_info': user_info})


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
    pw_receive = request.form['pw_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
    result = db.user.find_one({'id': id_receive, 'pw': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        # JWT 토큰에는, payload와 시크릿키가 필요합니다.
        # 시크릿키가 있어야 토큰을 디코딩(=암호화 풀기)해서 payload 값을 볼 수 있습니다.
        # 아래에선 id와 exp를 담았습니다. 즉, JWT 토큰을 풀면 유저ID 값을 알 수 있습니다.
        # exp에는 만료시간을 넣어줍니다. 만료시간이 지나면, 시크릿키로 토큰을 풀 때 만료되었다고 에러가 납니다.
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@app.route('/api/nick', methods=['GET'])
def api_valid():
    token_receive = request.cookies.get('mytoken')

    # try / catch 문?
    # try 아래를 실행했다가, 에러가 있으면 except 구분으로 가란 얘기입니다.

    try:
        # token을 시크릿키로 디코딩합니다.
        # 보실 수 있도록 payload를 print 해두었습니다. 우리가 로그인 시 넣은 그 payload와 같은 것이 나옵니다.
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        print(payload)

        # payload 안에 id가 들어있습니다. 이 id로 유저정보를 찾습니다.
        # 여기에선 그 예로 닉네임을 보내주겠습니다.
        userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})
        return jsonify({'result': 'success', 'nickname': userinfo['nick']})
    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})



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


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
