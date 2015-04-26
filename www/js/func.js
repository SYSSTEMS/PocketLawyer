function Ajax(method,url,callback){
    var xmlhttp;if (window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            response=xmlhttp.responseText;
            callback(response);
        }else{
            callback();
        }
    }
    xmlhttp.open(method,url,true);xmlhttp.send();}

function get(objID) {
    if (document.getElementById) {return document.getElementById(objID);}
    else if (document.all) {return document.all[objID];}
    else if (document.layers) {return document.layers[objID];}
}