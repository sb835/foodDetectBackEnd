const handleAnalyze = async (req, res) => {
    const { image } = req.body;

    const PAT = '055f3cb4647f4f31903d144ce06d2d06';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'u38u2jx6aeok';
    const APP_ID = 'image-detection';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'food-item-recognition';
    const IMAGE_URL = image;

    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL,
                    },
                },
            },
        ],
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Key ' + PAT,
        },
        body: raw,
    };

    fetch(
        'https://api.clarifai.com/v2/models/' + MODEL_ID + '/outputs',
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => res.json(result))
        .catch((error) => console.log('error', error));
};

export default handleAnalyze;
