const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
//Importación del modelo
const User = require('../models/user');

//Función para crear un admin por defecto
const defaultAdmin = async (req, res) => {
    try {
        let user = new User();
        user.name = "Jordy";
        user.lastname = "Lajpop"
        user.password = "123456";
        user.email = "jordy@levelup.com";
        user.phoneNumber = "12344321";
        const userEncontrado = await User.findOne({ email: user.email });
        if (userEncontrado) return console.log("Administrator started successfully!");
        user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());
        user = await user.save();
        if (!user) return console.log("Administrator has not started correctly!");
        return console.log("Administrator started successfully!");
    } catch (err) {
        throw new Error(err);
    }
};

const getUsers = async (req = request, res = response) => {

    //condiciones del get
    const listUser = await User.find();

    res.json({
        msg: 'get Api - User Controller',
        listUser
    });
}


const putUser = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;


    //Si la password existe o viene en el req.body, la encripta

    //Editar al usuario por el id
    const userEdit= await User.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'PUT editar user',
        userEdit
    });

}

const deleteUser = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

    //Eliminar fisicamente de la DB
    //const usuarioEliminado = await Usuario.findByIdAndDelete( id);

    //Eliminar cambiando el estado a false
    const userDelete = await User.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE eliminar user',
        userDelete
    });
}

const userRegistration = async (req = request, res = response) => {
    const { name, lastname, password, email, phoneNumber} = req.body;
    const emailDB = await User.findOne({email});
    if (emailDB) {
        return res.json({
            msg: `The email: ${email} already exists in the DB`
        })
    }
    const userRegistrationDb = new User({ name, lastname, password, email, phoneNumber });
    const salt = bcryptjs.genSaltSync();
    userRegistrationDb.password = bcryptjs.hashSync(password, salt);

    await userRegistrationDb.save();

    res.json({
        msg: 'New registered user',
        userRegistrationDb,

    })


}




module.exports = {
    defaultAdmin,
    getUsers,
    putUser,
    deleteUser,
    userRegistration,
}

