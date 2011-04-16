// Memory Game

memory = {
    userTurn 	: 0,
    cards 	: ['apple','orange','pear','strawberry','grapes','watermellon','fig','rasberries','guava'],
    deck 	: [],
    matches : [],
    guess 	: [],
    
    /*#*#*#*
      add 2 copies of each element in cards to deck
      randomize deck
      lay out on a cube
      ondocumentready = function(){
        for( card in this.deck ){
	  card.click( turn( card.id ) )
        }
      }
     */

    buildDeck : function( count ){
		console.log(count);
		for( card in this.cards ){
			if( card < count ) {
				this.deck.push(this.cards[card]);
				this.deck.push(this.cards[card]);
			}
		}
    },

    buildBoard : function( dim ) {
    	var that = this;
    	$('#theDeck').html('');
    	memory.deck = [];
    	memory.buildDeck( dim );
    	// wob = (dim * 100) * (dim/2) + 'px'; 
    	switch(dim){
		    case '2':
			wob = '200px';
			break;
		    case '8':
			wob = '400px';
			break;
		    case '18':
			wob = '900px';
			break;
		    default:
			wob = '600px';
		}

    	// console.log(wob);
		$('#theDeck').css('width' , wob );

		memory.deck = memory.fisherYates(memory.deck);
		// console.log(memory.deck);

		// Handler for .ready() called.
		for( card in memory.deck ){
		    $('#theDeck').append('<li id="card' + card  + '" class="card">' + memory.deck[ card ] + ' </li>');
		    $('#card' + card).click(function(){
		    	that.turn(this);
		    });
		}
    }, 

    // allow the user to select any 2 cards
    turn : function( guess ){ 
    	
		if( this.userTurn < 1 ){

			this.guess.push( $(guess).attr('id') );
			$(guess).css('background-color', 'red');
			this.userTurn++;

		} else {			

			// if they match, take the matched cards out of the deck and allow them to select 2 more cards
			if ( $(guess).html() == $('#' + this.guess[0]).html() ) {
				console.log('Match!');
				$(guess).css('background-color', 'yellow');
				$('#' + this.guess[0]).css('background-color', 'yellow');
				this.guess = [];
				this.userTurn = 0;
			} else {
				// if not, turn the cards back over 
				$(guess).css('background-color', 'green');
				$('#' + this.guess[0]).css('background-color', 'green');
				console.log('No Match!');
			}

			this.userTurn = 0;
		}
		
	}, 

    fisherYates : function ( myArray ) {
	    var i = myArray.length;
	    if ( i == 0 ) return false;
	    while ( --i ) {
	        var j = Math.floor( Math.random() * ( i + 1 ) );
	        var tempi = myArray[i];
	        var tempj = myArray[j];
	        myArray[i] = tempj;
	        myArray[j] = tempi;
	    }
	    return myArray;
	}
};