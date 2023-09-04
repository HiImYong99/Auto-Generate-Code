const $use_count = document.querySelector("#use-count");
const $lang_count = document.querySelector("#lang-count");
const $method_count = document.querySelector("#method-count");
const $remove_btn = document.querySelector("#local-remove");

function load_count() {
  let lang = localStorage.getItem("lang")
    ? JSON.parse(localStorage.getItem("lang"))
    : [];
  lang ? console.log(lang) : console.log("없어");
  let method = localStorage.getItem("method")
    ? JSON.parse(localStorage.getItem("method"))
    : [];
  let detail = localStorage.getItem("detail")
    ? JSON.parse(localStorage.getItem("detail"))
    : [];
  if (lang.length === 0) {
    console.log("빈배열 실행");

    $use_count.innerText = "0회";
    $lang_count.innerText = "0회";
    $method_count.innerText = "0회";
  } else {
    write_count(lang, method, detail);
    return [lang, method, detail];
  }
}

function write_count(lang, method, detail) {
  let most_lang_name = getSortedArr(lang)[0][0];
  let most_lang_count = getSortedArr(lang)[0][1];
  let most_method_name = getSortedArr(method)[0][0];
  let most_method_count = getSortedArr(method)[0][1];

  $use_count.innerText = lang.length + "회";
  $lang_count.innerText = `${most_lang_name} ( ${most_lang_count}회 )`;
  $method_count.innerText = `${most_method_name} ( ${most_method_count}회 )`;
}
load_count();

$remove_btn.addEventListener("click", () => {
  if (confirm("정말 사용했던 기록을 초기화 하시겠습니까?")) {
    localStorage.removeItem("lang");
    localStorage.removeItem("method");
    localStorage.removeItem("detail");
    load_count();
  }
});

function getSortedArr(array) {
  // 1. 출연 빈도 구하기
  const counts = array.reduce((pv, cv) => {
    pv[cv] = (pv[cv] || 0) + 1;
    return pv;
  }, {});

  // 2. 요소와 개수를 표현하는 배열 생성 => [ [요소: 개수], [요소: 개수], ...]
  const result = [];
  for (let key in counts) {
    result.push([key, counts[key]]);
  }

  // 3. 출현 빈도별 정리하기
  result.sort((first, second) => {
    return second[1] - first[1];
  });

  return result;
}
