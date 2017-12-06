const DirectLogClass = require('./direct-log.class');
const notifier = require('node-notifier');

const DirectLog = new DirectLogClass();

setInterval(() => {
    DirectLog.isPartiuCasa()
        .then(partiu => {
            if (partiu === true) {
                notifier.notify({
                    title: 'Atualização no status da entrega',
                    message: 'Sebo nas canelas nego'
                });
            } else {
                console.log('Nenhuma atualização')
            }

        })
        .catch(error => console.log(error));
}, 60000);

