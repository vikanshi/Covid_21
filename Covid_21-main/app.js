
const token="pk.eyJ1IjoiaGprMTIzIiwiYSI6ImNrcGxjb3N3YjBubHMyb28xbWY5N3B0ZGQifQ.5YDVWFCJVeAbWXx6aEwKwg";
mapboxgl.accessToken = token;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
center:[80,25],
zoom:3.3

});

function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    
    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });
    
}

navSlide();
function myFunction(){
    $(document).ready(function(){
      init()
      function init(){
       
        var url='https://api.covid19india.org/data.json'
        $.get(url,function(data){
          //console.log(data.statewise[1])
          var i=1;var searchbar=document.getElementById("searchbar");
          var confremed_cases=document.getElementById("cc");
          var recovered_cases=document.getElementById("rc");
          var active_cases=document.getElementById("ac");
          var dc_cases=document.getElementById("dc");
          var state;var conf_state;var last_updated=document.getElementById("lastupdated");
         
          state=searchbar.value;
          while(i<=37){
           if(state==data.statewise[i].state){
             conf_state=data.statewise[i];
            
             
        confremed_cases.innerHTML= "=> "+conf_state.confirmed;
        recovered_cases.innerHTML="=> "+conf_state.recovered;
        active_cases.innerHTML="=> "+conf_state.active;
        dc_cases.innerHTML="=> "+conf_state.deaths;
        last_updated.innerHTML=conf_state.lastupdatedtime;
        go(conf_state.confirmed,[conf_state.confirmed,conf_state.recovered,conf_state.active,data.statewise[i].state])  
        }//if statement
                                            
        i++;}//while loop
     
        if(state==data.statewise[0].state){
          confremed_cases.innerHTML= "=> "+data.statewise[0].confirmed;
        recovered_cases.innerHTML="=> "+data.statewise[0].recovered;
        active_cases.innerHTML="=> "+data.statewise[0].active;
        dc_cases.innerHTML="=> "+data.statewise[0].deaths;
        }
                                })
      
    }
    function go( cases,data){
  var rang;var cases_no=parseInt(cases, 10);
  console.log(cases_no)
  if(cases_no>=15,00000){
    rang='red'}
   else if(cases_no>=580829){
      rang='orange'
    }
   else if(cases_no>=10,0000){
      rang='yellow'
    }
 else  if(cases_no<=10000){
    rang='green'
  }
      var state2=document.getElementById("searchbar").value;
    axios.get('lat_lon.json')
    .then(function(response){
      var i=0;
      while(i<=186){
        if(state2==response.data[i].admin_name || state2==response.data[i].city){
          console.log(response.data[i].admin_name)
          console.log(response.data[i].lat)
    console.log(response.data[i].lng)
    console.log(cases)
   
     var marker=new mapboxgl.Marker({color:rang})
  .setLngLat([response.data[i].lng,response.data[i].lat])
  .setPopup(new mapboxgl.Popup({ offset: 25}) // add popups
    .setHTML('<h5>' +'Cases'+ '</h5><p style= "color:red">' + data[1] + '</p>'+'<p >' + data[3] + '</p>'))
  .addTo(map);
        break;}
      i++;}
    })
    .catch(function(error){
      console.log(error)
    });
    }
  })
  }