var PORTA = (function(){
	var _$window,
		_$body,
		_validator,
		_passEvent,
		_$header;
	var _initVars = function _initVars(){
		//contenedor de todo
		_$body = $('.content-container');
		_$header = $('#header');
		_$window = $(window);
		_validator = false;
		_passEvent = false;
	};
	var _initEvents = function _initEvents(){
		_$window.scroll(function(){
			// if(!_passEvent){
			// 	_$window.scrollTop(0);
			// 	_toggleSmall();
			// 	setTimeout(function(){
			// 		_passEvent = true;
			// 	}, 1000);
			// }
			if(_passEvent){
				_scrollingstuff();
			}
		});
		_$window.bind('mousewheel', function(){
			if(!_passEvent){
				_toggleSmall();
				_passEvent = true;
				setTimeout(function(){
					$('body').removeClass('no-scroll');
				}, 600);
			}
		});
		// buscar librería para detectar touchdrag events
		// _$window.bind('touchstart', function(){
		// 	alert("touch");
		// });
	};
	var _scrollingstuff = function _scrollingstuff(){
		var posY = _$window.scrollTop();
		if(posY == 0){
			$('body').addClass('no-scroll');
			_validator = false;
			_toggleSmall();
			setTimeout(function(){
				_passEvent = false;
			}, 600);
		}
		// else {
		// 	if(!_validator){
		// 		console.log("ponemosSmall");
		// 		_validator = true;
		// 		_toggleSmall();
		// 	}
		// }
	};
	var _toggleSmall = function _toggleSmall(){
		_$body.toggleClass('small');
		_$header.toggleClass('small');
	};
	return{
		init : function init(){
			_initVars();
			_initEvents();
		}
	}
})();