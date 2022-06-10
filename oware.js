$(() => {


  let totalMarbles = 24;
  let firstPlayerMarbles = totalMarbles;
  let secondPlayerMarbles = totalMarbles;
  let presentPlayer = undefined;
  let numMarbles = undefined;
  let startIndex = undefined;
  let endIndex = undefined; 
  let endRow = undefined;

  // Pre-canned marble colors
  const marbleColors = [
    ['#e54ed0, #ff72ff'],
    ['#b106df, #06dfb1'],
    ['#1e48e2, #060e2d'],
    ['#42e100, #f6ff6a'],
    ['#fab340, #fe8787'],
    ['#b400a2, #9e0031']
  ]


  const setVariables = (event) => { 
    console.log('=== setVariables  ===');
    const $hole = $(event.currentTarget); // variable for clicked hole
    numMarbles = $hole.children().children().length; // stored number of marbles in selected hole
    console.log('numMarbles:', numMarbles);
    
    if ($hole.hasClass('hole-1')) {
      firstPlayerMarbles -= numMarbles; // subracting by 1 that 
    } else {
      secondPlayerMarbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    console.log('presentPlayer:', presentPlayer);
    console.log('firstPlayerMarbles:', firstPlayerMarbles);
    console.log('secondPlayerMarbles:', secondPlayerMarbles);
    console.log('=====================');
    removeMarbles(event);
  }

  const removeMarbles = (event) => {
    console.log('removeMarbles');
    const $hole = $(event.currentTarget); // storing selected hole
    $hole.children('.marble-layer').remove(); // remove marbles from selected hole
    distributeInitialPlayerRowMarbles(); //distribute starting from selected hole
  }


  // === Hole/Oware hover behavior ========================
  const tapInHouse = (event) => {
    const hoverNumber = $(event.currentTarget).children('.marble-layer').children().length;
    $(event.currentTarget).children('.hover-number').css('visibility', 'visible').text(hoverNumber);
  }


  const leaveHouse = (event) => {
    $(event.currentTarget).children('.hover-number').css('visibility', 'hidden')
  }


  const tapInBoard = (event) => {
    const hoverNumber = $(event.currentTarget).children('.mancala-layer').children().length;
    $(event.currentTarget).children('.mancala-number').css('visibility', 'visible').text(hoverNumber);
  }


  const leaveBoard = (event) => {
    $(event.currentTarget).children('.mancala-number').css('visibility', 'hidden')
  }



  // Functions ==============================================

  const randomRotate = () => { // used to randomly rotate marble layers
    return 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
  }


  const randomMarbleColor = (arr) => {
    const random = Math.floor(Math.random() * 6)
    return 'radial-gradient(' + arr[random] + ')';
  }


  // === Creating marble layers =============================

  const checkMarbleLayers = (i, row) => { // check for how many marble layers exist for a hole
    const numMarbleLayers = $(row).children().eq(i).children('.marble-layer').length;
    console.log('numMarbleLayers', numMarbleLayers);
    if (numMarbleLayers === 0) {
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $(row).children().eq(i).append($marbleLayer);
      checkMarbleLayers(i, row);
    } else {
      checkLastLayer(numMarbleLayers, i, row); 
    }
  }

  const createMarbleLayers = (numMarbleLayers, numLastLayerMarbles, i, row) => {
    const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // create a marble
    if (numLastLayerMarbles < 5) { // if less than 5 marbles
      $(row).children().eq(i).children('.marble-layer').eq(numMarbleLayers - 1).append($marble); //adding marble to marble layer
      console.log('marble appended');
    } else {
      const $marbleLayer = $('<div>').addClass('marble-layer').css('transform', randomRotate()); // create a new marble layer
      $(row).children().eq(i).append($marbleLayer); // add this to the hole
      $marbleLayer.append($marble); //add marble to the new marble layer
    }
  }


  // === Creating mancala marble layers =====================
  const checkMancalaLayers = (mancala) => {
    const numMancalaLayers = $(mancala).children('.mancala-layer').length;
    console.log('numMancalaLayers', numMancalaLayers);
    if (numMancalaLayers === 0) {
      const $mancalaLayer = $('<div>').addClass('mancala-layer');
      $(mancala).append($mancalaLayer);
      checkMancalaLayers(mancala);
    } else {
      checkLastMancalaLayer(numMancalaLayers, mancala); // pass the number of layers to checkLastMancalaLayer function
    }
  }


  // === Moving marbles =====================================
  const distributeInitialPlayerRowMarbles = () => { // marbles ditribuuted on players side from selected hole
    console.log('=== distributeInitialPlayerRowMarbles ===');
    console.log('numMarbles:', numMarbles);
    let limit = null; //loop for iteration limit
    if (presentPlayer === 1) { // Player 1 row
      endRow = 1; // the endIndex will be in player 1's row of holes
        limit = 0; // only distribute the number of marbles that match the number of holes, hold the rest
      } else {
        limit = startIndex - numMarbles;
      }
      for (let i = startIndex - 1; i >= limit; i--) {
        checkMarbleLayers(i, '#row-1');
        firstPlayerMarbles++; // increase player 1's total marbles by 1
        numMarbles--; /decrease distributed marbles
        console.log('numMarbles:', numMarbles);
      }
    } else { // when the hole is in player 2's row
      endRow = 2; // the endIndex will be in player 2's row of holes
      if (5 - startIndex <= numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 5; // only distribute the number of marbles that match the number of holes, hold the rest
      } else {
        limit = startIndex + numMarbles;
      }
      for (let i = startIndex + 1; i <= limit; i++) { // if hole is in player 2's row
        checkMarbleLayers(i, '#row-2');
        secondPlayerMarbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('numMarbles:', numMarbles);
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    }
    console.log('firstPlayerMarbles:', firstPlayerMarbles);
    console.log('secondPlayerMarbles:', secondPlayerMarbles);
    distributeMancalaMarbles(); // go on to distribute marbles to players's mancalas
  }



  const distributeOpponentRowMarbles = () => { // distribute on opponents row
    console.log('=== distributeOpponentRowMarbles ===');
    console.log('numMarbles:', numMarbles);
    let limit = null; //loop for iteration limit
    if (numMarbles > 0 && presentPlayer === 1) { // if player 1 still has marbles to distribute
      endRow = 2; // the endIndex will be in player 2's row of holes
      if (6 < numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 6; // 6 marbles for 6 holes limit
      } else {
        limit = numMarbles;
      }
      for (let i = 0; i < limit; i++) { // if hole is in player 2's row
        checkMarbleLayers(i, '#row-2');
        secondPlayerMarbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('numMarbles:', numMarbles);
        console.log('firstPlayerMarbles:', firstPlayerMarbles);
        console.log('secondPlayerMarbles:', secondPlayerMarbles);
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
      distributePlayerRowMarbles();
    } else if (numMarbles > 0 && presentPlayer === 2) {
      endRow = 1; // the endIndex will be in player 1's row of holes
      if (6 < numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 0; // only distribute the number of marbles that match the number of holes, hold the rest
      } else {
        limit = 6 - numMarbles;
      }
      for (let i = 5; i >= limit; i--) {
        checkMarbleLayers(i, '#row-1');
        firstPlayerMarbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        console.log('numMarbles:', numMarbles);
        console.log('firstPlayerMarbles:', firstPlayerMarbles);
        console.log('secondPlayerMarbles:', secondPlayerMarbles);
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
      distributePlayerRowMarbles();
    } else { // no ramaining marbles
      determineNextPlayer(); // who goes next
    }
  }


  const distributePlayerRowMarbles = () => { // distributes on players row 
    console.log('=== distributePlayerRowMarbles ===');
    console.log('numMarbles:', numMarbles);
    let limit = null; //  loop iteration limit
    if (numMarbles > 0 && presentPlayer === 1) { // player 1's row
      endRow = 1; // the endIndex will be in player 1's row of holes
        limit = 0; // only distribute the number of marbles that match the number of holes, hold the rest
      } else {
        limit = 6 - numMarbles;
      }
      for (let i = 5; i >= limit; i--) {
        checkMarbleLayers(i, '#row-1');
        firstPlayerMarbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        console.log('numMarbles:', numMarbles);
        console.log('firstPlayerMarbles:', firstPlayerMarbles);
        console.log('secondPlayerMarbles:', secondPlayerMarbles);
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    } else if (numMarbles > 0 && presentPlayer === 2) { // when the hole is in player 2's row
      endRow = 2; // the endIndex will be in player 2's row of holes
      if (6 < numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 6; // only distribute the number of marbles that match the number of holes, hold the rest
      } else {
        limit = numMarbles;
      }
      for (let i = 0; i < limit; i++) { // if hole is in player 2's row
        checkMarbleLayers(i, '#row-2');
        secondPlayerMarbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('numMarbles:', numMarbles);
        console.log('firstPlayerMarbles:', firstPlayerMarbles);
        console.log('secondPlayerMarbles:', secondPlayerMarbles);
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    }
    distributeMancalaMarbles(); // go on to distribute marbles to players's mancalas (Score house)
  }


  const determineNextPlayer = () => { // function to determine which player goes next
    console.log('=== determineNextPlayer ===');
    console.log('numMarbles:', numMarbles);
    console.log('firstPlayerMarbles:', firstPlayerMarbles);
    console.log('secondPlayerMarbles:', secondPlayerMarbles);
    if (presentPlayer === 1 && endRow === 1) { // if player 1's last marble is added to their row
        for (let i = 0; i < $('.hole-2').eq(endIndex).children('.marble-layer').children().length; i++) {
          checkMarbleLayers(endIndex, '#row-1');
          firstPlayerMarbles++; // increase player 1's total marbles
          secondPlayerMarbles--; // decrease player 2's marbles
          console.log('firstPlayerMarbles:', firstPlayerMarbles);
          console.log('secondPlayerMarbles:', secondPlayerMarbles);
        }
     
      }
      disablePlayer2(); // they get to go again so disable player 2's row
    } else if (presentPlayer === 2 && endRow === 2) { // if player 2's last marble is added to their row
        for (let i = 0; i < $('.hole-1').eq(endIndex).children('.marble-layer').children().length; i++) {
          checkMarbleLayers(endIndex, '#row-2');
          secondPlayerMarbles++; // increase player 2's total marbles
          firstPlayerMarbles--; // decrease player 1's marbles
          console.log('firstPlayerMarbles:', firstPlayerMarbles);
          console.log('secondPlayerMarbles:', secondPlayerMarbles);
        }
        $('.hole-1').eq(endIndex).children('.marble-layer').remove(); // remove all marbles from player 1's adjacent hole
      }
      disablePlayer1(); // they get to go again so disable player 1's row
    } else if (presentPlayer === 1) {
      enablePlayer2();
      presentPlayer = 2;
      disablePlayer1();
    } else {
      enablePlayer1();
      presentPlayer = 1;
      disablePlayer2();
    }
    determineRoundOver();
  }


  // === Enabling players =====================================
  const enablePlayer1 = () => {
    console.log('enablePlayer1');
    // $('#player-1').css('border', '1px solid black');
    $('#player-1').css('color', 'black');
    $('.hole-1').on('click', setVariables); // adding an event listner to all the holes
  }


  const enablePlayer2 = () => {
    console.log('enablePlayer2');
    // $('#player-2').css('border', '1px solid black');
    $('#player-2').css('color', 'black');
    $('.hole-2').on('click', setVariables); // adding an event listner to all the holes
  }


  // === Picking first player ==================================
  const determineFirstPlayer = () => {
    presentPlayer = 1;
    enablePlayer1();
    disablePlayer2();
  }

  // === Determining the winner ================================
  const determineWinner = () => {
    console.log('=== determineWinner ===');
    tallyScore();
  }


  // === Winning modal window button functions =================
  const newRound = (event) => {
    $('#winning-modal').css('visibility', 'hidden');
    $('#winner').remove();
    clearBoard();
    createBoard();
    firstPlayerMarbles = totalMarbles;
    secondPlayerMarbles = totalMarbles;
    determineFirstPlayer();
  }

  const endRound = (event) => {
    $('#winning-modal').css('visibility', 'hidden');
    $('#winner').remove();
    clearBoard();
    firstPlayerMarbles = totalMarbles;
    secondPlayerMarbles = totalMarbles;
  }


  // === Clear/create board ====================================
  const clearBoard = () => {
    console.log('=== clearBoard ===');
    $('.marble-layer').remove();
    $('.mancala-layer').remove();
    console.log('removed mancala-layer');
    $('.mancala-number').remove();
    console.log('removed mancala-number');
  }

  const createBoard = () => { // Creating initial mancala board setup
    $('#row-1').empty();
    $('#row-2').empty();

    // player 1
    const $hoverNumberMancala1 = $('<div>').addClass('mancala-number');
    $hoverNumberMancala1.text($('#mancala-1').children('.mancala-layer').children().length);
    $('#mancala-1').append($hoverNumberMancala1);
    $('#mancala-1').hover(tapInBoard, leaveBoard);

    for (let i = 0; i < 6; i++) {
      const $hole = $('<div>').addClass('hole-1'); // creating holes (not the mancala)
      const $hoverNumber = $('<div>').addClass('hover-number');
      $('#row-1').append($hole); // adding holes to the mancala board
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $hole.append($marbleLayer); // adding marble layer to holes
      for (let j = 0; j < totalMarbles / 6; j++) {
        const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // creating marbles
        $marbleLayer.append($marble); // adding marbles to the marble layer
      }
      $hoverNumber.text($hole.children('.marble-layer').children().length);
      $hole.append($hoverNumber);
      $hole.hover(tapInHouse, leaveHouse);
    }
    // player 2
    const $hoverNumberMancala2 = $('<div>').addClass('mancala-number');
    $hoverNumberMancala2.text($('#mancala-2').children('.mancala-layer').children().length);
    $('#mancala-2').append($hoverNumberMancala2);
    $('#mancala-2').hover(tapInBoard, leaveBoard);

    for (let i = 0; i < 6; i++) {
      const $hole = $('<div>').addClass('hole-2'); // creating holes (not the mancala)
      const $hoverNumber = $('<div>').addClass('hover-number');
      $('#row-2').append($hole); // adding holes to the mancala board
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $hole.append($marbleLayer); // adding marble layer to holes
      for (let j = 0; j < totalMarbles / 6; j++) {
        const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // creating marbles
        $marbleLayer.append($marble); // adding marbles to the marble layer
      }
      $hoverNumber.text($hole.children('.marble-layer').children().length);
      $hole.append($hoverNumber);
      $hole.hover(tapInHouse, leaveHouse);
    }
  }



  // Event listeners ===========================================

  $('#start-over').on('click', newRound); // begin a new round when the "Start Over" button is clicked
  $('#instructions-button').on('click', () => { // open up the "How to Play" modal window when that button is clicked
    $('#instructions-modal').css('visibility', 'visible');
  });
  $('#close-button').children().on('click', () => { // close the "How to Play" modal window when the "Close" button is clicked
    $('#instructions-modal').css('visibility', 'hidden');
  });



  // Function invocations ======================================

  createBoard(); // display the board with the initial setup
  determineFirstPlayer(); // pick the first player (player 1)



}) //end
