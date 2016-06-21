var PORTA = (function(){
	var _$window,
		_$body,
		_$logo,
		_$menu,
		_$scroller,
		_$scrollObjs,
		_$project,
		_$lightbox,
		_$sendForm,
		_$rMenu,
		_alreadyBottom,
		_bottom,
		_positions,
		_posY,
		_notMobile,
		_validator,
		_alreadySent = false,
		_passEvent,
		_$header;
	var _initVars = function _initVars(){
		//contenedor de todo
		_$body = $('.content-container');
		_$header = $('#header');
		_$lightbox = $('.rogano-project');
		_$logo = $('.logo');
		_$menu = $('.menu a');
		_$project = $('.port-container');
		_$rMenu = $('.header-container svg');
		_$sendForm = $('.send-form');
		_$scroller = $('#scroller');
		_$scrollObjs = $('.getPos');
		_$window = $(window);
		_alreadyBottom = false;
		_bottom = 0;
		_notMobile = true;
		_passEvent = false;
		_positions = [];
		_validator = false;
	};
	var _isMobile = function _isMobile(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
			_notMobile = false;
			var el = document.getElementById('scroller');
			_swipeEvent(el, function(swipedir){
			    if (swipedir =='up'){
			    	if(!_passEvent){
			    		_landingEffect();
			    		_addMenu(1);
			    	}
			    }
			});
		}
	};
	var _initEvents = function _initEvents(){
		_$rMenu.click(function(){
			_$header.addClass('open');
			// ga('send', 'event', 'rMenu', 'click', 'responsive item');
			// ga('send', 'click', 'rMenu', 'responsive item');
		});
		_$logo.click(function(){
			if(_$header.hasClass('open')){
				_$header.removeClass('open');
				// ga('send', 'event', 'rMenu', 'click', 'close open menu');
				// ga('send', 'click', 'rMenu', 'close open menu');
			}
		});
		_$sendForm.click(function(e){
			e.preventDefault();
			if(!_alreadySent){
				_alreadySent = true;
				PORTA.contacto.init();
			}
		});
		_$window.scroll(function(){
			if(_passEvent){
				_scrollingstuff();
			}
		});
		_$window.bind('mousewheel', function(){
			if(!_passEvent){
				_landingEffect();
				_addMenu(1);
			}
		});
		//MENU CLICKS
		_$menu.on('click', function(event){
			_$this = $(this);
			if(!_$header.hasClass('open')){
				if(_$this.hasClass('in-site')){
					event.preventDefault();
					var _scrollTo = _$this.attr('href'),
						_posY = $(_scrollTo).position(),
						_goTo,
						_toGo;
					_animateMenu(_scrollTo, _posY, _goTo, _toGo);
					// ga('send', 'event', 'Menu', 'click', 'normal menu item');
					// ga('send', 'click', 'Menu', 'normal menu item');
				}
			} else {
				if(_$this.hasClass('in-site')){
					event.preventDefault();
					var _scrollTo = _$this.attr('href'),
						_posY = $(_scrollTo).position(),
						_goTo,
						_toGo;
					_$header.removeClass('open');
					setTimeout(function(){
						_animateMenu(_scrollTo, _posY, _goTo, _toGo);
					}, 500);
				}
			}
		});
		//portafolio clicks
		// A METER EN LOS LINKS
		_$project.on('click', function(){
			var _search = $(this).data('project');
			// ga('send', 'event', 'Project', 'click', 'project ' + _search + ' open');
			// ga('send', 'click', 'Project', 'open ' + _search);
			var _searchText = _search + '.html';
			_$lightbox.addClass('showing');
			$.get(_searchText, function(data){
				$('.project-content').html(data);
			}).done(function(){
				setTimeout(function(){
					$('.project-content').removeClass('faded');
				}, 700);
				if(_notMobile){
					Ps.initialize(document.getElementById('p-scroll'), {
						wheelSpeed: 1,
						wheelPropagation: false,
						swipePropagation: false,
						suppressScrollX: true
					});
				}
			});
			$('.close-icon').click(function(){
				if($('.ajax-get').length){
					$('.project-content').addClass('faded');
					// ga('send', 'event', 'Project', 'click', 'close open project');
					// ga('send', 'click', 'Project', 'close open project');
					setTimeout(function(){
						if(_notMobile){
							Ps.destroy(document.getElementById('p-scroll'));
						}
						$('.ajax-get').remove();
						_$lightbox.removeClass('showing');
					}, 550);
				} else{
					_$lightbox.removeClass('showing');
				}
			});
		});
	};
	var _animateMenu = function _animateMenu(_scrollTo, _posY, _goTo, _toGo){
		if(_scrollTo != '#top'){
			_goTo = _posY.top - $('#header').height();
			_toGo = _posY.top;
		} else{
			// _goTo = 0;
			_toGo = 0;
		}
		if(!_passEvent){
			_landingEffect();
			_scrollAnimate(_goTo, 700, 60);
		} else{
			_getPos(0);
			_scrollAnimate(_toGo, 0, 0);
		}
	};
	var _getPos = function _getPos(resize){
		if(resize = 1){
			_alreadyBottom = false;
		}
		_bottom = _$scroller.prop('scrollHeight') - _$scroller.height();
		var _tempLocate;
		for( i = 0 ; i < _$scrollObjs.length; i++){
			_tempLocate = _$scrollObjs.eq(i).position();
			_positions[i] = _tempLocate.top;
		}
	};
	var _spyEvent = function _spyEvent(){
		$(window).scroll(function(){
			if(!_alreadyBottom){
				_alreadyBottom = true;
			}
			_posY = $(window).scrollTop();
			if(_posY == 0){
				_addMenu(0);
			}
			if((_posY < _positions[1]) && (_posY > 0)){
				_addMenu(1);
			}
			if(_posY >= _positions[1]){
				_addMenu(2);
			}
			if(_posY >= _positions[2]){
				_addMenu(3);
			}
			if(_posY == _bottom){
				_addMenu(3);
			}
		});
	};
	var _addMenu = function _addMenu(number){
		_$menu.removeClass('selected');
		_$menu.eq(number).addClass('selected');
	};
	var _scrollAnimate = function _scrollAnimate(posY, theTime, extra){
		setTimeout(function(){
			_$scroller.animate({
				scrollTop: posY + extra
			}, 250);
		}, theTime)
	};
	var _landingEffect = function _landingEffect(){
		_passEvent = true;
		if(_notMobile){
			Ps.destroy(document.getElementById('scroller'));
		}
		_$header.removeClass('open');
		_toggleSmall();
		setTimeout(function(){
			_getPos(0);
			$('body').removeClass('no-scroll');
			_addMenu(1);
			if(_notMobile){
				Ps.initialize(document.getElementById('scroller'), {
					wheelSpeed: 1,
					wheelPropagation: true,
					swipePropagation: true,
					suppressScrollX: true
				});
			}
		}, 600);
	};
	var _scrollingstuff = function _scrollingstuff(){
		var posY = _$window.scrollTop();
		if(posY == 0){
			$('body').addClass('no-scroll');
			if(_notMobile){
				Ps.destroy(document.getElementById('scroller'));
			}
			_validator = false;
			_toggleSmall();
			setTimeout(function(){
				_passEvent = false;
			}, 600);
		}
	};
	var _toggleSmall = function _toggleSmall(){
		_$body.toggleClass('small');
		_$header.toggleClass('small');
	};
	var _swipeEvent = function _swipeEvent(el, callback){
		var touchsurface = el,
		    swipedir,
		    startX,
		    startY,
		    distX,
		    distY,
		    threshold = 100, //required min distance traveled to be considered swipe
		    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
		    allowedTime = 300, // maximum time allowed to travel that distance
		    elapsedTime,
		    startTime,
		    handleswipe = callback || function(swipedir){}
		  
		    touchsurface.addEventListener('touchstart', function(e){
		        var touchobj = e.changedTouches[0]
		        swipedir = 'none'
		        dist = 0
		        startX = touchobj.pageX
		        startY = touchobj.pageY
		        startTime = new Date().getTime() // record time when finger first makes contact with surface
		        // if(!_passEvent){
		        // 	e.preventDefault();
		        // }
		    }, false)
		  
		    touchsurface.addEventListener('touchmove', function(e){
		        // if(!_passEvent){
		        // 	e.preventDefault();
		        // }
		    }, false)
		  
		    touchsurface.addEventListener('touchend', function(e){
		        var touchobj = e.changedTouches[0]
		        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
		        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
		        elapsedTime = new Date().getTime() - startTime // get time elapsed
		        if (elapsedTime <= allowedTime){ // first condition for awipe met
		            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
		                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
		            }
		            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
		                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
		            }
		        }
		        handleswipe(swipedir)
		        // if(!_passEvent){
		        // 	e.preventDefault();
		        // }
		    }, false)
	};
	return{
		init : function init(){
			_initVars();
			_isMobile();
			$(window).resize(function(){
				_getPos(1);
			});
			_initEvents();
			_spyEvent();
		}
	}
})();
PORTA.contacto = (function(){
	var _processForm = function _processForm(){
		$('input').removeClass('animated shake error');
		$('textarea').removeClass('animated shake error');
		var name = $('input#name').val();
		if(name == ""){
			$('input#name').addClass('animated shake error');
			return false;
		}
		var email = $('input#email').val();
		if(email == ""){
			$('input#email').addClass('animated shake error');
			return false;
		}
		isEmail(email);
		var tel = $('input#tel').val();
		if(tel.length < 10){
			$('input#tel').addClass('animated shake error');
			return false;
		}
		var asunto = $('input#asunto').val();
		var contenido = $('textarea#contenido').val();
		if(contenido.length < 10){
			$('textarea#contenido').addClass('animated shake error');
			return false;
		}
		//mensaje
		var mensaje = "Nombre: " + name + "\n Email: " + email + "\n Tel: " + tel + "\n Asunto: " + asunto + "\n Mensaje: " + contenido;
		//AJAX
		$.ajax({
			type: "POST",
			url: "man/process.php",
			data: {mensaje:mensaje},
			success: function(){
				PORTA.alert.success();
				// ga('send', 'click', 'form-send');
				// ga('send', 'event', 'rMenu', 'click', 'close open menu');
			},
			error: function(){
				PORTA.alert.error();
			}
		});
		return false;
	};
	var isEmail = function isEmail(email){
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		if(!pattern.test(email)){
			$('input#email').addClass('animated shake error');
			return false;
		}
	};
	return{
		init : function init(){
			_processForm();
		}
	}
})();
PORTA.alert = (function(){
	var alert = function alert(validate){
		var titulo,
			clase,
			mensaje;
		if(validate == 1){
			titulo = '¡Gracias!';
			clase = 'success';
			mensaje = 'En breve me pondré en contacto contigo.'
		} 
		if(validate == 0) {
			titulo = '¡Error!';
			clase = 'error';
			mensaje = 'Parece que hubo un error :(, intenta de nuevo.'
		}
		$('body').append(
			"<div class='rogano-alert faded'>"
			+ "<div class='alert-bg close-it'></div>"
			+ "<div class='alert-content " + clase + "'>"
			+ "<p class='content-title " + clase + "'>" + titulo + "</p>"
			+ "<p class='content-msg'>" + mensaje + "</p>"
			+ "<div class='close-btn close-it " + clase + "'>Cerrar</div>"
			+ "</div>"
			+ "</div>"
		);
		setTimeout(function(){
			$('.rogano-alert').removeClass('faded');
		},250);
		$('.close-it').click(function(){
			$('.rogano-alert').addClass('faded');
			setTimeout(function(){
				$('.rogano-alert').remove();
			}, 1000);
		});
	};
	return{
		success : function success(){
			alert(1);
		},
		error : function error(){
			alert(0);
		}
	}
})();