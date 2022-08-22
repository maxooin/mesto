export default class UserInfo {
  constructor({userNameSelector, jobSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(userAvatarSelector)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._job.textContent = item.job;
    this._avatar.src = item.avatar;
    this._id = item.id;
  }

  getId() {
    return this._id;
  }
}
