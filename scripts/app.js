const cityForm = document.querySelector('form');
const card  = document.querySelector('.card')
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icons = document.querySelector('.icon img')


const updateUI = (data) => {
    const {cityDets, weather} = data;
    console.log(data);
  
  //weather template
    details.innerHTML =`
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update time and weather icons
    //time 
    let timeOfDay = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute ('src', timeOfDay);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    //weather icons
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icons.setAttribute ('src', iconSrc)
}

const updateCity = async (city) =>{
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key)

    return {cityDets, weather}
}


cityForm.addEventListener('submit', e =>{
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //Storing weather information in local storage
    localStorage.setItem('city', city)

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))
    
})


if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err)) 
}
