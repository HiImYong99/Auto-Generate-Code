# [JS] Uncaught SyntaxError: Cannot use import statement outside a module

## 에러 내용

- 모듈화를 하기위해 export와 import를 올바르게 작성했는데

`Uncaught SyntaxError: Cannot use import statement outside a module`

이런 오류가 발생하며 모듈화가 제대로 적용되지 않았다.

---

## 해결 방법

```html
<script type="module" src="src/js/app.js"></script>
```

- 모듈화를 완료 했으면 사용할 자바스크립트 파일을 연결할 때 다음과 같이 script 타입을 "moduel"로 작성하여 모듈로서 동작하도록 설정해야 한다.

## 주관적인 1줄 요약

> 모듈화 한 걸 갖고 와서 사용하고 싶으면 자기 자신도 모듈이 되어야 한다.
