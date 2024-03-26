class FormSubmitService {

    async submit(baseURL: string, endpoint?: string,
        method?: string, body?: any,
        headers?:  { [ key: string ]: any }): Promise<Response>
    { 
        const url = endpoint ? baseURL.concat(endpoint) : baseURL;
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        return fetch(url, requestOptions);
    }

    async load(baseURL: string, endpoint?: string,
        headers?:  { [ key: string ]: any }): Promise<Response>
    { 
        const url = endpoint ? baseURL.concat(endpoint) : baseURL;
        
        const requestOptions = {
            method: 'GET',
            headers: { 'accept': 'application/json' },
        }
        return fetch(url, requestOptions);
    }    
}

export default new FormSubmitService();