const handleSignIn = async (req, res, db, argon2) => {
    // Get email and password from the request body
    const { email, password } = req.body;
    // Check for valid information
    if (!email || !password) {
        return res.status(400).json('Incorrect form submission');
    }

    try {
        // Look up the stored hash for the given email in the login table
        const data = await db
            .select('email', 'hash')
            .from('login')
            .where({ email });

        // If no matching email is found, return an error
        if (data.length === 0) {
            return res.status(400).json('Wrong credentials');
        }

        // Check if the provided password matches the stored hash
        const isMatch = await argon2.verify(data[0].hash, password);

        if (isMatch) {
            // If the password is correct, get the full user info from the users table
            const user = await db.select('*').from('users').where({ email });

            // If the user record is not found (should not happen), return an error
            if (user.length === 0) {
                return res.status(400).json('User not found');
            }

            // Send back the user data as JSON
            res.json(user[0]);
        } else {
            // Password is incorrect
            res.status(400).json('Wrong credentials');
        }
    } catch (err) {
        // Handle unexpected errors (e.g. database down)
        console.error(err);
        res.status(500).json('Server error');
    }
};

export default handleSignIn;
