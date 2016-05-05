cd appawesome
call npm install
call grunt
rmdir /s /Q appawesome-cordova-temp
call cordova create appawesome-cordova-temp com.gaurang.patel AppAwesome
rmdir /s /Q appawesome-cordova-temp\www
xcopy /E /Y appawesome-cordova appawesome-cordova-temp
cd appawesome-cordova-temp
call cordova platform add android
call cordova build
cd ..