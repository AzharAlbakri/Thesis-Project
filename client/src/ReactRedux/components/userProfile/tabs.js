import React from 'react';
import { TabContent, TabPane, Nav, NavItem, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import $ from "jquery";

import FavCard from "./FavCard.js";
import './style.css';
import Pagination from './Pagination';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    var exampleItems = [{id: 1, name: "Wait to fetch data"}]
    // // var exampleItems = [...Array(14).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      exampleItems: exampleItems,
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
    console.log(pageOfItems)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  componentDidMount() {
    var data = { owner_id: 1 };
    console.log("here");
    $.ajax({
      // url: '/userCharities',
      url: "/userCharities",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(data) {
        console.log(data, "/charities/charities/charities/charities");
        this.setState({
            exampleItems: data
        });
        return data;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }



  render() {
    return (
      <div className="centerTab">
        <Nav tabs>
          <NavItem>
            <button
              className={classnames({ active: this.state.activeTab === '1' }), "btnTab"}
              onClick={() => { this.toggle('1'); }}
            >
            Charities
            
            </button>
          </NavItem>
          <NavItem>
            <button
              className={classnames({ active: this.state.activeTab === '2' }), "btnTab"}
              onClick={() => { this.toggle('2'); }}
            >
              Donations
            </button>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <h4 className="h4pagi">Charities</h4>
              <Row>
              {this.state.pageOfItems.map(item =>
				        <FavCard key={item.id} item={item}/>	
                )}
			      </Row>
			      <div>
            <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
            </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            Donations Go Here
          </TabPane>
        </TabContent>
      </div>
    );
  }
}