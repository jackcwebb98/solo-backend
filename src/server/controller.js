const axios = require("axios");
const _ = require("lodash");

const sorter = (arr, type) => {
  let sorted = _.sortBy(arr, type);
  return sorted;
};

const getPeople = (url, people, type) => {
  return axios.get(url).then(response => {
    const gottenPeople = people.concat(response.data.results);
    if (response.data.next !== null) {
      return getPeople(response.data.next, gottenPeople, type);
    } else {
      let sortedPeople = sorter(gottenPeople, type);
      return sortedPeople;
    }
  });
};

const nameGetter = async url => {
  let person;
  await axios.get(url).then(response => {
    person = response.data.name;
  });
  return person;
};

const nameTransformer = async arr => {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].residents.length; j++) {
      let person = await nameGetter(arr[i].residents[j]);
      arr[i].residents[j] = person;
    }
    newArray.push(arr[i]);
  }
  return newArray;
};

const getPlanets = (url, planets) => {
  return axios.get(url).then(async response => {
    let gottenPlanets = planets.concat(response.data.results);
    if (response.data.next !== null) {
      return getPlanets(response.data.next, gottenPlanets);
    } else {
      let transPlanets = await nameTransformer(gottenPlanets);
      return transPlanets;
    }
  });
};

const jsonMaker = (arr) => {
  return JSON.stringify(arr)
}

module.exports = {
  getPeople: async (req, res) => {
    let people = await getPeople(
      `https://swapi.co/api/people`,
      [],
      req.params.type
    );
    res.send(people);
  },
  getPlanets: async (req, res) => {
    let planets = await getPlanets(`https://swapi.co/api/planets`, []);
    res.send(planets)

  }
};
