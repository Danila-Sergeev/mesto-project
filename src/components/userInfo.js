class UserInfo {
  constructor(userNameSelector, userInfoSelector, api, renderLoadingCallback) {
    this._api = api;
    this._profileName = document.querySelector(userNameSelector);
    this._profileStatus = document.querySelector(userInfoSelector);
    this._renderLoadingCallback = renderLoadingCallback;
  }

  getUserInfo() {
    return this._api
      .getUserInfo()
      .then((info) => {
        this._profileName.textContent = info.name;
        this._profileStatus.textContent = info.about;
        console.log(info);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  setUserInfo(name, status) {
    this._renderLoadingCallback(true);
    this._api
      .patchUserInfo(name.value, status.value)
      .then((info) => {
        this._profileName.textContent = info.name;
        this._profileStatus.textContent = info.about;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this._renderLoadingCallback(false);
      });
  }
}

export { UserInfo };
