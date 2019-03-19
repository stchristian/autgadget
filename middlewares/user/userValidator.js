const { checkSchema } = require('express-validator/check');

module.exports =  checkSchema({
    vezeteknev: {
        errorMessage: "A vezetéknév nem megfelelő formátumú.",
        isString: true,
        exists: true,
    },
    keresztnev: {
        errorMessage: "A keresztnév nem megfelelő formátumú.",
        isString: true,
    },
    jelszo: {
        isString: true,
    }
});