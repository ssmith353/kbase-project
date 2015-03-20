var jq = document.createElement('script');
jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.querySelector('head').appendChild(jq);

jq.onload = proceed;

function proceed() {
	getServerInfo();
	addLinksToArrays();
	var dataBase = dataArray[3].split(' ')[0];
	dataArray[4] = dataArray[4].replace(' ', '+');
	var componentSearch = 'https://dev.liferay.com/discover/deployment?p_p_id=3&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_3_struts_action=%2Fsearch%2Fsearch&_3_redirect=%2Fdiscover%2Fdeployment%2F-%2Fknowledge_base&_3_keywords=' + dataArray[4] + '&_3_groupId=10184';
	floatMenu.id = "floatMenu";
	var i = 0;
	for (i = 0; i < 4; i++) {
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

				link = lrVersionMap[versionNumber][0];

				break;
			case 1:
				link = 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/';
				linkText = dataArray[3];
				switch (dataBase) {
					case "Oracle":
						link += '31478';
						break;
					case "MySQL":
						link += '31470';
						break;
					case "DB2":
						link += '31688';
						break;
					case "PostgreSQL":
						link += '31644';
						break;
					case "Sybase":
						link += '31656';
						break;
					case "SQL":
						link += '31668';
						break;
					case "Hypersonic":
						link += '15256';
						break;
				}
				break;
			case 2:
				link = getLink(dataArray[2]);
				linkText = dataArray[2];
				break;
			case 3:
				link = componentSearch;
				linkText = "Search KBASE: " + dataArray[4];
				break;
		}

		a = document.createElement('a');
		a.href = link;
		a.text = linkText;
		a.target = '_blank';
		li = document.createElement('li');
		li.appendChild(a);
		subMenu[i].appendChild(li);

		if ((categoryNames[i].indexOf('Installation') > -1)) {
			link = "https://www.liferay.com/community/wiki/-/wiki/Main/Database+Portal+Properties";
			a = document.createElement('a');
			a.href = link;
			a.text = "Database Properties";
			a.target = '_blank';
			li = document.createElement('li');
			li.appendChild(a);
			subMenu[i].appendChild(li);

			if (dataArray[3].indexOf("MySQL") > -1) {
				link = "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/12644";
				a = document.createElement('a');
				a.href = link;
				a.text = dataArray[3] + "Setup";
				a.target = '_blank';
				li = document.createElement('li');
				li.appendChild(a);
				subMenu[i].appendChild(li);
			}
		}

		outterDiv[i].appendChild(menuItem[i]);
		outterDiv[i].appendChild(subMenu[i]);
	}

	var listDiv = document.createElement('div');

	listDiv.className = "menuList";

	for (i = 0; i < 4; i++) {
		listDiv.appendChild(outterDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.className = 'menuHeader';
	h3.innerHTML = "Next Steps";

	floatMenu.appendChild(h3);

	floatMenu.appendChild(listDiv);

	document.body.appendChild(floatMenu);

	/*jshint multistr: true */
	var css = "#floatMenu {\
			position:absolute;\
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

	$(function() {
		function moveFloatMenu() {
			var menuOffset = menuYloc.top + $(this).scrollTop() + "px";
			$('#floatMenu').animate({
				top: menuOffset
			}, {
				duration: 500,
				queue: false
			});
		}

		var menuYloc = $('#floatMenu').offset();

		$(window).scroll(moveFloatMenu);

		moveFloatMenu();
	});

	$(function() {
		$('.subMenu').hide();
		$('.menuItem').click(function() {
			$menuItem = $(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});

	$(function() {
		$('.menuList').hide();
		$('.menuHeader').click(function() {
			$('.subMenu').hide();
			$('.menuList').slideToggle(500);
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
							var innerHTML = this.get('innerText');
							if (innerHTML.indexOf(serverInfo) > -1) {
								version = innerHTML;
							}
						}
					);

					if (version) {
						var begin = version.indexOf(serverInfo) + serverInfo.length;
						var end = version.indexOf('\n');

						if (serverInfo == opSystemText) {
							end = version.indexOf('\n') + begin;
						}
						version = version.substring(begin, end);

						return version;
					}

					return serverType;
				}
				var typeNode = A.all(".content-column-content");
				dataArray[dataArray.length] = serverType(lrVersionText, typeNode);
				dataArray[dataArray.length] = serverType(opSystemText, typeNode);
				dataArray[dataArray.length] = serverType(applicationServerText, typeNode);
				dataArray[dataArray.length] = serverType(dataBaseText, typeNode);
				typeNode = A.all(".callout-content");
				dataArray[dataArray.length] = serverType(componentText, typeNode);
			}
		);
	}

	function getLink(text) {
		var newIndex = 0;
		for (newIndex = 0; newIndex < arrayOfLinks.length; newIndex++) {
			var temp = text;
			temp = temp.split(" ");
			temp = temp[0];
			temp = temp.toLowerCase();

			if (arrayOfLinks[newIndex].indexOf(temp) > -1) {
				return arrayOfLinks[newIndex];
			}
		}
		return (arrayOfLinks[arrayOfLinks.length - 1]);
	}
}

function addLinksToArrays() {
	var kbBase = "https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-";
	arrayOfLinks[arrayOfLinks.length] = kbBase + "glassfish-4";
	arrayOfLinks[arrayOfLinks.length] = kbBase + "jboss-7-1";
	arrayOfLinks[arrayOfLinks.length] = kbBase + "tomcat-7";
	arrayOfLinks[arrayOfLinks.length] = kbBase + "oracle-weblogic-12c-12-1-2-and-h";
	arrayOfLinks[arrayOfLinks.length] = kbBase + "websphere-8-5";
	arrayOfLinks[arrayOfLinks.length] = "https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4";
	arrayOfLinks[arrayOfLinks.length] = "https://www.liferay.com/documentation/liferay-portal/6.1/user-guide/-/ai/lp-6-1-ugen11-installing-liferay-on-mule-tcat-0";
	arrayOfLinks[arrayOfLinks.length] = "https://www.liferay.com/community/wiki/-/wiki/Main/tcserver+Configuration+and+Tips";

	appServerMap['Websphere'] = [['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-websphere-8-5', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-websphere-8-0'], 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31534', null];
	appServerMap['Tomcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-tomcat-7', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31522', null];
	appServerMap['Weblogic'] = [['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-oracle-weblogic-12c-12-1-2-and-h', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-oracle-weblogic-10-3', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-weblogic-10'], null, null];
	appServerMap['Jboss'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-jboss-7-1', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31960', null];
	appServerMap['Tcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-mulesoft-tcat', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32064', null];
	appServerMap['Glassfish'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-glassfish-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31320', null];
	appServerMap['Resin'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31988', null];
	appServerMap['Tc Server'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/13554', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32076', null];

	browserMap['Firefox'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32010', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Chrome'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31732', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Internet Explorer'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31762', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Safari'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32039', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];

	componentMap['Account Administration'] = [null, null, null];
	componentMap['Authentication'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483783'];
	componentMap['Calendar'] = [null, null, null];
	componentMap['Clustering'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483839'];
	componentMap['Collaboration Suite'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/collaboration-suite', null, null];
	componentMap['Developer Studio'] = [null, null, null];
	componentMap['Document Library'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/document-management', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483903'];
	componentMap['LAR/Staging'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30484028'];
	componentMap['License'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616', null, 'https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/36675767'];
	componentMap['Liferay API'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30484149'];
	componentMap['Liferay Faces'] = ['https://www.liferay.com/community/liferay-projects/liferay-faces/documentation', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27733288'];
	componentMap['Liferay Mobile SDK'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/mobile', null, null];
	componentMap['Liferay Sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/managing-files-with-liferay-sync-3-0-beta', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27528001'];
	componentMap['Patch Management'] = ['https://www.liferay.com/group/customer/products/portal/patching', null, null];
	componentMap['Portal Administration'] = [null, null, null];
	componentMap['Portal Deployment'] = ['https://dev.liferay.com/discover/deployment', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485351'];
	componentMap['Search/Indexing'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485451'];
	componentMap['Security'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485588'];
	componentMap['UI'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485627'];
	componentMap['Upgrade'] = [null, null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485671'];
	componentMap['Web Content Management'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/web-content-management', null, 'https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485750'];
	componentMap['Workflows/Forms'] = [null, null, null];

	databaseMap['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31478', null];
	databaseMap['Mysql'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470', null];
	databaseMap['DB2'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31688', null];
	databaseMap['PostgreSQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31644', null];
	databaseMap['Sybase ASE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31656', null];
	databaseMap['SQL Server'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31668', null];

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
	osMap['Red Hat Enterprise'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31911', null];
	osMap['IBM AIX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31895', null];
	osMap['Debian'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31812', null];
	osMap['openSUSE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31840', null];
	osMap['Ubuntu'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32047', null];
	osMap['CentOS'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31902', null];
	osMap['Solaris'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31980', null];
	osMap['Oracle Linux'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31847', null];
	osMap['Other" OS'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32112', null];
	osMap['HP-UX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31820', null];
	osMap['General Linux'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318', null];
}

var arrayOfLinks = [];
var appServerMap = new Map(), browserMap = new Map(), componentMap = new Map(), databaseMap = new Map(), javaMap = new Map(), lrVersionMap = new Map(), osMap = new Map();
var applicationServerText = "APPLICATION SERVER: ";
var componentText = "COMPONENT: ";
var dataBaseText = "DATABASE: ";
var lrVersionText = "LIFERAY VERSION: ";
var opSystemText = "OPERATING SYSTEM: ";

var dataArray = [];

var floatMenu = document.createElement('div');
var outterDiv = [];
var menuItem = [];
var subMenu = [];
var categoryNames = [
	"Compatibiltiy Matrix",
	"Support Policies",
	"Installation",
	"Troubleshooting"
];