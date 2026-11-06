// Set this to your email provider's form endpoint (Kit/ConvertKit, MailerLite, Mailchimp...).
// Until you do, signups are stored only in this visitor's browser and nothing is emailed.
var FORM_ACTION = "";
document.getElementById("yr").textContent = new Date().getFullYear();
var DAYS = ["Gift tag set","Christmas to-do planner","Holiday budget tracker","Gift list tracker","Advent activity cards","Christmas card address log","Meal plan page","Cookie exchange recipe cards","Elf on the shelf notes","Letters from Santa template","Christmas photo prop signs","Christmas Eve box labels","Wrapping paper pattern pack","Kids chore chart (holiday)","Teacher gift tags","Stocking stuffer checklist","Holiday party planner","Christmas coloring pages","Countdown to Christmas poster","Self care December planner","Gratitude journal pages","Christmas social media Canva kit","Thank you card templates","New Year reset planner","Bundle: the whole collection"];
var g = document.getElementById("daygrid");
if (g) DAYS.forEach(function(d,i){var e=document.createElement("div");e.className="day";e.innerHTML="<b>DAY "+(i+1)+"</b>"+d;g.appendChild(e);});
var f = document.getElementById("optin");
if (f) f.addEventListener("submit", function(ev){
  ev.preventDefault();
  var data = new FormData(f);
  try { localStorage.setItem("clc_signup", JSON.stringify({n:data.get("first_name"),e:data.get("email"),t:Date.now()})); } catch(e){}
  var go = function(){ location.href = "free/?welcome=1"; };
  if (FORM_ACTION) { fetch(FORM_ACTION,{method:"POST",body:data,mode:"no-cors"}).then(go,go); } else { go(); }
});
