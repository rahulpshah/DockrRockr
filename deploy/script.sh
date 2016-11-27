#!/bin/bash
cd ~/se/m2/DockrRockr/;
rm -rf 2016*;
name="`date +%Y%m%d%H%M%S`";
mkdir $name;
cd $name;
git clone git@github.ncsu.edu:jsharda/DockrRockr.git
cd DockrRockr;
npm install;
sudo npm install -g forever
SLACK_TOKEN=xoxb-91856875955-DrrCHcrqS3ojCLyo74gIeSjh forever start index.js
#echo $PWD;
#SLACK_TOKEN=xoxb-91856875955-DrrCHcrqS3ojCLyo74gIeSjh node ./index.js
