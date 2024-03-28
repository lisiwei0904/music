<!--    轮播图-->
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var img1 = document.querySelector('.img1');
var imgt = img1.querySelectorAll('li');
var dot2 = document.querySelector('.dot2');
var dots  = dot2.querySelectorAll('li');

//自动翻页
var timeone = setInterval(function(){
    rightf();
},3000);
dots[1].style.backgroundColor = "bule";
var j = 1;
//翻页模块
var arr = ['li1','li2','li3','li4'];
//右翻页
right.addEventListener('click',rightf);
function rightf(){
//把数组的最后一个添加到第一个
    arr.unshift(arr[3]);
//删除最后一个
    arr.pop();
//重新给li添加类名
    for(var i = 0; i < arr.length;i++){
        imgt[i].setAttribute('class',arr[i]);
    }
    j++;
    colort();
}

//左翻页
left.addEventListener('click',leftf);
function leftf(){
//把数组的第一个添加到最后一个
    arr.push(arr[0]);
//删除第一个
    arr.shift();
//重新给li添加类名
    for(var i = 0; i < arr.length;i++){
        imgt[i].setAttribute('class',arr[i]);
    }
    j--;
    colort();
}

//左右按钮的出现
dot2.addEventListener('mouseover',chu)
img1.addEventListener('mouseover',chu)
function chu(){
    left.style.display = 'block';
    right.style.display = 'block';
//移入时清除定时器
    clearInterval(timeone);
    timeone = null;
};

//左右按钮的消失
dot2.addEventListener('mouseout',xiao)
img1.addEventListener('mouseout',xiao)
function xiao(){
    left.style.display = 'none';
    right.style.display = 'none';
//恢复定时器
    clearInterval(timeone);
    timeone = setInterval(function(){
        rightf();
    },3000)
}


function colort(){
    for(var i = 0; i < arr.length;i++){
        dots[i].style.backgroundColor = "";
        if(j >= 4){
            j = 0;
        }else if (j < 0 ){
            j = 3;
        };
        if(i == j){
            dots[j].style.backgroundColor = "blue";
        };
    }
}

for( i = 0 ; i < arr.length ; i++){
    dots[i].setAttribute('index',i);
    dots[i].addEventListener('click',jump);
}

function jump(){
    var index = this.getAttribute('index');
    var now = arr.indexOf('li2');
//计算经过点与当前点的距离
    var dif = Math.max(index,now) - Math.min(index,now);
// console.log(dis);
    if(index > now){
        while(dif--){
            rightf();
        }
    }else {
        while(dif--){
            leftf();
        }
    }
}
//轮播图结束

// 为每张图片添加点击事件监听器
for (var i = 0; i < imgt.length; i++) {
    imgt[i].addEventListener('click', function() {
        // 获取当前点击的图片的索引
        var index = Array.prototype.indexOf.call(imgt, this);
        // 根据索引确定跳转目标
        window.location.href = "index_list?key="+ [index+1];
    });
}