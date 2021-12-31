from pymongo import MongoClient

client = MongoClient(
    'mongodb+srv://zhqmfkv:rlawotjd8250@cluster0.xqw5h.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.dbsparta



user = db.users.find_one({'user_id': 'kyoung'},{'_id':False})

print(user['container']['comment'][0])