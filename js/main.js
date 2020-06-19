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
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
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

var arrContentData = [];
var generateData = function (index) {
  return ({
    url: 'photos/' + index + '.jpg',
    description: 'Описание фото',
    likes: getRandomNumber(LIKES['MIN'], LIKES['MAX']),
    comments: generateComments(),
  });
};
for (var i = 1; i <= MAX_PICTURE_NUMBER; i++) {
  arrContentData.push(generateData(i));
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
for (var j = 0; j < arrContentData.length; j++) {
  fragment.appendChild(renderPhoto(arrContentData[j]));
}
document.querySelector('.pictures').appendChild(fragment);

/*
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

var blockComments = document.querySelector('.social__comments');
var templateSocialComments = document.querySelector('#comment')
.content
.querySelector('.social__comment');

var commentsFragment = document.createDocumentFragment();

for (var k = 0; k < arrContentData[0]['comments'].length; k++) {
  var commentData = arrContentData[0]['comments'][k];

  var cloneElement = templateSocialComments.cloneNode(true);
  cloneElement.querySelector('img').src = commentData['avatar'];
  cloneElement.querySelector('img').alt = commentData['name'];
  cloneElement.querySelector('.social__text').textContent = commentData['message'];
  commentsFragment.appendChild(cloneElement);
}

blockComments.appendChild(commentsFragment);

bigPicture.querySelector('.big-picture__img').querySelector('img').src = arrContentData[0]['url'];
bigPicture.querySelector('.likes-count').textContent = arrContentData[0]['likes'];
*/
var demoEditor = document.querySelector('.img-upload__overlay');
var setupOpen = document.querySelector('#upload-file');
var setupClose = document.querySelector('#upload-cancel');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  demoEditor.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  demoEditor.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});
