import createCsvWriter from "csv-writer"

const csvWriter = createCsvWriter.createObjectCsvWriter({
    path: 'file.csv',
    params: {
        encoding: 'utf8'
    },
    header: [
        {id: 'id', title: 'id'},
        {id: 'tipoPerfil', title: 'Tipo de Perfil'},
        {id: 'codigoTesis', title: 'Codigo de Tesis'},
        {id: 'descripcion', title: 'Descripcion'},
        {id: 'titulo', title: 'Titulo'},
        {id: 'carreras', title: 'Carreras'},
        {id: 'areasSubareas', title: 'Areas-Subareas'},
        {id: 'estudiantes', title: 'Estudiantes'},
        {id: 'tutores', title: 'Tutores'},
        {id: 'modalidad', title: 'Modalidad'},
        {id: 'gestionRegistro', title: 'Gestion de Registro'},
        {id: 'fechaRegistro', title: 'Fecha de Registro'}
    ]
});
 
export const recordCSV = async (records, fileName) => {
    csvWriter.fileWriter.path = `${fileName}.csv`
    csvWriter.writeRecords(records)
    .then(() => {
        console.log(' Archivo exportado!');
        console.log('----------------------------------------------------');
    });
}
