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
    const likeCounter = this._element.querySelector(".card__like-counter");
    if (!evt.target.classList.contains("card__like_status_on")) {
      this._api
        .addCardLike(this._cardId)
        .then(() => {
          likeCounter.textContent = Number(likeCounter.textContent) + 1;
          evt.target.classList.add("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (evt.target.classList.contains("card__like_status_on")) {
      this._api
        .deleteCardLike(this._cardId, this._info)
        .then(() => {
          likeCounter.textContent = Number(likeCounter.textContent) - 1;
          evt.target.classList.remove("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt);
      });

    //открытие попапа с картинкой:
    this._element
      .querySelector(".card__img")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log(this);
        this._handleCardClick(this._photoLink, this._placeName);
      });
  }

  generate() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._handleDeliteListener();
    this._element
      .querySelector(".card__img")
      .setAttribute("src", this._photoLink);
    this._element.querySelector(".card__name").textContent = this._placeName;
    this._element.querySelector(".card__like-counter").textContent =
      this._placeLikesLength;
    this._handleOwnLikes();
    this._element
      .querySelector(".card__img")
      .setAttribute("alt", this._placeName);

    return this._element;
  }

  _handleDeliteListener() {
    if (this._ownCard) {
      this._element
        .querySelector(".card__trash")
        .addEventListener("click", () => {
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
      this._element.querySelector(".card__trash").remove();
    }
  }

  _handleOwnLikes() {
    if (this._element.querySelector(".card__like-counter").textContent > 0) {
      for (let j = 0; j <= this._placeLikesLength; j++) {
        if (
          this._placeLike[j] !== undefined &&
          this._placeLike[j]._id === this._info._id
        ) {
          this._element
            .querySelector(".card__like")
            .classList.add("card__like_status_on");
        }
      }
    }
  }
}
