import { data } from "./data.js";

const $form = document.querySelector("form");
const $input_lang = document.querySelector("#language");
const $input_method = document.querySelector("#method");
const $btn = document.querySelector("#btn");
const $input_text = document.querySelector("#detail-content");
const $output_text = document.querySelector("#ai-answer");

let url = "https://estsoft-openai-api.jejucodingcamp.workers.dev/";

// 사용자의 질문
let question;

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];

//사용자에게 입력받은 요청을 data에 넣음

const sendQuestion = (lang, method, detail) => {
  data.push({
    role: "user",
    content: `프로그래밍 언어는 ${lang}이고 ${detail}이걸 ${method} 해줘 `,
  });
  questionData.push({
    role: "user",
    content: `프로그래밍 언어는 ${lang}이고 ${detail}이걸 ${method} 해줘`,
  });
};

// api에게 받은 답변을 화면에 출력함

const printAnswer = async answer => {
  let p = document.createElement("p");
  p.classList.add("answer");
  console.log(p);
  $output_text.textContent = answer;
};

const apiPost = async () => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  })
    .then(res => res.json())
    .then(res => {
      printAnswer(res.choices[0].message.content);
    })
    .catch(err => {
      console.log(err);
    });
};

$form.addEventListener("submit", e => {
  e.preventDefault();
  const lang_value = $input_lang.options[$input_lang.selectedIndex].value;
  const method_value = $input_method.options[$input_method.selectedIndex].value;
  const detail_value = $input_text.value;
  const load = document.createElement("img");
  alert("요청되었습니다. 잠시만 기다려주세요.");
  load.setAttribute("src", "asset/img/loading.gif");
  $output_text.innerHTM = load;
  sendQuestion(lang_value, method_value, detail_value);
  apiPost();
  // printQuestion();
  save_Item(lang_value, method_value, detail_value);
});

$btn.addEventListener("click", e => {
  const openNewWindow = window.open("about:blank");
  openNewWindow.location.href =
    "https://www.ryugod.com/pages/ide/" +
    $input_lang.options[$input_lang.selectedIndex].value;
});

// 로컬 스토리지에 저장

function save_Item(lang, method, detail) {
  let lang_arr = load_Item()[0];
  let method_arr = load_Item()[1];
  // let detail_arr = load_Item()[2];

  lang_arr.push(lang);
  method_arr.push(method);
  // detail_arr.push(detail);

  localStorage.setItem("lang", JSON.stringify(lang_arr));
  localStorage.setItem("method", JSON.stringify(method_arr));
  // localStorage.setItem("detail", JSON.stringify(detail_arr));
}

function load_Item() {
  let lang = localStorage.getItem("lang")
    ? JSON.parse(localStorage.getItem("lang"))
    : [];
  let method = localStorage.getItem("method")
    ? JSON.parse(localStorage.getItem("method"))
    : [];
  let detail = localStorage.getItem("detail")
    ? JSON.parse(localStorage.getItem("detail"))
    : [];
  return [lang, method, detail];
}