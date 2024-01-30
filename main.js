// import { setupCounter } from './counter.js'

// window.onload = async () => {
//   const carData = await initializeModel();
// };

async function initializeModel() {
  const response = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
  if (response.status !== 200) {
    console.error("[api-error]: There is an api error");
    return;
  }
  const data = await response.json();
  const cleaned = data.map(car => ({
    mpg: car.Miles_per_Gallon,
    horsepower: car.Horsepower,
  }))
  .filter(car => (car.mpg != null && car.horsepower != null));
  console.log(data);
  return cleaned;
}

async function run() {
  // Load and plot the original input data that we are going to train on.
  const data = await initializeModel();
  const values = data.map(d => ({
    x: d.horsepower,
    y: d.mpg,
  }));

  tfvis.render.scatterplot(
    {name: 'Horsepower v MPG'},
    {values},
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  );

  // More code will be added below
}

document.addEventListener('DOMContentLoaded', run);
