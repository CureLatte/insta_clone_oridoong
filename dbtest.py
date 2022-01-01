from pymongo import MongoClient

client = MongoClient(
    'mongodb+srv://zhqmfkv:rlawotjd8250@cluster0.xqw5h.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.dbsparta


doc={
    'user_id' : 'ori',

    'my_stroy' : '김오리.jpg',
    'story_visited':[]
}
user = db.story.insert_one(doc)


for i in range(1):
    print(i)