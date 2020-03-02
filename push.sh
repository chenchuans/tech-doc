#!/bin/bash
#author=chenchuan
#mail=1350581922@qq.com
#phone=*********
##################################
mail_user="1350581922@qq.com"
git_dir=/github
REPOLY="chenchuan"
 
send_mail_push(){
    echo "push version is $1" | mail -s "deploy push" $mail_user
}
 
send_mail_roll(){
    echo "roll version is $1" | mail -s "deploy roll" $mail_user
}
 
git_pull(){
    if [ ! -d $git_dir ];then
        mkdir $git_dir
    fi
        cd $git_dir
    if [ ! -d $REPOLY ];then
        git clone https://github.com/chenchuans/tech-doc.git >> /dev/null
    fi
        cd $REPOLY
        git pull
}
 
git_tag_list(){
    cd $git_dir/$REPOLY
    git_pull
    count=`git tag | wc -l`
    if [ $count -eq 0 ];then
        echo "please take your tag"
    else
        git tag
    fi
}
 
git_add_deploy(){
    cd $git_dir/$REPOLY
    git_pull
    git_num=$(($(git tag | wc -l)+1))
    git_deloy="v$git_num.0"
    git tag -a $git_deloy -m "$git_deloy"
    git push
    git push --tag
}
 
delopy(){
    rsync -vzrtopg --progress $git_dir/$REPOLY/* 192.168.5.128:/data/
    cd $git_dir/$REPOLY
    tag_status=$(git tag | tail -n 1)
    echo "$tag_status" 
    send_mail_push $tag_status
    #ssh 192.168.5.128 ln -s /data/ /web
}
 
check_web(){
    check=`curl -I -m 10 -o /dev/null -s -w %{http_code} 192.168.5.128/index.html`
    if [ $check -eq 200 -o $check -eq 301 -o $check -eq 302 -o $check -eq 304];then
        echo "the web is up"
    else
        echo "please check index.html"
    fi
}
 
git_set(){
    cd $git_dir/$REPOLY
    select x in "git_reset_HEAD" "git_reset_tag";do
        case $x in
            git_reset_HEAD)
                cd /github/cml
                git reset --hard HEAD^
                git push -f
                git push --tags
                rsync -vzrtopg --progress $git_dir/$REPOLY/* 192.168.5.128:/data/
                cd $git_dir/$REPOLY
                tag_status=$i
                echo "$i" 
                send_mail_roll $i
            ;;
            git_reset_tag)
                cd $git_dir/$REPOLY
                a=`git tag`
                worry_tag=$(git tag | tail -n 1)
                echo "please select which:"
                select i in $a; do
                    if [ $i == "$worry_tag" ];then
                        echo "try again"
                    else
                        echo "you select $i"
                        git reset --hard $i
                        break
                    fi
                done
                git push -f
                git push --tags
                rsync -vzrtopg --progress $git_dir/$REPOLY/* 192.168.5.128:/data/
                cd $git_dir/$REPOLY
                tag_status=$i
                echo "$i" 
                send_mail_roll $i
            ;;
        esac
        break
    done
}
 
main(){
    git_add_deploy
    delopy
    check_web
}
 
reset_one(){
    git_reset_HEAD
    check_web
}
 
reset_second(){
    git_reset_tag
    check_web
}
$1