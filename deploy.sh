#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 安装生产环境依赖包
yarn install --production
# 压缩项目
tar -zcvf ./release.tgz .
mkdir dist
mv release.tgz dist/
# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git config --global user.email "taoxiang"
git config --global user.name "thawsoar@gmail.com"

git init
git add *


git commit -m 'Travis CI Auto Builder Deploy'
git push -f -q https://${GH_TOKEN}@${GH_REF} master:deploy


cd -