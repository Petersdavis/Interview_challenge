import React, {Component} from 'react';

class Coin extends Component{
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    componentDidMount() {
    }

    render(){
        return(
            <div className = "coin">
                <div className = "coin-header">
                    {this.props.coin.name} -- {this.props.coin.symbol}
                    <div className = "coin-header-actions">
                        {this.props.action}
                    </div>

                </div>
                <div className = "coin-body">
                    <div className = "coin-label">
                        Price:
                    </div>
                    <div className = "coin-text">
                        {this.props.coin.price}
                    </div>

                    <div className = "coin-label">
                        Supply:
                    </div>
                    <div className = "coin-text">
                        {this.props.coin.supply}
                    </div>
                    <div className = "coin-label">
                        Market Cap:
                    </div>
                    <div className = "coin-text">
                        ${this.props.coin.market}
                    </div>
                    <div className = "coin-label">
                        24h Volume:
                    </div>
                    <div className = "coin-text">
                        {this.props.coin.volume}
                    </div>
                </div>
            </div>
        )
    }
}

export default Coin;