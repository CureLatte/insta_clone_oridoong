from flask import Flask, render_template, request, jsonify

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient(
    'mongodb+srv://seongo:123456789!@instagram.o4wki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    tlsCAFile=ca)
db = client.instaClone

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('sign_up.html')


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


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
