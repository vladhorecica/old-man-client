import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getAllUsers } from '../../actions/userAction';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class UserTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        const updateData = () => {
            var dataSource = {
                rowCount: null,
                getRows: async (params) => {
                    console.log("asking for " + params.startRow + " to " + params.endRow);

                    const users = await getAllUsers(params.startRow, params.endRow);
                    if (users) {
                        params.successCallback(users);
                    }

                }
            };
            params.api.setDatasource(dataSource);
        };

        updateData();
    }

    render() {
        return (
            <div style={{height: '500px', width: '100%'}}>
                <div id="myGrid" className="ag-theme-balham"
                     style={{
                         boxSizing: "border-box",
                         height: "100%",
                         width: "100%"
                     }}
                >
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
                        onGridReady={this.onGridReady}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
