# 노마드 코더 바닐라 JS로 크롬 앱 만들기 강의 실습
## 3 - JAVASCRIPT ON THE BROWSER

#### HTML과 JS가 어떻게 상호작용 하는지?
- JS로 HTML 문서의 정보를 가져오는 법 : document 객체, element를 가져오는 다양한 함수를 이용한다.

### document 객체
> - JavaScript에서는 HTML의 정보를 읽어오거나 변경할 수 있다. **이 때 document라는 객체를 이용한다!** (이미 연결되어 있음)
> - HTML에 다양한 항목을 추가할 수도 있음!

```
document.title = "Hello!"
// html의 head에 존재하는 <title> 을 변경한다.
```

### element 객체와 관련 메서드
> getElementById : 해당 id를 가진 element를 검색
> querySelector : element를 CSS 방식으로 검색
```
html

    <div class="hello">
        <h1>hi</h1>
    </div>

JS

    const hellos = document.querySelector(".hello h1");

    console.log(hellos);

> log : <h1>hi</h1>

```
> querySelector 을 사용할 때는 CSS 선택자(class = . / id = # 등 ...), 그 안에서 선택할 element 객체(h1, div, section ...)를 정확하게 명시해야 한다. <br>
> querySelector 은 첫번째 element만을 가져오게 됨. 조건에 부합하는 element를 전부 호출하고자 한다면 *querySelectorAll* 메서드를 사용해야 한다. <br>
> querySeletor는 다음과 같이 사용할 수도 있다.

```
const title = document.querySelector("div.hello:first-child h1");

console.log(title);

---
> log : class hello를 가진 div 내부의 first-child인 h1을 찾아 호출
```

### Event
Javascript를 통해 object 내부에 들어있는 property를 변경할 수 있다. <br>
사용자의 event를 listen하여 property를 변경

--이론 힘들어서 실습부터 진행합니다.. 이론은 천천히 듣도록 하겠습니다.. --

## 4 - login form 
form 의 input 기능들을 잘 활용하자!

form 안에서 엔터를 누르고 input이 더 존재하지 않는다 >> 자동으로 submit 되었다는 것

```
if(username === ""){
        alert("이름을 입력하세요.");
    }else if(username.length > 15){
        alert("15글자 이하로 입력해주세요.");
        // string의 길이 = 변수명.length
    }else {

    }

// 해당 방법을 사용하는 것도 좋지만 HTML input element에 내장되어 있는 자체 기능을 활용하는 것이 best임!

<input required maxlength="15" type="text" placeholder="What is your name?">

```
여기서 if(username === "") 은 required(필수입력)이, username.length > 15 는 maxlength="15"가 대신하고 있음

따라서, **HTML form element는 굳이 click event를 신경쓰지 않아도 알아서 event listen이 되고 있다는 것** 이겠죠.. . 그래서 click event가 아닌, form submit에 더 집중해야 합니다

HTML이 form submit을 실행하도록 하기 위해서는 반드시 input이 form 안에 위치해야함

BUT, form submit이 되면 페이지 전체가 새로고침 됨 >> 이렇게 할 필요는 없기 때문에 이 동작을 제어해줄 필요가 있음

```
function onLoginSubmit(tomato) {
    tomato.preventDefault();
    console.log(tomato);
}

loginForm.addEventListener("submit", onLoginSubmit);

---
log : SubmitEvent {isTrusted: true, submitter: input, type: 'submit', target: form#login-form, currentTarget: form#login-form, …}

```
> - 해당 코드에서 onLoginSubmit function에 대한 argument(함수에 전달되는 값)로 어떠한 정보가 log에서 출력되는 것을 알 수 있음
> - onLoginSubmit이라는 function을 만들고 이 function이 하나의 argument를 받아 js에 넘겨주고 있음
> - 즉, console.log(tomato)에서 나온 log들은 직전 브라우저에서 실행된 event에 대한 여러 정보라는 뜻
> - preventDefault(); => 어떠한 event를 실행하지 않도록 막는 function. 해당 코드에서는 이를 통해 form이 submit 되면 실행되는 새로고침이라는 기본 동작을 막고 있음

```
function onLoginSubmit(event) {
    event.preventDefault();
    console.log(loginInput.value);
}

loginForm.addEventListener("submit", onLoginSubmit);

===
log : input에 입력한 값

```

해당 코드를 통해 input submit button을 클릭해도 새로고침이 되지 않는다는 것을 확인할 수 있음

1. button click or enter >> submit event 발생
2. JS가 onLoginSubmit function 호출
3. 이 떄 event object를 argument로 줌
4. event.preventDefault(); 가 기본 동작 실행(submit event)을 막아주고 있음

-----

*addEventListener 안에 있는 함수는 직접 실행하지 않음*

브라우저가 실행시켜주고 브라우저에서 해당 이벤트에 대한 정보(object)를 가지게 됨

addEventListener의 함수에서 object에 대한 자리만 할당해주면
해당 이벤트가 발생시킨 정보들에 대한 object들을 볼 수 있다!

이때 해당 이벤트가 가진 기본 Default값을 발생시키지 않게 하기 위해선 preventDefault를 이용하여 막을 수 있음

```
function handleLinkClick(event) {
    event.preventDefault();
    console.dir(event);
}

link.addEventListener("click", handleLinkClick);

```
1. a link Click >> click event 발생
2. JS가 handleLinkClick function 호출
3. 이 때 event object를 argument로 줌
4. event.preventDefault(); 가 기본 동작 실행(pointer event(=click event, mouse event))를 막아주고 있음

-----
실습에서 만들고자 하는 것!

user가 form input에 이름 입력 후 submit button click => form 제거

1. CSS에 .hidden {display: none;} 생성
2. 다음과 같이 js 코드 작성

```
function onLoginSubmit(event) {
    event.preventDefault(); // 새로고침 기본 동작 제어
    const username = loginInput.value;
    // username 변수에 loginInput의 값 저장
    loginForm.classList.add("hidden");
    // loginForm(id login-form)에 hidden이라는 class를 추가
    console.log(username);
    // console 창에서 user가 input에 입력한 이름 확인

    ---
    log : input에 입력된 username
}
```

form을 제거한 후, h1 class="hidden"을 HTML 문서에서 생성 => form 이 사라지면 h1에서 hidden class를 제거하여 h1이 브라우저에 나타나게 하자!

라는 동작을 나는 이렇게 수행했다. (HTML,CSS를 딱히 쓰지 않고 JS로만 작성함...)

```
const userNickname = document.querySelector("h1");
// HTML 문서 내 h1 element를 변수 userNickname에 저장

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add("hidden");
    userNickname.classList.remove("hidden");
    // h1에 존재하는 hidden class를 삭제
    userNickname.innerText = username + '님, 안녕하세요.';
    // userNickname(h1) 내에 text 를 추가
}
```
이런 느낌으로 하면 될 거라고 생각했고, 실제로 작동은 잘 되었다!
강의에서는 다음과 같은 내용으로 작성, 수행하였다.
```
HTML

<h1 id="greeting" class="hidden"></h1>

JS

const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden"
// class 이름을 적을 일이 두 번 있어서 string 변수로 그냥 할당해준듯함... 

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);
    greeting.innerText = username + "님, 안녕하세요.";
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

```
h1은 아래 다른 문서에서도 쓰일 수 있으니까 id를 입력해서 넣어준 것 빼고는 같은 방법을 사용하였다!

와~!! 내가 정답이래요~~~

변수를 string 안에 추가할 때, 변수명 + "텍스트" => 적기도 귀찮고, 변수명이 중간에 들어가거나 하면 복잡해짐

같은 기능을 수행하는 타이핑 방법은 다음 코드와 같음

```
greeting.innerText = username + "님, 안녕하세요.";
===
greeting.innerText = `${username}님, 안녕하세요.`;
```
해당 방법을 사용할 때 유의해야할 점은 **반드시 `` 백틱 기호를 사용해야하고, 변수명은 ${변수명} 이렇게 넣어야 함**

#### saving username
매번 새로고침을 할 때 마다 username을 입력하는건 번거로우니까, 한 번 저장하고 로그인을 하면 username을 저장해보자

*local storage를 활용*

local storage API를 JS에서 활용하여 브라우저에서 사용자가 입력한 값을 저장하고 불러올 수 있음 = mini DB와 같은 역할 ^^

localStorage.setItem / localStorage.getItem / localStorage.removeItem

localStorage.setItem("key", value);

#### loading username

local storage에 저장한 username이 존재할 경우 새로고침을 하여도 form이 뜨지 않고 h1이 바로 뜨도록 지정해주자

