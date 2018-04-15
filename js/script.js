var app = {

  table:null,
  tr:null,
  td:null,

  init: function(){

    console.log('MemoryGame init');




    // Sur chaque bouton
    // for (var index = 0; index < buttons.length; index++) {
    //
    //   // Listener sur le 'click', et lance app.onClick
    //   buttons[ index ].addEventListener('click', app.onClick);
    // }
    //case.on('click', app.onClick);

    // $('button').on('click', app.onClick);

    console.log(app.slot);

    app.createTable();
  },

  createTable: function() {
    app.table=$('<table>');

    for ($i=0; $i<4; $i++) {
      app.createLine($i);
    }
    $('#plateau').append(app.table);
  },

  createLine: function() {
    app.tr = $('<tr>');

    for ($id=0; $id<7; $id++) {
      app.createSlot($id);
    }
    app.table.append(app.tr);
  },

  createSlot: function() {
    app.div = $('<div class="cache">');
    app.td = $('<td class="carte">');
    app.tr.append(app.td);
    app.td.append(app.div);
  }
/*

*/


/*

*/


















};
$(app.init);
