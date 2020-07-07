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

var LimitEffectValue = {
  MARVIN_MAX: 100,
  PHOBOS_MAX: 3,
  HEAT_MAX: 3,
  HEAT_MIN: 1,
  DEFAULT: 100
};
var ScaleParameter = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var demoEditorPhoto = document.querySelector('.img-upload__overlay');
var setupOpen = document.querySelector('#upload-file');
var setupClose = document.querySelector('#upload-cancel');

var resizeControlMinus = document.querySelector('.scale__control--smaller');
var resizeControlPlus = document.querySelector('.scale__control--bigger');
var resizeControlValue = document.querySelector('.scale__control--value');

var CLASS_PATH = 'effects__preview--';
var uploadPhoto = document.querySelector('.img-upload__preview');
var imageUploadPreviewImg = uploadPhoto.querySelector('img');
var effectsList = document.querySelector('.effects__list');

var scalePin = document.querySelector('.effect-level__pin');
var scaleLine = document.querySelector('.effect-level__line');
var scaleLevel = document.querySelector('.effect-level__depth');
var imageUploadScale = document.querySelector('.img-upload__effect-level');
var effectName = '';

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  demoEditorPhoto.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  demoEditorPhoto.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('change', function () {
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

var resizeImagePlus = function () {
  var controlValue = resizeControlValue.value;
  controlValue = parseInt(controlValue, 10) + ScaleParameter.STEP;

  if (controlValue < ScaleParameter.MAX) {
    resizeControlValue.value = controlValue + '%';
  } else {
    resizeControlValue.value = ScaleParameter.MAX + '%';
  }
};

var resizeImageMinus = function () {
  var controlValue = resizeControlValue.value;
  controlValue = parseInt(controlValue, 10) - ScaleParameter.STEP;

  if (controlValue < ScaleParameter.MIN) {
    resizeControlValue.value = ScaleParameter.MIN + '%';
  } else {
    resizeControlValue.value = controlValue + '%';
  }
};

var onEffectChange = function (evt) {
  if (evt.target.classList.contains('effects__radio')) {
    imageUploadPreviewImg.classList.remove(
        'effects__preview--sepia',
        'effects__preview--marvin',
        'effects__preview--phobos',
        'effects__preview--heat',
        'effects__preview--chrome');
    imageUploadPreviewImg.classList.add(CLASS_PATH + evt.target.value);
  }
};
effectsList.addEventListener('click', onEffectChange);

scalePin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var scalePinPositionLimits = {
    min: 0,
    max: scaleLine.offsetWidth
  };
  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };
    var positionValue = (scalePin.offsetLeft - shift.x) + 'px';

    if (startCoords.x > scaleLine.getBoundingClientRect().right) {
      positionValue = scalePinPositionLimits.max + 'px';
    } else if (startCoords.x < scaleLine.getBoundingClientRect().left) {
      positionValue = scalePinPositionLimits.min + 'px';
    } else {
      scalePin.style.left = (scalePin.offsetLeft - shift.x) + 'px';
    }
    scalePin.style.left = positionValue;
    scaleLevel.style.width = positionValue;

    document.addEventListener('mousemove', changeEffect);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

scaleLine.addEventListener('click', function (lineEvt) {
  if (lineEvt.target !== scalePin) {
    lineEvt.preventDefault();

    var coordX = lineEvt.offsetX;
    var scaleLineWidth = scaleLine.offsetWidth;
    var positionValueClick = '';

    if (coordX >= 0 && coordX <= scaleLineWidth) {
      positionValueClick = (coordX / scaleLineWidth) * 100 + '%';
    }

    scalePin.style.left = positionValueClick;
    scaleLevel.style.width = positionValueClick;
  }
});

resizeControlMinus.addEventListener('click', function () {
  resizeImageMinus();
});

resizeControlPlus.addEventListener('click', function () {
  resizeImagePlus();
});

var getPersentPositionLeft = function (targetElem, parentElem) {
  return (targetElem.offsetLeft / parentElem.offsetWidth);
};

var setEffectDeep = function (effect, value) {
  var effectDeep = '';
  switch (effect) {
    case 'chrome':
      effectDeep = 'grayscale(' + value + ')';
      break;
    case 'sepia':
      effectDeep = 'sepia(' + value + ')';
      break;
    case 'marvin':
      effectDeep = 'invert(' + (value * LimitEffectValue.MARVIN_MAX) + '%)';
      break;
    case 'phobos':
      effectDeep = 'blur(' + (value * LimitEffectValue.PHOBOS_MAX) + 'px)';
      break;
    case 'heat':
      effectDeep = 'brightness(' + ((value * (LimitEffectValue.HEAT_MAX - LimitEffectValue.HEAT_MIN)) + LimitEffectValue.HEAT_MIN) + ')';
      break;
    case 'none':
      effectDeep = LimitEffectValue.DEFAULT;
      break;
  }

  imageUploadPreviewImg.style.filter = effectDeep;
};

var changeEffect = function () {
  var effectValue = getPersentPositionLeft(scalePin, scaleLine);
  setEffectDeep(effectName, effectValue);
};

effectsList.addEventListener('change', function (evt) {
  effectName = evt.target.value;

  if (effectName === 'none') {
    imageUploadScale.classList.add('hidden');
  } else {
    imageUploadScale.classList.remove('hidden');
  }

  var defaultPinValue = scaleLine.offsetWidth + 'px';

  scalePin.style.left = defaultPinValue;
  scaleLevel.style.width = defaultPinValue;
});
