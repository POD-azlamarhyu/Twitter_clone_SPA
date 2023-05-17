import json
import os
import glob
import random
import time
from datetime import datetime
ufile = "./accounts/fixtures/uid.json"

with open(ufile,'r') as f:
    uid_json = json.load(f)

uid = uid_json["uid"]
dicts = []
tweet_dicts = []
comment_dicts = []

pk = 0
for i in range(len(uid)):
    for j in range(random.randint(10,30)):
        datas = {}
        datas["model"]="api.tweet"
        datas["pk"]=pk+1
        field = {}
        seed = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ"
        rpw = ''
        npc_pass = rpw.join([random.choice(seed) for _ in range(random.randint(100,500))])
        field["text"] = npc_pass
        field["user_tweet"]=uid[i]
        field["created_on"]=str(datetime.now())
        field["update_on"]=str(datetime.now())
        field["tweet_img"]="tweet/defo.png"
        field["tweet_like"] = random.sample(uid,random.randint(0,50))
        datas["fields"]=field
        dicts.append(datas)
        tweet_dicts.append(datas)
        pk += 1

pk = 0

for j in range(len(tweet_dicts)):
    for k in range(random.randint(0,20)):
        datas = {}
        datas["model"]="api.comment"
        datas["pk"]=pk+1
        field = {}
        seed = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ"
        rpw = ''
        npc_pass = rpw.join([random.choice(seed) for _ in range(random.randint(100,500))])
        field["text"] = npc_pass
        field["user_comment"]=random.choice(uid)
        field["tweet"]=tweet_dicts[j]["pk"]
        field["created_on"]=str(datetime.now())
        field["update_on"]=str(datetime.now())
        field["comment_img"]="comment/defo.png"
        field["comment_like"] = random.sample(uid,random.randint(0,50))
        datas["fields"]=field
        print(datas)
        dicts.append(datas)
        pk += 1

os.remove("./api/fixtures/dammies.json")

with open("./api/fixtures/dammies.json","w")as f:
    json.dump(dicts,f,indent=4,ensure_ascii=False)