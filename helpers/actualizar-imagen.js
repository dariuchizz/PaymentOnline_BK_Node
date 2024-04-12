const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {
    if(fs.existsSync(path)){
        //borrar imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    switch(tipo)
    {
        case 'medicos':          
            const medico = await Medico.findById(id);
           
            if(!medico) {
                console.log('No se encontro medico por id');
                return false;
            }           
          
            const pathViejo = `./uploads/medicos/${ medico.img }`;          

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
           
            if(!hospital) {
                console.log('No se encontro hospital por id');
                return false;
            }           
          
            const pathViejoHospital = `./uploads/hospitales/${ hospital.img }`;        

            borrarImagen(pathViejoHospital);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
           
            if(!usuario) {
                console.log('No se encontro usuario por id');
                return false;
            }           
          
            const pathViejoUsuario = `./uploads/hospitales/${ usuario.img }`;        

            borrarImagen(pathViejoUsuario);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;    
    }
}

module.exports = {
    actualizarImagen
}