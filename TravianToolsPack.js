/*
 	0 : linkTravian
 	1 : TotalRCSpy
 	2 : WaveSynchro
 	3 : SumTroops
 	4 : removableTroopMove
 	5 : tradeRouteCreator
 	6 : autoReload
 	** x : Pillages **
*/

initialiseScript();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// create and add button for manage the tools
function initialiseScript() {
	var img = new Element('img', {
		alt: 'Travian Tools Pack Settings',
		src: 'https://addons.cdn.mozilla.net/user-media/addon_icons/0/748-64.png?modified=1402930904',
		styles: {
			'background-image': 'none',
			width: '16px',
			height: '16px'
		}
	});

	var a = new Element('a', {
		href: '#',
		onClick: 'showSettings();'
	});
	a.grab(img);

	var li = new Element('li');
	li.grab(a);

	$('outOfGame').setStyle('width', '180px');
	$('outOfGame').grab(li, 'top');

	hashMapDescription = {};
	hashMapDescription['linkTravian'] = 'Lien cliquable dans les messages';
	hashMapDescription['RCSpy'] = 'Amélioration des RC spy';
	hashMapDescription['waveSynchro'] = 'Outils de synchronisation des envois de troupes';
	hashMapDescription['sumTroops'] = 'Complément pour les batiments de production de troupes';
	hashMapDescription['removableTroopMove'] = 'Affichages des envois de troupes annulables';
	hashMapDescription['tradeRouteCreator'] = 'Outils de création des routes de commerce';
	hashMapDescription['autoReload'] = 'Désactiver rechargement automatique des pages';

	updateDataFromCookie();

	if (!nothingActive) {
		executeScript();
	}
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//execute script
function executeScript() {
	for (var key in hashMapActive) {
		if (hashMapActive[key] == 'true') {
			switch(key){
				case 'linkTravian':
					if (location.pathname == '/nachrichten.php' && (location.search.contains('?id=') || location.search.contains('&id='))) {
						$$('head').grab(new Element('script', {
							type: 'text/javascript',
						    src: 'http://travian.byethost24.com/TravianToolsPack/script/linkTravian.js'
						}));
					}
					break;
				case 'RCSpy':
					if (location.pathname == '/berichte.php' && (location.search.contains('?id=') || location.search.contains('&id='))) {
						$$('head').grab(new Element('script', {
							type: 'text/javascript',
						    src: 'http://travian.byethost24.com/TravianToolsPack/script/RCSpy.js'
						}));
					}
					break;
				case 'waveSynchro':
					if ((location.pathname == '/build.php' && location.search.contains('tt=2')) && location.search.contains('id=')) {
						$$('head').grab(new Element('script', {
							type: 'text/javascript',
						    src: 'http://travian.byethost24.com/TravianToolsPack/script/WaveSynchro.js'
						}));
					}
					break;
				case 'sumTroops':
					if (location.pathname == '/build.php') {
					var classBat = document.getElementById('build').className;
						if (classBat.indexOf('gid19') != -1 || classBat.indexOf('gid20') != -1 || classBat.indexOf('gid21') != -1 || classBat.indexOf('gid29') != -1 || classBat.indexOf('gid30') != -1) {
							$$('head').grab(new Element('script', {
								type: 'text/javascript',
							    src: 'http://travian.byethost24.com/TravianToolsPack/script/sumTroops.js'
							}));
						}
					}
					break;
				case 'removableTroopMove':
					if (location.pathname == '/build.php') {
						if ($('build').get('class').contains('gid16') && $$('.active[class~=container]').getChildren('.favorKey1')[0].length == 1) {
							$$('head').grab(new Element('script', {
								type: 'text/javascript',
							    src: 'http://travian.byethost24.com/TravianToolsPack/script/removableTroopMove.js'
							}));
						}
					}
					break;
				case 'tradeRouteCreator':
					if (location.pathname == '/build.php' && location.search.contains('option=1')) {
						if ($('build').get('class').contains('gid17') && $$('.active[class~=container]').getChildren('.favorKey0')[0].length == 1) {
							$$('head').grab(new Element('script', {
								type: 'text/javascript',
							    src: 'http://travian.byethost24.com/TravianToolsPack/script/tradeRouteCreator.js'
							}));
						}
					} else if (location.pathname == '/build.php') {
						if ($('build').get('class').contains('gid17') && $$('.active[class~=container]').getChildren('.favorKey0')[0].length == 1) {
							$$('head').grab(new Element('script', {
								type: 'text/javascript',
							    src: 'http://travian.byethost24.com/TravianToolsPack/script/tradeRouteManager.js'
							}));
						}
					}
					break;
				case 'autoReload':
					auto_reload = -1;
					break;
				default:
					break;
			}
		}
	}
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// create settings frame
function showSettings() {
	if ($('settingsFrame') != null) {
		updateDataFromCookie();
		for (var key in hashMapActive) {
			if (hashMapActive[key] == 'true') {
				$(key).checked=true;
			} else if (hashMapActive[key] == 'false') {
				$(key).checked=false;
			}
		}
		$('settingsFrame') .setStyle('display', 'block');
	} else {
		var divSettings = new Element('div', {
	  		id: 'settingsFrame',
		  	styles: {
		  		display: 'block',
		  		width: '500px',
		  		height: '500px',
		  		position: 'absolute',
		  		'background-color': 'white',
		  		top: '200px',
		  		left: '200px',
		  		'z-index': '10000'
		  	}
	  	});

		var title = new Element('h2', {
			html: 'Travian Tools Pack Settings',
			styles: {
				'text-align': 'center'
			}
		});
		divSettings.grab(title);

		var table = new Element('table', {
			cellpadding: '1',
			cellspacing: '1'
		})

		for (var key in hashMapActive) {
			var tempTR = new Element('tr');
			tempTR.grab(new Element('td', {html: hashMapDescription[key]}));
			var tempTD = new Element('td');
			if (hashMapActive[key] == 'true') {
				var checkBox = new Element('input', {
					type: 'checkbox',
					id: key,
					name: key,
					checked: 'true'
				});
			} else {
				var checkBox = new Element('input', {
					type: 'checkbox',
					id: key,
					name: key
				});
			}
			tempTD.grab(checkBox);
			tempTR.grab(tempTD);
			table.grab(tempTR);
		}

		divSettings.grab(table);

		var quitA = new Element('a', {
			href: '#',
			styles: {
				position: 'absolute',
				top: '0',
				right: '0'
			}
		});
		var quitImg = new Element('img', {
			src: 'img/x.gif',
			alt: 'Quitter sans sauvegarder',
			onClick: 'hideSettings();',
			styles: {
				background: 'url(http://gpack.travian.com/107/img/layout/icons/outOfGameIcons.png) 0 68px',
				width: '16px',
				height: '16px'
			}
		});
		quitA.grab(quitImg);
		divSettings.grab(quitA, 'top');

		var button = new Element('button', {
			'class': 'green',
			onClick: 'saveSettings();',
			value: 'Sauvegarder'
		});
		button.grab(new Element('div', {'class': 'button-container addHoverClick'}).adopt(new Element('div', {'class': 'button-background'}).grab(new Element('div', {'class': 'buttonStart'}).grab(new Element('div', {'class': 'buttonEnd'}).grab(new Element('div', {'class': 'buttonMiddle'})))), new Element('div', {'class': 'button-content', html: 'Sauvegarder'})));


		divSettings.grab(button);

	  	$('headerBar').grab(divSettings, 'after');
	}
}

// hide settings frame
function hideSettings() {
	$('settingsFrame') .setStyle('display', 'none');
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// Get cookie data
function updateDataFromCookie() {
	hashMapActive = {};
	nothingActive = true;

	var nameCookie = 'TravianToolsPack/';
	nameCookie += (document.location.href).split('/')[2];
	
	if (document.cookie.indexOf(nameCookie + '=') == -1) {
		for (var key in hashMapDescription) {
			hashMapActive[key] = false;
		}
	} else {
		var dataCookie = Cookie.read(nameCookie).split('/');
 		var i = 0;
		for (var key in hashMapDescription) {
			if (dataCookie[i] == 'true') {
				nothingActive = false;
			}
			hashMapActive[key] = dataCookie[i];
			i++;
		}
	}
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// save user choice in cookie
function saveSettings() {
	var dataCookie = '';
	for (var key in hashMapActive) {
		if ($(key).get('checked')) {
			dataCookie += 'true/';
		} else {
			dataCookie += 'false/';
		}
	}
	var nameCookie = 'TravianToolsPack/';
	nameCookie += (document.location.href).split('/')[2];

	Cookie.dispose(nameCookie);

	Cookie.write(nameCookie, dataCookie, {duration: 400});

	$('settingsFrame') .setStyle('display', 'none');
	window.location.reload();
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//