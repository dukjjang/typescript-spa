import { router } from "../main";
import { Route, routes } from "../router";
import { store } from "../store";

export class Header {
  init() {
    const header = document.querySelector(".header");
    header?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const path = link.getAttribute("data-path");
        window.history.pushState({}, "", path);
        router.route();
      });
    });

    const logoutButton = document.querySelector(".logout");
    logoutButton?.addEventListener("click", () => {
      localStorage.removeItem("token");
      store.setUserInfo({ id: "", name: "", age: 0, profileImg: "" });
      store.setIsLoggedIn(false);
      window.history.pushState({}, "", "/login");
      router.route();
    });
  }

  render() {
    const isLoggedIn = store.getIsLoggedIn();
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
      <nav class="nav">
        <ul id="routes">
        </ul>
        ${isLoggedIn ? "<button class='logout'>logout</button>" : ""}
      </nav>
    `;

    const routesElement = header.querySelector("#routes");
    routes.forEach((route: Route) => {
      if (route.isPrivate && !isLoggedIn) return;
      if (route.name === "login" && isLoggedIn) return;

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", route.path);
      a.setAttribute("data-path", route.path);
      a.innerText = route.name;
      li.appendChild(a);
      routesElement?.appendChild(li);
    });

    return header;
  }
}
