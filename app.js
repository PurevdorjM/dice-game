// Тоглоомын бүх газарт ашиглах глобал хувьсагчдыг энд зарлъя.
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;
// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
var activePlayer;

// Хоёр тоглогчийн цуглуулсан оноонууд
var scores;

// Идэвхитэй тоглогчийн цуглуулж байгаа оноо
var roundScore;

// Шооны зургийг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

// Тоглоомийг эхлүүлнэ.
initGame();

// Тоглоомийг эхлэхэд бэлтгэнэ.
function initGame() {
  //Тоглоом эхэллээ гэдэг төлөвт оруулна.
  isNewGame = true;

  // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглве.
  activePlayer = 0;

  // Тоглочдын чуглуулсан оноог цуглуулдаг хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноо
  roundScore = 0;

  // Программ эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Тоглогчдийн нэрийш буцааж гаргах
  document.getElementById("name-0").textContent = "Тоглогч 1";
  document.getElementById("name-1").textContent = "Тоглогч 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isNewGame === true) {
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
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // 1 буусан тул тоглогчийн ээлжийг сольж өгнө.
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж эхлүүлнэ үү");
  }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isNewGame) {
    // Уг тоглогч нь цуглуулсан ээлжний оноог глобал оноон дээр нь нэмж өгнө.
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Дэлгэц дээрх оноог нь өөрчилнө.
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг (Оноо нь 100-аас их эсэх) шалгах код
    if (scores[activePlayer] >= 100) {
      // Тоглоомийг дууссан төлөвт оруулна.
      isNewGame = false;

      // Ялагч гэсэн текстийг нэрийх нь оронд гаргана.
      document.getElementById("name-" + activePlayer).textContent =
        "ЯЛАГЧ БОЛЛОО !!!";
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
  } else {
    alert("Тоглоом дууссан байна. NEW GAME товчийг дарж эхлүүлнэ үү");
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

// New Game буюу Шинэ тоглоом эхлүүлэх товчний эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
