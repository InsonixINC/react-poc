/**
 * Created by satish on 13/7/17.
 */
import $ from 'jquery';
import React from 'react';
import DocumentTitle from 'react-document-title';
import axios from 'axios';
import {AddEmp} from './AddEmp';
import {Router} from 'react-router';

const editBtnLeftMargin={
    margin: '0px 0px 0px 11px'
}

const  addBtnTopMargin={
    margin: '102px 0px 0px 0px'
}

const apiBaseUrl = "http://localhost:8081/employee";

class Employee extends React.Component{

    constructor(){
        super();
        this.state={
            display :true,
            id:'',
            firstname:'',
            lastname:'',
            designation:'',
            salary:''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
    }

    editEmployee(){
        var self = this;
        var editUrl = apiBaseUrl+'/edit/'+this.props.empl.id;
        axios.get(editUrl).then(function (response) {
            console.log(response.data.id);
            alert(response.data.id);
        }).catch(function (error) {
                console.log(error);
        });
    }

    handleDelete() {
        var self = this;
        console.log("Deleting ")
        var deleteUrl = apiBaseUrl+'/delete/'+this.props.empl.id;
        $.ajax({
            url: deleteUrl,
            type: 'DELETE',
            success: function(result) {
                console.log("Deleted "+result);
                self.setState({display: false});
            },
            error: function(xhr, ajaxOptions, thrownError) {
            }
        });
    }

    render() {
        if (this.state.display==false) {
            return null;
        }
        else
        return (
            <tr>
                <td>{this.props.empl.firstname}</td>
                <td>{this.props.empl.lastname}</td>
                <td>{this.props.empl.designation}</td>
                <td>{this.props.empl.salary}</td>
                <td>
                    <button className="btn btn-success" onClick={this.handleDelete.bind(this)}>Delete</button>
                   {/* <span style={editBtnLeftMargin}>
                        <button className="btn btn-success" onClick={this.editEmployee.bind(this)}>Edit</button>
                    </span>*/}
                </td>
            </tr>
        );
    }
}


class EmployeeTable extends  React.Component{

    render() {
        var rows = [];
        rows = this.props.employeeList.map(emp =>
            <Employee empl={emp} key={emp.id} />
        )
    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
   }
}

export class MainPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            employees: []
        }
        this.loadEmployeesFromServer = this.loadEmployeesFromServer.bind(this);


    }

    loadEmployeesFromServer() {
        console.log("Loading data from server")
        var self = this;
        $.ajax({
            url: apiBaseUrl+"/list",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            method: "GET",
            success: function(data){
                self.setState ( {
                    employees: data
                });

            },
            error: (xhr, status, err) => {
                console.error("Error ")
                console.error(this.props.url, status, err.toString());
            }
        })

    }

    componentDidMount() {
        console.log("Component loaded")
        this.loadEmployeesFromServer();
    }

    render() {
        return (
        <div style={addBtnTopMargin}>
            <AddEmp/>
            <div className='container'>
                <EmployeeTable employeeList={this.state.employees} />
            </div>
        </div>
        );
    }
}





/*
export default MainPage;*/
