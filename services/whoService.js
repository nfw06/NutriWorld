const axios = require('axios');

// Dati statici OMS su salute globale per paese (fonte: Our World in Data / WHO)
const healthData = [
  { country: 'Italia', code: 'ITA', lifeExpectancy: 83.5, obesityRate: 19.9, undernourishment: 2.5, healthcareIndex: 78 },
  { country: 'Germania', code: 'DEU', lifeExpectancy: 81.3, obesityRate: 22.3, undernourishment: 2.1, healthcareIndex: 81 },
  { country: 'Francia', code: 'FRA', lifeExpectancy: 82.7, obesityRate: 21.6, undernourishment: 2.4, healthcareIndex: 79 },
  { country: 'USA', code: 'USA', lifeExpectancy: 78.9, obesityRate: 36.2, undernourishment: 2.5, healthcareIndex: 69 },
  { country: 'Brasile', code: 'BRA', lifeExpectancy: 75.9, obesityRate: 22.1, undernourishment: 4.1, healthcareIndex: 54 },
  { country: 'India', code: 'IND', lifeExpectancy: 69.7, obesityRate: 3.9, undernourishment: 16.3, healthcareIndex: 41 },
  { country: 'Nigeria', code: 'NGA', lifeExpectancy: 54.3, obesityRate: 8.9, undernourishment: 12.1, healthcareIndex: 25 },
  { country: 'Cina', code: 'CHN', lifeExpectancy: 77.4, obesityRate: 6.2, undernourishment: 2.5, healthcareIndex: 58 },
  { country: 'Giappone', code: 'JPN', lifeExpectancy: 84.3, obesityRate: 4.3, undernourishment: 2.5, healthcareIndex: 84 },
  { country: 'Etiopia', code: 'ETH', lifeExpectancy: 65.5, obesityRate: 4.5, undernourishment: 19.1, healthcareIndex: 22 },
  { country: 'Messico', code: 'MEX', lifeExpectancy: 75.1, obesityRate: 28.9, undernourishment: 3.8, healthcareIndex: 52 },
  { country: 'Russia', code: 'RUS', lifeExpectancy: 72.6, obesityRate: 23.1, undernourishment: 2.5, healthcareIndex: 56 },
];

function getAllCountries() {
  return healthData;
}

function getCountryByCode(code) {
  return healthData.find(c => c.code === code.toUpperCase()) || null;
}

function getGlobalStats() {
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  return {
    avgLifeExpectancy: avg(healthData.map(c => c.lifeExpectancy)).toFixed(1),
    avgObesityRate: avg(healthData.map(c => c.obesityRate)).toFixed(1),
    avgUndernourishment: avg(healthData.map(c => c.undernourishment)).toFixed(1),
    totalCountries: healthData.length
  };
}

module.exports = { getAllCountries, getCountryByCode, getGlobalStats };
