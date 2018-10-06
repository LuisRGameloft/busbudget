if not exist .\android\app\src\main\assets mkdir .\android\app\src\main\assets

call react-native bundle --dev false --platform android --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

pushd android
call gradlew.bat assembleRelease
popd