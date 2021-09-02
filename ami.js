const getinput=()=>{
    const inputfield=document.getElementById('input-field');
    const inputfieldtext=inputfield.value;
    inputfield.value='';
    if(inputfieldtext == ''){

    }
    // console.log(inputfieldtext);
   else{
    const url=`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputfieldtext}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>getteams(data.teams))

   }
}
const getteams=teams=>{
    document.getElementById('team-numbers').innerText = `Teams Found ${teams.length}`;
    console.log(teams);
    teams.forEach(team => {
      
        // console.log(team);
        const display=document.getElementById('display');
        
        display.textContent='';
        const div=document.createElement('div');
        // console.log(team)
        div.innerHTML=`<div class="col">
            <div class="card h-100">
         <img src="${team.strTeamBadge}" class="card-img-top" alt="">
         <div class="card-body">
                 <h5 class="card-title">${team.strTeam}</h5>
                   <p class="card-text">${team.strStadiumDescription}</p>
                   <button onclick="createanother('${team.idTeam}')">Click</button>
              </div>
             </div>
           </div>`
      display.appendChild(div);

        
    });
}
const createanother=team=>{
    // console.log(team);
    const url=`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${team}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>dispalyid(data.teams[0]))
}
const dispalyid=id=>{
    // console.log(id);
    const display=document.getElementById('display-id');
    display.textContent='';
    const div=document.createElement('div')
    div.classList.add('card','bg-dark','text-warning','text-center');
    div.innerHTML=`<img  class="w-50 mx-auto"src="${id.strStadiumThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Team: ${id.strTeam}</h5>
        <p class="card-text">Home: ${id.strStadium}</p> 
        <p><small class="card-text">Team Description: ${id.strDescriptionEN ? id.strDescriptionEN.slice(0,100): "N/a"}</small></p>
        <a href="https://${id.strYoutube}" target="_blank" class="btn btn-primary">Watch Videos</a>
    </div>`
    display.appendChild(div);
}