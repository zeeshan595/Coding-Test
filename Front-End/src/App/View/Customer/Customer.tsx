import * as React from "react";
import { ICustomer } from "../../Model/ICustomer";

export interface ICustomerProps {
  customer: ICustomer;
}

export class Customer extends React.Component<ICustomerProps> {
  render() {
    return (
      <div className="card">
        <h2 className="fullName">{this.props.customer.fullName}</h2>
        <div className="userName">
          User: <span>{this.props.customer.userName}</span>
        </div>
      </div>
    );
  }
}
