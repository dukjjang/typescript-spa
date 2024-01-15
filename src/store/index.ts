interface UserInfo {
  id: string;
  name: string;
  age: number;
  profileImg: string;
}

class Store {
  private userInfo: UserInfo = {
    id: "",
    name: "",
    age: 0,
    profileImg: "",
  };
  private isLoggedIn: boolean = false;

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  getUserInfo() {
    return this.userInfo;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }
  getIsLoggedIn() {
    return this.isLoggedIn;
  }
}

export const store = new Store();
