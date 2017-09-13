import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import moment from 'moment';

import "react-table/react-table.css";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.loadLinks = this.loadLinks.bind(this);
        this.readableDate = this.readableDate.bind(this);
    }

    loadLinks(){
        axios.get(this.props.url)
            .then(res=>{
                this.setState({
                    data: res.data
                })
            })
    }

    readableDate(date){
        let newDate = moment(date.value).format('MM/DD/YYYY');
        console.log(newDate);
        return newDate;

    }

    componentDidMount(){
        this.loadLinks();
        setInterval(this.loadLinks, this.props.pollInterval);
    }

    render() {

        return (
            <div>
                <ReactTable
                    data={this.state.data}
                    columns={[
                        {
                            Header: 'Date',
                            accessor: 'date',
                            PivotValue: ({value}) => <span style={{color: "darkred"}}>{this.readableDate({value})}</span>
                        }, {
                            Header: 'Activity',
                            accessor: 'name'
                        }, {
                            Header: 'Instructions',
                            accessor: 'instructions',
                        }, {
                            Header: 'Starter Files',
                            accessor: 'starter'
                        }, {
                            Header: 'Solution',
                            accessor: 'solution'
                        }]
                    }
                pivotBy={["date", "name"]}
            />
    </div>
    )}
}

export default Table;