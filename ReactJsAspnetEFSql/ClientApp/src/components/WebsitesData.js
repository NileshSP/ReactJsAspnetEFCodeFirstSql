import React, { Component } from 'react';

export class WebsitesData extends Component {
  static displayName = WebsitesData.name;
  static baseDataUrl = "api/Websites";

    constructor(props) {
        super(props);
        let listColumns = ["Url,TotalVisits,VisitDate", "Url,TotalVisits"];
        this.state = {
            websites: []
            , loading: true
            , topNumber: 5
            , searchDate: ""
            , listSearchColumns: listColumns
            , searchColumns: listColumns[0]
            , currentOption: listColumns[0]
            , responseJsonColumns: []
            , errorMessage: ""
            , minDate: ""
            , maxDate: ""
        };
    }

    async componentDidMount() {
        this.getMinMaxDate().then(_ => this.getDataFromDBUsingServer());
    }

    setComponentState = async (stateOptions) => await this.setState({ ...this.state, ...stateOptions });

    getMinMaxDate = () => {
        return fetch(WebsitesData.baseDataUrl + "/GetMinMaxDate")
            .then(result => result.json())
            .then(dateResult => {
                if (dateResult !== null) {
                    this.setComponentState({ maxDate: dateResult.maxDate, minDate: dateResult.minDate, searchDate: dateResult.minDate });
                }
            })
    }

    getDataFromDBUsingServer = async () => {
        let apiOptions = "/Index?";
        apiOptions += (this.state.searchDate.trim() !== "" ? "&searchDate=" + this.state.searchDate.trim() : "");
        apiOptions += (this.state.topNumber !== null ? "&topNumber=" + this.state.topNumber.toString() : "");
        apiOptions += (this.state.currentOption.trim() !== "" ? "&columns=WebsiteId," + this.state.currentOption.trim() : "");
        fetch(WebsitesData.baseDataUrl + apiOptions)
            .then(response => {
                let data = response.json();
                if (response.status === 200) {
                    this.setComponentState({
                        loading: false
                        , errorMessage: 'reading'
                    });
                }
                return data
            })
            .then(data => {
                if (this.state.errorMessage === 'reading') {
                    this.setComponentState({
                        websites: data
                        , loading: false
                        , searchColumns: this.state.currentOption.trim()
                        , responseJsonColumns: data.length === 0 ? [] : Object.keys(data[0])
                        , errorMessage: ""
                    });
                }
                else {
                    this.setComponentState({
                        loading: false
                        , errorMessage: data.Message
                    });
                }
            })
            .catch((error) => {
                console.log('API call failed:', error)
            });
    }

    render() {
        return <div>
            <h1>Website Tracking Details</h1>
            <p>This component demonstrates data for top websites by visits from the (sql/in-memory)database.</p>
            <p>Get top&nbsp;&nbsp;
                {this.renderTopNumber(this.state, (stateOptions) => this.setComponentState(stateOptions))}
                &nbsp;&nbsp;websites for&nbsp;&nbsp;
                {this.renderSearchDate(this.state, (stateOptions) => this.setComponentState(stateOptions))}
                &nbsp;&nbsp;with columns as &nbsp;&nbsp;
                {this.renderColumnsList(this.state, (stateOptions) => this.setComponentState(stateOptions))}
                &nbsp;&nbsp;
                {this.renderSubmitButton(() => this.getDataFromDBUsingServer())}
            </p>
            {
                this.state.loading
                    ? <p><em>Loading...</em></p>
                    : (
                        this.state.errorMessage === ""
                            ? this.renderWebsitesTable(this.state)
                            : (this.state.errorMessage === "reading"
                                ? <p><em>Loading...data fetched...reading...</em></p>
                                : <p><em>Error occured : {this.state.errorMessage}</em></p>
                            )
                    )
            }
        </div>;
    }

    renderWebsitesTable = (state) => {
        const websites = state.websites;
        return <table className='table table-striped'>
            <thead>
                <tr>
                    {state.responseJsonColumns.map(s => (s.toUpperCase().trim() !== 'WEBSITEID' ? <th key={s}>{s}</th> : null))}
                </tr>
            </thead>
            <tbody>
                {websites.map(website =>
                    <tr key={website.WebsiteId}>
                        {state
                            .responseJsonColumns
                            .map(s => (s.toUpperCase().trim() !== 'WEBSITEID'
                                        ?   <td key={website[s]}>
                                            {s.toUpperCase().trim() === 'VISITDATE'
                                                ? website[s] !== undefined ? (new Date(website[s]).toLocaleDateString()) : null
                                                : website[s]
                                            }
                                            </td>
                                        : null
                                      )
                            )
                        }
                    </tr>
                )
                }
            </tbody>
        </table>;
    }

    renderTopNumber = (state, setComponentState = (stateOptions) => { }) => {
        const topNumberChange = (event) => setComponentState({ topNumber: parseInt(event.currentTarget.value, 0) });

        return <select id="topNumberSelect"
            value={state.topNumber.toString()}
            onChange={e => topNumberChange(e)}
            style={{ width: "45px" }}
        >
            {
                [...Array(10).keys()].map(val => {
                    var setVal = val+1;
                    return <option key={setVal} value={setVal} >{setVal}</option>
                })
            }
        </select>
    }

    renderSearchDate = (state, setComponentState = (stateOptions) => { }) => {
        const dateChange = (event) => setComponentState({ searchDate: event.currentTarget.value });

        return <input type="date" id="searchDateSelect" min={state.minDate} max={state.maxDate}
            value={state.searchDate}
            onChange={e => dateChange(e)}
        />
    }

    renderColumnsList = (state, setComponentState = (stateOptions) => { }) => {
        const columnsChange = (event) => setComponentState({ currentOption: event.currentTarget.value });

        return <select id="columnsSelect"
            value={state.currentOption}
            onChange={e => columnsChange(e)}
            style={{ width: "200px" }}
            ref="columnsSelect"
        >
            {
                state.listSearchColumns.map((val) => {
                    var setVal = val;
                    return <option key={setVal} value={setVal} >{setVal}</option>
                })
            }
        </select>
    }

    renderSubmitButton = (getData = () => { }) => {
        return <button id="btnSubmit" onClick={e => getData()} >View</button>;
    }
}
