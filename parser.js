const fs = require('fs');
const BCPayRequest = require('./bcpay');

const createErb = (php, js, shell, json) =>
`\`\`\`shell
curl --location --request POST '${shell.url}' \
--header 'Content-Type: application/json' \
--data-raw '${shell.data}'
\`\`\`
\`\`\`php
${php}
\`\`\`
\`\`\`javascript
${js}
\`\`\`
> Expected server response
\`\`\`json
${json}
\`\`\``;

const find = (str, sign) => {
    const positions = [];

    const len = str.length;

    for (let i = 0; i <= len; i++) {
        const char = str.slice(0, 1);

        str = str.slice(1, str.length);

        if (char === sign)
            positions.push(i);
    }

    return positions;
}

module.exports = {
    get php () {
        return '$data = ' + this.request
            .replaceAll('{', '[')
            .replaceAll('}', ']')
            .replaceAll(':', ' =>')
            .replaceAll('"', "'");
    },
    get js () {
        const string = 'const data = ' + this.request.replaceAll('"', "'");
    },
    get request () {
        return `${fs.readFileSync('./parser/request.json', 'utf-8')}`;
    },
    get erb () {
        return createErb(this.php, this.js, {url: BCPayRequest.url, data: this.request}, this.response);
    },
    setResponse (response) {
        this.response = JSON.stringify(response, null, 4);

        return this;
    }
}
