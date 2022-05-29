# command

## backend

docker-compose run --rm backend django-admin startproject projectCfg .

docker-compose run --rm backend python manage.py startapp accounts

docker-compose run --rm backend python manage.py makemigrations accounts

docker-compose run --rm backend python manage.py migrate

docker-compose run --rm backend python manage.py createsuperuser



## frontend
docker-compose run --rm frontend sh -c "npx create-next-app . --ts"

docker-compose run --rm frontend sh -c "npm install -D tailwindcss postcss autoprefixer"

docker-compose run --rm frontend sh -c "npx tailwindcss init -p"

docker-compose run --rm frontend sh -c "npm install --save @fortawesome/free-solid-svg-icons"

docker-compose run --rm frontend sh -c "npm install --save @fortawesome/free-solid-svg-icons"

docker-compose run --rm frontend sh -c "npm install axios"

docker-compose run --rm frontend sh -c "npm install @mui/material @emotion/react @emotion/styled"

docker-compose run --rm frontend sh -c "npm install --save devicon"

docker-compose run --rm frontend sh -c "npm install react-router-dom"

docker-compose run --rm frontend sh -c "npm install cookie date-fns micro micro-cors react-loader-spinner react-redux redux redux-devtools-extension redux-thunk"

docker-compose run --rm frontend sh -c "npm install react-cookie"


# memo

## backend

### model

Djangoでシステムを開発するときは必ず最初にユーザモデルを作って適応してからマイグレーションをすること
ユーザモデルはカスタムすること
PermissionsMixinはAbstractBaseUserのみ

related_nameは空白禁止


## frontend

## DB

postgreSQLの設定はsettingファイルのみに記述すればおっけ
あとはDockerがすべて初期設定を完了させてくれる