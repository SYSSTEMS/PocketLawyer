APP={
    query:'',
    item:[],
    extends:[]
};

function init() {
    if(location.hash!=''){
        location.replace(location.href.split(location.hash)[0]);
    }
    get('search').onkeyup = function (e) {
        e = e || window.event;
        //if (e.keyCode === 13) {
            search(this.value,true);
            clean();
        //}
    }
}

function search(query,ext){
    query=(query?query:APP.query); //query=query||APP.query;
    APP.query=query;
    if(ext){}else{APP['extends']=[];}
    ext=APP['extends'];
    response=parse(query,ext);
    APP['item']=[];
    get('extends_list').innerHTML='';
    get('items_list').innerHTML='';
    if(response){
        if(response['extends']){
            APP['extends_source']='';
            for(i in response['extends']){
                extend=response['extends'][i];
                APP['extends_source']+=(APP['extends_source']==''?'':', ')+'<a href="#" onclick="pick_extend('+extend.id+')">'+extend.name+'</a>';
            }
            get('extends_list').innerHTML='Давайте уточним: '+APP['extends_source'];
            delete extend;
            delete APP['extends_source'];
        }
        if(response['items']){
            APP['item']=response['items'];
            APP['items_source']='';
            for(i in response['items']){
                item=response['items'][i];
                APP['items_source']+='<li><a href="#" onclick="view_item('+i+');$.mobile.navigate(\'#item\')"><h2>'+item.name+'</h2><p>'+item.description+'</p></a></li>';
            }
            get('items_list').innerHTML='<ul data-role="listview" data-inset="true">'+APP['items_source']+'</ul>';
            delete item;
            delete APP['items_source'];
        }
    }else{
        get('items_list').innerHTML='<p>'+(APP['parse_error']?APP['parse_error']:'Нет результатов')+'</p>';
        delete APP['parse_error'];
    }
    $('#wrapper').enhanceWithin();
}

function pick_extend(id) {
    APP['extends'][APP.extends.length] = id;
    search(false, true);
}

function view_item(id){
    item=APP['item'][id];
    APP['view_source']=item.source;
    get('title').innerHTML=item.name;
    get('view').innerHTML=APP['view_source'];
    delete item;
    delete APP['view_source'];
}

function clean() {
    if (get('search').value == '') {
        APP = {
            query: '',
            item: [],
            extends: []
        };
        get('extends_list').innerHTML = '';
        get('items_list').innerHTML = '';
    }
}