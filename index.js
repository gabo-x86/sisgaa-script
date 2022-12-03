import fetch from 'node-fetch';
import {recordCSV} from './csv-writer.js';

const YEAR = 2019;  //Modificar año por búsqueda

const getTotalElements = async () =>{
    const BASE_URL = `https://sisgaa.cs.umss.edu.bo/apiSisGaa/publica/api/perfilesregistrados?anho=${YEAR}&areaSubarea=&idCarrera=&modalidad=&periodo=&textoAbuscar=&tipoBusquedaTextoAbuscar=&elementosPorPaginaPerfilCS=10&elementosPorPaginaPerfilNuevo=10&nroPaginaPerfilCS=0&nroPaginaPerfilNuevo=0`
    const response = await fetch(BASE_URL);
    const res = await response.json();
    console.log(`------------------ Sisg@@ fetcher ------------------`)
    console.log(` → Año de búsqueda: ${YEAR}`);
    console.log(` → Cantidad de elementos obtenidos: ${res.data.perfilesNuevos.totalElementos}`);
    return res.data.perfilesNuevos.totalElementos;
}
const ELEMENTS_LENGTH = await getTotalElements();
const URL = `https://sisgaa.cs.umss.edu.bo/apiSisGaa/publica/api/perfilesregistrados?anho=${YEAR}&areaSubarea=&idCarrera=&modalidad=&periodo=&textoAbuscar=&tipoBusquedaTextoAbuscar=&elementosPorPaginaPerfilCS=10&elementosPorPaginaPerfilNuevo=${ELEMENTS_LENGTH}&nroPaginaPerfilCS=0&nroPaginaPerfilNuevo=0`


const getElements = async () => {
    const response = await fetch(URL);
    const resJSON = await response.json();
    const workList = (resJSON.data.perfilesNuevos.lista);

    const workListJSON = workList.map(e => {
        return {
            'id': e.id,
            'tipoPerfil': e.tipoPerfil,
            'codigoTesis': e.codigoTesis,
            'descripcion': e.descripcion,
            'titulo': e.titulo,
            'carreras': e.carreras[0],
            'areasSubareas': e.areasSubareas.length>1 ? `${e.areasSubareas[0]}-${e.areasSubareas[1]}` : e.areasSubareas[0],
            'estudiantes': e.estudiantes.length>1 ? `${e.estudiantes[0]}-${e.estudiantes[1]}` : e.estudiantes[0]+"",
            'tutores': e.tutores.length>1 ? `${e.tutores[0]}-${e.tutores[1]}` : e.tutores[0],
            'modalidad': e.modalidad,
            'gestionRegistro': `${e.gestionRegistro.periodo}/${e.gestionRegistro.anho}`,
            'fechaRegistro': e.fechaRegistro
        }
    })
    recordCSV(workListJSON, `Lista de perfiles ${YEAR}`);
}

getElements();