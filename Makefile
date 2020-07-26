all:
	make build
	make test

build:
	rm -Rf dist
	mkdir dist
	./node_modules/.bin/wrup browser --compress -r ./src/index.js > dist/index.js
	(cd ./node_modules/singlejs;./singlejs -m -a -f ../../src/imports.html > ../../dist/imports.js)
	(cd ./buildindex; node build.js > ../dist/index.html)
	rm ./dist/*.js

test:
	./node_modules/.bin/mocha --reporter nyan ./Specs/index.js
