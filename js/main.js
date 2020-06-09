
var MAX_PICTURE_NUMBER = 25;
var MIN_LIKES_QUANTITY = 15;
var MAX_LIKES_QUANTITY = 200;
var MIN_COMMENTS_QUANTITY = 1;
var MAX_COMMENTS_QUANTITY = 2;

var LIKES = {
    MIN: 15,
    MAX: 200
  };

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Ну такоооое себе',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'А где Ронни-красавчик?((',
  'Как можно было поймать такой неудачный момент?!'
];

var getRandomElement = function(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

var generateComment = function(){
  return({
    avatar: 'img/avatar'+ getRandomNumber(1, 6) +'.svg',
    message: getRandomElement(COMMENTS),
    name: 'Артем'
  })
};

var generateComments = function(){
  var comments = [];
  for (var i = 0; i < getRandomNumber(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY); i++) {
    comments.push(generateComment(i))
  };
  return comments;
}

var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var arr = [];
var generateData = function(index) {
  return ({
    url: 'photos/'+ index +'.jpg',
    description: 'Описание фото',
    likes: getRandomNumber(LIKES['MIN'], LIKES['MAX']),
    comments: generateComments(),
  })
};
for (var i = 1; i <= MAX_PICTURE_NUMBER; i++) {
  arr.push(generateData(i))
};

var template = document.querySelector('#picture').content.querySelector('.picture');
for (var i = 0; i < arr.length; i++) {
  var cloneTemplate = template.cloneNode(true);
  var addTemplate = document.querySelector('.pictures');
  addTemplate.appendChild(cloneTemplate);
  var data = arr[i]
  var randomUrlPhotos = cloneTemplate.querySelector('.picture__img').src = data['url'];
  cloneTemplate.querySelector('.picture__likes').textContent = data['likes']
  cloneTemplate.querySelector('.picture__comments').textContent = data['comments'].length
};






