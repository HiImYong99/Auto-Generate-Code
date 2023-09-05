import { data } from "./data.js";
import { save_Item } from "./local-storage.js";

const $form = document.querySelector("#user-form");
const $input_lang = document.querySelector("#language");
const $input_method = document.querySelector("#method");
const $btn = document.querySelector("#submit-btn");
const $input_text = document.querySelector("#detail-content");
const $output_text = document.querySelector("#ai-answer");
const $loading = document.querySelector("#loading");

let url = "https://estsoft-openai-api.jejucodingcamp.workers.dev/";

// 요청버튼 클릭 시 발생
$form.addEventListener("submit", e => {
  e.preventDefault();

  const lang_value = $input_lang.options[$input_lang.selectedIndex].value;
  const method_value = $input_method.options[$input_method.selectedIndex].value;
  const detail_value = $input_text.value;

  alert("요청되었습니다. 잠시만 기다려주세요.");
  loading_appear();
  sendQuestion(lang_value, method_value, detail_value);
  apiPost();
  save_Item(lang_value, method_value, detail_value);
});

//사용자에게 입력받은 요청을 data에 넣음
const sendQuestion = (lang, method, detail) => {
  data.push({
    role: "user",
    content: `프로그래밍 언어는 ${lang}이고 ${detail}이걸 ${method} 해줘`,
  });
};

// api 통신 만약 성공시 printAnswer 함수 인자값에 받아온 결과값 전달
const apiPost = async () => {
  await fetch(url, {
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

// api에게 받은 답변을 화면에 출력함
const printAnswer = async answer => {
  let pre = document.createElement("pre");
  let ai_arr = localStorage.getItem("ai")
    ? JSON.parse(localStorage.getItem("ai"))
    : [];
  pre.innerText = answer;
  ai_arr.push(answer);
  localStorage.setItem("ai", JSON.stringify(ai_arr));
  $loading.style.display = "none";
  const $existingPre = $output_text.querySelector("pre");
  if ($existingPre) {
    $output_text.removeChild($existingPre);
  }
  $output_text.appendChild(pre);
};

//실행해보기 버튼 클릭 시 발생
$btn.addEventListener("click", e => {
  const openNewWindow = window.open("about:blank");
  openNewWindow.location.href =
    "https://www.ryugod.com/pages/ide/" +
    $input_lang.options[$input_lang.selectedIndex].value;
});

// spinner
function loading_appear() {
  const $example = document.querySelector("#explain");
  $example.style.display = "none";
  $loading.style.display = "block";
}
