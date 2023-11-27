import { useState } from "react";
import { baseUrl, basePath } from "url"
import { toast } from 'react-toastify';
export default () => {
    const [cardData, setCardData] = useState([])
    const getData = async () => {
        try {
            await fetch(`${baseUrl}car/get`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    setCardData([...cardData, {
                        'name': 'Cars',
                        'value': response.result.length
                    }]);
                }
            }).catch(err => {
                toast.error(err, {
                    position: toast.POSITION.TOP_LEFT
                });
                navigator(`/${basePath}/error`);

            })
        } catch (err) {
            toast.error(err, {
                position: toast.POSITION.TOP_LEFT
            });

        }
    }
    return {
        cardData,
        setCardData,
        getData
    }
}