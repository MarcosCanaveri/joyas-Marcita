/*const args = process.argv.slice(2);

switch (args[0]) {
    case "GET":
        console.log("GET");
        console.log("Toma un dato");
        break;
    case "POST":
        console.log("POST");
        if(args[1]) {
            console.log(`Recibimos ${args[1]} satisfactoriamente`);
        }else {
            console.log("No recibimos nada");
        }
        break;
    case "PUT":
        console.log("PUT");
        if(args[1]) {
            console.log(`Editamos dato con id: ${args[1]} satisfactoriamente`);
        }else {
            console.log("No recibimos nada");
        }
        break;
    case "DELETE":
        console.log("DELETE");
        if(args[1]) {
            console.log(`Eliminamos dato con id: ${args[1]} satisfactoriamente`);
        }else {
            console.log("No recibimos nada");
        }
        break;
    default:
        console.log("Método no válido");
}
*/

/*function obtener_pjs() {
    return new Promise((resolve, reject) => {
        fetch('https://rickandmortyapi.com/api/character', {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                return response.json();

            }
        })
            .then((data) => {
                console.log(data);
                const primeros_pjs = data.results.slice(0, 5);
                console.log(primeros_pjs);
                resolve(primeros_pjs);
            })
            .catch((error) => {

                reject(error);
            })
            .finally(() => {
                console.log("Finalizó la petición");
            })
    })

}


obtener_pjs().then((pjs) => {
    console.log(pjs)
}).catch((error) => {
    console.log(error);
})
*/

/*async function obtener_pjs() {
    try{
        const response = await fetch('https://rickandmortyapi.com/api/character')
        if (response.ok) {
            const data = await response.json();
            const primeros_pjs = data.results.slice(0, 5);
            return primeros_pjs;
        }
            
    } catch (error) {
        console.log(error);
    }
}

const pjs = await obtener_pjs();
console.log(pjs);
*/
console.log(process.argv);
const args = process.argv.slice(2);

async function obtenerProductos(url) {
    try {
        const response = await fetch(`https://fakestoreapi.com/${url}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function crearProducto(producto) {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            body: JSON.stringify(producto)
        });
        if (response.ok) {
            const data = await response.json();
            console.log("ID del producto creado:", data.id);
        }
    } catch (error) {
        console.log(error);
    }
}

async function eliminarProducto(producto) {
    try {
        const response = await fetch(`https://fakestoreapi.com/${producto}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log("Producto eliminado exitosamente");
        }
    } catch (error) {
        console.log(error);
    }
}

switch (args[0]) {
    case "GET":
        console.log(args[0]);
        if(args[1] && args[1].startsWith("products")) {
            const productos = await obtenerProductos(args[1])
            console.log(productos)
        }else{
            console.log("Método no válido");
        }
        break;

    case "POST":
        console.log(args[0]);
        if(args[1] && args[2] && args[3] && args[4] && args[1].startsWith("products")) {
            await crearProducto({title: args[2], price: parseFloat(args[3]), category: args[4]});
            console.log("Producto creado exitosamente");

        }
        else {
            console.log("Método no válido");
            
        }
        break;

        case "DELETE":
        console.log(args[0]);
        if(args[1].startsWith("products/") && args[1].length > 9) {
            const response = await eliminarProducto(args[1])
            console.log("Producto eliminado exitosamente", response);
        }else{
            console.log("Método no válido");
        }
        break;
    default:
        console.log("Método no válido");
    }