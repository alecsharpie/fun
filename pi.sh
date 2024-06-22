# zip and send to raspberry pi
zip -r build.zip fun
ssh pi@192.168.0.12 "rm -rf ~/pi/fun"
ssh pi@192.168.0.12 "mkdir ~/pi/fun"
scp build.zip pi@192.168.0.12:~/pi/fun/build.zip
ssh pi@192.168.0.12 "unzip -o build.zip -d /home/pi/fun"
