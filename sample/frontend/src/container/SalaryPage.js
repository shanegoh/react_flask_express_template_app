import React, { useState, useEffect } from 'react';
import Nav from '../component/Nav';
import { getAccessToken } from '../util';
import axios from 'axios';
import Loading from '../component/Loading';
import SalaryTable from '../component/SalaryTable';

export default function SalaryPage() {
    const [payoutInfo, setPayoutInfo] = useState([]);
    const [isLoading, setLoadingStatus] = useState(true);


    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/api/manager/findAllSalary",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        })
            .then(function (res) {
                setPayoutInfo((payoutInfo) => [...res.data.salaries])
                setLoadingStatus((isLoading) => false)
            })
            .catch(function (error) {
                console.log(error.response.data.message)
                setLoadingStatus((isLoading) => false)
            });
    }, []);

    return (
        <div>
            <Nav />
            {
                !isLoading ? (
                    <div>
                        <SalaryTable payoutInfo={payoutInfo} />
                    </div>
                ) : (
                    <div className="d-flex justify-content-center"><Loading /></div>
                )
            }

        </div>
    );
}
