const zod = require("zod");

const signupSchemaValidation = zod.object({
    email: zod.string().email(),
    username: zod.string(),
    password: zod.string()
});

const signinSchemaValidation = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

const updateProfileValidation = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    address: zod.string(),
    mobNo: zod.string()
})

module.exports = {
    signupSchemaValidation,
    signinSchemaValidation,
    updateProfileValidation
}