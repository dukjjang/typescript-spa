import { store } from "../store";

export class MyPage {
  render() {
    const userInfo = store.getUserInfo();
    console.log(userInfo);
    const element = document.createElement("div");
    element.innerHTML = `
     <div>
       <h1>My Page</h1>
       <p>안녕하세요. ${userInfo.name}님</p>
       <img style="width:80px; height:80px;" src="${userInfo.profileImg}" />
     </div>
`;

    return element;
  }
}
