function calculate(){
    document.getElementById("mainTitle").style.display="none";
    let goldPrice=document.getElementById("goldPrice").value;
    let grams=document.getElementById("grams").value;
    let cityRate=document.getElementById("city").value;
    let advance=document.getElementById("advance").value;
    let delayed=document.getElementById("delayed").value;
    let dollarRate=document.getElementById("dollarRate").value;

    document.getElementById("errorMessage").innerHTML='';
    if(goldPrice ==='' ||grams==='' || cityRate==='' ||advance==='' ||delayed==='' || delayed===''|| dollarRate==='' ) {
document.getElementById("errorMessage").innerHTML=" Please fill in all fields and select a city!";
    return;
    } 
    goldPrice=Number(goldPrice);
    grams=Number(grams);
    cityRate=Number(cityRate);
    advance=Number(advance);
    delayed=Number(delayed);
    dollarRate=Number(dollarRate);
    let adjustedGoldPrice=goldPrice * cityRate;
    let goldValue= adjustedGoldPrice * grams;
    let totalMahr=advance + delayed;
    let mahrInDollar=totalMahr / dollarRate;
    document.getElementById("calculatorBox").classList.add("hidden");
document.getElementById("result").innerHTML=` 
<h2> Final Results </h2>
<p> <span class="gold-value :"> Gold Value:${ goldValue.toLocaleString()} SYP </span></p>
<p> <span class="total-mahr :"> Total Mahr:${ totalMahr.toLocaleString()} SYP </span></p>
<p> <span class="usd-value : "> Approximate Value: ${ mahrInDollar.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} USD </span></p>

<br>
<div class="message">
<strong> After seeing the final calculation ...</strong>
<br><br>
<em>Are you ready to continue the journey? <br>or do you need to calculate again? </em> 
</div>
<button class=" rec" onclick="window.location.href='calculate.html'">
    Calculate Again
</button>
`; 
document.getElementById("result").classList.add("show");
}
function resetForm(){
    document.getElementById("goldPrice").value='';
    document.getElementById("grams").value='';
    document.getElementById("city").value='';
    document.getElementById("advance").value='';
    document.getElementById("delayed").value='';
    document.getElementById("dollarRate").value='';
    document.getElementById("error-Message").innerHTML='';
    document.getElementById("calculatorBox").classList.remove("hidden");
    document.getElementById("result").classList.remove("show");
    document.getElementById("result").innerHTML='';
}
document.getElementById("calculateBtn").addEventListener("click",calculate);

























