const socket = io("localhost:8080");
const { schema } = normalizr;

const userSchemaNormalizr = new schema.Entity('users', {}, { idAttribute: 'email' });
const messageSchemaNormalizr = new schema.Entity('messages', { user: userSchemaNormalizr })


socket.on("message", data => {
    console.log("Socket script -- Normalizado: ", JSON.stringify(data));

    let denormalizedData = normalizr.denormalize(data.result, [messageSchemaNormalizr], data.entities);
    let compresion = Math.trunc((JSON.stringify(denormalizedData).length / JSON.stringify(data).length) * 100);
    $("#compresiondiv").html(`<p><b>Compresión de mensajes:</b> <b>${compresion} %</b></p>`)
    for (let i = 0; i < denormalizedData.length; i++) {
        data = `<br/> <span style="color:blue;font-weight:bold"> ${denormalizedData[i].user.nickname} </span>
     - <span style="color:darkolivegreen;font-weight:bold"> ${denormalizedData[i].date} </span> - 
     <span style="color:black;font-weight:bold"> ${denormalizedData[i].message}</span>`;
        $("#chat").append(data)
    }
})


$("#btn").click(emitir);


function emitir() {

    message = $("#msn")[0].value;
    email = $("#email").val();
    let msn = {
        user: { email: email,  },
        message: $("#msn")[0].value,
    }
    console.log("Enviando mensaje al servidor: ", JSON.stringify(msn));
    socket.emit("message", msn);
    $("#msn")[0].value = "";
}

