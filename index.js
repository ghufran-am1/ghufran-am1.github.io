let saturate = document.getElementById("saturate");
let contrast=document.getElementById("contrast");
let brightness=document.getElementById("brightness");
let sepia=document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur=document.getElementById("blur");
let hueRotate=document.getElementById("hue-rotate");
let upload=document.getElementById("upload");
let download=document.getElementById("download");
let img=document.getElementById("img");
let reset=document.querySelector('span');
let imgBox=document.querySelector('.img-box');
let savePreset=document.getElementById('save-preset');
let presetBox=document.getElementById('preset-box');
let presetsArray=[];
let canvas=document.createElement('canvas');
let ctx=canvas.getContext('2d');

function resetValue(){
img.style.filter='none';
saturate.value='100';
contrast.value='100';
brightness.value='100';
sepia.value='0';
grayscale.value='0';
blur.value='0';
hueRotate.value='0';
}
window.onload=function(){
    download.style.display='none';
    reset.style.display='none';
    imgBox.style.display='none';
};
upload.onchange = function(){
    resetValue();
    download.style.display='block';
    reset.style.display='block';
    imgBox.style.display='block';
    let file=new FileReader();
    file.readAsDataURL(upload.files[0]);
file.onload=function(){
        img.src=file.result;
    img.onload=function(){
canvas.width=img.width;
canvas.height=img.height;
ctx.drawImage(img,0,0);
displayPresets();
    }
}
}
let filters= document.querySelectorAll("ul li input");
filters.forEach( filters =>{
    filters.addEventListener('input',function(){
        img.style.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
    })
} );
savePreset.onclick=function(){
    if(!img.src){
        alert(" ");
        return;
    }

let newPreset={
        name:`preset ${presetsArray.length + 1} `,
        saturate:saturate.value,
        contrast:contrast.value,
        brightness:brightness.value,
        sepia:sepia.value,
        grayscale:grayscale.value,
        blur:blur.value,
        hueRotate:hueRotate.value
    };
    presetsArray.push(newPreset);
    displayPresets(); 
    presetBox.style.display='flex';
};
function displayPresets(){
    presetBox.innerHTML='';
    presetsArray.forEach((preset, index) => {
let btn=document.createElement('button');
btn.textContent=preset.name;
btn.onclick=function(){
    saturate.value=preset.saturate;
    contrast.value=preset.contrast;
    brightness.value=preset.brightness;
    sepia.value=preset.sepia;
    grayscale.value=preset.grayscale;
    blur.value=preset.blur;
    hueRotate.value=preset.hueRotate;
    img.style.filter=`
        saturate(${preset.saturate}%)
        contrast(${preset.contrast}%)
    brightness(${preset.brightness}%)
        sepia(${preset.sepia}%)
        grayscale(${preset.grayscale}%)
    blur(${preset. blur}px)
        hue-rotate(${preset. hueRotate}deg)
    `;
};
presetBox.appendChild(btn);
    });
}
download.onclick=function(){
    ctx.filter=img.style.filter;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    canvas.toBlob(function(blob){
        let url=URL.createObjectURL(blob);
        let link=document.createElement('a');
        link.download='image.png';
        link.href=url;
        link.click();
        URL.revokeObjectURL(url);
    } , 'image/png');
}
