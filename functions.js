CCPCover.prototype.getFrameDocument = function () { return document; };
CCPPekaoInstance.cover.enabled = true
CCPPekaoInstance.cover.progressGif = "progress.gif";
CCPPekaoInstance.cover.progressDescription = "CCP robi brrrrr... ( ͡° ͜ʖ ͡°)"
CCPPekaoInstance.cover.progressDescriptionColor = "black"

var debugTextAreaName = null;

var g_keyIdsArray = [];

function debugResult(_result) {
    var textArea = $(debugTextAreaName),
        result = _result.toString();

	textArea.val(textArea.val() + result + "\n");

	var myTextarea = document.getElementById('textareaResult');
	myTextarea.scrollTop = myTextarea.scrollHeight;

	var CCPResponseFilePath = $('textarea#textareaWithCCPResponseFilePath').val();
	if (CCPResponseFilePath !== "") {
		CCPTestResultWriterInstance.writeResultToFile(result, CCPResponseFilePath, debugResult2);
	}
}//debugResult

function debugResult2( result )
{
	result = result.data;
    var textArea = $(debugTextAreaName);

	textArea.val(textArea.val() + result + "\n");

	var myTextarea = document.getElementById('textareaResult');
	myTextarea.scrollTop = myTextarea.scrollHeight;
	if(result.split('|')[0] != 0)
	{
		myTextarea.style.backgroundColor = "red";
	}
}//debugResult2

function setDebugTextAreaName(textArea)
{
    if(textArea.charAt(0) != '#')
    {
        //console.log( "textArea object identifier must start with #" );
        return;
    }//if
    debugTextAreaName = textArea;
}//setDebugTextAreaName

function clearDebug()
{
    if(debugTextAreaName != null)
    {
        $(debugTextAreaName).val("");
    }////if
}//clearDebug

setDebugTextAreaName("#textareaResult");

function funCallbackTest(result)
{
    if(debugTextAreaName != null)
    {
        debugResult(result);
        //console.log(result);
    }//if
}

function funGenKeyCallbackTest(result)
{
    funCallbackTest(result);

    var values = result.split("|");
    if (values.length < 1) {
        return ;
    }

    if (values[0] === "0" && values.length === 6)
    {
        var keyId = guidGenerator();
        var keyName = values[1];
        var keyFingerprint = values[5];
        var keyLocation = values[2];
        var callback = function(keyId) {
            return function(result) {
                funSetKeyCallbackTest(result, keyId);
            };
        }(keyId);
        CCPPekaoInstance.setKey(keyId, keyName, keyFingerprint, keyLocation, callback);
    }
}

function funSetKeyCallbackTest(result, keyId)
{
    funCallbackTest(result);

    var values = result.split("|");
    if (values.length < 1) {
        return ;
    }

    if (values[0] === "0")
    {
        g_keyIdsArray.push(keyId);
		//set session params at CCPFunctions
		var i;
		for(i=0; i<CCPFunctions.length; i++)
		{
			if(CCPFunctions[i].name == "decryptRand")
			{
				if(CCPFunctions[i].params[0].sampleValue == "||")
				{
					CCPFunctions[i].params[0].sampleValue = "|" + keyId + "|";
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
				else
				{
					CCPFunctions[i].params[0].sampleValue += keyId + "|";
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
			}
			else if(CCPFunctions[i].name == "sign")
			{
				if(CCPFunctions[i].params[0].sampleValue == "||")
				{
					CCPFunctions[i].params[0].sampleValue = "|" + keyId + "|";
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
					CCPFunctions[i].params[1].sampleValue = keyId;
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[1].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[1].sampleValue);
				}
				else
				{
					CCPFunctions[i].params[0].sampleValue += keyId + "|";
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
			}
			else if(CCPFunctions[i].name == "encryptRand")
			{
				if(CCPFunctions[i].params[0].sampleValue == "||")
				{
					CCPFunctions[i].params[0].sampleValue = "|" + keyId + "|";
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
					CCPFunctions[i].params[1].sampleValue = keyId;
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[1].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[1].sampleValue);
				}
				else
				{
					CCPFunctions[i].params[0].sampleValue += keyId + "|";
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
			}
			else if(CCPFunctions[i].name == "removeKey")
			{
				if(CCPFunctions[i].params[0].sampleValue == "")
				{
					CCPFunctions[i].params[0].sampleValue = keyId;
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
			}
			else if(CCPFunctions[i].name == "setKeyLocation")
			{
				if(CCPFunctions[i].params[0].sampleValue == "")
				{
					CCPFunctions[i].params[0].sampleValue = keyId;
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
			}
			else if(CCPFunctions[i].name == "getKeyLocation")
			{
				if(CCPFunctions[i].params[0].sampleValue == "")
				{
					CCPFunctions[i].params[0].sampleValue = keyId;
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
			}
			else if(CCPFunctions[i].name == "changeKeyLocation")
			{
				if(CCPFunctions[i].params[0].sampleValue == "")
				{
					CCPFunctions[i].params[0].sampleValue = keyId;
					var textareaId = "textarea" + CCPFunctions[i].name.capitalizeFistLetter() + CCPFunctions[i].params[0].name.capitalizeFistLetter();
					$("#" + textareaId).text(CCPFunctions[i].params[0].sampleValue);
				}
			}
		}
    }
}

function CCPTestResultWriterModule()
{
    this.core = new CCPSignLibCore();
    this.core.dllModule = "testResultWriter";
}

function CCPTestResultWriter()
{
    this.testResultWriterModule = new CCPTestResultWriterModule();
    this.testResultWriterModuleCore = this.testResultWriterModule.core;
    this.cover = new CCPCover();

    this.resultDelimiter = "|";
    this.errorCodeColumn = 0;
    this.datailColumn = 2;
	this.errorCodeOK = 0;
}

CCPTestResultWriter.prototype.getInnerCallback = function(callBackFunction)
{
    return function(thiz) {
        return function(result) {
            if ( thiz.testResultWriterModuleCore.callbackList.length <= 1 )  //if this is last callback in queue
            {
                thiz.cover.uncoverPage();
            }
            callBackFunction(result);
        };
    }(this);
}

CCPTestResultWriter.prototype.writeResultToFile = function(result, filePathWithFileName, callBackFunction)
{
	this.cover.coverPage();
    var innerCallback = this.getInnerCallback(callBackFunction);
    var restParams = {};
    restParams.cmd = "WriteResultToFile";
    restParams.params = {};
	restParams.params.result = "" + result;
	restParams.params.filePathWithName = "" + filePathWithFileName;

    this.testResultWriterModuleCore.prepareAndCallAjax(restParams, innerCallback);
}

var CCPTestResultWriterInstance = new CCPTestResultWriter();

function currentUrlTestResultWriterDllPath()
{
	var splittedPathname = window.location.pathname.split('/');
	var pathnameWithoutLastElem = "";
	for(var i=0; i<splittedPathname.length-2; i++)
	{
		pathnameWithoutLastElem += splittedPathname[i];
		pathnameWithoutLastElem += "/";
	}
	return window.location.protocol + "//" + window.location.host + pathnameWithoutLastElem + "testResultWriter.dll";
}

String.prototype.capitalizeFistLetter = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function SampleIBANTable()
{
    return 'AD-24|AT-20|BE-16|BG-22|CH-21|CS-22|CS-22|CS-22|CY-28|CZ-24|DE-22|DK-18|EE-20|ES-24|FI-18|FO-18|FR-27|GB-22|GB-22|GB-22|GB-22|GI-23|GL-18|GR-27|HU-28|IE-22|IE-22|IS-26|IT-27|LI-21|LT-20|LU-20|LV-21|MC-27|ME-22|ME-22|ME-22|MT-31|NL-18|NO-15|PL-28|PT-25|RO-24|RS-22|RS-22|RS-22|SE-24|SI-19|SK-24|SM-27';
}

function keyIds()
{
    if (g_keyIdsArray.length < 1)
    {
        return "||";
    }

    var result = "";
    for (var i = 0; i < g_keyIdsArray.length; ++i)
    {
        result = result + "|" + g_keyIdsArray[i].toString();
    }
    result += "|";
    return result;
}

function defKey()
{
    if (g_keyIdsArray.length > 0) {
        return g_keyIdsArray[0];
    } else {
        return "";
    }
}

function notIbanAllowedChars()
{
    return ',.-';
}

function notIbanRemoveChars()
{
    return ' ';
}

function accountType()
{
    return '1';
}

function languagePL()
{
    return '0';
}

function languageEN()
{
    return '1';
}

function keyLength()
{
    return '|4|';
}

function sampleLogin()
{
	var login_RAW = "sample_login";
	var login_HEX = stringToHex(login_RAW);
	login_HEX = login_HEX.split(" ").join("");
	return login_HEX;
}

function sampleEncryptRandData()
{
	var randData_HEX = "6137363730323031362d30322d32392031363a30383a3330";
	return randData_HEX;
}

function sampleDecryptRandData()
{
	var randData_HEX = "0100000080A3304E73BBCD8C657898198B8CF14F4D127798A3C7ADB195A916B0D42374F39DBE24799D3705C3779A28485AD750A46CE6EFB12D907BDA2BA135947B7FBC2F7D955AD80C925D1155BA473E64CA49DE60C0B98C538DF23F111C353723080634B06553B3863E7DA15C5C70EC3BF038A92C8EB183B944E41F8F8915428A917D27780000000131";
	return randData_HEX;
}

function sampleName()
{
	var name_RAW = "Imie Nazwisko";
	var name_HEX = stringToHex(name_RAW);
	name_HEX = name_HEX.split(" ").join("");
	return name_HEX;
}

function getRandom()
{
	var random_RAW = "";
	for (var i = 0; i < 5; ++i)
	{
		random_RAW += String.fromCharCode(Math.floor(Math.random() * 256));
	}
	var random_HEX = stringToHex(random_RAW);
	random_HEX = random_HEX.split(" ").join("");
	return random_HEX;
}

function getLoginDate()
{
	var date = new Date();

	var day = "" + (date.getDate()+1);
	day = prependWithCharacter(day, '0', 2);

	var month = "" + date.getMonth();
	month = prependWithCharacter(month, '0', 2);

	var year = "" + date.getFullYear();

	var hours = "" + date.getHours();
	hours = prependWithCharacter(hours, '0', 2);

	var minutes = "" + date.getMinutes();
	minutes = prependWithCharacter(minutes, '0', 2);

	var dateString = year + "-" + month + "-" + day + " " + hours + ":" + minutes;
	return dateString;
}

function prependWithCharacter(str, character, size)
{
	var result = str;
	while (result.length < size)
	{
		result = character + result;
	}
	return result;
}

function stringToHex (tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c;

    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i);
        str += d2h(c) + ' ';
    }
    return str;
}

function d2h(d) {
    return d.toString(16);
}

function guidGenerator() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
/*
function guidGenerator() {
  var buf = new Uint16Array(8);
   window.crypto.getRandomValues(buf);
   var S4 = function(num) {
     var ret = num.toString(16);
     while(ret.length < 4){
       ret = "0"+ret;
     };
     return ret;
   };
  return (S4(buf[0])+S4(buf[1])+"-"+S4(buf[2])+"-4"+S4(buf[3]).substring(1)+"-y"+S4(buf[4]).substring(1)+"-"+S4(buf[5])+S4(buf[6])+S4(buf[7]));
}
*/

function getOsName(callBackFunction) {
    var navigator = window.navigator.appVersion;
    if (navigator.indexOf("Win") !== -1) {
        callBackFunction("windows");
        return;
    }
    if (navigator.indexOf("Mac") !== -1) {
        callBackFunction("macos");
        return;
    }
    if (navigator.indexOf("X11") !== -1) {
        callBackFunction("linux");
        return;
    }
    if (navigator.indexOf("Linux") !== -1) {
        callBackFunction("linux");
        return;
    }
    callBackFunction("unknown");
};

function funLocalNetworkPermissionCallback(result) {
    if(debugTextAreaName != null) {
        debugResult(JSON.stringify(result, null, 2));
    }
}