import { HomePage, LoginPage, MyPage, TodoPage } from "../pages";
import { Header } from "../components/header";
import { ExceptionPage } from "../pages/404";
import { store } from "../store";
import "../style.css";

export interface Route {
  name: (typeof routes)[number]["name"];
  path: string;
  page: new () => Page;
  isPrivate: boolean;
}

export interface Page {
  init?: () => void;
  render: () => HTMLElement;
}

export const routes = [
  { name: "home", path: "/", page: HomePage, isPrivate: false },
  { name: "login", path: "/login", page: LoginPage, isPrivate: false },
  { name: "todo", path: "/todo", page: TodoPage, isPrivate: true },
  { name: "mypage", path: "/mypage", page: MyPage, isPrivate: true },
];

export class Router {
  private parent: HTMLElement;
  private routes: Route[];
  private isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
  constructor($parent: HTMLElement, routes: Route[]) {
    this.parent = $parent;
    this.routes = routes;
    window.onpopstate = this.route.bind(this);
    this.route();
  }
  checkLoginStatus() {
    const isLogin = localStorage.getItem("token");
    return !!isLogin;
  }
  public async route() {
    const path = window.location.pathname;
    const matchingRoute = this.routes.find((route) => route.path === path);
    store.setIsLoggedIn(this.checkLoginStatus());

    if (matchingRoute) {
      if (matchingRoute.isPrivate && !this.isLoggedIn()) {
        window.history.pushState({}, "", "/login");
        this.route();
      } else {
        const header = new Header();
        this.parent.innerHTML = "";
        this.parent.appendChild(header.render());

        const page = new matchingRoute.page();
        if (matchingRoute.name === "login" && this.isLoggedIn()) {
          // 로그인 상태에서 /login 으로 주소창에 입력해서 들어올때
          window.history.pushState({}, "", "/");
          this.route();
          return;
        }

        const element = await page.render();
        this.parent.appendChild(element);
        page.init && page.init();
        header.init && header.init();
      }
    } else {
      // 일치하는 경로가 없을 경우 (404 페이지)
      const page = new ExceptionPage();
      this.parent.innerHTML = "";
      this.parent.appendChild(page.render());
    }
  }
}
