const mocks = {
    'auth': { 'POST': { token: '4TBhcD2VGxjzTBE07fG5HGeEU1vNpNmMydBcyNiVa8c2NZcpl78jqWN82CFfNDiw' } },
    'user/me': { 'GET': { name: 'doggo', title: 'sir' } }
};
import axios from "axios";
const apiCall = ({url, method, data, ...args}) => new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            switch (method) {
                case "POST" :
                    console.log(url);
                    console.log(data);
                    axios.post(url,data)
                        .then((res) => {
                           resolve(res.data);
                        })
                        .catch((error) => {
                            // eslint-disable-next-line
                            reject(error);
                        });
                    break;
                case "GET" :
                    resolve(mocks[url][method || 'GET']);
                    console.log(`Mocked '${url}' - ${method || 'GET'}`);
                    console.log('response: ', mocks[url][method || 'GET']);
                    break;

            }


        } catch (err) {
            reject(new Error(err));
        }
    }, 1000);
});

export default apiCall;