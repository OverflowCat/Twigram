var keys = {
    'version': 0.1
    , 'tgbot': '114514:1919-810'
    , 'scriptURL': "https://script.google.com/macros/s/114514-1919810/exec" //u need to deploy first to get one
}
 
function setWebhook() {
    Logger.log(keys.tgbot);
    var whURL = "https://api.telegram.org/bot" + keys.tgbot + "/setwebhook?url=" + keys.scriptURL;
    var rtn = JSON.parse(UrlFetchApp.fetch(whURL));
    Logger.log(rtn);
}
 
//run this func to init
function setKeys() {
    var scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperties(keys);
    setWebhook();
}