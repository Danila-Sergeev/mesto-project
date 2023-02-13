export class Card {
  constructor(
    { link, name, likes, _id },
    ownCard,
    info,
    handleCardClick,
    selector,
    api
  ) {
    this._photoLink = link;
    this._placeName = name;
    this._placeLikesLength = likes.length;
    this._placeLike = likes;
    this._cardId = _id;
    this._ownCard = ownCard;
    this._info = info;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
    this._api = api;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeClick(evt) {
    if (!evt.target.classList.contains("card__like_status_on")) {
      this._api
        .addCardLike(this._cardId)
        .then((res) => {
          this._likeCounter.textContent = res.likes.length;
          evt.target.classList.add("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (evt.target.classList.contains("card__like_status_on")) {
      this._api
        .deleteCardLike(this._cardId, this._info)
        .then((res) => {
          this._likeCounter.textContent = res.likes.length;
          evt.target.classList.remove("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  _setEventListeners() {
    this._cardLike
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt);
      });

    //открытие попапа с картинкой:
    this._cardImg.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleCardClick(this._photoLink, this._placeName);
    });
  }

  generate() {
    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector(".card__like-counter");
    this._cardImg = this._element.querySelector(".card__img");
    this._cardTrash = this._element.querySelector(".card__trash");
    this._cardLike = this._element.querySelector(".card__like");
    this._cardImg.setAttribute("src", this._photoLink);
    this._cardImg.setAttribute("alt", this._placeName);
    this._element.querySelector(".card__name").textContent = this._placeName;
    this._likeCounter.textContent = this._placeLikesLength;
    this._setEventListeners();
    this._handleDeliteListener();
    this._handleOwnLikes();

    return this._element ;
  }

  _handleDeliteListener() {
    if (this._ownCard) {
      this._cardTrash.addEventListener("click", () => {
        this._api
          .deleteCard(this._cardId)
          .then(() => {
            this._element.remove();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      this._cardTrash.remove();
    }
  }

  _handleOwnLikes() {
    if (this._likeCounter.textContent > 0) {
      for (let j = 0; j <= this._placeLikesLength; j++) {
        if (
          this._placeLike[j] !== undefined &&
          this._placeLike[j]._id === this._info._id
        ) {
          this._cardLike.classList.add("card__like_status_on");
        }
      }
    }
  }
}
