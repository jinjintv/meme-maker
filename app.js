// const loginForm = document.getElementById("login-form");
// //HTML document에서 login-form id를 가진 element를 찾기 > 해당 메서드 명령을 loginForm 변수에 저장
// const loginInput = loginForm.querySelector("input");
// // loginForm(document에서 login-form id를 가진 element를 찾고, 그 안에서 input element를 찾기.. .)
// const loginButton = loginForm.querySelector("button");
// // loginForm(document에서 login-form id를 가진 element를 찾고, 그 안에서 button element를 찾기.. .)
// 더 짧게 하려면?
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden"
// string만 포함된 변수는 all 대문자로 표기하고, string을 저장하고 싶을 때 사용한대요 (그냥 지들끼리 그렇게 정한듯)

// const link = document.querySelector("a");

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    greeting.innerText = `${username}님, 안녕하세요.`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

// function handleLinkClick(event) {
//     event.preventDefault();
//     console.dir(event);
// }

loginForm.addEventListener("submit", onLoginSubmit);
// link.addEventListener("click", handleLinkClick);


// if(username === ""){
//         alert("이름을 입력하세요.");
//     }else if(username.length > 15){
//         alert("15글자 이하로 입력해주세요.");
//         // string의 길이 = 변수명.length
//     }else {

//     }
// 해당 방법을 사용하는 것도 좋지만 HTML input element에 내장되어 있는 자체 기능을 활용하는 것이 best임!