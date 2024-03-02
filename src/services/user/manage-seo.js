import models from '../../models/index.js';
const Seo = models['Seo'];
class ManageSeoService {
    constructor() {
        this.updateOptions = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };
        return {
            getSeos: this.getSeos.bind(this),
            getSeoByPath: this.getSeoByPath.bind(this),
        }
    }

    async getSeos({ limit = 10, sortBy = 'name', orderBy = 1, skip, name }) {
        try {
            let result = {};    
            let condition = {};
            if (name) {
                name = '.*' + name + '.*';
                condition['path'] = { $regex: new RegExp('^' + name + '$', 'i') };
            }
            result.seos = await Seo.find(condition)
                .limit(limit)
                .skip(skip)
                .sort({ [sortBy]: orderBy });
            result.count = await Seo.countDocuments(condition);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getSeoByPath({ path }) {
        try {
            return await Seo.findOne({ path })
                // .populate({ path: 'twitter.image', select: 'id s3_link' })
                // .populate({ path: 'open_graph.image', select: 'id s3_link' });
        } catch (error) {
            throw (error);
        }
    }
}

export default new ManageSeoService();