import hashlib
import datetime
import random
from typing import Container
import certifi
import jwt
from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request, session, redirect, url_for
from bson.json_util import dumps

ca = certifi.where()

client = MongoClient(
    'mongodb+srv://seongo:123456789!@instagram.o4wki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    tlsCAFile=ca)

db = client.instaClone

app = Flask(__name__)

SECRET_KEY = 'TEST'


# 홈 페이지
@app.route('/')  # token 획득을 확인
def login_page():
    return render_template('login.html')

##################################################
# index.html(메인페이지)


@app.route('/index_page')
def index_page():
    return render_template('index.html')


@app.route('/index_page/post', methods=['GET'])
def index_page_poster_get():
    token_receive = request.cookies.get('mytoken')

    # user_id 값은 사용 안하지만 로그인 시간 확인을 위해 체크
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"user_id": payload['user_id']})
        all_photo = list(db.post_content.find({}, {'_id': False}))
        all_user = list(db.user.find({}, {'_id': False}))[0:5]
        random.shuffle(all_user)

        login_user = 0

        for i, photo in enumerate(all_photo):
            if photo['user_id'] == user_info['user_id']:
                index_num = i
                continue

            photo_user = db.user.find_one(
                {'user_id': photo['user_id']}, {'_id': False})
            photo['name'] = photo_user['name']
            photo['avatar'] = photo_user['avatar']

        del all_photo[login_user]

        return jsonify([{'all_photo': all_photo}, user_info['name'], all_user])

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login_page", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login_page", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/index_page/post', methods=['POST'])
def indexPagePost():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"user_id": payload['user_id']})
        user_id = request.form["user_name_id_give"]
        updatestmt = ({"user_id": user_info['user_id']},
                      {
                      "$push": {"follow":
                                {
                                    "user_id": user_id,
                                    "follow_time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                                }
                                }
                      }
                      )

        db.user.update_one(*updatestmt)
        print(updatestmt)
        return jsonify({'msg': 'DB등록 완료!'})
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login_page", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login_page", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/login', methods=['POST'])
def login_check():
    user_id = request.form['user_id']
    user_password = request.form['pwd']

    user_check = list(db.user.find({'user_id': user_id}, {'_id': False}))
    return jsonify({'user': user_check})


################################################################
# 프로필 메인 페이지


@app.route('/profile_main/<name>')
def profile_main_page(name):

    # 현재 이용자의 컴퓨터에 저장된 cookie 에서 mytoken 을 가져옵니다.
    token_receive = request.cookies.get('mytoken')

    try:
        # 암호화되어있는 token의 값을 우리가 사용할 수 있도록 디코딩(암호화 풀기)해줍니다!
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"user_id": payload['user_id']})
        if name == user_info['name']:
            user_my_feed = db.post_content.find_one({"user_id": payload['user_id']})
            return render_template('profile_main.html', user=user_info, check=True, feed=user_my_feed)
        else:
            user_other = db.user.find_one({"name": name})
            user_other_feed = db.post_content.find_one({"user_id": user_other['user_id']})
            return render_template('profile_main.html', user=user_other, check=False, feed=user_other_feed)

        # 만약 해당 token의 로그인 시간이 만료되었다면, 아래와 같은 코드를 실행합니다.
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login_page", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        # 만약 해당 token이 올바르게 디코딩되지 않는다면, 아래와 같은 코드를 실행합니다.
        return redirect(url_for("login_page", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/profile_main/load_info', methods=['POST'])
def load_info():
    user_id = request.form['user_id']
    user_info = list(db.user.find({'user_id': user_id}, {'_id': False}))
    return jsonify({'user_info': user_info})


@app.route('/profile_main/move_edit')
def move_edit_page():
    # 수정 필요!
    return redirect(url_for('profile_main_page'))


@app.route('/profile_main/move_add')
def move_addpage():
    # 수정 필요!
    return redirect(url_for('profile_main_page'))


# 개인 피드 확인
@app.route('/my_feed/<user>')
def load_my_feed(user):
    user_check = db.user.find_one({'user_name': user}, {'_id': False})
    return render_template('my_feed.html', user=user_check)



# 메인페이지 복사본 API
@app.route('/profile_test_main')
def profile_test_11():
    return render_template('base_test.html')


# follow_test API
@app.route('/profile_test_main/follow', methods=['GET'])
def profile_test_load_follow():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"user_id": payload['user_id']}, {'_id': False})
        print(user_info)
        return jsonify({'data': user_info})
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login_page", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login_page", msg="로그인 정보가 존재하지 않습니다."))


#####################################################################

# 프로필 편집 페이지
@app.route('/edit_profile')
def edit_profile():
    return render_template('edit_profile.html')


@app.route('/edit_profile_get', methods=["GET"])
def edit_profile_get():
    # 현재 이용자의 컴퓨터에 저장된 cookie 에서 mytoken 을 가져옵니다.
    token_receive = request.cookies.get('mytoken')

    try:
        # 암호화되어있는 token의 값을 우리가 사용할 수 있도록 디코딩(암호화 풀기)해줍니다!
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one(
            {"user_id": payload['user_id']}, {'_id': False})
        del user_info['pwd']

        # 비효율적인 코드이므로 리팩토링 하실꺼면 하세요
        user_info['username'] = user_info['user_name']
        del user_info['user_name']
        return jsonify({'user_info': user_info})

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        # 만약 해당 token이 올바르게 디코딩되지 않는다면, 아래와 같은 코드를 실행합니다.
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route("/edit_profile", methods=["POST"])
def edit_profile_post():
    token_receive = request.cookies.get('mytoken')
    try:
        # 암호화되어있는 token의 값을 우리가 사용할 수 있도록 디코딩(암호화 풀기)해줍니다!
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one(
            {"user_id": payload['user_id']}, {'_id': False})
        del user_info['pwd']

        user_info['username'] = user_info['user_name']
        del user_info['user_name']

        username_receive = request.form['username_receive']
        email_receive = request.form['email_receive']
        phone_number_receive = request.form['phone_number_receive']
        gender_receive = request.form['gender_receive']
        avatar_receive = request.form['avatar_receive']
        bio_receive = request.form['bio_receive']

        # 업데이트 로직
        updatestmt = ({"user_id": user_info['user_id']}, {
            "$set": {
                "user_name": username_receive,
                "email": email_receive,
                "phone_number": phone_number_receive,
                "gender": gender_receive,
                "avatar": avatar_receive,
                "bio": bio_receive,
            }})
        db.user.update_one(*updatestmt)
        return jsonify({'msg': 'DB등록 완료!'})

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        # 만약 해당 token이 올바르게 디코딩되지 않는다면, 아래와 같은 코드를 실행합니다.
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route("/sign_in", methods=["POST"])
def user():
    # 현재 이용자의 컴퓨터에 저장된 cookie 에서 mytoken 을 가져옵니다.
    token_receive = request.cookies.get('mytoken')
    try:
        # 암호화되어있는 token의 값을 우리가 사용할 수 있도록 디코딩(암호화 풀기)해줍니다!
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"user_id": payload['user_id']})
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
    result = db.user.find_one({'user_id': id_receive, 'pwd': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        # JWT 토큰에는, payload와 시크릿키가 필요합니다.
        # 시크릿키가 있어야 토큰을 디코딩(=암호화 풀기)해서 payload 값을 볼 수 있습니다.
        # 아래에선 id와 exp를 담았습니다. 즉, JWT 토큰을 풀면 유저ID 값을 알 수 있습니다.
        # exp에는 만료시간을 넣어줍니다. 만료시간이 지나면, 시크릿키로 토큰을 풀 때 만료되었다고 에러가 납니다.
        payload = {
            'user_id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=12400)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail'})


# 회원 가입 페이지
@app.route('/sign_up')
def sign_up():
    return render_template('sign_up.html')


@app.route('/sign_up/check_dup', methods=['POST'])
def check_user_id():
    # 아이디 중복 체크
    user_id_receive = request.form['user_id_give']
    check_id = not bool(db.user.find_one({'user_id': user_id_receive}))

    return jsonify({'check_id': check_id})


@app.route('/sign_up/save', methods=['POST'])
def sign_up_save():
    # 회원가입
    user_dict_receive = request.form.to_dict()

    # 비밀번호 해쉬256으로 암호화
    user_dict_receive['pwd'] = hashlib.sha256(
        user_dict_receive['pwd'].encode('utf-8')).hexdigest()

    # user DB column 추가
    user_dict_receive['bio'] = ""

    # 기본 프로필 이미지
    user_dict_receive['avatar'] = "profile_init.png"

    user_dict_receive['feed'] = []
    user_dict_receive['follower'] = []
    user_dict_receive['follow'] = []

    db.user.insert_one(user_dict_receive)

    return jsonify({'msg': '회원가입 완료'})


# 메인 페이지 관련
@app.route('/main/user_like', methods=["POST"])
def main_user_like():
    photo = request.form['photo']
    like = request.form['like']
    db.post_content.update_one({'container': {'$elemMatch': {'photo': photo}}}, {
                               '$set': {'container.$.like': int(like)}})
    user_post = db.post_content.find_one(
        {"container": {"$elemMatch": {"photo": photo}}}, {'_id': False})

    return jsonify({'user_like': user_post['container'][0]['like']})


##########################글작성 페이지########################################
@app.route("/writing_new")
def writing():
    return render_template('writing_new.html')


@app.route("/writing_new", methods=["POST"])
def new_writing():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"user_id": payload['user_id']})

        desc_receive = request.form['desc_give']
        photo = request.files['photo_give']
        # comment, like 미구현상태
        comment = []
        like = 0
        extension = photo.filename.split('.')[-1]
        today = datetime.datetime.now()
        mytime = today.strftime('%Y-%m-%d-%H-%M-%S')
        filename = f'{mytime}'
        save_to = f'static/images/post-contents/{filename}.{extension}'
        photo.save(save_to)

        post_con = {
            'desc': desc_receive,
            'photo': f'{filename}.{extension}',
            'comment': comment,
            'like': like,
        }
        container = [post_con]

        doc = {
            'user_id': user_info["user_id"],
            "container": container,
        }

        print(doc)
        db.post_content.insert_one(doc)

        return jsonify({'msg': '등록완료'})
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login_page", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login_page", msg="로그인 정보가 존재하지 않습니다."))


# 회원 탈퇴
@ app.route('/sign_out', methods=['GET'])
def sign_out():
    # 쿠키에서 토큰 가져옴
    token_receive = request.cookies.get('mytoken')

    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one(
            {"user_id": payload['user_id']}, {'_id': False})
        db.user.delete_one({'user_id': user_info['user_id']})

        return jsonify({'msg': '회원탈퇴 완료!'})

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        # 만약 해당 token이 올바르게 디코딩되지 않는다면, 아래와 같은 코드를 실행합니다.
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
