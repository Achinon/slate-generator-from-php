const axios = require('axios');

const BCpayRequest = class {
    #data;
    static url = 'https://test.bcpay.pl/api/';

    constructor(data) {
        this.#data = data;
    }

    async #createRequest()
    {
        const data = this.#data,
            url = BCpayRequest.url;

        let response = [];

        try {
            response = await axios({
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                url,
                data
            })
        }
        catch (error) {console.log(error)}

        return response.data;
    }

    static async create (data) {
        const request = new this(data);

        return await request.#createRequest();
    }
}

module.exports = BCpayRequest;