const form = document.querySelector('form');
const symbolsInput = document.querySelector('#symbols');
const chartContainer = document.querySelector('#chart-container');

var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Current Price in $',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const symbols = symbolsInput.value.toUpperCase().split(',');
  const validSymbols = symbols.filter(symbol => symbol.trim() !== '');

  if (validSymbols.length > 0) {
    const apiEndpoint = 'http://localhost:8080/api/read.php';
    const apiKey = '29366e8f-d165-48fb-94c2-e36c5b79d456';
    const queryParams = `key=${apiKey}&symbols=${validSymbols.join(',')}`;

    fetch(`${apiEndpoint}?${queryParams}`)
      .then(response => response.json())
      .then(data => {
  console.log(Object.keys(data.data))
  console.log(data)
   
  myChart.data.datasets[0].data = Object.keys(data.data).map((e)=> parseInt(data.data[e].quote.USD.price)) 

  myChart.data.labels = validSymbols

        console.log(myChart.data.datasets.data)
        
        myChart.update()
       
      })
      .catch(error => console.error(error));
  }
});
