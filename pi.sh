PI="pi@192.168.0.12"

mkdir -p build
cp index.html build/index.html
cp app.js build/app.js
rsync -avz --delete build/ $PI:~/fun/
