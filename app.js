const fs = require('fs');
const http = require('http');


const server = http.createServer((req, res) => {

    const articles = [
        {id: 1, title: 'Article #1'},
        {id: 2, title: 'Article #2'},
        {id: 3, title: 'Article #3'},
    ];

    
    let id = req.url.split('/');
    
    if(req.url === '/'){
        res.end('home page');
    } else if(req.url === '/category'){
        res.end('Category page');
    } else if(req.url === '/category/product'){
        res.end('Product page');
    } else if(req.url === '/picture/cat.jpg'){
        let pic = fs.readFileSync('./images/cat.jpg');
        res.end(pic);
    } else if(req.url === `/article/${id[2]}`){
        let findArticle = false;
        for(let i = 0; i < articles.length; i++){
            if(articles[i].id === Number(id[2])){
                res.end(articles[i].title);
                findArticle = true;
            }
        }
        if(!findArticle){
            res.end('404 page');
        }
        res.end();
        
    } else{
        res.end('404 page');
    }
    
});

server.listen(3000);
