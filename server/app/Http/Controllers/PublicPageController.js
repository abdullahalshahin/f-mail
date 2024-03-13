import Controller from "./Controller";

export class PublicPageController extends Controller {
    constructor(props) {
        super(props);
    }

    index(req, res) {
        try {
            return res.status(200).json({
                status: 'success'
            });
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }
}

export default PublicPageController;
