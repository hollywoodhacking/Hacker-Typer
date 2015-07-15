#!/bin/sh

deploy/minify.sh
rm .gitignore
echo "var TRAVIS_BUILD_NUMBER = ${TRAVIS_BUILD_NUMBER};" > build_info.js
ls -lah
git config user.name "travis-ci"
git config user.email "na@na.com"
git add . --all
git commit -m "travis build ${TRAVIS_BUILD_NUMBER}"
git branch temp
git checkout temp
git checkout -B master temp
git remote add deploy "https://${GH_TOKEN}@github.com/hollywoodhacking/hollywoodhacking.github.io.git"
git push --force deploy master