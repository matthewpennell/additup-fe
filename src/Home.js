import React from 'react';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
        }
    }

    componentDidMount() {
        fetch('http://additup.api/api/accounts/1/transactions', {
            method: 'GET',
        }).then(result => {
            return result.json();
        }).then(result => {
            this.setState({
                isLoaded: true,
                data: result.data,
            })
        });
    }

    render() {
        const { isLoaded, data } = this.state;
        const today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return (
            <div>
                <h1>Add It Up</h1>
                {isLoaded ? (
                    <React.Fragment>
                        <h2>{data.name} ({data.number})</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Transaction</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.transactions.map(row => 
                                    <React.Fragment key={row.id}>
                                        <tr>
                                            <td style={{ padding: '5px' }}>
                                                {date !== row.date && (date = row.date) && row.date}
                                            </td>
                                            <td style={{ padding: '5px' }}>{row.data}</td>
                                            <td style={{ padding: '5px' }}><a href={'/category/' + row.category.id}>{row.category.name}</a></td>
                                            <td style={{ padding: '5px' }} align="right">
                                                <div style={row.amount >= 0 ? { color: 'green' } : { color: 'red' }}>£{row.amount}</div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )}
                            </tbody>
                        </table>
                    </React.Fragment>
                ) : (
                    <p>Loading account data...</p>
                )}
            </div>
        );

    }
    
}

export default Home;
