import { AuthApis } from "../apis";

export class MyPage {
  async render() {
    const { name, profileImg } = await AuthApis.getUserInfo();
    const element = document.createElement("div");
    element.innerHTML = `
     <div>
       <h1>My Page</h1>
       <p>안녕하세요. ${name}님</p>
       <img style="width:80px; height:80px;" src="${profileImg}" />
     </div>
`;

    return element;
  }
}
