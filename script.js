


// start page button

function startApp(){

window.location.href="menu.html";

}


// PASSWORD CHECKER

function checkPassword(){

let p=document.getElementById("password").value;


let length=p.length>=8;

let capital=/[A-Z]/.test(p);

let number=/[0-9]/.test(p);

let symbol=/[!@#$%^&*]/.test(p);


update("length",length);

update("capital",capital);

update("number",number);

update("symbol",symbol);


let strength="Weak ❌";

if(length && capital && number && symbol)

strength="Strong ✅";

else if(length && (capital || number))

strength="Medium ⚠️";


document.getElementById("strength").innerText=strength;

}



function update(id,valid){

let el=document.getElementById(id);

el.className=valid?"valid":"invalid";

}



// PHISHING CHECKER

function checkWebsite(){

let url=document.getElementById("url").value.trim();


let risk=0;


if(!url.startsWith("https://"))

risk++;


if(url.includes("@"))

risk++;


if(url.includes("-"))

risk++;


if(url.length>60)

risk++;


let msg="Looks Safe ✅";


if(risk>=3)

msg="High Risk Phishing ❌";

else if(risk==2)

msg="Suspicious ⚠️";


document.getElementById("result").innerText=msg;

}



// FILE LOCK (WORKING DOWNLOAD VERSION)

async function encryptFile(){

let file = document.getElementById("file").files[0];

let password = document.getElementById("lockPassword").value;

if(!file || !password){

alert("Please select file and enter password");

return;

}

// read file
let text = await file.text();


// simple encryption
let encrypted = btoa(password + "###" + text);


// create downloadable file
let blob = new Blob([encrypted], { type: "text/plain" });

let url = URL.createObjectURL(blob);


// create temporary download link
let a = document.createElement("a");

a.href = url;

a.download = file.name + ".locked";

document.body.appendChild(a);

a.click();

document.body.removeChild(a);

URL.revokeObjectURL(url);


document.getElementById("fileResult").innerText =
"File locked and downloaded successfully 🔒";

}



async function decryptFile(){

let file = document.getElementById("encryptedFile").files[0];

let password = document.getElementById("unlockPassword").value;

if(!file || !password){

alert("Upload locked file and enter password");

return;

}

// read encrypted file
let text = await file.text();

try{

let decoded = atob(text);


// check password
if(decoded.startsWith(password + "###")){

let original = decoded.replace(password + "###","");


// create unlocked file download
let blob = new Blob([original], { type: "text/plain" });

let url = URL.createObjectURL(blob);

let a = document.createElement("a");

a.href = url;

a.download = "unlocked_file.txt";

document.body.appendChild(a);

a.click();

document.body.removeChild(a);

URL.revokeObjectURL(url);


document.getElementById("fileResult").innerText =
"File unlocked successfully ✅";

}
else{

document.getElementById("fileResult").innerText =
"Wrong password ❌";

}

}
catch{

document.getElementById("fileResult").innerText =
"Invalid file ❌";

}

}


// MESSAGE SCAM DETECTOR

function checkMessage(){

let msg=document.getElementById("message").value.toLowerCase();

let risk=0;

let reasons=[];


// suspicious keywords

let dangerWords=[
"urgent",
"verify",
"bank",
"account blocked",
"click link",
"login",
"otp",
"password",
"prize",
"winner",
"lottery",
"free money",
"limited time"
];


dangerWords.forEach(word=>{

if(msg.includes(word)){

risk++;

reasons.push("Contains suspicious word: "+word);

}

});


// detect links

if(msg.includes("http")){

risk++;

reasons.push("Contains link");

}


// detect urgency

if(msg.includes("immediately") || msg.includes("now")){

risk++;

reasons.push("Creates urgency");

}


let result="Message looks safe ✅";


if(risk>=3)

result="High risk scam message ❌";

else if(risk==2)

result="Suspicious message ⚠️";


document.getElementById("msgResult").innerText=result;

document.getElementById("msgReasons").innerText=

reasons.join("\n");

}



// CYBER SAFETY GUIDE

function showTip(option){

let text="";

if(option==1)

text="✔ Use at least 8-12 characters\n✔ Include capital, small, number & symbol\n✔ Avoid using your name or birthdate";


if(option==2)

text="✔ Always check https in website link\n✔ Do not click unknown email links\n✔ Check spelling mistakes in URL\n✔ Do not enter password on suspicious sites";


if(option==3)

text="✔ Avoid public WiFi for banking\n✔ Use strong WiFi password\n✔ Turn off auto connect option";


if(option==4)

text="✔ Always update apps\n✔ Keep antivirus updated\n✔ Update mobile and laptop regularly";


if(option==5)

text="✔ Enable OTP login\n✔ Use Google Authenticator\n✔ Adds extra security layer";


if(option==6)

text="✔ Download only from trusted sites\n✔ Avoid cracked software\n✔ Scan files before opening";


document.getElementById("tipBox").innerText=text;

}