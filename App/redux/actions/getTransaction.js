import axios from 'axios';

// Define the API call function
export default getAllTransactions = () => {
    return new Promise((resolve, reject) => {
        console.log("CALL API");
        axios.get('http://192.168.0.102:3000/transaction/api/get-all-transaction')
        
            // .get('http://localhost:3000/transaction/api/get-all-transaction')
            .then(function (response) {
                //handle success
                console.log("RESPONSE", response);
                resolve(response.data)// this one is data on website
            })
            .catch(function (error) {
                console.log(error);
                reject(error)
            })
    })

}