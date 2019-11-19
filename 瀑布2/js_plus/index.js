const box = document.querySelector('.body');

const head = document.querySelector('.head');


function minIndex(ary){
    let min = Math.min(...ary);
    let index = ary.findIndex(item=>item === min);
    return {
        index,
        min
    }
}
//防抖
function debounce(cb,time){
    let timer;
    return function(...arg){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            cb.call(this,...arg);
        }, time);
    }
}

//节流
function throttling(cb,time){
    let prevtime = 0,
    timer;
    return function(...arg){
        let nowTime = +new Date;
        if(nowTime - prevtime > time){
            cb.call(this,...arg);
        }else{
            clearInterval(timer);
            timer = setTimeout(() => {
                if(+new Date - prevtime > time){
                    cb.call(this,...arg);
                }
            }, time);
        }
        prevtime = nowTime;
    }
}

    const picw = 236; 
    const ml = 10; 
    const boxt = 66;
    let clientW = document.documentElement.clientWidth;

    let len = Math.floor(clientW / (picw+ml));
  
    box.style.width = (len * (picw+ml)) - ml + 'px';
    let aryx = [];
    let aryy = [];

    for(let i=0;i<len;i++){
        aryx[i] =  i * (picw+ml);
        aryy[i] = 0;
    }

function render(){
    fetch('../data.json')
    .then(d=>d.json())
    .then(ary=>{
        ary.forEach((item,i)=>{
            
            let {index} = minIndex(aryy);
            let li = document.createElement('li');
            li.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;

            let div = document.createElement('div');
            div.className = 'img_box';
            let img = document.createElement('img');
            img.src = item.pic;

            
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            p1.className = 'desc';
            p1.innerText = item.desc;
            p2.className = 'author';
            p2.innerText = item.author;
            div.append(img);
            div.append(p1);
            div.append(p2);
            li.append(div);
            box.append(li);
            setTimeout(() => {
                img.style.opacity = 1;   
            },200);

            aryy[index] += (boxt + item.height*1 + 20); 
        });
    });
}
render();
let iH = window.innerHeight; 
window.onscroll = debounce(fn,200);
function fn(){
    let {index} = minIndex(aryy);  
    let scroll = window.pageYOffset; 
   
    if(iH + scroll >= aryy[index]){
        console.log('触底了');
        render();
    }

}

window.onresize = function(){
    clientW = document.documentElement.clientWidth;
    len = Math.floor(clientW / (picw+ml));
    box.style.width = (len * (picw+ml)) - ml + 'px';
    aryx.length = 0;
    aryy.length = 0;
    iH = window.innerHeight;
    for(let i=0;i<len;i++){
        aryx[i] =  i * (picw+ml);
        aryy[i] = 0;
    }
    const lis = box.querySelectorAll('li');
    lis.forEach((ele,i)=>{
        let {index} = minIndex(aryy);
        ele.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;
        aryy[index] += (ele.scrollHeight + 10); 
    });

}