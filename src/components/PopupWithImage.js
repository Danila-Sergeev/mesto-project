import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupOpenImgName = this._popup.querySelector(".popup_img_name");
    this._popupOpenImgPhoto = this._popup.querySelector(".popup_img_photo");
  }
  open(imageUrl, imageDescription) {
    super.open();
    this._popupOpenImgName.textContent = imageDescription;
    this._popupOpenImgPhoto.setAttribute("src", imageUrl);
    this._popupOpenImgPhoto.setAttribute("alt", imageDescription);
  }
}
