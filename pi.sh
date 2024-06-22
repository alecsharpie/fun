PI="pi@192.168.0.12"

zip -r build.zip fun
ssh $PI "rm -rf ~/pi/fun"
ssh $PI "mkdir ~/pi/fun"
scp build.zip $PI:~/pi/fun/build.zip
ssh $PI "unzip -o ~/pi/fun/build.zip -d ~/pi/fun"
