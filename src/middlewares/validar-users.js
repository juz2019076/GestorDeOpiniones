export const validarUser = (req, res, next) => {
    try {
        const { user } = req;

        if (!user) {
            return res.status(403).json({
                msg: 'Acceso no autorizado. Solo profesores pueden realizar esta acción.',
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en la validación de profesores',
            error: error.message,
        });
    }
};