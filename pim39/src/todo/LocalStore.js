/**
 * Container class for static localStorage helpers
 */
class LocalStore {
    /**
     * Fetch Todo list from localStorage
     * @returns {Array} List of Todo items
     */
    static getTODOs() {
        LocalStore.highestID = 0;
        let storedTodo = localStorage.getItem("TODOs");
        if(storedTodo){
            storedTodo = JSON.parse(storedTodo);
            // TODO convert to Date objects first?
            storedTodo.sort(function (a, b){
                return  new Date(a.end) - new Date(b.end);
            });
            let highestID = Math.max.apply(Math, storedTodo.map(function(o){return o.id}));
            console.log(highestID);
            if (highestID > 0) LocalStore.highestID = highestID;
            console.log(LocalStore.highestID);
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
    }
}

export default LocalStore;
