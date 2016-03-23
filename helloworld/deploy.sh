#!/bin/bash

FolderPath=$(pwd)
echo $FolderPath
InstallFolder=$FolderPath/deploy
echo $InstallFoleder

Folder=/tmp #Folder=./application-context


##### check name of node.js
nodeCommand=node
if [ -f /usr/bin/nodejs ]; then
	nodeCommand=nodejs
fi
#####

cd $Folder

if [ ! -d $Folder/discovery-self ];
then
	echo "Cloning discovery-self repository..."
	git clone https://github.com/mediascape/discovery-self
else
	echo "Checking for discovery-self repository updates..."
	cd $Folder/discovery-self
	git pull
	cd ..
fi

if [ ! -d $Folder/application-context ];
then
	echo "Cloning application-context repository..."
	git clone https://github.com/mediascape/application-context
else
	echo "Checking for application-context repository updates..."
	cd $Folder/application-context
	git pull
	cd ..
fi

if [ ! -d $Folder/UI-engine ];
then
	echo "Cloning UI-engine repository..."
	git clone https://github.com/mediascape/UI-engine
else
	echo "Checking for UI-engine repository updates..."
	cd $Folder/UI-engine
	git pull
	cd ..
fi

cd $InstallFoleder

### TODO - maybe keep other old files??
if [ -d $InstallFolder/ ]; then
	if [ -d $InstallFolder/node_modules/ ]; then
		mkdir $InstallFolder/temp/
		mkdir $InstallFolder/temp/node_modules/
		mv $InstallFolder/node_modules/* $InstallFolder/temp/node_modules/
	fi
		rm -r $InstallFolder/
fi



mkdir $InstallFolder/
cd $InstallFolder/
echo "Copy needed files from repository..."
cp -R $Folder/application-context/Server/* $InstallFolder/
cp -R $Folder/UI-engine/helloworld/* $InstallFolder/www/
cp -R $Folder/UI-engine/API $InstallFolder/www/js/mediascape/
cp -R $Folder/UI-engine/API/mediascape.uiengine.js $InstallFolder/www/
cp -R $Folder/UI-engine/API/build.js $InstallFolder/www/
cp -R $Folder/application-context/API/* $InstallFolder/www/js/
cp -R $Folder/discovery-self/API/mediascape/Discovery $InstallFolder/www/js/mediascape/
cp -R $Folder/discovery-self/API/mediascape/lib/* $InstallFolder/www/js/lib/

if [ -d temp/node_modules/ ]; then
	mkdir $InstallFolder/node_modules/
	mv $InstallFolder/temp/node_modules/* $InstallFolder/node_modules/
	rm -r $InstallFolder/temp/
fi

cd $InstallFolder/
echo "Installing dependencies..."
sudo npm install
sudo npm install log4js
sudo npm install mongoose
sudo npm install -g requirejs
cd $InstallFolder/www/
echo "Minimizing mediascape.uiengine.js ..."
r.js -o build.js
cd $InstallFolder
echo "Start the Node.js Server..."
$nodeCommand index.js
