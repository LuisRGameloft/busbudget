if not exist .\android\app\src\main\assets mkdir .\android\app\src\main\assets

pushd android
call gradlew.bat assembleRelease
popd