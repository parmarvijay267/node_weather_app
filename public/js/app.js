const weatherForm = document.querySelector('form')
const address = document.querySelector('#address')
const weatherInfo = document.querySelector('#weather-info')
const addressInfo = document.querySelector('#address-info')
const locationInfo = document.querySelector('#location-info')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	debugger	
	fetch('http://localhost:3000/weather?address='+encodeURI(address.value)).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				alert(JSON.stringify(data.error))
			} else {
				addressInfo.textContent = 'Address : ' + data.address
				locationInfo.textContent = 'Location : ' + data.location
				weatherInfo.textContent = 'Forecast : ' + data.forecast
			}
		})
	})
})
