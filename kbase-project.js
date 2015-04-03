window.addEventListener('load', function() {
	var jq = document.createElement('script');
	jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
	document.querySelector('head').appendChild(jq);

	jq.onload = proceed;
}, false);

function proceed() {
	getServerInfo();
	addLinksToArrays();
	getLinks();
	floatMenu.id = "floatMenu";

	for (var i = 0; i < 6; i++) {
		outterDiv[i] = document.createElement('div');

		menuItem[i] = document.createElement('div');
		menuItem[i].className = 'menuItem';
		menuItem[i].innerHTML = categoryNames[i];

		subMenu[i] = document.createElement('div');
		subMenu[i].className = 'subMenu';

		var a;
		var li;
		var link = '';
		var linkText = '';
		switch (i) {
			case 0:
				linkText = dataArray[0];

				var versionNumber = linkText.split(" ");
				versionNumber = versionNumber[0];
				dataArray[0] = versionNumber;

				link = lrVersionMap[versionNumber][0];

				a = document.createElement('a');
				a.href = link;
				a.text = linkText;
				a.target = '_blank';
				li = document.createElement('li');
				li.appendChild(a);
				subMenu[i].appendChild(li);
				break;
			case 1:
				for (var j = 0; j < supportPolicyLinks.length; j++) {
					a = document.createElement('a');
					a.href = supportPolicyLinks[j].link;
					a.text = supportPolicyLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);
				}
				break;
			case 2:
				for (var j = 0; j < installationLinks.length; j++) {
					a = document.createElement('a');
					a.href = installationLinks[j].link;
					a.text = installationLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);
				}
				break;
			case 3:
				for (var j = 0; j < troubleshootingLinks.length; j++) {
					a = document.createElement('a');
					a.href = troubleshootingLinks[j].link;
					a.text = troubleshootingLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);
				}
				break;
			case 4:
				for (var j = 0; j < supportForumsLinks.length; j++) {
					a = document.createElement('a');
					a.href = supportForumsLinks[j].link;
					a.text = supportForumsLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);
				}
				break;
			case 5:
				for (var j = 0; j < hotFixLinks.length; j++) {
					a = document.createElement('a');
					a.href = hotFixLinks[j].link;
					a.text = hotFixLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);
				}
				break;
		}

		outterDiv[i].appendChild(menuItem[i]);
		outterDiv[i].appendChild(subMenu[i]);
	}

	var listDiv = document.createElement('div');

	listDiv.className = "menuList";

	for (i = 0; i < 6; i++) {
		listDiv.appendChild(outterDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.className = 'menuHeader';
	h3.innerHTML = "Quick Links";

	floatMenu.appendChild(h3);

	floatMenu.appendChild(listDiv);

	document.body.appendChild(floatMenu);

	/*jshint multistr: true */
	var css = "#floatMenu {\
			position:fixed;\
			top:15%;\
			right:0px;\
			width:200px;\
			background-color:#FFF;\
			margin:0;\
			padding:0;\
			font-size:15px;\
			border-left:1px solid #ddd;\
			border-right:1px solid #ddd;\
		}\
		#floatMenu h3 {\
			color:black;\
			font-weight:bold;\
			padding:3px;\
			margin:0;\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:18px;\
		}\
		#floatMenu div {\
			margin:0;\
			padding:0;\
			list-style:none;\
		}\
		.menuItem {\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:14px;\
			font-weight:bold;\
			padding-left:10px;\
		}\
		.subMenu {\
			border-bottom:1px solid #ddd;\
		}\
		#floatMenu ul div a {\
			text-decoration:none;\
		}";

	var head = document.head;
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);

	jQuery(function() {
		jQuery('.menuItem').click(function() {
			$menuItem = jQuery(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});

	jQuery(function() {
		jQuery('.menuHeader').click(function() {
			jQuery('.subMenu').hide();
			jQuery('.menuList').slideToggle(500);
		});
	});

	function getServerInfo(serverInfo, typeNode) {
		AUI().use('aui-base', 'node',
			function(A) {
				function serverType(serverInfo) {
					var version = '';
					var serverTypeNode = typeNode;
					serverTypeNode.each(
						function() {
							var innerHTML = this.get('textContent');
							if (innerHTML.toUpperCase().indexOf(serverInfo) > -1) {
								version = innerHTML;
							}
						}
					);

					if (version) {
						var begin = version.toUpperCase().indexOf(serverInfo) + serverInfo.length;
						var end = version.indexOf('  ');
						if ((serverInfo == opSystemText) || (serverInfo == browserText) || (serverInfo == javaText)) {
							end = version.indexOf('  ') + begin;
						} else if (serverInfo == componentText) {
							end = version.indexOf('   ');
						}
						version = version.substring(begin, end);
						return version.toString().trim();
					}

					return serverType;
				}
				var typeNode = A.all(".content-column-content");
				dataArray[dataArray.length] = serverType(lrVersionText, typeNode);
				dataArray[dataArray.length] = serverType(opSystemText, typeNode);
				dataArray[dataArray.length] = serverType(applicationServerText, typeNode);
				dataArray[dataArray.length] = serverType(dataBaseText, typeNode);
				dataArray[dataArray.length] = serverType(browserText, typeNode);
				dataArray[dataArray.length] = serverType(javaText, typeNode);
				typeNode = A.all(".callout-content");
				dataArray[dataArray.length] = serverType(componentText, typeNode);
				dataArray[dataArray.length] = getCustomerId();
			}
		);
	}

	function getCustomerId() {
		var customerId = document.getElementsByTagName("title")[0].innerHTML;

		var tempVar = customerId.split("[");
		customerId = tempVar[1].split("-");

		return customerId[0];
	}

	function getHotFixLinks() {

		var customerId = dataArray[7];
		var version = dataArray[0];

		if ((version.indexOf("6.1 GA3") > -1) || (version.indexOf("6.2") > -1)) {
			console.log(version);
			console.log(customerId);
			console.log("patcher 2.0 logic");

			return;
		}

		if (version.indexOf("6.1") > -1) {

			console.log(version);
			console.log(customerId);
			console.log("patcher  tool 1.0 logic")

			//findBy_customerId;
			//find from tool

			return;
		}

	}

	function getLinks() {
		var appServer = dataArray[2].split(" ")[0],
			browser = dataArray[4].split(" ")[0],
			component = dataArray[6],
			db = dataArray[3].split(" ")[0],
			java = dataArray[5].split(" ")[0],
			os = dataArray[1].split(" ")[0];


		for (var i = 0; i < arrayOfMaps.length; i++) {
			var map = arrayOfMaps[i];
			var install = [];
			var supportPolicy = [];
			var troubleShoot = [];
			var supportForums = [];
			var hotFixes = [];

			switch (i) {
				case 0:
					if (appServer in map) {
						if (map[appServer][0] !== null) {
							if (appServer == 'Websphere') {
								if (dataArray[2].indexOf('8.5')) {
									install.link = map[appServer][0][0];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								} else {
									install.link = map[appServer][0][1];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								}
							} else if (appServer == 'Weblogic') {
								if (dataArray[2].indexOf('12')) {
									install.link = map[appServer][0][0];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								} else {
									install.link = map[appServer][0][1];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								}
							} else {
								install.link = map[appServer][0];
								install.name = dataArray[2];
								installationLinks[installationLinks.length] = install;
							}
						}
						if (map[appServer][1] !== null) {
							supportPolicy.link = map[appServer][1];
							supportPolicy.name = dataArray[2];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[appServer][2] !== null) {
							troubleShoot.link = map[appServer][2];
							troubleShoot.name = dataArray[2];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 1:
					if (browser in map) {
						if (map[browser][0] !== null) {
							supportPolicy.link = map[browser][0];
							supportPolicy.name = dataArray[4];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[browser][1] !== null) {
							troubleShoot.link = map[browser][1];
							troubleShoot.name = dataArray[4];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 2:
					if (component in map) {
						if (map[component][0] !== null) {
							install.link = map[component][0];
							install.name = dataArray[6];
							installationLinks[installationLinks.length] = install;
						}
						if (map[component][1] !== null) {
							supportPolicy.link = map[component][1];
							supportPolicy.name = dataArray[6];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[component][2] !== null) {
							troubleShoot.link = map[component][2];
							troubleShoot.name = dataArray[6];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
						if (map[component][3] !== null) {
							supportForums.link = map[component][3];
							supportForums.name = dataArray[6];
							supportForums.noLink = false;
							supportForumsLinks[supportForumsLinks.length] = supportForums;
						} else {
							supportForums.link = 'https://in.liferay.com/web/support/forums/-/message_boards/category/922867';
							supportForums.name = 'Support Forums';
							supportForumsLinks[supportForumsLinks.length] = supportForums;
						}
					}
					break;
				case 3:
					if (db in map) {
						if (map[db][0] !== null) {
							supportPolicy.link = map[db][0];
							supportPolicy.name = dataArray[3];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[db][1] !== null) {
							troubleShoot.link = map[db][1];
							troubleShoot.name = dataArray[3];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 4:
					if (java in map) {
						if (map[java][0] !== null) {
							supportPolicy.link = map[java][1];
							supportPolicy.name = dataArray[5];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[java][1] !== null) {
							troubleShoot.link = map[java][1];
							troubleShoot.name = dataArray[5];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 5:
					if (os in map) {
						if (map[os][0] !== null) {
							supportPolicy.link = map[os][0];
							supportPolicy.name = dataArray[1];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[os][1] !== null) {
							troubleShoot.link = map[os][1];
							troubleShoot.name = dataArray[1];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 6:
					getHotFixLinks();

					break;
			}
		}
	}
}

function addLinksToArrays() {
	appServerMap['Websphere'] = [
		['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-websphere-8-5', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-websphere-8-0'], 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31534', null
	];
	appServerMap['Tomcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-tomcat-7', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31522', null];
	appServerMap['Weblogic'] = [
		['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-oracle-weblogic-12c-12-1-2-and-h', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-oracle-weblogic-10-3', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-weblogic-10'], null, null
	];
	appServerMap['JBoss'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-jboss-7-1', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31960', null];
	appServerMap['Tcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-mulesoft-tcat', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32064', null];
	appServerMap['Glassfish'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-glassfish-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31320', null];
	appServerMap['Resin'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31988', null];
	appServerMap['tcServer'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/13554', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32076', null];

	browserMap['Firefox'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32010', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Chrome'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31732', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Internet'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31762', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Safari'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32039', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];

	componentMap['Account Administration'] = [null, null, null, null];
	componentMap['Authentication'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483783', 'https://in.liferay.com/web/support/forums/-/message_boards/category/4697603'];
	componentMap['Calendar'] = [null, null, null, null];
	componentMap['Clustering'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483839', null];
	componentMap['Collaboration Suite'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/collaboration-suite', null, null, null];
	componentMap['Developer Studio'] = [null, null, null, 'https://in.liferay.com/web/support/forums/-/message_boards/category/4697596'];
	componentMap['Document Library'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/document-management', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483903', 'https://in.liferay.com/web/support/forums/-/message_boards/category/4534050'];
	componentMap['LAR/Staging'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30484028', 'https://in.liferay.com/web/support/forums/-/message_boards/category/4642154'];
	componentMap['License'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616', null, 'https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/36675767', null];
	componentMap['License/Account Setup'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616', null, 'https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/36675767', null];
	componentMap['Liferay API'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30484149', null];
	componentMap['Liferay Faces'] = ['https://www.liferay.com/community/liferay-projects/liferay-faces/documentation', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27733288', null];
	componentMap['Liferay Mobile SDK'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/mobile', null, null, null];
	componentMap['Liferay Sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/managing-files-with-liferay-sync-3-0-beta', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27528001', null];
	componentMap['Patch Management'] = ['https://www.liferay.com/group/customer/products/portal/patching', null, null, null];
	componentMap['Portal Administration'] = [null, null, null, 'https://in.liferay.com/web/support/forums/-/message_boards/category/4772239'];
	componentMap['Portal Deployment'] = ['https://dev.liferay.com/discover/deployment', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485351', null];
	componentMap['Search/Indexing'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485451', null];
	componentMap['Security'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485588', null];
	componentMap['UI'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485627', 'https://in.liferay.com/web/support/forums/-/message_boards/category/4534053'];
	componentMap['Upgrade'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485671', 'https://in.liferay.com/web/support/forums/-/message_boards/category/4698362'];
	componentMap['Web Content Management'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/web-content-management', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485750', 'https://in.liferay.com/web/support/forums/-/message_boards/category/4697774'];
	componentMap['Workflows/Forms'] = [null, null, null, null];

	databaseMap['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31478', null];
	databaseMap['Mysql'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470', null];
	databaseMap['DB2'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31688', null];
	databaseMap['PostgreSQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31644', null];
	databaseMap['Sybase'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31656', null];
	databaseMap['SQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31668', null];

	hotFixMap['hotfix'] = [null, null];

	javaMap['IBM JDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31918', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/24963'];
	javaMap['Oracle JRockit'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31996', null];
	javaMap['Oracle JDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31968', null];
	javaMap['Sun JDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31945', null];

	lrVersionMap['6.2'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.2+EE+Compatibility+Matrix.pdf/3b3fd878-c954-4acc-bd5f-19fb7eb78210'];
	lrVersionMap['6.1'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.1+EE+Compatibility+Matrix.pdf/fb724548-0d8d-408f-ad01-5acd862c038a'];
	lrVersionMap['6.0'] = ['https://www.liferay.com/documents/3133562/8435741/Compatibility+Matrix+v6.0.pdf/b58f3e64-30d8-400a-aba3-71c16e439fc9?'];
	lrVersionMap['5.2'] = ['https://www.liferay.com/documents/3133562/8435737/Compatibility+Matrix+v5.2.pdf/4a81c299-132c-488d-b10e-b7546891a1d2?'];
	lrVersionMap['5.1'] = ['https://www.liferay.com/documents/3133562/8435733/Support+Matrix+v5.1.pdf/91f9a892-6b3b-4ab2-abdc-14ceb1aceb1f'];

	osMap['Mac'] = [null, null];
	osMap['Windows'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32055', null];
	osMap['Red'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31911', null];
	osMap['AIX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31895', null];
	osMap['Debian'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31812', null];
	osMap['openSUSE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31840', null];
	osMap['Ubuntu'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32047', null];
	osMap['CentOS'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31902', null];
	osMap['Solaris'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31980', null];
	osMap['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31847', null];
	osMap['Other'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32112', null];
	osMap['HP-UX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31820', null];
	osMap['General'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318', null];
	osMap['Linux'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318', null];
}

var appServerMap = new Map(),
	browserMap = new Map(),
	componentMap = new Map(),
	databaseMap = new Map(),
	javaMap = new Map(),
	lrVersionMap = new Map(),
	osMap = new Map(),
	hotFixMap = new Map();

var arrayOfMaps = [appServerMap, browserMap, componentMap, databaseMap, javaMap, osMap, hotFixMap];

var supportPolicyLinks = [],
	installationLinks = [],
	troubleshootingLinks = [],
	supportForumsLinks = [],
	hotFixLinks = [];

var applicationServerText = "APPLICATION SERVER: ";
var componentText = "COMPONENT: ";
var dataBaseText = "DATABASE: ";
var lrVersionText = "LIFERAY VERSION: ";
var opSystemText = "OPERATING SYSTEM:  ";
var browserText = "PRIMARY BROWSER:  ";
var javaText = "JAVA VIRTUAL MACHINE: ";

var dataArray = [];

var floatMenu = document.createElement('div');
var outterDiv = [];
var menuItem = [];
var subMenu = [];
var categoryNames = [
	"Compatibiltiy Matrix",
	"Support Policies",
	"Installation",
	"Troubleshooting",
	"Product Support Forums",
	"Latest Customer Fixes"

];