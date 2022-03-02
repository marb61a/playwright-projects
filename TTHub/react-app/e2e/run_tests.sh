#cucumber tag
tag=$1

#run cucumber tests & on failure then run postcucumber
yarn run cucumber --profile $tag || yarn run postcucumber
