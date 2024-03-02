import manageSeoService from '../../services/user/manage-seo.js';

class ManageRoom {
    constructor() {
        return {
            getSeos: this.getSeos.bind(this),
            getSeoByPath: this.getSeoByPath.bind(this),
        }
    }

    async getSeos(req, res, next) {
        try {
            const data = await manageSeoService.getSeos(req.query);
            return res.status(200).json({
                message: 'Seo list',
                data: data.seos,
                totalRecords: data.count
            });
        } catch (error) {
            next(error)
        }
    }

    async getSeoByPath(req, res, next) {
        try {
            const seo = await manageSeoService.getSeoByPath(req.params);
            return res.status(200).json({
                message: 'Seo detail By Path',
                data: seo
            });
        } catch (error) {
            next(error);
        }
    }

}
export default new ManageRoom();
