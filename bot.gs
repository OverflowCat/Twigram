T1='1145141919810'
T2='1145141919810'
T3='1145141919810-1145141919810'
T4='1145141919810'
T3='1145141919810-1145141919810'
T4='1145141919810'
function tweet(t) {
  const auth_info = {
  "c_key": T1,
  "c_sec": T2,
  "a_tok": T3,
  "a_sec": T4,
  } 
  var rtn = Twitter.tweet(auth_info, t)
  return rtn; 
}

//env properties
var scriptProperties = PropertiesService.getScriptProperties();
var keys = scriptProperties.getKeys();
 

function doPost(e){
  var estringa = JSON.parse(e.postData.contents);
  var payload = identificar(estringa);
  var data = {
    "method": "post",
    "payload": payload
  }
    var rtn = JSON.parse(UrlFetchApp.fetch("https://api.telegram.org/bot" + keys.tgbot + "/", data));
 
  //debug
  var payload = {
    "method": "sendMessage",
    "chat_ID": "405582582",
    "text": "DEBUG" // + e.postData.contents.toString()
  }

  }

// Deal with /commands
function slashcmd(cmd) {
        var t_ = e.message.text + " ";
        if (cmd.charAt(0) != "/") cmd = "/" + cmd;
        if (t_.substr(0, cmd.length + 1) == cmd + " ") {
          return (t_.substring(cmd.length + 1, t_.length - 1));
        }
        return false;
      }


function identificar(e){
  


  if (e.message.text){
    if (e.message.text != "/start"){
      var rtn = tweet(e.message.text)
      var mensaje = {
        "method": "sendMessage",
        "chat_id": e.message.chat.id,
        "text": rtn,
    }
    

    }
   
  }
  else if (e.message.sticker){
    var mensaje = {
      "method": "sendSticker",
      "chat_id": e.message.chat.id,
      "sticker": e.message.sticker.file_id
    }
   }
  else if (e.message.photo){
    var array = e.message.photo;
    var text = array[1];
    var mensaje = {
      "method": "sendPhoto",
      "chat_id": e.message.chat.id,
      "photo": text.file_id
    }
   }
    else {
    var mensaje = {
      "method": "sendMessage",
      "chat_id": e.message.chat.id,
      "text": "Try other stuff"
    }
   }
  return mensaje
}