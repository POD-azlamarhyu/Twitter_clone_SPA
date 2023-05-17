import json
import os
import glob
import random
import time
from datetime import datetime
import uuid
from django.contrib.auth.hashers import make_password
import string
import os
import sys
import hashlib
from passlib.hash import pbkdf2_sha256

# uid=[
#     "e5a7959c-696e-4503-968a-1bb6573c17df",
#     "795c54b0-6af1-4dfc-ae9a-c34dbfd59406",
#     "d49797a1-4a57-4bd4-a908-227431706308",
#     "b0293f39-e6f7-4eed-a3b7-ee8b4ca1c47f",
#     "e3203429-f71a-4655-9233-e1f33cb16c97",
#     "bfa5ca26-1154-49f9-8524-9b39a7a872f8",
#     "0ff76bbf-3384-47e4-b927-9389cadd7022",
#     "5d4f92cc-be43-4e4c-ae08-adfb0cc71e25",
#     "8e53a792-9326-479a-aa0b-ef73da72cedb",
#     "868804af-7d57-48e5-a250-eadedb829595",
#     "ab9b4724-9339-4115-8b29-fdf2077dc6b8",
#     "acb53523-742f-4265-b704-712512005271"
# ]


uid = []
dicts = []
for i in range(200):
    datas = {}
    datas["model"]="accounts.user"
    # u_id = str(uuid.uuid4())
    uid.append(i+1)
    datas["pk"]=i+1
    field = {}
    # seed = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ"
    seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&*()-=+_<>"
    
    rpw = ''
    npc = rpw.join([random.choice(seed) for _ in range(random.randint(10,20))])
    
    
    email_seed = "1234567890abcdefghijklmnopqrstuvwxyz"
    email_semi_list = ["_","."]
    email_domain = ["@meme.co.jp","@netmeme.jp","@inmeme.jp","@meme.com","@inmeme.jp",'@googlemail.com','@yahoooo.co.jp','@unko.co.jp','@manko.jp','@sappro.go.jp','@manko.us','@ace.co.jp',"@netmeme.go.jp","@netmeme.com"]
    if random.randint(1,3) == 1:
        e_mail = ''.join([random.choice(email_seed) for _ in range(random.randint(5,30))])
        email = e_mail+str(random.choice(email_domain))
    elif random.randint(1,3) == 2:
        e_mail = ''.join([random.choice(email_seed) for _ in range(random.randint(5,30))])
        mail_e = ''.join([random.choice(email_seed) for _ in range(random.randint(5,30))])
        email = e_mail+str(random.choice(email_semi_list))+mail_e+str(random.choice(email_domain))
    else:
        e_mail = ''.join([random.choice(email_seed) for _ in range(random.randint(5,30))])
        mail_e = ''.join([random.choice(email_seed) for _ in range(random.randint(5,30))])
        email = e_mail+str(random.choice(email_semi_list))+mail_e+str(random.choice(email_semi_list))+mail_e+str(random.choice(email_domain))
    field["email"]=email
    field["password"] = pbkdf2_sha256.hash(npc)
    datas["fields"]=field
    dicts.append(datas)
    time.sleep(0.2)

for i in range(len(uid)):
    seed = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ"
    datas = {}
    datas["model"]="accounts.userprofile"
    datas["pk"]=i+1
    field = {}
    field["nickname"] = ''.join([random.choice(seed) for _ in range(random.randint(5,30))])
    field["user_profile"] = uid[i]
    idseed = "abcdefghijklmnopqrstuvwxyz________1234567890"
    field["account"] = ''.join([random.choice(idseed) for _ in range(random.randint(5,30))])
    bioseed ="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ():,./?';`~!@#$%^&*<>" 
    field["bio"] = ''.join([random.choice(bioseed) for _ in range(random.randint(5,30))])
    field["created_on"] = str(datetime.now())
    field["icon"]="icon/defo.png"
    field["link"]="http://localhost:8080"
    datas["fields"]=field
    dicts.append(datas)
    time.sleep(0.2)
# for i in range(len(uid)):
#     seed = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ"
#     datas = {}
#     datas["model"]="accounts.userchannel"
#     datas["pk"]=i+1
#     field = {}
#     field["channel_name"] = ''.join([random.choice(seed) for _ in range(random.randint(5,30))])
#     field["user_channel"] = random.choice(uid)
#     idseed = "abcdefghijklmnopqrstuvwxyz________1234567890"
#     field["channel_id"] = ''.join([random.choice(idseed) for _ in range(random.randint(5,30))])
#     bioseed ="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ():,./?';`~!@#$%^&*<>" 
#     field["bio"] = ''.join([random.choice(bioseed) for _ in range(random.randint(5,30))])
#     field["created_on"] = datetime.now()
#     field["icon"]="icon/defo.png"
#     field["link"]="http://localhost:8080"
#     datas["fields"]=field
#     dicts.append(datas)
# for i in range(400):
#     datas = {}
#     datas["model"]="tweets.comment"
#     datas["pk"]=i+1
#     field = {}
#     seed = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ"
#     rpw = ''
#     npc_pass = rpw.join([random.choice(seed) for _ in range(random.randint(100,500))])
#     field["text"] = npc_pass
#     field["user_comment"]=random.choice(uid)
#     field["tweet"]=random.randint(1,100)
#     field["created_on"]=str(datetime.now())
#     field["comment_img"]="comment/defo.png"
#     datas["fields"]=field
#     dicts.append(datas)
#     time.sleep(0.5)

# for i in range(400):
#     datas = {}
#     datas["model"]="tweets.retweet"
#     datas["pk"]=i+1
#     field = {}
#     seed = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉヵゃゅょがぎぐげごだぢづでどばびぶべぼ゛，．ぱぴぷぺぽゔざじずぜぞ"
#     rpw = ''
#     npc_pass = rpw.join([random.choice(seed) for _ in range(random.randint(100,500))])
#     field["text"] = npc_pass
#     field["retweet_user"]=random.choice(uid)
#     field["user_tweet"]=random.randint(1,100)
#     field["created_on"]=str(datetime.now())
#     datas["fields"]=field
#     dicts.append(datas)
#     time.sleep(0.5)

uuid_dict ={}
uuid_dict["uid"] = uid

with open("./accounts/fixtures/dammies.json","w")as f:
    json.dump(dicts,f,indent=4,ensure_ascii=False)
    
with open("./accounts/fixtures/uid.json","w") as f:
    json.dump(uuid_dict,f,indent=4,ensure_ascii=False)