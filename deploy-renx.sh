#!/bin/bash
#admin / Dd34ja9VJ768O4t5t3218sfGFTEKJk

gitCommitMsg=$1
if [ -z "$gitCommitMsg" ]; then
 gitCommitMsg='更新'
fi

echo "-assign version"
date=`date +%y%m%d`
version=$date
echo version: $version
sed -i "s/^  version: \".*\",$/  version: \"$version\",/g" ./app.js
echo

echo "-git add"
git add .
echo

echo "-git commit"
git commit -am "$gitCommitMsg"
echo

echo "-git pull"
git pull
echo

echo "-git push"
git push
echo

echo "-package"
env=/home/admin/renx
packageName="renx-mumu-web-$version.zip"
echo $packageName
cd ./src
../zip -q -r ../dist/$packageName ./
cd ..
echo

echo "-remote delete"
ssh -p 22 -t admin@39.99.246.175 "rm -rf $env/renx-mumu-web-*.zip"
echo

echo "-remote push"
scp -P 22 ./dist/$packageName admin@39.99.246.175:$env
echo

echo "-remote deploy"
ssh -p 22 -t admin@39.99.246.175 "unzip -q -o $env/$packageName -d $env/webroot/mumu1"
echo

echo success