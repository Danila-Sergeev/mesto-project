class UserInfo {
  constructor(
    userNameSelector,
    userInfoSelector,
    userAvatarSelector
  ) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileStatus = document.querySelector(userInfoSelector);
    this._profileAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name:  this._profileName.textContent,
      about: this._profileStatus.textContent,
      _id: this._userId  // << === это опционально, если получится у Вас
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileName.textContent = name;
    this._profileStatus.textContent = about;
    this._profileAvatar.setAttribute("src", avatar);
    this._userId = _id;
  }
}

export { UserInfo };
