const handleProfileId = (req, res, db) => {
    // Extract the "id" from the URL parameters (e.g. /profile/5 → id = 5)
    const { id } = req.params;

    // Query the "users" table for a user with this ID
    db.select('*')
        .from('users')
        .where({ id })
        .then((user) => {
            // If a user is found, send it as JSON
            if (user.length) {
                res.json(user[0]);
            } else {
                // If no user is found, send a 404 Not Found
                res.status(404).json('User not found');
            }
        })
        // If there's an error during the DB query, send a 400 Bad Request
        .catch((err) => res.status(400).json('Error getting user'));
};

export default handleProfileId;
