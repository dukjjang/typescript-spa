import { store } from "../store";
import { router } from "../main";
import { AuthApis } from "../apis";

export class LoginPage {
  public async init() {
    const loginButton = document.getElementById("login");
    loginButton?.addEventListener("click", async () => {
      const id = (document.getElementById("id") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement)
        .value;

      try {
        const loginResponse = await AuthApis.login(id, password);
        localStorage.setItem("token", loginResponse.id);
        store.setUserInfo(loginResponse);
        store.setIsLoggedIn(true);
        window.history.pushState({}, "", "/");
        router.route();
      } catch (e) {
        alert(e);
      }
    });
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = `
      <div>
        <h1>Login Page</h1>
        <input id="id" type="text" placeholder="아이디" />
        <input id="password" type="password" placeholder="비밀번호" />
        <button id="login">로그인</button>
      </div>
      `;
    return element;
  }
}
