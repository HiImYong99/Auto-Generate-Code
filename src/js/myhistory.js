const $remove_btn = document.querySelector("#history-remove");
const $question = document.querySelector("#question");
const $result = document.querySelector("#result");

function load_history() {
  let ai = localStorage.getItem("ai")
    ? JSON.parse(localStorage.getItem("ai"))
    : [];
  let detail = localStorage.getItem("detail")
    ? JSON.parse(localStorage.getItem("detail"))
    : [];
  if (ai.length === 0) {
    console.log("빈배열 실행");
    $question.innerText = "사용자가 요청을 남긴적이 없습니다.";
    $result.innerText = "AI가 답변을 남긴적이 없습니다.";
    // $use_count.innerText = "0회";
    // $lang_count.innerText = "0회";
    // $method_count.innerText = "0회";
  } else {
    write_history(detail, ai);
    console.log([detail, ai]);
    return [detail, ai];
  }
}

function write_history(detail, ai) {
  let ol_detail = document.createElement("ol");
  ol_detail.style.listStyleType = "number";

  detail.forEach((question, index) => {
    let li_detail = document.createElement("li");
    li_detail.innerText = question;
    li_detail.id = index;

    li_style(li_detail);

    li_detail.addEventListener("click", e => {
      let ai_history = JSON.parse(localStorage.getItem("ai"))[li_detail.id];
      let ai_code = document.createElement("pre");
      $result.innerText = "";
      ai_code.innerText = ai_history;
      $result.appendChild(ai_code);
    });
    ol_detail.appendChild(li_detail);
  });
  $question.appendChild(ol_detail);
}
load_history();

$remove_btn.addEventListener("click", () => {
  if (confirm("정말 저장된 모든 기록을 초기화 시키겠습니까?")) {
    localStorage.removeItem("lang");
    localStorage.removeItem("method");
    localStorage.removeItem("detail");
    localStorage.removeItem("detail");
    localStorage.removeItem("ai");
    load_history();
  }
});

function li_style(li) {
  li.className = "mb-3";
  li.style.cursor = "pointer";
  li.addEventListener("mouseover", () => {
    li.style.color = "red";
  });
  li.addEventListener("mouseout", () => {
    li.style.color = "black";
  });
}
