/**   region_recommender_frontend - 05.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import axios from 'axios';

export default class API {
    constructor() {
        this.api_base_path = "http://localhost:3001/recommenderAPI";
    }

    getAllFeatures() {
        return axios.get(this.api_base_path + '/features')
            .then(response => {
                return response.data;
            });
    };

    getAllRegions() {
        return axios.get(this.api_base_path + '/regions')
            .then(response => {
                return response.data;
            });
    };


    getFeaturesOfRegion(region_id) {
        return axios.post(this.api_base_path + '/featuresOfRegion', {region_id}).then(response => {
            return response.data;
        });
    }

    getAirportsOfRegion(region_id) {
        return axios.post(this.api_base_path + '/getAirportsOfRegion', {region_id}).then(response => {
            console.log(response.data);
            return response.data;
        });
    }


    updateData(key, data) {
        console.log("hier", key);
        return (axios.post(this.api_base_path + '/genericSingleUpdate', {key, data})).then(response => {
            return response.data.success;
        })
    }

    insertData(key, data) {
        return (axios.post(this.api_base_path + '/genericSingleCreate', {key, data})).then(response => {
            return response.data.success;
        })
    }

    deleteData(key, id) {
        return (axios.post(this.api_base_path + '/genericSingleDelete', {key, data: {id: id}})).then(response => {
            return response.data.success;
        })
    }
}

