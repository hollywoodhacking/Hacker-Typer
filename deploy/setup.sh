#!/bin/bash

echo "setting up Hollywood Hacking - build # ""$TRAVIS_BUILD_NUMBER""\n"

sudo apt-get install zsh
#npm install bower
npm install -g typescript
npm install -g requirejs
npm install -g karma
#bower install

#deploy/compile.sh