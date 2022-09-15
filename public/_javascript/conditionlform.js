const conditionalRow = document.getElementById("conditional-row");
const selectType = document.getElementById("type");
const form = document.getElementById("form-register");
const formFile = document.getElementById("formFile");

const ext = document.getElementById("ext");


const getExt = (filename) =>{

    const splited = filename.split(".");
    const Ext = splited.pop()
    console.log(Ext)
    ext.value = Ext;
    console.log(ext.value)
}


//initial value 
conditionalRow.style.display = "none";




//remove or add field choose
selectType.addEventListener("click", ()=>{

    const type = Number(selectType.value);

    switch(type)
    {
        case 1:
            conditionalRow.style.display = "none";
        break;
        case 2://is teacher
        conditionalRow.style.display = "none";
        break;
        case 3://is student
        conditionalRow.style.display = "flex";
        break;
    }
})


//before form submit

form.addEventListener("submit", (e)=>{

    e.preventDefault();
    getExt(formFile.value)
    const type = Number(selectType.value);
    
    if(type !== 3)
    {
        form.removeChild(conditionalRow);//remove this fild if is admin
    }


     form.submit(); 

    
})



