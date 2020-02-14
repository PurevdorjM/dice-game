// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглве.
var activePlayer = 0;

// Тоглочдын чуглуулсан оноог цуглуулдаг хувьсагч
var scores = [0, 1];

// Тоглогчийн ээлжиндээ цуглуулж байгаа оноо
var roundScore = 0;

// Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.

var diceNumber = Math.floor(Math.random() * 6) + 1;

// Программ эхлэхэд бэлтгэе
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";

document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
  // 1-6 доторх нэг тоог гаргаж авна
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Шооны зургийг вэб дээр гаргаж ирнэ
  diceDom.style.display = "block";

  // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ
  diceDom.src = "dice-" + diceNumber + ".png";

  // Буусан 1-ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
    // 1-ээс ялгаатай тоо буулга. Буусан тоог тоглогчид нэмж өгнө.
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
    // 1 буусан тул тоглогчийн ээлжийг сольж өгнө.
    switchToNextPlayer();
  }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
  // Уг тоглогч нь цуглуулсан ээлжний оноог глобал оноон дээр нь нэмж өгнө.
  // if (activePlayer === 0) {
  //   scores[0] = scores[0] + roundScore;
  // } else {
  //   scores[1] = scores[1] + roundScore;
  // }

  scores[activePlayer] = scores[activePlayer] + roundScore;

  // Дэлгэц дээрх оноог нь өөрчилнө.
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // Уг тоглогч хожсон эсэхийг (Оноо нь 100-аас их эсэх) шалгах код
  if (scores[activePlayer] >= 100) {
    // Ялагч гэсэн текстийг нэрийх нь оронд гаргана.
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Тоглогчийн ээлжийг солино.
    switchToNextPlayer();
  }
});

// Энэ функц нь тогох ээлжийг дараагийн тоглогчруу шилжүүлдэг "DRY Зарчим"
function switchToNextPlayer() {
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // Тоглогчийн ээлжийг нөгөө тоглогчруу шилжүүлнэ.
  // Хэрэв идэвхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийг 1 болго.
  // Үгүй бол идэвхтэй тоглогчийг 0 болго.

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгоно.
  diceDom.style.display = "none";
}

// Шинэ тоглоом эхлүүлэх товчний эвент листенер
document.querySelector(".btn-new").addEventListener("click", function() {
  alert("clicked");
});
