let i = 0;
let message = 'Helton Teixeira de Souza';

typing();

function typing(){
    if(i < message.length){
        document.getElementById('text').innerHTML +=
        message.charAt(i);
        i++;
        setTimeout(typing, 100);
    }
   }