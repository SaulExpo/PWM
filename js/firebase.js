// Configuración de Firebase
const { initializeApp } = require("firebase/app");
const { getFirestore, setDoc, doc, addDoc, collection } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDVoUOYXHjElTc0hHnin2y69EcPoQVNcJI",
    authDomain: "queteparece-365be.firebaseapp.com",
    projectId: "queteparece-365be",
    storageBucket: "queteparece-365be.firebasestorage.app",
    messagingSenderId: "639994562420",
    appId: "1:639994562420:web:8f31edfed6eb86f532ce21",
    measurementId: "G-61Y18XFEEY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Supón que tienes el JSON que quieres subir
const jsonData ={
    "data": [
        {
            "id": 4,
            "documentId": "jbzr0qmgf6ka1ug6lzplmvgh",
            "Description": "Muy buena peli, mis dieces",
            "createdAt": "2025-03-22T18:47:13.003Z",
            "updatedAt": "2025-03-22T18:47:18.977Z",
            "publishedAt": "2025-03-22T18:47:18.988Z",
            "app_user": {
                "id": 13,
                "documentId": "rgj8g65o7dxjd55mhsu1b3vn",
                "Name": "Saúl",
                "Surname": "Expósito Morales",
                "email": "exmosaul@gmail.com",
                "password": "1234",
                "createdAt": "2025-03-22T12:12:11.769Z",
                "updatedAt": "2025-03-27T18:56:46.334Z",
                "publishedAt": "2025-03-27T18:56:46.353Z",
                "ProfilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQrF3t4HTqY8rjh54a9PrakBAZsJ5gPFv2CQ&s"
            },
            "film": {
                "id": 101,
                "documentId": "quogxkx0ml61w6yuitkhf4wg",
                "Title": "Attack on Titan: The Last Attack",
                "Description": "Película recopilatoria para cines de los dos últimos episodios especiales de la última temporada de \"Ataque a los Titanes\". La humanidad vivía en paz tras los enormes muros construidos para protegerse de la amenaza de unas criaturas monstruosas llamadas Titanes. Su siglo de paz se vio truncado por un ataque a su ciudad que dejó huérfano de madre a un niño, Eren Yeager, que juró vengarse de los titanes. Años después de unirse a la Tropa de Reconocimiento, Eren se enfrenta a un enemigo mortal y acaba adquiriendo una habilidad especial que revela una nueva verdad sobre el mundo que conoce... Tras aventurarse más allá de los muros y separarse de sus camaradas, Eren, motivado por sus nuevos conocimientos del mundo, planea el \"Retumbar\", un terrorífico plan para erradicar a todo ser vivo del mundo. Con el destino del mundo pendiendo de un hilo, un variopinto grupo de antiguos camaradas y enemigos de Eren lucha por detener su letal misión. La única pregunta es: ¿lo conseguirán?",
                "createdAt": "2025-03-17T19:13:17.453Z",
                "updatedAt": "2025-03-25T18:28:08.269Z",
                "publishedAt": "2025-03-25T18:28:08.277Z",
                "CoverUrl": "https://pics.filmaffinity.com/gekijoban_shingeki_no_kyojin_kanketsu_hen_the_last_attack-506310636-mmed.jpg",
                "Valoration": 10,
                "Category": "Animation",
                "type": "film"
            }
        },
        {
            "id": 6,
            "documentId": "pd9xqjb3hhf2lowht4h8d2js",
            "Description": "Mu guapo",
            "createdAt": "2025-03-22T19:33:02.795Z",
            "updatedAt": "2025-03-22T19:33:02.795Z",
            "publishedAt": "2025-03-22T19:33:02.800Z",
            "app_user": {
                "id": 13,
                "documentId": "rgj8g65o7dxjd55mhsu1b3vn",
                "Name": "Saúl",
                "Surname": "Expósito Morales",
                "email": "exmosaul@gmail.com",
                "password": "1234",
                "createdAt": "2025-03-22T12:12:11.769Z",
                "updatedAt": "2025-03-27T18:56:46.334Z",
                "publishedAt": "2025-03-27T18:56:46.353Z",
                "ProfilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQrF3t4HTqY8rjh54a9PrakBAZsJ5gPFv2CQ&s"
            },
            "film": {
                "id": 101,
                "documentId": "quogxkx0ml61w6yuitkhf4wg",
                "Title": "Attack on Titan: The Last Attack",
                "Description": "Película recopilatoria para cines de los dos últimos episodios especiales de la última temporada de \"Ataque a los Titanes\". La humanidad vivía en paz tras los enormes muros construidos para protegerse de la amenaza de unas criaturas monstruosas llamadas Titanes. Su siglo de paz se vio truncado por un ataque a su ciudad que dejó huérfano de madre a un niño, Eren Yeager, que juró vengarse de los titanes. Años después de unirse a la Tropa de Reconocimiento, Eren se enfrenta a un enemigo mortal y acaba adquiriendo una habilidad especial que revela una nueva verdad sobre el mundo que conoce... Tras aventurarse más allá de los muros y separarse de sus camaradas, Eren, motivado por sus nuevos conocimientos del mundo, planea el \"Retumbar\", un terrorífico plan para erradicar a todo ser vivo del mundo. Con el destino del mundo pendiendo de un hilo, un variopinto grupo de antiguos camaradas y enemigos de Eren lucha por detener su letal misión. La única pregunta es: ¿lo conseguirán?",
                "createdAt": "2025-03-17T19:13:17.453Z",
                "updatedAt": "2025-03-25T18:28:08.269Z",
                "publishedAt": "2025-03-25T18:28:08.277Z",
                "CoverUrl": "https://pics.filmaffinity.com/gekijoban_shingeki_no_kyojin_kanketsu_hen_the_last_attack-506310636-mmed.jpg",
                "Valoration": 10,
                "Category": "Animation",
                "type": "film"
            }
        },
        {
            "id": 8,
            "documentId": "q9rgp51n0kavsqwfoizx1h0f",
            "Description": "No me ha gustado",
            "createdAt": "2025-03-22T19:33:38.571Z",
            "updatedAt": "2025-03-22T19:33:38.571Z",
            "publishedAt": "2025-03-22T19:33:38.576Z",
            "app_user": {
                "id": 10,
                "documentId": "wklhh0n2cy75pbmbwvcszmto",
                "Name": "Eduardo",
                "Surname": "Arbelo Rua-Figueroa",
                "email": "edu@gmail.com",
                "password": "1234",
                "createdAt": "2025-03-22T12:37:37.082Z",
                "updatedAt": "2025-03-22T19:38:31.896Z",
                "publishedAt": "2025-03-22T19:38:31.904Z",
                "ProfilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQrF3t4HTqY8rjh54a9PrakBAZsJ5gPFv2CQ&s"
            },
            "film": {
                "id": 101,
                "documentId": "quogxkx0ml61w6yuitkhf4wg",
                "Title": "Attack on Titan: The Last Attack",
                "Description": "Película recopilatoria para cines de los dos últimos episodios especiales de la última temporada de \"Ataque a los Titanes\". La humanidad vivía en paz tras los enormes muros construidos para protegerse de la amenaza de unas criaturas monstruosas llamadas Titanes. Su siglo de paz se vio truncado por un ataque a su ciudad que dejó huérfano de madre a un niño, Eren Yeager, que juró vengarse de los titanes. Años después de unirse a la Tropa de Reconocimiento, Eren se enfrenta a un enemigo mortal y acaba adquiriendo una habilidad especial que revela una nueva verdad sobre el mundo que conoce... Tras aventurarse más allá de los muros y separarse de sus camaradas, Eren, motivado por sus nuevos conocimientos del mundo, planea el \"Retumbar\", un terrorífico plan para erradicar a todo ser vivo del mundo. Con el destino del mundo pendiendo de un hilo, un variopinto grupo de antiguos camaradas y enemigos de Eren lucha por detener su letal misión. La única pregunta es: ¿lo conseguirán?",
                "createdAt": "2025-03-17T19:13:17.453Z",
                "updatedAt": "2025-03-25T18:28:08.269Z",
                "publishedAt": "2025-03-25T18:28:08.277Z",
                "CoverUrl": "https://pics.filmaffinity.com/gekijoban_shingeki_no_kyojin_kanketsu_hen_the_last_attack-506310636-mmed.jpg",
                "Valoration": 10,
                "Category": "Animation",
                "type": "film"
            }
        },
        {
            "id": 10,
            "documentId": "td792slubaafagec32ohtfay",
            "Description": "Muy mala",
            "createdAt": "2025-03-22T19:34:09.893Z",
            "updatedAt": "2025-03-22T19:34:09.893Z",
            "publishedAt": "2025-03-22T19:34:09.899Z",
            "app_user": {
                "id": 10,
                "documentId": "wklhh0n2cy75pbmbwvcszmto",
                "Name": "Eduardo",
                "Surname": "Arbelo Rua-Figueroa",
                "email": "edu@gmail.com",
                "password": "1234",
                "createdAt": "2025-03-22T12:37:37.082Z",
                "updatedAt": "2025-03-22T19:38:31.896Z",
                "publishedAt": "2025-03-22T19:38:31.904Z",
                "ProfilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQrF3t4HTqY8rjh54a9PrakBAZsJ5gPFv2CQ&s"
            },
            "film": {
                "id": 101,
                "documentId": "quogxkx0ml61w6yuitkhf4wg",
                "Title": "Attack on Titan: The Last Attack",
                "Description": "Película recopilatoria para cines de los dos últimos episodios especiales de la última temporada de \"Ataque a los Titanes\". La humanidad vivía en paz tras los enormes muros construidos para protegerse de la amenaza de unas criaturas monstruosas llamadas Titanes. Su siglo de paz se vio truncado por un ataque a su ciudad que dejó huérfano de madre a un niño, Eren Yeager, que juró vengarse de los titanes. Años después de unirse a la Tropa de Reconocimiento, Eren se enfrenta a un enemigo mortal y acaba adquiriendo una habilidad especial que revela una nueva verdad sobre el mundo que conoce... Tras aventurarse más allá de los muros y separarse de sus camaradas, Eren, motivado por sus nuevos conocimientos del mundo, planea el \"Retumbar\", un terrorífico plan para erradicar a todo ser vivo del mundo. Con el destino del mundo pendiendo de un hilo, un variopinto grupo de antiguos camaradas y enemigos de Eren lucha por detener su letal misión. La única pregunta es: ¿lo conseguirán?",
                "createdAt": "2025-03-17T19:13:17.453Z",
                "updatedAt": "2025-03-25T18:28:08.269Z",
                "publishedAt": "2025-03-25T18:28:08.277Z",
                "CoverUrl": "https://pics.filmaffinity.com/gekijoban_shingeki_no_kyojin_kanketsu_hen_the_last_attack-506310636-mmed.jpg",
                "Valoration": 10,
                "Category": "Animation",
                "type": "film"
            }
        },
        {
            "id": 12,
            "documentId": "zhxpomtespptqd64y9vdevy5",
            "Description": "La segunda temporada está bien.",
            "createdAt": "2025-03-30T10:52:47.821Z",
            "updatedAt": "2025-03-30T10:52:47.821Z",
            "publishedAt": "2025-03-30T10:52:47.829Z",
            "app_user": {
                "id": 45,
                "documentId": "ey4ov0wnd1msuz7893y4z1yu",
                "Name": "Pedro Pablo",
                "Surname": "Díaz López",
                "email": "pedroxboxer@gmail.com",
                "password": "tryExample7",
                "createdAt": "2025-03-30T10:50:57.906Z",
                "updatedAt": "2025-03-30T10:50:57.906Z",
                "publishedAt": "2025-03-30T10:50:57.916Z",
                "ProfilePicture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQrF3t4HTqY8rjh54a9PrakBAZsJ5gPFv2CQ&s"
            },
            "film": {
                "id": 137,
                "documentId": "ydvwxc7hukdw4mk9xycm85b1",
                "Title": "Halo",
                "Description": "Halo seguirá un conflicto épico en el siglo XXVI entre la humanidad y una amenaza alienígena conocida como el Covenant. \"Halo entretejerá historias personales profundamente dibujadas con acción, aventura y una visión ricamente imaginada del futuro\".",
                "createdAt": "2025-03-25T18:06:17.665Z",
                "updatedAt": "2025-03-29T10:24:14.215Z",
                "publishedAt": "2025-03-29T10:24:14.225Z",
                "CoverUrl": "https://m.media-amazon.com/images/M/MV5BYzNkODg3OTYtM2EyZC00NmEyLTgzZDktYjY5NGNjZmQ5ZDRiXkEyXkFqcGc@._V1_.jpg",
                "Valoration": 5,
                "Category": "Live-Action",
                "type": "serie"
            }
        }
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 100,
            "pageCount": 1,
            "total": 5
        }
    }
}

// Subir datos a Firestore
async function subirDatos() {
    try {
        // Si quieres almacenar los datos como un documento único en una colección
        for (const item of jsonData.data) {
            await addDoc(collection(db, 'reviews'), item); // Cambia 'animes' por el nombre de tu colección
            console.log(`Anime "${item.Title}" subido correctamente`);
        }
    } catch (e) {
        console.error("Error al subir los datos: ", e);
    }
}

subirDatos();