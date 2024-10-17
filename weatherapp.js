const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '862a89d2f1c8e3d294f74d052bc2417c';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            // Show the weather details
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Update city name
            cityHide.textContent = city;

            // Set image source based on weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png'; // Update path as needed
                    break;
                case 'Rain':
                    image.src = 'rain.png'; // Update path as needed
                    break;
                case 'Snow':
                    image.src = 'snow.png'; // Update path as needed
                    break;
                case 'Clouds':
                    image.src = 'cloud.png'; // Update path as needed
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png'; // Update path as needed
                    break;
                default:
                    image.src = 'cloud.png'; // Update path as needed
            }

            // Update temperature, description, humidity, and wind
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

