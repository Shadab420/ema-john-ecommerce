import React from 'react';

const Inventory = () => {

    // const handleAddInventory = () => {

    //     fetch('http://ema-john-back.herokuapp.com/addProduct', {
    //         method: 'POST',
    //         body: JSON.stringify(fakeData),
    //         headers: {
    //             "Content-type": 'application/json; charset=UTF-8'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {console.log("successfully added!", data)})
    // }
    
    return (
        <div>
            <h1>Add Inventory to sell more...</h1>
            {/* <button onClick={handleAddInventory}>Add Inventory</button> */}
        </div>
    );
};

export default Inventory;