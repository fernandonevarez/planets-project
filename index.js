const { parse } = require('csv-parse');
const fs = require('node:fs');

const isHabitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
};

const file = fs
  .createReadStream('./kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      isHabitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(
      isHabitablePlanets.map((planet) => {
        return planet['kepler_name'];
      })
    );
    console.log(`\n${isHabitablePlanets.length} habitable planets found!`);
    console.log('\ndone');
  });
