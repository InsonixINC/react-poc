/**
 * Created by satish on 14/7/17.
 */
import $ from 'jquery';
import React from 'react';
import DocumentTitle from 'react-document-title';
import axios from 'axios';
import {Router} from 'react-router';

const apiBaseUrl = "http://localhost:8081/employee";

export class AddEmp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            firstname:'',
            lastname:'',
            designation:'',
            salary:''
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    addEmployee(event){
        console.log("values",this.state.firstname,this.state.lastname,this.state.designation,this.state.salary);
        var self = this;
        var employee={
            "id":this.state.id,
            "firstname": this.state.firstname,
            "lastname":this.state.lastname,
            "designation":this.state.designation,
            "salary":this.state.salary
        }
        axios.post(apiBaseUrl+'/add', employee).then(function (response) {
            console.log(response);
               /* Router.push('/');*/
           })
            .catch(function (error) {
                console.log(error);
            });
        //event.preventDefault();
    }
    render() {
        return (
            <DocumentTitle title={`Employees`}>
                <form className="donationForm" onSubmit={this.addEmployee.bind(this)} >
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h3>Employee</h3>
                                <hr />
                            </div>
                        </div>

                        <div className='sp-login-form'>
                            <div className="row" data-spIf="!account.created">
                                <div className="col-xs-12">

                                    <div className="form-horizontal">
                                        <input type="hidden" id="id" name="id"
                                               value={this.state.id}
                                        />
                                        <div className="form-group">
                                            <label htmlFor="firstname" className="col-xs-12 col-sm-4 control-label">First Name</label>
                                            <div className="col-xs-12 col-sm-4">
                                                <input type="text" className="form-control"  id="firstname" name="firstname" placeholder="First Name" required={ true }
                                                       value={this.state.firstname}
                                                       onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastname" className="col-xs-12 col-sm-4 control-label">Last Name</label>
                                            <div className="col-xs-12 col-sm-4">
                                                <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Last Name" required={ true }
                                                       value={this.state.lastname}
                                                       onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="designation" className="col-xs-12 col-sm-4 control-label">Designation</label>
                                            <div className="col-xs-12 col-sm-4">
                                                <input type="text" className="form-control" id="designation" name="designation" placeholder="Designation" required={ true }
                                                       value={this.state.designation}
                                                       onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="salary" className="col-xs-12 col-sm-4 control-label">Salary</label>
                                            <div className="col-xs-12 col-sm-4">
                                                <input type="salary" className="form-control" id="salary" name="salary" placeholder="Salary" required={ true }
                                                       value={this.state.salary}
                                                       onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div key="register-button" className="form-group">
                                            <div className="col-sm-offset-4 col-sm-4">
                                                <input type="submit" className="btn btn-primary" value="Submit"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </DocumentTitle>
        );
    }
}