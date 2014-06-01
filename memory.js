// Memory Game

$(document).ready(function() {
  $('.gameLevel').click(function(){
    memory.buildBoard($(this).attr('id'));
  });
  memory.buildBoard(8);
});

memory = {
  userTurn 	: 0,
  cards 	: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
  cardBack    : 'back.png',
  deck 	: [],
  matches : [],
  guess 	: [],
  card : '<li id="${card}" class="card" name="${cardName}" class="card"><img src="gotham/back.png" /></li>',
  match : '<li>${match}</li>',
  dimension : "2",

  /*#*#*#*
   * start with an array of elements
   * add 2 copies of each element in cards to deck
   * randomize deck
   * attach event handlers to each element in the deck
   * size the boundary box according to the number of elements
   */

  /**#*#*#**
   *	add a pair of each card to the deck
   */
  buildDeck : function( count ){
    $('#theDeck').html('');
    this.deck = [];
    for( card in this.cards ){
      if( card < parseFloat(count) ) {
	this.deck.push(this.cards[card]);
	this.deck.push(this.cards[card]);
      }
    }
  },

  isNumber : function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  /**#*#*#**
   * 	build the playing board
   */
  buildBoard : function( dim ) {
    var that = this;
    this.dimension = dim;
    $("#theMatches").html("");
    this.matches = [];
    this.buildDeck( dim );
    this.sizeTheBoard(dim);
    // randomize the deck
    memory.deck = memory.fisherYates(memory.deck);
    // Handler for .ready() called.
    for( card in memory.deck ){
      data = [ { theCard : memory.deck[ card ] , cardName : memory.deck[ card ] } ];
      // Render the card to the page as an li in the ul theDeck
      //$.tmpl( "aCard", data ).appendTo( "#theDeck" );
      this.renderTpl( this.card, data, '#theDeck' );
      $('#' + card).click(function(){
	that.turn(this);
      });
    }
  },

  /****#*#*#*#*
   *    you need to pass data array that matches the template you want to render
   */
  renderTpl : function( template, data, appendTo ) {
    // Convert the markup string into a named template
    jQuery.template( "aCard", template );
    // Render the card to the page as an li in the ul theDeck
    $.tmpl( "aCard", data ).appendTo( appendTo );
  },

  sizeTheBoard : function(dim) {
    // wob = (dim * 100) * (dim/2) + 'px';
    switch(dim){
    case '8':
      widthOfBoard = '400px';
      break;
    case '12':
      widthOfBoard = '580px';
      break;
    case '20':
      widthOfBoard = '690px';
      break;
    default:
      widthOfBoard = '400px';
    }
    $('#theDeck').css('width' , widthOfBoard );
  },

  /**#*#*#**
   * allow the user to select any 2 cards
   */
  turn : function( guess ){
    // turn the square
    this.turnSquare(guess);
    // if this is the first turn
    if( this.userTurn < 1 ){
      // push the value to guess array
      this.guess.push( $(guess).attr('id') );
      // increase the turn
      this.userTurn++;
    } else {
      // if they match, push the cards to matched
      if ( $(guess).attr('name') == $('#' + this.guess[0]).attr('name') ) {
	// push the 2 ids to the matched array
	this.matches.push( $(guess).attr('id') );
	this.matches.push( $('#' + this.guess[0]).attr('id') );
	data = [ {  match :  $(guess).html() } ];
	this.renderTpl( this.match, data, "#theMatches" );
      }

      this.guess = [];
      this.userTurn = 0;
      if( this.matches.length == this.deck.length ) {
	this.winner();
      } else {
	setTimeout("memory.resetDeck(" + card + ")", 500);
      }
    }
  },

  winner : function() {
    setTimeout( "memory.buildBoard('" +  this.dimension + "')", 1500 );
  },

  /**#*#*#**
   * turn a square over
   */
  turnSquare : function( guess ) {
    // turn square
    $(guess).children('img').attr('src', "gotham/" + $(guess).attr('name') + ".png");
  },

  resetDeck : function( card ) {
    for ( card in this.deck) {
      // if the card is in the matches array, turn it yellow otherwise, turn it green
      if( this.matches.indexOf(card) != -1 ){
	$('#' + card).children('img').attr('src', "gotham/" + $('#' + card).attr('name') + "_open.png");
      } else {
	$('#' + card).children('img').attr('src', "gotham/back.png");
      }
    }
  },

  /**#*#*#**
   * the fisher yates shuffle to randomize the cards
   */
  fisherYates : function ( shuffle ) {
    var i = shuffle.length;
    if ( i == 0 ) return false;
    while ( --i ) {
      var j = Math.floor( Math.random() * ( i + 1 ) );
      var tempi = shuffle[i];
      var tempj = shuffle[j];
      shuffle[i] = tempj;
      shuffle[j] = tempi;
    }
    return shuffle;
  }
};
