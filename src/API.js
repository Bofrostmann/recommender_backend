/**   region_recommender_frontend - 05.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import axios from 'axios';

import CONSTANTS from './CONSTANTS';

export default class API {
    constructor() {
        this.api_base_path = CONSTANTS.API_URL;
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.config = {
                headers: {
                    Authorization: 'jwt ' + this.token
                }
            };
        } else {
            this.config = {}
        }
    }

    getAllActivites() {
        return axios.get(this.api_base_path + '/allFeatureData', this.config)
            .then(response => {
                return response.data;
            });
    };

    getAllRegions() {
        return axios.get(this.api_base_path + '/regions', this.config)
            .then(response => {
                return response.data;
            });
    };

    getAllAlgorithms() {
        return axios.get(this.api_base_path + '/algorithms', this.config)
            .then(response => {
                return response.data;
            });
    };

    getVariablesOfAlgorithm(algorithm_id) {
        return axios.post(this.api_base_path + '/getVariablesOfAlgorithm', {algorithm_id}, this.config)
            .then(response => {
                return response.data;
            });
    }

    getFeaturesOfRegion(region_id) {
        return axios.post(this.api_base_path + '/featuresOfRegion', {region_id}, this.config).then(response => {
            return response.data;
        });
    }

    getAirportsOfRegion(region_id) {
        return axios.post(this.api_base_path + '/getAirportsOfRegion', {region_id}, this.config).then(response => {
            return response.data;
        });
    }

    getTimeOfTravelQualitiesOfRegion(region_id) {
        return axios.post(this.api_base_path + '/getTimeOfTravelQualitiesOfRegion', {region_id}, this.config)
            .then(response => {
                return response.data;
            });
    }


    updateData(key, data) {
        return axios.post(this.api_base_path + '/genericSingleUpdate', {key, data}, this.config).then(response => {
            return response.data.success;
        })
    }

    insertData(key, data) {
        return axios.post(this.api_base_path + '/genericSingleCreate', {key, data}, this.config).then(response => {
            return response.data.success;
        })
    }

    deleteData(key, id) {
        return (axios.post(this.api_base_path + '/genericSingleDelete', {
            key,
            data: {id: id}
        }, this.config)).then(response => {
            return response.data.success;
        })
    }

    login(password) {
        return (axios.post(this.api_base_path + '/login', {password}))
            .then(response => {
                window.localStorage.setItem('token', response.data.token);
                return true;
            })
            .catch(function (error) {
                return false;
            });
    }

    validateLogin() {
        return axios.post(this.api_base_path + '/validateLogin', {}, this.config)
            .then(response => {
                return response.data;
            })
            .catch((err) => {
                localStorage.removeItem('token');
            });
    }

    getAllFeedbackQuestions() {
        return axios.get(this.api_base_path + '/getFeedbackQuestions').then(response => {
            return response.data;
        });
    }
}

