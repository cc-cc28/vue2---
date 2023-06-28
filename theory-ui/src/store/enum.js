import Vue from 'vue'


//A1,A2,A3,B1,B2,C1,C2,C3,C4,C5,D,E,F,M,N,P
const carTypeOptions = [
  { key: 'A1', display_name: 'A1' },
  { key: 'A2', display_name: 'A2' },
  { key: 'A3', display_name: 'A3' },
  { key: 'B1', display_name: 'B1' },
  { key: 'B2', display_name: 'B2' },
  { key: 'C1', display_name: 'C1' },
  { key: 'C2', display_name: 'C2' },
  { key: 'C3', display_name: 'C3' },
  { key: 'C4', display_name: 'C4' },
  { key: 'C5', display_name: 'C5' },
  { key: 'D', display_name: 'D' },
  { key: 'E', display_name: 'E' },
  { key: 'F', display_name: 'F' },
  { key: 'M', display_name: 'M' },
  { key: 'N', display_name: 'N' },
  { key: 'P', display_name: 'P' }
]


function getValue(acc, cur) {
  acc[cur.key] = cur.display_name
  return acc
}

function getFilter(optiones) {
  return (value) => {
    return optiones.reduce(getValue, {})[value]
  }
}


Vue.filter('carTypeFilter', getFilter(carTypeOptions))




export default {
  carTypeOptions,
}
