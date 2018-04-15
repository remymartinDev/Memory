var app = {

  table:null,
  tr:null,
  td:null,
  div:null,
  onClick:null,
  result:null,
  index:0,
  essai:0,
  array1:null,
  array2:null,
  //testObjet:{fruit1:2,fruit2:2,fruit3:2,fruit4:2,fruit5:2,fruit6:2,fruit7:2,fruit8:2,fruit9:2,fruit10:2,fruit11:2,fruit12:2,fruit13:2,fruit14:2},
  normalMode:['fruit1','fruit2','fruit3','fruit4','fruit5','fruit6','fruit7','fruit8','fruit9','fruit10','fruit11','fruit12','fruit13','fruit14','fruit1','fruit2','fruit3','fruit4','fruit5','fruit6','fruit7','fruit8','fruit9','fruit10','fruit11','fruit12','fruit13','fruit14'],



  init: function(){

    console.log('MemoryGame init');

    console.log((($('div').data('status')) ==='off'));






    app.shuffle();
    app.createTable();

    $('button').on('click', app.trololo);

    $('.carte').on('click', app.onClick);
    $('.carte').on('click', app.toto);

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
    app.div = $('<div class="carte cache '+ app.normalMode[app.index]+'" data-type="'+app.normalMode[app.index]+'" data-status="off" data-paired="off">');
    app.index++;
    app.td = $('<td>');
    app.tr.append(app.td);
    app.td.append(app.div);
  },

  onClick: function() {

    if ($(this).attr('data-status')==='off') {
      $(this).addClass('image').attr('data-status', 'on');
      app.essai++;
    }
    else {alert('Cette case a déjà été cliquée.Veuillez en choisir une autre')
      return;
    }

    if (app.array1!==null){
      $status = $(this).attr('data-status');
      $type = $(this).attr('data-type');
      app.array2 = [$status,$type];
      return app.array2;
    }
    else {
      $status = $(this).attr('data-status');
      $type = $(this).attr('data-type');
      app.array1 = [$status,$type];
      return app.array1;
    }

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




/*
  trololo: function() {
    console.log('array1'+app.array1);
    console.log('array2'+app.array2);
    console.log(app.essai);
  },



  toto: function() {


      console.log('le data-statut est '+ $(this).attr('data-status'));
    }



*/


/*

*/


















};
$(app.init);
