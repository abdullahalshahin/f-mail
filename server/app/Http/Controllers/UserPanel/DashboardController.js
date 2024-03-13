const index = async (req, res) => {
    try {
        return res.status(200).json({
            status: 'success',
            message: 'Response successfull!!!'
        });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    index
};
