from flask import Flask, render_template, request, jsonify

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient(
    'mongodb+srv://seongo:123456789!@instagram.o4wki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.instaClone

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
