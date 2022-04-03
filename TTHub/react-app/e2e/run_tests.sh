#environment
env=$1

#cucumber tag
tag=$2

#run cucumber tests & on failure then run postcucumber
yarn run cucumber --profile $tag || yarn run postcucumber
