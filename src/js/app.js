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

const sendQuestion = (lang, method, detail) => {
  data.push({
    role: "user",
    content: `프로그래밍 언어는 ${lang}이고 ${detail}이걸 ${method} 해줘`,
  });
  questionData.push({
    role: "user",
    content: `프로그래밍 언어는 ${lang}이고 ${detail}이걸 ${method} 해줘`,
  });
};

// 화면에 질문 그려주는 함수

const printQuestion = async () => {
  let p = document.createElement("p");
  p.classList.add("question");
  questionData.map(el => {
    p.innerText = el.content;
  });
  $input_text.appendChild(p);
  questionData = [];
  question = false;
};

const printAnswer = async answer => {
  let p = document.createElement("p");
  p.classList.add("answer");
  console.log(p);
  $output_text.textContent = answer;
  // $output_text.appendChild(p);
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

  sendQuestion(lang_value, method_value, detail_value);
  apiPost();
  printQuestion();
});

$btn.addEventListener("click", e => {
  const openNewWindow = window.open("about:blank");
  openNewWindow.location.href =
    "https://www.ryugod.com/pages/ide/" +
    $input_lang.options[$input_lang.selectedIndex].value;
});
