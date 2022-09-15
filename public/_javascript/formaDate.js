const noticeDate = document.querySelectorAll(".notice-date");


noticeDate.forEach(date =>{
    const oldDate = date.innerHTML;
    const formatedDate = oldDate.slice(0,16);
   
    date.innerHTML = formatedDate
})