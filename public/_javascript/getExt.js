const form = document.getElementById("assignment");
const ext = document.getElementById("ext");
const formFile = document.getElementById("formFile");

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const filename = formFile.value;

    if(filename !== null || filename !== undefined)
    {
        getExt(filename)
        form.submit();//
    }

  })

const getExt = (filename) =>{

    const splited = filename.split(".");
    const Ext = splited.pop()
    if(Ext === "")
    {
      ext.value =  'empty'
    }
    else{
      ext.value = Ext;
    }
   
    console.log(ext.value)
}

// extra function
const format = "mm/dd/yy";

const preRegExpString = format.replace(
  /(\w+)\W(\w+)\W(\w+)/,
  "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*"
);
const regExpString = preRegExpString.replace(/m|d|y/g, "\\d");
const whatMatches = new RegExp(regExpString);
const whatToReplace = "$1/$2/$3$4".replace(/\//g, format.match(/\W/));


const doFormat = (target, event) => {
  if (
    event.ctrlKey ||
    event.metaKey ||
    (event.keyCode !== 32 && event.keyCode < 46)
  ) {
    return;
  }

  target.value = target.value.replace(/(^|\W)(?=\d\W)/g, "$10"); // padding, .+


  target.value = target.value.replace(whatMatches, whatToReplace);


  target.value = target.value.replace(/(\W)+/g, "$1"); // cleanup
 
};

// init
document
  .querySelector('input[name="deadline"]')
  .addEventListener("keyup", event => doFormat(event.target, event));
