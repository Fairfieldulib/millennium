//materials valid for selected scope
var materials = [
  [{Book: 'a'}, {Ebook: 'z'}, {CD: 'y'}, {DVD: 'g'}, {'Journal/Magazine': '2'}, {'Online Video': 'l'}, {'Online Audio': 'u'}], //entire
  [{Book: 'a'}, {Ebook: 'z'}, {CD: 'y'}], //reference
  [{Book: 'a'}], //circ books
  [{Book: 'a'}, {Journal: '2'}, {Ejournals: '3'}, {Newspapers: 'w'}], //journals ...
  [{Book: 'a'}, {Ebook: 'z'}, {CD: 'y'}, {DVD: 'g'}], //curriculum
  [{Book: 'a'}, {CD: 'y'}, {DVD: 'g'}], //archives
  [{DVD: 'g'}, {'Online Video': 'l'},], //video
  [{Ebook: 'z'},{'Online Video': 'l'}, {'Online Audio': 'u'}], //online
  [{CD: 'y'}, {'Online Audio': 'u'}] //audio
];

var groups = {
  '3': {
    mat: ['a'],
    loc: ['stack', 'folio', 'curr', 'facau', 'popm', 'nwbk', 'sche', 'chcor', 'lpd']
  },
  '4': {
    mat: ['3', '2', 'w'],
    loc: []
  }
};