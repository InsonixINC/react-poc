/**
 * Created by satish on 14/7/17.
 */
import $ from 'jquery';
import React from 'react';
import DocumentTitle from 'react-document-title';
import axios from 'axios';

const apiBaseUrl = "http://localhost:8081/employee";

export class Modal extends React.Component{

    constructor(){
        super();
        this.state={
            value:''
        }

    }
    show () {
        this.$el.modal("show");
    }

    reset() {
        this.setState({ value: "" });
    }

    save() {
        dispatcher.dispatch({ type: constants.create, content: { name: this.state.value, isComplete: false }});
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h2 className="modal-title">New Task</h2>
                    </div>
                    <div className="modal-body">
                        <input placeholder="Task name..." type="text" value={this.state.value} onChange={this.onChange} />
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col col-md-12">
                                <button type="button" className="btn btn-primary pull-right" onClick={this.save}>Save</button>
                                <button type="button" className="btn btn-default pull-right spacing-right" onClick={this.reset} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
