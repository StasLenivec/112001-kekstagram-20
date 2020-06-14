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

var blockSocialСomments = document.querySelector('.social__comments');
var templateComments = document.querySelector('.social__comment');
var cloneElement = templateComments.cloneNode(true);
blockSocialСomments.appendChild(cloneElement);

var avatar = templateComments.querySelector('img');
avatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
avatar.alt = 'Аватар комментатора фотографии';
avatar.width = 35;
avatar.height = 35;

var socialText = document.querySelector('.social__text');
socialText.textContent = getRandomElement(COMMENTS);

bigPicture.querySelector('.big-picture__img').querySelector('img').src = arr[0]['url'];
bigPicture.querySelector('.likes-count').textContent = arr[0]['likes'];
