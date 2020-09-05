import React from "react";
import "./Style.scss";
import { ICustomer } from "../../Model/ICustomer";
import { fetchUser, fetchUsers } from "../../Controller/FetchUsers";
import { Customer } from "../Customer/Customer";

interface Param {
  [key: string]: string;
}

export interface HomePageProps {
  match: {
    isExact: boolean;
    params: Param;
  };
}
export interface HomePageState {
  customers: ICustomer[];
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  async componentDidMount() {
    if (!this.props.match || !this.props.match.params) return;
    const id = parseInt(this.props.match.params["id"]);
    if (id) {
      //get one customer if id is provided
      const customer = await fetchUser(id);
      this.setState({
        ...this.state,
        customers: [customer],
      });
    } else {
      //get all customers if no id was provided
      const customers = await fetchUsers();
      this.setState({
        ...this.state,
        customers,
      });
    }
  }

  render() {
    return (
      <div className="customersContainers">
        {this.state.customers.map((customer) => (
          <Customer key={customer.userName} customer={customer} />
        ))}
      </div>
    );
  }
}
