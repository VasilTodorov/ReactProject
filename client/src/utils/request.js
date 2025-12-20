const baseUrl = 'http://localhost:3030/'

export default async function request(url, method, data, accessToken, returnable = true, signal) {
    let options = {};

    if (method) {
        options.method = method;
    }

    if (data) {
        options.headers = {
            'content-type': 'application/json',
        };

        options.body = JSON.stringify(data);
    }

    if (accessToken) {
            options.headers = {
                ...(options.headers || {}),
                'X-Authorization': accessToken,
            }
        }
    if (signal) {
       options.signal = signal;
    }

    const response = await fetch(`${baseUrl}${url}`, options);

    if (!response.ok) {
        console.log("reqest not ok")
        throw response.statusText;
    }
    if(returnable)
    {
        const result = await response.json();

        return result;
    }
    
}
