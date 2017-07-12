
node-red-mockingbird
====================

> base on node-red-node-web-data-generator


A <a href="http://nodered.org" target="_new">Node-RED</a> node to create dummy
data values from a template. Useful for building test-cases.

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-mockingbird

Usage
-----

Creates dummy data based on a handlebars-style template.

Uses the <i><a href="https://github.com/webroo/dummy-json" target="_new">dummy-json</a></i>
module, which can create rich sets of dummy data for testing or other uses.

It will build a **string**, or a **parsed JSON object**, creating values based
on the helper names below:

    title, firstname, lastname, company, domain, tld, email,
    street, city, country, countryCode, zipcode, postcode,
    lat, long, phone, color, hexColor, guid,
    ipv4, ipv6, lorem, date, time,
    lowercase, uppercase, int, float, boolean

Multiple values can be generated by use of the `repeat` syntax.

In addition any properties passed in on the `msg` object can also be used - for example {{payload}}.

Finally `msg.seed` can be used to preset the pseudo-random seed to ensure repeatability across calls.

Example
-------

The example flow below produces a JSON string which is then converted into an object, for example:

    {
        "name": "Theo Cumbie",
        "work": "CoreXTS",
        "email": "theo.cumbie@corexts.gov",
        "address": "83 Sherman Road",
        "country": "Angola",
        "text": "Sagittis orci elementum e vel scelerisque. Amet ac tristique lectus. Morbi e suscipit scelerisque auctor curabitur velit metus gravida quis."
    }

Example flow

[{"id":"325b6a4a.cf1706","type":"inject","z":"4affede3.af6f44","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":110,"y":300,"wires":[["9d14acc0.c8d9d"]]},{"id":"96c9a04e.35232","type":"debug","z":"4affede3.af6f44","name":"","active":true,"console":"false","complete":"false","x":513,"y":300,"wires":[]},{"id":"9d14acc0.c8d9d","type":"data-generator","z":"4affede3.af6f44","name":"","field":"payload","fieldType":"msg","syntax":"json","template":"{\n    \"name\": \"{{firstName}} {{lastName}}\",\n    \"work\": \"{{company}}\",\n    \"email\": \"{{email}}\",\n    \"address\": \"{{int 1 100}} {{street}}\",\n    \"country\": \"{{country}}\",\n    \"countryCode\": \"{{countryCode}}\",\n    \"text\":\"{{lorem 20}}\"\n}","x":280,"y":300,"wires":[["96c9a04e.35232"]]}]
