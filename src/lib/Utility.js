import 'whatwg-fetch';

export const API_BASE_URI = 'http://portal.edsring.com.au/app/test/ideas';

class Utility {
    constructor() {}
    
    /* 
        This function wrap the 'fetch' into another ES6 promise.
        This way, you can use any other 3rd party async library e.g. axios
        without change other components
    */
    getData(url) {
        const objPromise = new Promise((resolve, reject) => {
            fetch(url)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    resolve(json);
                }).catch(function(ex) {
                    reject(ex);
                });
        });
        
        return objPromise;
    }
    postData(url, jData) {
        const objPromise = new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: JSON.stringify(jData)
                
            }).then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((ex) => {
                reject(ex);
            });
        });
        
        return objPromise;
    }

    dateFormat(date) {
        let month = date.getMonth() + 1,
            day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate(),
            year = date.getFullYear(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
    
        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }
        
        const today = year + '-' + month + '-' + day + '-' + hours + ":" + minutes + ":" + seconds;

        return today;
    }
    sortData(arrData, sortBy) {
        arrData.sort((a, b) => {
            const tempA = a[sortBy].toLowerCase();
            const tempB = b[sortBy].toLowerCase();

            if (tempA < tempB) return -1;
            
            if (tempA > tempB) return 1;
            
            return 0;
        });

        return arrData;
    }

    /*
        Call RESTful APIs
    */
    getIdeas(callback) {
        this.getData(API_BASE_URI + '/list.php').then(jData => {
            callback(jData);
        }).catch(ex => {
            console.log('errors: ', ex);
        });
    }
    addNewIdea(callback) {
        this.getData(API_BASE_URI + '/new.php').then(jData => {
            callback(jData);
        }).catch(ex => {
            console.log('errors: ', ex);
        });
    }
    deleteIdea(ideaId, callback) {
        const idea = { id: ideaId };
        this.postData(API_BASE_URI + '/delete.php', idea).then(jData => {
            callback(idea);
        }).catch(ex => {
            console.log('errors: ', ex);
        });
    }
    updateIdea(idea, callback) {
        this.postData(API_BASE_URI + '/update.php', idea).then(jData => {
            callback(idea);
        }).catch(ex => {
            console.log('errors: ', ex);
        });
    }

}

export default new Utility();