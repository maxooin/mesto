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

  setUserInfo(name, job, avatar, id) {
    this._userName.textContent = name;
    this._job.textContent = job;
    this._avatar.src = avatar;
    this._id = id;
  }

  getId() {
    return this._id;
  }
}
