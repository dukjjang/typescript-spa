export class HomePage {
  render() {
    const element = document.createElement("div");
    element.className = "home";
    element.innerHTML = `
            <h1>Home Page</h1>
            <div class="dvh-box"></div>
      `;
    return element;
  }
}
