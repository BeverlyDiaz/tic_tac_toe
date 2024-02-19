/**
 * 1) Récupérer les cases du plateau de jeu. X
 * 2) Brancher des écouteurs d'événement sur le clic X
 * 3) Brancher des ecouteurs d'événement pour gérer le survol X
 * 4) Quand on survol une case du jeu, on veut changer la couleur de fond. X
 * 5) Quand on quitte le survol de la case, on remet la couleur de fond en blanc.X
 * - Brancher un écouteur d'événement sur la sortie du survol. X
 * - Modifier la couleur du fond X
 * 6) Intégrer le marqueur X dans une case cliquee X
 * 7) Intégrer le marqueur O dans une case cliquee X
 * - Mettre en place une alternance entre les 2 marqueurs
 * 8) Bloquer une case une fois qu'un joueur écrit dedans. X
 * 9) Detecter s'il y a une combinaison gagnante
 */

let cases = document.querySelectorAll("td");
let scoresP = document.querySelectorAll('p');
let marqueur = "X";
let nbCases = 0;
let isJ1Turn = true;
let xWins = 0;
let oWins = 0;

/**
 * Boucle (While / for)
 */

for (let i = 0; i < cases.length; i++) {
  cases[i].addEventListener("click", function () {
    // Si la case est libre (il n'y a pas de marqueur à l'intérieur)
    //Si c'est le tour dU J1 X
    // Alors on place le marqueur X dans la case X
    // On modifie le boleen pour dire que ce n'est plus à J1 de jouer X
    // Sinon, c'est le tour de J2. On place le marqueur O dans la case X
    // On remodifie le booleen, pour indiquer que c'est au tour de J1 X

    if (this.textContent == "") {
      if (isJ1Turn == true) {
        marqueur = "X";
        isJ1Turn = false;
      } else {
        marqueur = "O";
        isJ1Turn = true;
      }
      this.textContent = marqueur;
      nbCases++;
    } else {
      alert("Case déjà utilisée");
    }
    if (winner(marqueur)) {
      alert(`le joueur ${marqueur} a gagné !`);
      // Incrémentation du score du gagnant
      switch(marqueur) {
        case 'X':
        xWins++;
        scoresP[0].textContent = `Score X : ${xWins}`;
        break;
        case 'O':
        oWins++;
        scoresP[1].textContent = `Score O : ${oWins}`;
        break;

      }
      if (confirm('Voulez-vous rejouer ?')) {
        nbCases = 0;
        resetGame();
      } else {
        endGame();
      }
    } else if (!winner(marqueur) && nbCases == 9) {
        alert('Match nul')
    }
  });

  cases[i].addEventListener("mouseenter", function () {
    this.style.backgroundColor = "lightgray";
  });

  cases[i].addEventListener("mouseleave", function () {
    this.style.backgroundColor = "white";
  });
}

function winner(marqueur) {
  // Si notre marqueur est présent sur la première ligne du plateau, Alors on a un gagnant.
  if (
    cases[0].textContent === marqueur &&
    cases[1].textContent === marqueur &&
    cases[2].textContent === marqueur ||
    cases[3].textContent === marqueur &&
    cases[4].textContent === marqueur &&
    cases[5].textContent === marqueur ||
    cases[6].textContent === marqueur &&
    cases[7].textContent === marqueur &&
    cases[8].textContent === marqueur ||
    cases[0].textContent === marqueur &&
    cases[3].textContent === marqueur &&
    cases[6].textContent === marqueur ||
    cases[1].textContent === marqueur &&
    cases[4].textContent === marqueur &&
    cases[7].textContent === marqueur ||
    cases[2].textContent === marqueur &&
    cases[5].textContent === marqueur &&
    cases[8].textContent === marqueur ||
    cases[0].textContent === marqueur &&
    cases[4].textContent === marqueur &&
    cases[8].textContent === marqueur ||
    cases[2].textContent === marqueur &&
    cases[4].textContent === marqueur &&
    cases[6].textContent === marqueur 
    

  ) {
    return true;
  }
  return false;
}

function resetGame() {
    for(let i = 0; i < cases.length; i++) {
        cases[i].textContent = '';
    }
}

function endGame() {
    for(let i = 0; i< cases.length; i++) {
        cases[i].style.pointerEvents = 'none'
    }
}
