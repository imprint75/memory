// Memory Game

memory = {
    userTurn 	: 0,
    cards 	: ['apple','orange','pear','strawberry','grapes','watermellon','fig','rasberries','guava'],
    deck 	: [],
    matches : [],
    guess 	: [],
    
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
		for( card in this.cards ){
			if( card < count ) {
				this.deck.push(this.cards[card]);
				this.deck.push(this.cards[card]);
			}
		}
    },

    /**#*#*#**
    * 	build the playing board 
    */
    buildBoard : function( dim ) {
    	var that = this;
    	$('#theDeck').html('');
    	memory.deck = [];
    	memory.buildDeck( dim );
    	
    	this.sizeTheBoard(dim);
    	
		// randomize the deck
		memory.deck = memory.fisherYates(memory.deck);

		// Handler for .ready() called.
		for( card in memory.deck ){
		    $('#theDeck').append('<li id="' + card  + '" class="card" name="' + memory.deck[ card ] + '" class="card"></li>');
		    $('#' + card).click(function(){
		    	that.turn(this);
		    });
		}
    }, 
    
    sizeTheBoard : function(dim) {
    	// wob = (dim * 100) * (dim/2) + 'px'; 
    	switch(dim){
		    case '2':
		    	wob = '200px';
				break;
		    case '8':
		    	wob = '400px';
		    	break;
		    default:
		    	wob = '600px';
		}

    	// console.log(wob);
		$('#theDeck').css('width' , wob );
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
				$('#theMatches').append('<li>' + $(guess).html() + '</li>');
			
			}

			this.guess = [];
			this.userTurn = 0;
			
			// whatever happened, reset the board in half a second
			setTimeout("memory.resetDeck(" + card + ")", 500);
		}
		
    }, 

    /**#*#*#**
    * turn a square over 
    */
    turnSquare : function( guess ) {
		// turn square
		$(guess).html( $(guess).attr('name') );
		$(guess).css('background-color', 'red');	
    },
    
    resetDeck : function( card ) {
		for ( card in this.deck) {
			// if the card is in the matches array, turn it yellow otherwise, turn it green
			if( this.matches.indexOf(card) != -1 ){
				$('#' + card).css('background-color', 'yellow');
				$('#' + card).html( $('#' + card).attr('name') );
			} else {
				$('#' + card).css('background-color', 'green');
				$('#' + card).html('');
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