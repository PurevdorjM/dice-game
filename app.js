// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглве.
var activePlayer = 1;

// Тоглочдын чуглуулсан оноог цуглуулдаг хувьсагч
var scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноо
var roundScore = 0;

// Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.

var diceNumber = Math.floor(Math.random() * 6) + 1;

// Программ эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";

document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function() {
  var diceNumber = Math.floor(Math.random() * 6) + 1;
  document.querySelector(".dice").style.display = "block";
  document.querySelector(".dice").style.display = "block";

  alert("Шоог шидлээ: " + diceNumber);
});
