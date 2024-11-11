const weatherForm = document.querySelector('form');
const search = document.getElementById('city');
const message1 = document.getElementById('message');
const message2 = document.getElementById('err-msg');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    message1.textContent = "";
    message2.textContent = "";

    if(search.value.trim() == "") {
        message2.textContent = 'Enter a valid city name!';
        return;
    }
    message2.textContent = '';
    message1.textContent = 'Loading...';
    fetch(`/weather?address=${search.value}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                message1.textContent = '';
                message2.textContent = data.error;
                console.error(data.error);
            } else {
                message1.textContent = '';
                message2.innerHTML = `<div>
                <div id="weather-desc">
                    <img src="${data.icon}" alt="${data.description}"/>
                    <span>${data.description}</span>
                </div>
                <p>Temperature is ${data.temperature}, and feels like ${data.feelslike}<\p>
                <p>The humidity is ${data.humidity}%.</p>
                </div>`;
            }
        })
    });
});