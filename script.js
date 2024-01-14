var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.className = "row";


async function sud() {
    var res = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json");
    var res1 = await res.json();
    console.log(res1)


    for (var i = 0; i < res1.length; i++) {
        var Name = res1[i].name;
        var latlo = res1[i].latlng;
        var cap = res1[i].capital;
        amu(Name, ...latlo, cap);
        container.append(row);
        document.body.append(container);

    }

}
async function amu(Name, lat, lon, cap) {
    try {
        if (lat == undefined) {
            throw new Error("Invaid value");
        }
        var api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a1b6cd3af8b59d70da2f86a6a9f0a155`);
        var api_data = await api.json();
        console.log(api_data)
        var col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML += `</div>
        <div class="card border-light mb-3" style="max-width: 18rem;">
          <div class="card-header">WEATHER CONDITION</div>
          <div class="card-body">
            <p> <b>NAME:</b> ${Name}</p>
            <p><b>CAPITAL:</b> ${cap}</p>
            <p><b>TEMPRATURE</b> ${api_data.main.temp}</p>
            <p><b>LATITUDE:</b> ${lat}</p>
            <p><b>LONGITUDE:</b> ${lon}</p>
          </div>
        </div>`
        row.append(col);
    }
    catch (error) {
        console.log("data lost" + error.message);
    }

}
sud();