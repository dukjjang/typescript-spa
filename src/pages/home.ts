export class HomePage {
  name: string;
  constructor() {
    this.name = "hyunduk";
  }

  render() {
    const element = document.createElement("div");
    element.className = "home";
    element.innerHTML = `
            <h1>Home Page</h1>
            <p style="color: white; font-size: 20px;">${this.name}</p>
            <div class="dvh-box"></div>
      `;
    return element;
  }
}
