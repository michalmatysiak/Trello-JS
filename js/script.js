$(function() {
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  // CONSTRUCTION FUNCTION COLUMN
  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();
    function createColumn() {
      // CREATING COMPONENTS OF COLUMNS
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('X');
      var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj karte...');

      // ADDING EVENTS
      $columnDelete.click(function() {
        self.removeColumn();
      });
      //ADD A NOTE AFTER CLICKING ON THE BUTTON 
      $columnAddCard.click(function(event) {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });

      // CONSTRUCTION COLUMN ELEMENT
      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);

      // RETURN OF CREATED COLUMN
      return $column;   
    }
  }
  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  //CONSTRUCTION FUNCTION CARD
  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      // CREATING THE BLOCKS
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('X');

      // ADDING EVENT
      $cardDelete.click(function(){
        self.removeCard();
      });

      // COMBINING BLOCKS AND RETURNING THE CARD
      $card.append($cardDelete)
        .append($cardDescription);

      return $card;
    }
  }
  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  }

  //CREATE ARRAY OBJECT
  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  function initSortable() {
   $('.column-card-list').sortable({
     connectWith: '.column-card-list',
     placeholder: 'card-placeholder'
   }).disableSelection();
  }

  $('.create-column').click(function(){
  var name = prompt('Enter a column name');
  var column = new Column(name);
      board.addColumn(column);
  });


  // CREATING COLUMNS
  var todoColumn = new Column('Do zrobienia');
  var doingColumn = new Column('W trakcie');
  var doneColumn = new Column('Zrobione');

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card('Nowy task');
  var card2 = new Card('Utwórz tablice');
  var card3 = new Card ('Ukonczońy task');

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);
})
