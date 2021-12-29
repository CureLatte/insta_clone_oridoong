from flask import Flask, render_template, request, jsonify, redirect, url_for

from pymongo import MongoClient
import certifi

ca = certifi.where()
client = MongoClient(
    'mongodb+srv://seongo:123456789!@instagram.o4wki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', tlsCAFile= ca)
db = client.instaClone

app = Flask(__name__)


@app.route('/profile_main/')
def road():
    return render_template('profile_main.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)