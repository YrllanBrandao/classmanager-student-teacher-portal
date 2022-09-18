const newPass = document.querySelector("#newPassword");
const newCopy = document.querySelector("#newPasswordCopy");
const alert = document.querySelector(".alert-box");
const form = document.getElementById("form-passwd");



form.addEventListener('submit', (e)=>{
    e.preventDefault();

   
    const correct =  newPass.value === newCopy.value ? true : false;

    if(correct)
    {
        
        form.submit()
    }
    else{
        checkPasswords()
    }
})

newPass.addEventListener('input', ()=>{
    checkPasswords()
})
newCopy.addEventListener('input', ()=>{
    checkPasswords()
})


const checkPasswords = ()=>{

    const correct =  newPass.value === newCopy.value ? true : false;

    if(correct)
    {
        newPass.style.border = "1px solid #ced4da";
        newCopy.style.border = "1px solid #ced4da";

        alert.style.display = "none";

        
    
    }
    else{
        newPass.style.border = '1px solid red';
        newCopy.style.border = '1px solid red';

        alert.style.display = "block";
    }
}


