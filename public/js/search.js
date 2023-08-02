const loggedIn = document.getElementById("loggedIn").value;
console.log(loggedIn)

const SearchHandler = async (event) => {

  const city1 = document.querySelector('#searchinput').value.trim();
  const city2 = document.querySelector('#futureinput').value.trim();
  if (city1 && city2) {
    const response = await fetch(`/api/search`, {
      method: 'POST',
      body: JSON.stringify({ city1, city2 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const result = calculateDifference(data.homeCity, data.destinationCity);
      console.log(result);
      const resultDiv = document.querySelector('#result');
      const resultText = `Based on your search, if you would like to move from ${data.homeCity.city} to ${data.destinationCity.city} you would need to adjust your income by ${result}% in order to live at your same level of comfort.`
      resultDiv.innerHTML = resultText;

      const button = document.createElement('button');
      button.textContent = 'Login or Create an Account to save your results!';
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
      button.style.padding = '10px 20px';
      button.style.border = 'none';
      button.style.cursor = 'pointer';
      button.addEventListener('click', () =>{
        window.location.href = '/login'
      })
  

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save your results!';
      saveButton.style.backgroundColor = 'green';
      saveButton.style.color = 'white';
      saveButton.style.padding = '10px 20px';
      saveButton.style.border = 'none';
      saveButton.style.cursor = 'pointer';

      saveButton.addEventListener('click', async () => {
        const locationResponse = await fetch('/api/location', {
          method: 'POST',
          body: JSON.stringify({ location_result: resultText }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if(locationResponse.ok){
          document.location.replace('/profile')
        }
      });
      if (!loggedIn){
        resultDiv.appendChild(button);    
      }
      else {resultDiv.appendChild(saveButton)}

    } else {
      alert('No search results.');
    }
  }
};
function calculateDifference(city1, city2) {
  const homeCity = city1.col_index
  const destinationCity = city2.col_index
  const result = ((destinationCity - homeCity) / homeCity) * 100
  return result.toFixed(2);
};

document.querySelector('#searchbtn').addEventListener('click', SearchHandler);



