'use strict';
var MAX_PICTURE_NUMBER = 25;
var CommetsQuantity = {
  MIN: 1,
  MAX: 2
};
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

var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

var generateComment = function () {
  return ({
    avatar: 'img/avatar' + getRandomNumber(1, 6) + '.svg',
    message: getRandomElement(COMMENTS),
    name: 'Артем'
  });
};

var generateComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomNumber(CommetsQuantity['MIN'], CommetsQuantity['MAX']); i++) {
    comments.push(generateComment(i));
  }
  return comments;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var arr = [];
var generateData = function (index) {
  return ({
    url: 'photos/' + index + '.jpg',
    description: 'Описание фото',
    likes: getRandomNumber(LIKES['MIN'], LIKES['MAX']),
    comments: generateComments(),
  });
};
for (var i = 1; i <= MAX_PICTURE_NUMBER; i++) {
  arr.push(generateData(i));
}

var template = document.querySelector('#picture')
.content
.querySelector('.picture');

var renderPhoto = function (data) {
  var photoElement = template.cloneNode(true);
  photoElement.querySelector('.picture__img').src = data['url'];
  photoElement.querySelector('.picture__likes').textContent = data['likes'];
  photoElement.querySelector('.picture__comments').textContent = data['comments'].length;

  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < arr.length; j++) {
  fragment.appendChild(renderPhoto(arr[j]));
}
document.querySelector('.pictures').appendChild(fragment);

var showItem = function (item) {
  return item.classList.remove('hidden');
};

var addHidden = function (item) {
  return item.classList.add('hidden');
};

var bigPicture = document.querySelector('.big-picture');
showItem(bigPicture);

addHidden(bigPicture.querySelector('.social__comment-count'));
addHidden(bigPicture.querySelector('.comments-loader'));

document.querySelector('body').classList.add('modal-open');
var addComments = function () {
  var comment = document.createElement('li');
  comment.classList.add('social__comment');
  var commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = getRandomElement(COMMENTS);
  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = 35;
  img.height = 35;
  comment.appendChild(img);
  comment.appendChild(commentText);
  return comment;
};
bigPicture.querySelector('.big-picture__img').querySelector('img').src = 'img/logo-background-' + getRandomNumber(1, 3) + '.jpg';
bigPicture.querySelector('.likes-count').textContent = getRandomNumber(LIKES['MIN'], LIKES['MAX']);
var commentsCont = bigPicture.querySelector('.social__comments');
commentsCont.appendChild(addComments());
