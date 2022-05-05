const select_country = document.querySelector("#countries")
let countries

select_country.addEventListener('change', e =>{
    displayCountryInfo(e.target.value)
})
fetch('https://restcountries.com/v2/all')
.then(res => res.json())
.then(data => getData(data))
.catch(err => console.log(err))

function getData(countriesData){
    countries = countriesData
    let option = ""
    countries.forEach(country =>{ 
        if(country.name != "Israel") {
            option += `<option value="${country.alpha3Code}">${country.name}</option>`
        }
})
    select_country.innerHTML = option
    select_country.selectedIndex = Math.floor(Math.random()*select_country.length)
    displayCountryInfo(select_country[select_country.selectedIndex].value)
}
function displayCountryInfo(CountyByalpha3code){
    const countryData = countries.find(country => country.alpha3Code === CountyByalpha3code)
    document.querySelector("#flag-container img").src = countryData.flag;
    document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`; 
    document.getElementById("capital").innerHTML = countryData.capital
    document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`
    document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US")
    document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ")
    document.getElementById("region").innerHTML = countryData.region
    document.getElementById("subregion").innerHTML = countryData.subregion

    // Fix some data from API
    if(countryData.borders== undefined){
        document.getElementById("borders").innerHTML = ""
    }else{
        var borders = countryData.borders.map(border =>{
            if (border == "ISR") { border = "PSE" }
            return border
        })
        document.getElementById("borders").innerHTML = borders
    }
    if(CountyByalpha3code == "PSE"){
        document.getElementById("capital").innerHTML = "Jerusalem"
        document.getElementById("borders").innerHTML = "EGY, JOR, LBN, SYR"
    }
}

var loader = document.querySelector(".loader")
document.querySelector("#flag-container img").addEventListener('load',()=>{
    loader.style.display="none"
})
