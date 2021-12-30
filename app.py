from flask import Flask, render_template, request, jsonify

from pymongo import MongoClient
import certifi
import hashlib
import datetime

ca = certifi.where()
client = MongoClient(
    'mongodb+srv://seongo:123456789!@instagram.o4wki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    tlsCAFile=ca)
db = client.instaClone

app = Flask(__name__)


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

