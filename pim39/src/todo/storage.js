var counter = 0;
var todoCollection = []

function newTODO(){
    
    
    var title = "AI øving";
    var task = "levere øving 2 i AI"
    var date = Date(2017, 8, 29);
    var test = {
        "title": title,
        "task": task,
        "date": date
    };
    
    
    todoCollection[counter] = test;
    counter += 1;
    localStorage.setItem("TODOs", JSON.stringify(todoCollection));
    
    
}

function getTODOs(){
    return(JSON.parse(localStorage.getItem("TODOs")));
}