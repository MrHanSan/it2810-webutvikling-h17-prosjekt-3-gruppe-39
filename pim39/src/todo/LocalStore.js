/**
 * Container class for static localStorage functions and helpers
 */
class LocalStore {
    constructor() {
        LocalStore.highestID = 0;
    }
    
    /**
     * Fetch Todo list from localStorage
     * @returns {Array} List of Todo items
     */
    static getTODOs() {
        let storedTodo = localStorage.getItem("TODOs");
        if(storedTodo){
            storedTodo = JSON.parse(storedTodo);
            // TODO convert to Date objects first?
            storedTodo.sort(function (a, b){
                return  new Date(a.date) - new Date(b.date);
            });
            LocalStore.highestID = Math.max.apply(Math, storedTodo.map(function(o){return o.id}));
        }else{
            storedTodo = [];
        }
        return storedTodo;
    }
    
    /**
     * Store Todo list to localStorage
     * @param {Array} storedTodo List of Todo items
     */
    static storeTODOs(storedTodo) {
        localStorage.setItem("TODOs", JSON.stringify(storedTodo));
        alert('store');
    }
    
    
    
    // called from the delete buttons on the todo events. Removes themself from the state of the todoapp, which then saves the delete in localstorage, and updates the visible list because of react sauce.
    deleteTodo(id) {
        // TODO here? delete this
        var todos = this.state.items.slice();
        for(var i = 0; i < todos.length; i++){
            if(todos[i].id === id){
                todos.splice(i, 1);
                break;
            }
        }
        this.setState({ items: todos });
        localStorage.setItem("TODOs", JSON.stringify(todos));
    }
    
    // TODO remove?
    static newTODO(){
        var counter = 0;
        var todoCollection = []

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
}

export default LocalStore;
