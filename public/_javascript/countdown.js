const countdown = document.getElementById("countdown");
let time = 10;



setInterval(()=>{

    countdown.innerHTML = time;
    time--;
    
    if(time <= 0)
    {
        window.location.href = "/";
    }

}, 1000)

