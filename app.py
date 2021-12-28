from flask import Flask, render_template, request, jsonify

from pymongo import MongoClient

client = MongoClient(
    'mongodb+srv://<ID>>:<비번>@cluster0.xqw5h.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.dbsparta

app = Flask(__name__)



