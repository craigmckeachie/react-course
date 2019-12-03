#!/bin/bash

# Ex. ./create_docs_inline.sh -d ./


export ROOTDIR=$(pwd)

convertMarkDownToHTML(){
    echo 'converting'
  for f in *.md; do grip --export $f  --user=craigdmckeachie@gmail.com --pass=[Generate Personal Access Token on GitHub]; done
  for f in *.html; do sed -i '' "s/.md\"/.html\"/g" $f; done
}

convertMarkDownToHTML
echo "top level done"

cd concepts
convertMarkDownToHTML
echo "concepts done"


cd ../labs
pwd
convertMarkDownToHTML
echo "labs done"

cd ts
pwd
convertMarkDownToHTML
echo "labs/ts done"

cd testing
pwd
convertMarkDownToHTML
echo "labs/ts/testing done"

cd ../../js
pwd
convertMarkDownToHTML
echo "labs/js done"

cd testing
pwd
convertMarkDownToHTML
echo "labs/js/testing done"

cd $ROOTDIR

rm -rf ./docs
rsync -zarv  --prune-empty-dirs --include "*/"  --include="*.html" --include="*.png" --exclude="*" "./" "./docs"
rsync -zarv  "./concepts/snippets" "./docs/concepts"
rsync -zarv  "./labs/js/snippets" "./docs/labs/js"
rsync -zarv  "./labs/ts/snippets" "./docs/labs/ts"
zip -r ReactReduxManual16.10.zip docs -q -X -x "*.DS_Store"