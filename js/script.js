var app = {

  table:null,
  tr:null,
  td:null,
  div:null,
  onClick:null,
  result:null,
  index:null,
  essai:0,
  array1:null,
  array2:null,
  id:null,
  pairs:0,
  countdown:null,
  normalMode:['fruit1','fruit2','fruit3','fruit4','fruit5','fruit6','fruit7','fruit8','fruit9','fruit10','fruit11','fruit12','fruit13','fruit14','fruit1','fruit2','fruit3','fruit4','fruit5','fruit6','fruit7','fruit8','fruit9','fruit10','fruit11','fruit12','fruit13','fruit14'],
  hardMode:['fruit1','fruit2','fruit3','fruit4','fruit5','fruit6','fruit7','fruit8','fruit9','fruit10','fruit11','fruit12','fruit13','fruit14','fruit15','fruit16','fruit17','fruit18','fruit1','fruit2','fruit3','fruit4','fruit5','fruit6','fruit7','fruit8','fruit9','fruit10','fruit11','fruit12','fruit13','fruit14','fruit15','fruit16','fruit17','fruit18'],

//chargement de la page =>> boutons difficulté
  init: function(){

    app.normal = $('<button id="normal">');
    $('#buttons').append(app.normal);
    $('#normal').text('Partie Normale');

    app.hard = $('<button id="hard">');
    $('#buttons').append(app.hard);
    $('#hard').text('Partie Difficile');

    $('#plateau').removeClass('plateau1');
    $('#plateau').removeClass('plateau2');

    $('#countdown').removeClass('countdownHard');
    $('#countdown').removeClass('countdownNormal');

    $('#hard').on('click', app.initHard);
    $('#normal').on('click', app.initNormal);
  },

  initHard: function(){

//disparition des boutons
    $('button').remove('#hard');
    $('button').remove('#normal');
  //réinitialisation en cas de partie précédente
    app.index=0;
    $('table').remove();
    $('#plateau').addClass('plateau2');
    $('#countdown').addClass('countdownHard');
  //mélange du tableau
    // app.shuffleHard();
  //création du plateau de jeu
    app.createTableHard();
  //démarrage du chrono
    app.countDown(90, 90, $('#countdown'));
  //écoute du clic
    $('.carte').on('click', app.onClickHard);
},

  initNormal: function(){
//disparition des boutons
    $('button').remove('#hard');
    $('button').remove('#normal');
//réinitialisation en cas de partie précédente
    app.index=0;
    $('table').remove();

    $('#plateau').addClass('plateau1');
    $('#countdown').addClass('countdownNormal');

//mélange du tableau
    // app.shuffle();
//création du plateau de jeu
    app.createTable();
//démarrage du chrono
    app.countDown(60, 60, $('#countdown'));
//écoute du clic
    $('.carte').on('click', app.onClick);
  },











//création de la balise <table> dans le DOM
  createTable: function() {
    app.table=$('<table>');

    for ($i=0; $i<4; $i++) {
      app.createLine($i);
    }
    $('#plateau').append(app.table);

  },

//création des <tr>, éléments enfants de <table>
  createLine: function() {
    app.tr = $('<tr>');

    for ($id=0; $id<7; $id++) {
      app.createSlot($id);
    }
    app.table.append(app.tr);
  },

//création des <td>, éléments enfants des <tr>
//chaque <td> sera parent d'une <div class=" carte cache fruitX"> avec des datas :
//data-type : testera si les cartes sont identiques
//data-status : teste si la carte a été retournée
//data-paired : si la carte a été apairée
  createSlot: function() {
    app.div = $('<div id ="slot'+app.index+'"class="carte cache '+ app.normalMode[app.index]+'" data-type="'+app.normalMode[app.index]+'" data-status="off" data-paired="off">');
    app.index++;
    app.td = $('<td>');
    app.tr.append(app.td);
    app.td.append(app.div);
  },

//randomisation du tableau des images
  shuffle: function() {
    for ($i = 27; $i > 0; $i--) {
      $j = Math.floor(Math.random() * ($i + 1));
      $temp = app.normalMode[$i];
      app.normalMode[$i] = app.normalMode[$j];
      app.normalMode[$j] = $temp;
    }
    return app.normalMode;
  },

  onClick: function() {

//1er click, les informations sur la carte sont stockées dans un tableau
    if ($(this).attr('data-status')==='off' && $(this).attr('data-paired')==='off' && app.essai===0) {
      $(this).addClass('image').attr('data-status', 'on');
      app.essai++;
      $status = $(this).attr('data-status');
      $type = $(this).attr('data-type');
      $id = $(this).attr('id');
      app.array1 = [$id,$status,$type];
      return app.array1;
    }
//2nd click, les informations sont stockées dans un 2nd tableau, puis match() les compare
    if ($(this).attr('data-status')==='off' && $(this).attr('data-paired')==='off' && app.essai===1) {
      $(this).addClass('image').attr('data-status', 'on');
      app.essai++;
      $status = $(this).attr('data-status');
      $type = $(this).attr('data-type');
      $id = $(this).attr('id');
      app.array2 = [$id,$status,$type];
      app.match();
    }
//empêche de retourner une 3eme carte
    if ($(this).attr('data-status')==='off'&& app.essai>1) {
      app.messageWait();
      window.setTimeout(app.messageClear, 1000);
      return;
    }
//message si on click une carte déjà retournée
    else if ($(this).attr('data-paired')==='on'&& app.essai>1) {
      app.messageAlreadyClicked();
      window.setTimeout(app.messageClear, 1000);
      return;
    }
  },



  match: function() {
//les cartes sont identiques, la data "paired" est attribuée et les variables de comparaison sont reset
    if (app.array1[2]===app.array2[2]) {
      app.messagePaired();
      app.messageClearPaired1();
      window.setTimeout(app.messageClearPaired2, 1000);
      window.setTimeout(app.resetData, 1);
      app.pairs++;
      app.endGame();
    }
//les cartes ne sont pas identiques, la data "status" est remise sur off,la classe "image" est enlevée pour que les cartes se retournent et les variables de comparaison sont reset
    else {
      app.messageNotPaired();
      window.setTimeout(app.messageClearNotPaired, 1000);
      window.setTimeout(app.resetData, 1001);
      app.endGame();
    }
  },

//analyse si la partie est finie
  endGame: function() {
//toutes les paires ont été trouvées et le countdown n'est pas fini = gangné
    if (app.pairs === 14 && $('.countdown').text() !== '0:0'){
      alert('Vous avez gagné');
      $('#plateau').remove('table');
      app.init();
    }
//le countdown est terminé alors que toutes les paires n'ont pas été trouvées
    if (app.pairs !== 14 && $('.countdown').text() === '0:0'){
      alert('Vous avez perdu');
      $('#plateau').remove('table');
      app.init();
    }
  },


//reset des tableaux de variables sur les data des éléments cliqués
  resetData: function() {
    app.array1=null;
    app.array2=null;
  },
//fin messages "deja clic" et "deja retournée"
  messageClear: function() {
    $('#message').removeClass('messageNotPaired').text('');
  },
//les 2 img sont identiques(FIN DU MESSAGE): reset nb de tentatives pour pouvoir immédiatement re-cliquer, et assignation du data-paired
  messageClearPaired1: function() {
    app.essai=0;
    $('#'+app.array1[0]).attr('data-paired', 'on');
    $('#'+app.array2[0]).attr('data-paired', 'on');
  },
//avec un setTimeout, permet de voir le message alors que le reste du clearPaired s'est exécuté immédiatement
  messageClearPaired2: function() {
    $('#message').removeClass('messagePaired').text('');
  },
//les 2 img sont différentes(FIN DU MESSAGE): un setTimeout d'1sec empeche de re-cliquer
  messageClearNotPaired: function() {
    app.essai=0;
    $('#message').removeClass('messageNotPaired').text('');
    $('#'+app.array1[0]).removeClass('notPaired').removeClass('image').attr('data-status', 'off');
    $('#'+app.array2[0]).removeClass('notPaired').removeClass('image').attr('data-status', 'off');
  },
//app.essai=2 ==> message si clic sur une 3eme carte
  messageWait: function() {
    $('#message').addClass('messageNotPaired').text('Vous avez déjà retourné 2 cartes');
  },
//message si clic sur une carte déjà retournée
  messageAlreadyClicked: function() {
    $('#message').addClass('messageNotPaired').text('Cette case a déjà été cliquée. Veuillez en choisir une autre');
  },
//les 2 img sont différentes
  messageNotPaired: function() {
    $('#message').addClass('messageNotPaired').text('Les cartes ne sont pas identiques. Essayez à nouveau');
    $('#'+app.array1[0]).addClass('notPaired');
    $('#'+app.array2[0]).addClass('notPaired');
  },
//les 2 img sont identiques
  messagePaired: function() {
    $('#message').addClass('messagePaired').text('Bien joué');
  },

//chrono
  countDown: function(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, 1000).html(Math.floor(timeleft/60) + ':' + timeleft%60);
    if(timeleft > 0) {
      setTimeout(function() {
        app.countDown(timeleft - 1, timetotal, $element);
      }, 1000);
    }
  },


/*************************************************/
//FONCTIONS DU HARD mode
  createTableHard: function() {
    app.table=$('<table>');
    for ($i=0; $i<4; $i++) {
      app.createLineHard($i);
    }
    $('#plateau').append(app.table);
  },

  createLineHard: function() {
    app.tr = $('<tr>');
    for ($id=0; $id<9; $id++) {
      app.createSlotHard($id);
    }
    app.table.append(app.tr);
  },

  createSlotHard: function() {
    app.div = $('<div id ="slot'+app.index+'"class="carte cache '+ app.hardMode[app.index]+'" data-type="'+app.hardMode[app.index]+'" data-status="off" data-paired="off">');
    app.index++;
    app.td = $('<td>');
    app.tr.append(app.td);
    app.td.append(app.div);
  },

  shuffleHard: function() {
    for ($i = 35; $i > 0; $i--) {
      $j = Math.floor(Math.random() * ($i + 1));
      $temp = app.hardMode[$i];
      app.hardMode[$i] = app.hardMode[$j];
      app.hardMode[$j] = $temp;
    }
    return app.hardMode;
  },

  onClickHard: function() {
    if ($(this).attr('data-status')==='off' && $(this).attr('data-paired')==='off' && app.essai===0) {
      $(this).addClass('image').attr('data-status', 'on');
      app.essai++;
      $status = $(this).attr('data-status');
      $type = $(this).attr('data-type');
      $id = $(this).attr('id');
      app.array1 = [$id,$status,$type];
      return app.array1;
    }
    if ($(this).attr('data-status')==='off' && $(this).attr('data-paired')==='off' && app.essai===1) {
      $(this).addClass('image').attr('data-status', 'on');
      app.essai++;
      $status = $(this).attr('data-status');
      $type = $(this).attr('data-type');
      $id = $(this).attr('id');
      app.array2 = [$id,$status,$type];
      app.matchHard();
    }
    if ($(this).attr('data-status')==='off'&& app.essai>1) {
      app.messageWait();
      window.setTimeout(app.messageClear, 1000);
      return;
    }
    else if ($(this).attr('data-paired')==='on'&& app.essai>1) {
      app.messageAlreadyClicked();
      window.setTimeout(app.messageClear, 1000);
      return;
    }
  },

  matchHard: function() {
    if (app.array1[2]===app.array2[2]) {
      app.messagePaired();
      app.messageClearPaired1();
      window.setTimeout(app.messageClearPaired2, 1000);
      window.setTimeout(app.resetData, 1);
      app.pairs++;
      app.endGameHard();
    }
    else {
      app.messageNotPaired();
      window.setTimeout(app.messageClearNotPaired, 1000);
      window.setTimeout(app.resetData, 1001);
      app.endGame();
    }
  },

  endGameHard: function() {
    if (app.pairs === 18 && $('.countdown').text() !== '0:0'){
      alert('Vous avez gagné');
      $('#plateau').remove('table');
      app.init();
    }
    if (app.pairs !== 18 && $('.countdown').text() === '0:0'){
      alert('Vous avez perdu');
      $('#plateau').remove('table');
      app.init();
    }
  },

};
$(app.init);
