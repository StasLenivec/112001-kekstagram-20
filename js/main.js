
var MAX_PICTURE_NUMBER = 25;
var MIN_LIKES_QUANTITY = 15;
var MAX_LIKES_QUANTITY = 200;
var MIN_COMMENTS_QUANTITY = 1;
var MAX_COMMENTS_QUANTITY = 2;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Ну такоооое себе',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'А где Ронни-красавчик?((',
  'Как можно было поймать такой неудачный момент?!'
];

var arr = [];
var generateData = function(index) {
  return ({
    url: 'photos/'+ index +'.jpg',
    likes: getRandomIntInclusive(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY)
  })
};
for (var i = 1; i <= MAX_PICTURE_NUMBER; i++) {
  arr.push(generateData(i))
};

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
console.log(getRandomIntInclusive(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY))

var template = document.querySelector('#picture').content.querySelector('.picture');
for (var i = 1; i <= MAX_PICTURE_NUMBER; i++) {
  var cloneTemplate = template.cloneNode(true);//Клон всего template
  var addTemplate = document.querySelector('.pictures');// Поиск куда нужно вставить
  addTemplate.appendChild(cloneTemplate);// Вставляем template в конец .pictures
  var randomUrlPhotos = cloneTemplate.querySelector('.picture__img').src = 'photos/'+ i +'.jpg';
  var randomLike = document.querySelector('picture__likes');
};




