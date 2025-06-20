javascript: ( function(){
    /*What you want to do goes here */
    alert(window.location);
})();

//For SmartObject execution:
javascript:(function(){  
    let urlParams = new URLSearchParams(window.location.hash);
    $(".lyt-explorer-maincontent").after('<div><a onclick="$(this).parent().remove()">close</a><br/><iframe src="'
     + window.location.origin +  '/Management/Runtime/Form.aspx?_ID=2ae83f85-6336-49f1-a9e5-fe78b220f6c4&smartobjectguid=' 
     + urlParams.get("guid") + '"  height="400px" width="100%"></iframe></div>' );

})();