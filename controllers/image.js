const handleImage = (req, res, db) => {
    // Get the user ID from the request body
    const { id } = req.body;

    // Look for the user by ID and increment their "entries" count by 1
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries') // Return the updated "entries" value
        .then((entries) => {
            // Send back the updated entries count as a number
            res.json(Number(entries[0].entries));
        })
        // If anything goes wrong, send an error response
        .catch((err) => res.status(400).json('Unable to get entries'));
};

export default handleImage;
