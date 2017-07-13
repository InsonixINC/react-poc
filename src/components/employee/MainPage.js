/**
 * Created by satish on 13/7/17.
 */
import $ from 'jquery';
import React from 'react';

class Employee extends React.Component{

    constructor(){
        super();
        this.state={
            display :true
        }
        this.handleDelete = this.handleDelete.bind(this);

    }

    handleDelete() {
        var self = this;
        console.log("Deleting ")
        $.ajax({
            url: 'http://localhost:8081/employee/delete/'+this.props.empl.id,
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
        if (this.state.display==false) return null;
        else
        return (
            <tr>
                <td>{this.props.empl.id}</td>
                <td>{this.props.empl.firstname}</td>
                <td>{this.props.empl.lastname}</td>
                <td>{this.props.empl.designation}</td>
                <td>{this.props.empl.salary}</td>
                <td>
                    <button className="btn btn-success" onClick={this.handleDelete.bind(this)}>Delete</button>
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
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Delete</th>
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
            url: "http://localhost:8081/employee/list",
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
            <div className='container'>
                <EmployeeTable employeeList={this.state.employees} />
            </div>
        );
    }
}




/*
export default MainPage;*/
