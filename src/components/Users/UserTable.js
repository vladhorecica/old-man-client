import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getAllUsers } from '../../actions/userAction';

const mapStateToProps = state => ({
    auth: state.userReducer.auth
});

const mapDispatchToProps = dispatch => ({});

class UserTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: '',
            columnDefs: [
                { headerName: "ID", field: "id", width: 70, cellRenderer: "loadingRenderer" },
                { headerName: "Username", field: "username", width: 200 },
                { headerName: "First Name", field: "firstName", width: 150 },
                { headerName: "Last Name", field: "lastName", width: 150 }
            ],
            components: {
                loadingRenderer: function(params) {
                    if (params.value !== undefined) {
                        return params.value;
                    } else {
                        return '<img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/loading.gif">';          }
                }
            },
            rowBuffer: 0,
            rowSelection: 'multiple',
            rowModelType: 'infinite',
            paginationPageSize: 50,
            cacheBlockSize: 50,
            maxConcurrentDatasourceRequests: 1,
            maxBlocksInCache: 50
        };
    }

    onGridReady(params, auth) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        const updateData = () => {
            const dataSource = {
                rowCount: null,
                getRows: async (params) => {
                    console.log("asking for " + params.startRow + " to " + params.endRow);

                    const users = await getAllUsers(params.startRow, params.endRow, auth);
                    if (users) {
                        params.successCallback(users.data, users.meta.total);
                    }

                }
            };
            params.api.setDatasource(dataSource);
        };

        updateData();
    }

    onSelectionChanged(updateSelected) {
        const selectedRows = this.gridApi.getSelectedRows();
        let selectedRowsString = "";

        selectedRows.forEach(function(selectedRow, index) {
            if (index !== 0) {
                selectedRowsString += ", ";
            }
            selectedRowsString += `${selectedRow.firstName} ${selectedRow.lastName}`;
        });

        updateSelected(selectedRowsString);
    }

    updateSelected = (selected) => {
        this.setState({ selected });
    };

    renderSelectedText() {
        return (this.state.selected) ? <div style={{display: 'block', color: '#F50757'}}>{this.state.selected}</div> : '';
    }

    render() {
        return (
            <div style={{height: '500px', width: '30%'}}>
                <div id="myGrid" className="ag-theme-balham"
                     style={{
                         boxSizing: "border-box",
                         height: "100%",
                         width: "100%"
                     }}
                >
                    {this.renderSelectedText()}
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        components={this.state.components}
                        enableColResize={true}
                        rowBuffer={this.state.rowBuffer}
                        rowSelection={this.state.rowSelection}
                        rowDeselection={true}
                        rowModelType={this.state.rowModelType}
                        deltaRowDataMode={true}
                        getRowNodeId={data => data.id}
                        paginationPageSize={this.state.paginationPageSize}
                        cacheBlockSize={this.state.cacheBlockSize}
                        maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
                        maxBlocksInCache={this.state.maxBlocksInCache}
                        onGridReady={(params) => this.onGridReady(params, this.props.auth)}
                        onSelectionChanged={() => this.onSelectionChanged(this.updateSelected)}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
