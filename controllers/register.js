const handleRegister = async (req, res, db, argon2) => {
    // Get user details from the request body
    const { email, name, password } = req.body;
    // Check for valid information
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }
    try {
        // Securely hash the password using Argon2
        const hash = await argon2.hash(password);

        // Start a database transaction to insert into both "login" and "users"
        const newUser = await db.transaction(async (trx) => {
            // Insert email and hashed password into "login" table
            const loginEmail = await trx('login')
                .insert({ hash, email })
                .returning('email');

            // Insert user profile into "users" table using the returned email
            const user = await trx('users')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date(),
                })
                .returning('*'); // return all user info

            return user[0]; // return the new user data from the transaction
        });

        // Send the newly created user as JSON response
        res.json(newUser);
    } catch (err) {
        // Handle any error during registration
        console.error('Fehler bei Registrierung:', err);
        res.status(400).json('Unable to register');
    }
};

export default handleRegister;
