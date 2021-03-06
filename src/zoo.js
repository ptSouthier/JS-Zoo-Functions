/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const newArray = [];
  if (ids === undefined) {
    return newArray;
  }
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.filter((currentAnimal) => (currentAnimal.name === animal));
  return getAnimal.every((currentSpecie, index) => (currentSpecie.residents[index].age > age));
}

function employeeByName(employeeName) {
  const defaultArr = {};
  if (employeeName === undefined) {
    return defaultArr;
  }
  return employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployeeArray = { id, firstName, lastName, managers, responsibleFor };
  return newEmployeeArray;
}

function isManager(id) {
  return employees.some((employee, index) => employee.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  if (newEmployee.managers === undefined) {
    newEmployee.managers = [];
  }
  if (newEmployee.responsibleFor === undefined) {
    newEmployee.responsibleFor = [];
  }
  return employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((result, animal) => {
      const animalName = animal.name;
      const animalCounting = (animal.residents).length;
      const obj = { [animalName]: animalCounting };
      return Object.assign(result, obj);
    }, {});
  }
  const getAnimal = animals.find((animal) => animal.name === species);
  return (getAnimal.residents).length;
}

function entryCalculator(entrants = 0) {
  if (entrants === undefined) {
    return 0;
  }
  let result = 0;
  const { Adult, Senior, Child } = entrants;
  if (Adult) { result += (Adult * prices.Adult); }
  if (Senior) { result += (Senior * prices.Senior); }
  if (Child) { result += (Child * prices.Child); }
  return result;
}

// function animalMap(options) {
//   // seu c??digo aqui
// }

function schedule(dayName) {
  // O c??digo deste requisito foi refatorado ap??s grandes problemas apontados pelo Lint, utilizando por base o c??digo escrito pelo colega Leonardo Mallmann! 'https://github.com/tryber/sd-010-a-project-zoo-functions/pull/121/commits/c807c2be882d77b41e00caa3f21447bfa883ebb8'.
  const resultObj = {};
  const week = Object.keys(hours);
  const paramDay = hours[dayName];
  if (dayName === undefined) {
    week.forEach((day) => {
      resultObj[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
      if (hours[day].open === 0) {
        resultObj[day] = 'CLOSED';
      }
    });
    return resultObj;
  }
  resultObj[dayName] = `Open from ${paramDay.open}am until ${(paramDay.close) - 12}pm`;
  if (dayName === 'Monday') {
    resultObj[dayName] = 'CLOSED';
  }
  return resultObj;
}

function oldestFromFirstSpecies(id) {
  // O c??digo deste requisito foi refatorado e amplamente melhorado usando por base o c??digo escrito pela colega Mar??lia Cegalla! (https://github.com/tryber/sd-010-a-project-zoo-functions/pull/109/commits/7219cdad993186c2ce0e11edcec7056941c86a05).
  const getEmployee = employees.find((employee) => employee.id === id);
  const firstSpecieID = getEmployee.responsibleFor[0];
  const getAnimal = animals.filter((animal) => animal.id === firstSpecieID)[0].residents;
  const sortByAge = getAnimal.sort((a, b) => (a.age < b.age ? 1 : -1));
  return Object.values(sortByAge[0]);
}

function increasePrices(percentage) {
  const setPercentage = percentage * 0.01;
  prices.Adult = parseFloat(Math.fround(prices.Adult * (1 + setPercentage)).toFixed(2));
  prices.Senior = parseFloat(Math.fround(prices.Senior * (1 + setPercentage)).toFixed(2));
  prices.Child = parseFloat(Math.fround(prices.Child * (1 + setPercentage)).toFixed(2));
  return prices;
}

// function employeeCoverage(idOrName) {
//   if (idOrName === undefined) {
//     const names = employees.map((employee) => `${employee.firstName} ${employee.lastName}`);
//     const animalsIDs = employees.map((employee) => employee.responsibleFor);
//     animalsIDs.forEach((animalArr) => {
//       const newAnimalArr = animalArr.map((currentID) => (animalsByIds(currentID)).name);
//       console.log(newAnimalArr);
//     })
//     return animalsIDs;
//   }
//   // const getAnimal = animals.filter((animal) => animal.id === getMonitoredAnimals).name;
// }

// console.log(employeeCoverage());

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
