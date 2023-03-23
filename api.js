const request = require('request');

const hostname = 'http://localhost:3000';
const path = '/users';
let clients = {};

request(`${hostname}${path}`, (err, res, body) => {
    // console.log(body);
    normalizeResponse(body);
});

function composeEmail(email) {
    splitedEmail = email.split('@');

    if(splitedEmail[1] ==! 'niuco.com.br') {
        console.log(2)
        removeFromMail = splitedEmail[0].slice(3, -2);
        console.log(removeFromMail.length);
        emailName = splitedEmail[0].replace(removeFromMail, '*'.repeat(removeFromMail.length));
        console.log(splitedEmail[1])
        email = emailName+'@'+splitedEmail[1];
    }

    return email;
}

function normalizeResponse(res) {
    const retornoMap = JSON.parse(res).map((i) => {  
        // console.log(i);
        clients += {"ID": i.id, "Nome": i.name, "Email": composeEmail(i.email), "Data da última atividade": new Date(i.last_activity).toISOString(), "Pagante": ((i.role == "editor" || i.role == "admin") && i.status == 'enabled') ? true : false, "Ativo": i.status == 'disabled' ? false : true};
        console.log({"ID": i.id, "Nome": i.name, "Email": composeEmail(i.email), "Data da última atividade": new Date(i.last_activity).toISOString(), "Pagante": ((i.role == "editor" || i.role == "admin") && i.status == 'enabled') ? true : false, "Ativo": i.status == 'disabled' ? false : true})
    });
}