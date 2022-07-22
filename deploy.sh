#!/usr/bin/env sh

# abort on errors
set -e

pnpm run build

cd dist

git init
git checkout -b main
git add -A
git commit -m 'Automatic Deploy'

git push -f git@github.com:sistematico/fipe.git main:gh-pages

cd -
