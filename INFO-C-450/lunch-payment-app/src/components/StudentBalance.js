import React, { useState, useEffect } from 'react';

const StudentBalance = () => {
    const [balance, setBalance] = useState(0);

    // useEffect(() => {
    //     // Fetch the balance from an API or database
    //     const fetchBalance = async () => {
    //         // Replace with actual API call
    //         const response = await fetch('/api/student/balance');
    //         const data = await response.json();
    //         setBalance(data.balance);
    //     };

    //     fetchBalance();
    // }, []);

    return (
        <div className="student-balance">
            <h2>Student Account Balance</h2>
            <p>Your current balance is: ${balance.toFixed(2)}</p>
        </div>
    );
};

export default StudentBalance;