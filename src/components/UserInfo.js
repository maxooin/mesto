export default class UserInfo {
  constructor({userNameSelector, jobSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._job = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._job.textContent = item.about;
    this._userAvatar.src = item.avatar;
  }
}
