export default class UserInfo {
  constructor({userNameSelector, jobSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._job.textContent = job;
  }
}
