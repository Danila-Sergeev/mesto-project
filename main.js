(()=>{var t={108:()=>{var t={formSelector:".popup__edit",inputSelector:".popup__info",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_inactive",inputErrorClass:"popup__edit_type_error",errorClass:"popup__error-massage_active"},e=function(e,r){r.validity.patternMismatch?r.setCustomValidity(r.dataset.errorMessage):r.setCustomValidity(""),r.validity.valid?function(t,e,r){var n=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""}(e,r,t):function(t,e,r,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,r,r.validationMessage,t)},r=function(t,e,r){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(r.inactiveButtonClass)):(e.disabled=!0,e.classList.add(r.inactiveButtonClass))};!function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(n){!function(t,n){var o=Array.from(t.querySelectorAll(n.inputSelector)),c=t.querySelector(n.submitButtonSelector);r(o,c,n),t.addEventListener("reset",(function(){setTimeout((function(){r(o,c,n)}),0)})),o.forEach((function(a){a.addEventListener("input",(function(){e(t,a),r(o,c,n)}))}))}(n,t)}))}(t)}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var c=e[n]={exports:{}};return t[n](c,c.exports,r),c.exports}(()=>{"use strict";var t=document.querySelector("#popup-container-place"),e=document.querySelector("#popup-avatar"),n=document.querySelector("#popup");function o(t){"Escape"===t.key&&a(document.querySelector(".popup_opened"))}function c(t){document.addEventListener("keydown",o),t.classList.add("popup_opened")}function a(t){document.removeEventListener("keydown",o),t.classList.remove("popup_opened")}function i(t,e){document.querySelector("#".concat(t)).textContent=e?"Сохранение...":"Сохранить"}var u={baseUrl:"https://nomoreparties.co/v1/plus-cohort-17",headers:{authorization:"c8ce4a71-bdd1-470d-8928-726e47ccdf35","Content-Type":"application/json"}};function s(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}var l=document.querySelector(".popup_img"),d=document.querySelector(".cards-grid"),p=document.querySelector(".popup_img_name"),f=document.querySelector(".popup_img_photo"),m=(document.querySelector("#popup-confirm"),document.querySelector(".profile__name")),v=document.querySelector(".profile__status"),h=document.querySelector(".profile__avatar"),_=document.querySelector("#card-template").content;function y(t,e,r,n,o,a,i){d.prepend(function(t,e,r,n,o,a,i){var d=_.querySelector(".card").cloneNode(!0),m=d.querySelector(".card__img"),v=d.querySelector(".card__trash"),h=d.querySelector(".card__like-counter");if(m.setAttribute("src",t),d.querySelector(".card__name").textContent=e,h.textContent=r,m.setAttribute("alt",e),d.querySelector(".card__like").addEventListener("click",(function(t){var e,r;t.target.classList.contains("card__like_status_on")?t.target.classList.contains("card__like_status_on")&&function(t){return fetch("https://nomoreparties.co/v1/plus-cohort-17/cards/likes/".concat(t),{method:"DELETE",headers:u.headers})}(o).then((function(){h.textContent=Number(h.textContent)-1,t.target.classList.remove("card__like_status_on")})).catch((function(t){console.error(t)})):(e=o,r=i,fetch("https://nomoreparties.co/v1/plus-cohort-17/cards/likes/".concat(e),{method:"PUT",headers:u.headers,body:JSON.stringify(r)})).then((function(){h.textContent=Number(h.textContent)+1,t.target.classList.add("card__like_status_on")})).catch((function(t){console.error(t)}))})),h.textContent>0)for(var y=0;y<=r;y++)void 0!==n[y]&&n[y]._id===i._id&&d.querySelector(".card__like").classList.add("card__like_status_on");return a?v.addEventListener("click",(function(){(function(t){return fetch("https://nomoreparties.co/v1/plus-cohort-17/cards/".concat(t),{method:"DELETE",headers:u.headers}).then((function(t){s(t)}))})(o).then((function(){d.remove()})).catch((function(t){console.error(t)}))})):d.querySelector(".card__trash").remove(),m.addEventListener("click",(function(r){r.preventDefault(),c(l),p.textContent=e,f.setAttribute("src",t),f.setAttribute("alt",e)})),d}(t,e,r,n,o,a,i))}function S(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r(108);var b=document.forms.editProfile,q=document.querySelector(".profile__add-button"),C=document.querySelector(".profile__edit"),g=document.querySelector(".profile__avatar_edit"),L=document.querySelectorAll(".popup"),k=document.querySelector("#input-name"),E=document.querySelector("#input-about"),x=document.querySelector("#input-src-avatar"),A=document.forms.editAvatar,T=document.querySelector("#input-src"),w=document.querySelector("#input-text-img"),j=document.forms.editCards;Promise.all([fetch("https://nomoreparties.co/v1/plus-cohort-17/users/me ",{headers:u.headers}).then((function(t){return s(t)})),fetch("https://nomoreparties.co/v1/plus-cohort-17/cards",{headers:u.headers}).then((function(t){return s(t)}))]).then((function(t){for(var e=function(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,c=[],a=!0,i=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(c.push(n.value),!e||c.length!==e);a=!0);}catch(t){i=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(i)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return S(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?S(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(t,2),r=e[0],n=e[1],o=n.length-1;o>=0;o--)n[o].owner._id===r._id?y(n[o].link,n[o].name,n[o].likes.length,n[o].likes,n[o]._id,!0,r):y(n[o].link,n[o].name,n[o].likes.length,n[o].likes,n[o]._id,!1,r);m.textContent=r.name,v.textContent=r.about,h.setAttribute("src",r.avatar)})).catch((function(t){console.error(t)})),j.addEventListener("submit",(function(e){var r,n;e.preventDefault(),i("add-button-img",!0),(r=w,n=T,fetch("https://nomoreparties.co/v1/plus-cohort-17/cards",{method:"POST",headers:u.headers,body:JSON.stringify({name:r.value,link:n.value})}).then((function(t){return s(t)}))).then((function(e){y(e.link,e.name,e.likes.length,e.likes,e._id,!0),j.reset(),a(t)})).catch((function(t){console.error(t)})).finally((function(){i("add-button-img",!1)}))})),L.forEach((function(t){t.addEventListener("mousedown",(function(e){e.target.classList.contains("popup_opened")&&a(t),e.target.classList.contains("popup__close-icon")&&a(t)}))})),C.addEventListener("click",(function(){c(n),k.value=m.textContent,E.value=v.textContent})),g.addEventListener("click",(function(){return c(e)})),h.addEventListener("click",(function(){return c(e)})),q.addEventListener("click",(function(){return c(t)})),A.addEventListener("submit",(function(t){var r;t.preventDefault(),i("add-button-img-avatar",!0),(r=x,fetch("https://nomoreparties.co/v1/plus-cohort-17/users/me/avatar ",{method:"PATCH",headers:{authorization:"c8ce4a71-bdd1-470d-8928-726e47ccdf35","Content-Type":"application/json"},body:JSON.stringify({avatar:r.value})}).then((function(t){return s(t)}))).then((function(t){h.setAttribute("src",t.avatar),A.reset(),a(e)})).catch((function(t){console.error(t)})).finally((function(){i("add-button-img-avatar",!1)}))})),b.addEventListener("submit",(function(t){var e,r;t.preventDefault(),i("add-button-inf",!0),(e=k,r=E,fetch("https://nomoreparties.co/v1/plus-cohort-17/users/me ",{method:"PATCH",headers:u.headers,body:JSON.stringify({name:e.value,about:r.value})}).then((function(t){return s(t)}))).then((function(t){m.textContent=t.name,v.textContent=t.about,h.setAttribute("src",t.avatar),a(n)})).catch((function(t){console.error(t)})).finally((function(){i("add-button-inf",!1)}))}))})()})();