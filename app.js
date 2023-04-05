const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {

    const articles = [
        {id: 1, title: 'Article #1'},
        {id: 2, title: 'Article #2'},
        {id: 3, title: 'Article #3'},
    ];

    let partsUrl = req.url.split('/');
    
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('home page');
    } else if(req.url === '/category'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Category page');
    } else if(req.url === '/category/product'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Product page');
    } else if(req.url === `/${partsUrl[1]}/${partsUrl[2]}`){
        let ext = path.extname(`/${partsUrl[1]}/${partsUrl[2]}`);
        let dir = '';

        const render = () => {
            fs.access(`./${dir}${partsUrl[2]}`, fs.constants.F_OK, (err) => {
                if (err){
                    res.writeHead(404);
                    res.end('404 page');
                }else {
                    let data = fs.readFileSync(`./${dir}${partsUrl[2]}`);
                    res.end(data);
                }
            });
        };

        if(ext === '.css'){
            dir = 'styles/';
            render();
        } else if(ext === '.jpg' || ext === '.png' || ext === '.jpeg'){
            dir = 'images/';
            render();
        } else if(ext === ''){
            if(partsUrl[1] === 'article'){
                let findArticle = false;
                for(let i = 0; i < articles.length; i++){
                    if(articles[i].id === Number(partsUrl[2])){
                        res.end(articles[i].title);
                        findArticle = true;
                    }
                }
                if(!findArticle){
                    res.writeHead(404);
                    res.end('404 page');
                }
                res.end();
            }
        } else{
            res.writeHead(404);
            res.end('404 page');
        }
    }  else if(req.url === `/${partsUrl[1]}`){
        let ext = path.extname(`/${partsUrl[1]}`);
        
        if(ext === '.html'){
            fs.access(`./${partsUrl[1]}`, fs.constants.F_OK, (err) => {
                if (err){
                    res.writeHead(404);
                    res.end('404 page');
                } else {
                    let data = fs.readFileSync(`./${partsUrl[1]}`);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
        }else{
            res.writeHead(404);
            res.end('404 page');
        }
        
    } else{
        res.writeHead(404);
        res.end('404 page');
    }
    
});

server.listen(3000);
