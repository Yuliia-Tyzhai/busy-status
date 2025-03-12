const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-CbspLdtO.js","assets/vendor-CS74yUSC.css"])))=>i.map(i=>d[i]);
import{i as f,a as h,b as q}from"./assets/vendor-CbspLdtO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&u(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const S="modulepreload",P=function(e){return"/busy-status/"+e},y={},L=function(r,t,u){let n=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),s=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));n=Promise.allSettled(t.map(a=>{if(a=P(a),a in y)return;y[a]=!0;const d=a.endsWith(".css"),v=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${v}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":S,d||(l.as="script"),l.crossOrigin="",l.href=a,s&&l.setAttribute("nonce",s),document.head.appendChild(l),d)return new Promise((b,E)=>{l.addEventListener("load",b),l.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${a}`)))})}))}function i(o){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o}return n.then(o=>{for(const s of o||[])s.status==="rejected"&&i(s.reason);return r().catch(i)})};function C(e){e?f(e,{initialCountry:"all",loadUtils:()=>L(()=>import("./assets/vendor-CbspLdtO.js").then(r=>r.u),__vite__mapDeps([0,1]))}):console.error("Елемент #phone не знайдено.")}const I="https://jsonplaceholder.typicode.com/posts",p=[{question:"Question 1",options:["option 1","option 2","option 3"]},{question:"Question 2",options:["option 1","option 2","option 3"]},{question:"Question 3",options:["option 1","option 2","option 3"]},{question:"Question 4",options:["option 1","option 2","option 3"]},{question:"Question 5",options:["option 1","option 2","option 3"]}];function O(e){h.success({position:"topRight",theme:"dark",messageColor:"white",backgroundColor:"#4CAF50",message:e})}function c(e){h.error({position:"topRight",theme:"dark",messageColor:"white",backgroundColor:"#ef4040",message:e})}let m=0,g=[];function w(){const e=document.getElementById("quiz");e.innerHTML=`
    <h2>${p[m].question}</h2>
    <ul>
      ${p[m].options.map((r,t)=>`
            <li>
              <input type="radio" name="answer" value="${r}" id="option${t}">
              <label for="option${t}">${r}</label>
            </li>
          `).join("")}
    </ul>
  `}function T(){const e=document.querySelector('input[name="answer"]:checked');e?(g.push(e.value),m++,m<p.length?w():(document.getElementById("quiz-container").style.display="none",document.getElementById("registration-container").style.display="block")):c("Please, choose an option")}function $(){return g}async function A(e){return q.post(I,e,{headers:{"Content-Type":"application/json"}})}function B(e){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)}function Q(e,r){const t=e.querySelector("#name"),u=e.querySelector(".wt-email-input");return t.value.trim()?B(u.value.trim())?!r||!f.getInstance(r).isValidNumber()?(c("Please, write a correct phone number!"),!1):!0:(c("Please, write a correct email"),!1):(c("Please, write your name"),!1)}document.addEventListener("DOMContentLoaded",()=>{w(),document.getElementById("next").addEventListener("click",T),C(document.querySelector(".wt-phone-input"));const e=document.querySelector(".wt-form");e.addEventListener("submit",async r=>{var o,s;r.preventDefault();const t=document.getElementById("submitButton");if(t)t.disabled=!0,t.textContent="Sending...";else return;const u=document.querySelector(".wt-phone-input");if(!Q(e,u)){t&&(t.disabled=!1,t.textContent="Send");return}const n=f.getInstance(u).getNumber(),i={name:e.querySelector("#name").value,email:e.querySelector(".wt-email-input").value.trim(),phone:n,answers:$()};try{await A(i),O("You have successfully sent your answers!"),document.getElementById("registration-container").innerHTML="<p>You have successfully sent your answers!</p>",e.reset()}catch(a){c("Error: "+(((s=(o=a.response)==null?void 0:o.data)==null?void 0:s.message)||"Something went wrong. Please, try again!"))}finally{t&&(t.disabled=!1,t.textContent="Send")}})});
//# sourceMappingURL=index.js.map
