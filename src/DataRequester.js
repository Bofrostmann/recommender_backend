/**   region_recommender_frontend - 05.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import axios from 'axios';

export default class DataRequester {
    constructor() {
        this.api_base_path = "http://localhost:3001/recommenderAPI";
    }

    getAllFeatures() {
        return axios.get(this.api_base_path + '/features')
            .then(response => {
                return response.data;
            });
    };
}

