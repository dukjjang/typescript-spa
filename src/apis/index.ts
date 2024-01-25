export type UserInfo = {
  id: string;
  name: string;
  age: number;
  profileImg: string;
};

const MOCK_USER_INFO: UserInfo = {
  id: "test",
  name: "홍길동",
  age: 20,
  profileImg:
    "https://images.unsplash.com/photo-1683009427479-c7e36bbb7bca?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export class AuthApis {
  static async login(id: string, password: string): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      if (id === "test" && password === "1234") {
        setTimeout(() => {
          resolve(MOCK_USER_INFO);
        }, 1000);
      } else reject("아이디 또는 비밀번호가 틀렸습니다.");
    });
  }

  static async getUserInfo(): Promise<UserInfo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_USER_INFO);
      }, 300);
    });
  }
}
