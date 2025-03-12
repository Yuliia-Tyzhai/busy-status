import{i as a,a as c,b as q}from"./assets/vendor-BpbyieiF.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();let n;const w="https://jsonplaceholder.typicode.com/posts",d=[{question:"Question 1",options:["option 1","option 2","option 3"]},{question:"Question 2",options:["option 1","option 2","option 3"]},{question:"Question 3",options:["option 1","option 2","option 3"]},{question:"Question 4",options:["option 1","option 2","option 3"]},{question:"Question 5",options:["option 1","option 2","option 3"]}];let p=0,b=[];function h(){const t=document.getElementById("quiz");t.innerHTML=`
    <h2>${d[p].question}</h2>
    <ul>
      ${d[p].options.map((r,l)=>`
            <li>
              <input type="radio" name="answer" value="${r}" id="option${l}">
              <label for="option${l}">${r}</label>
            </li>
          `).join("")}
    </ul>
  `}document.getElementById("next").addEventListener("click",()=>{const t=document.querySelector('input[name="answer"]:checked');t?(b.push(t.value),p++,p<d.length?h():(document.getElementById("quiz-container").style.display="none",document.getElementById("registration-container").style.display="block")):a.error({position:"topRight",theme:"dark",messageColor:"white",backgroundColor:"#ef4040",message:"Please, choose an option"})});const g=document.querySelector(".wt-form"),s=document.querySelector(".wt-email-input"),m=document.querySelector(".wt-phone-input"),y=document.querySelector(".wt-success-message"),f=document.querySelector(".wt-error-message"),L=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;s.addEventListener("input",function(){const t=s.value.trim();L.test(t)?(s.classList.add("success"),s.classList.remove("error"),y.style.display="block",f.style.display="none"):(s.classList.add("error"),s.classList.remove("success"),y.style.display="none",f.style.display="block")});document.addEventListener("DOMContentLoaded",function(){if(console.log("phoneInputField:",m),m){console.log("intlTelInput:",c);try{n=c(m,{initialCountry:"ua",utilsScript:"intl-tel-input/build/js/utils.js"}),console.log("phoneInput:",n),n&&n.getNumber?(console.log(`intl-tel-input ініціалізовано: ${n}`),console.log("intl-tel-input initialized")):console.error("intl-tel-input не ініціалізовано!")}catch(t){console.error("Помилка при ініціалізації intlTelInput:",t)}m.addEventListener("blur",function(){setTimeout(()=>{if(n&&typeof n.getNumber=="function"&&c.numberFormat)try{const t=n.getNumber(c.numberFormat.NATIONAL),r=n.getNumber(c.numberFormat.INTERNATIONAL);console.log(`Національний формат: ${t}`),console.log(`Міжнародний формат: ${r}`)}catch(t){console.error("Помилка при отриманні форматів:",t)}else console.error("intl-tel-input не ініціалізовано, метод getNumber не доступний або intlTelInput.numberFormat не визначено.")},0)})}else console.error("Елемент #phone не знайдено.")});g.addEventListener("submit",async function(t){var e,o;if(t.preventDefault(),document.querySelector('button[type="submit"]').disabled=!0,document.querySelector('button[type="submit"]').textContent="Sending...",!n||!n.getNumber()){a.error({position:"topRight",theme:"dark",messageColor:"white",backgroundColor:"#ef4040",message:"Please, write a correct phone number!"}),document.querySelector('button[type="submit"]').disabled=!1,document.querySelector('button[type="submit"]').textContent="Send";return}const r=n.getNumber();if(!n.isValidNumber()){a.error({position:"topRight",theme:"dark",messageColor:"white",backgroundColor:"#ef4040",message:"Please, write a correct phone number"}),document.querySelector('button[type="submit"]').disabled=!1,document.querySelector('button[type="submit"]').textContent="Відправити";return}const u={name:document.getElementById("name").value,email:s.value.trim(),phone:r,answers:b};console.log("Формдані:",u);try{await q.post(w,u,{headers:{"Content-Type":"application/json"}}),a.success({position:"topRight",theme:"dark",messageColor:"white",backgroundColor:"#4CAF50",message:"Дані відправлено для тестування."}),document.getElementById("registration-container").innerHTML="<p>Дані відправлено для тестування. Вони не зберігаються на постійній основі.</p>",g.reset()}catch(i){console.error("Помилка відправки даних:",i),a.error({position:"topRight",theme:"dark",messageColor:"white",backgroundColor:"#ef4040",message:"Error: "+(((o=(e=i.response)==null?void 0:e.data)==null?void 0:o.message)||"Something went wrong. Please, try again!")})}finally{document.querySelector('button[type="submit"]').disabled=!1,document.querySelector('button[type="submit"]').textContent="Send"}});h();
//# sourceMappingURL=index.js.map
