
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
import config from './data/config.json';
import gj from './data/compressedGJWithProps'
import Button from './button';
import pointsConfig from './data/configPoints'
// Kepler.gl actions
import {addDataToMap} from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
import nycTrips from './data/nyc-trips.csv';




const MAPBOX_TOKEN = "pk.eyJ1IjoiZGV2YW5zaGJhdHJhMDQiLCJhIjoiY2pqdTZxaHU1MDJiZjNrcDhuYXVheHVzMyJ9.WSl_fd9X-C9eqvVk4xPgvg"; // eslint-disable-line


class App extends Component {
    constructor(props, context){
        super(props, context);
        this.state= {
          config: pointsConfig,
          button: "See Heatmap"
        };
        this.toggleMode = this.toggleMode.bind(this);
        this.display = this.display.bind(this);
    }
    toggleMode(){
        if (this.state.button === "See Heatmap") this.setState({config: config, button: "See accident Stats"});
        else this.setState({config: pointsConfig, button: "See Heatmap"});
        this.display();
    }

    display(){
        const data = Processors.processGeojson(gj);
        // Create dataset structure
        const dataset = {
            data,
            info: {
                // `info` property are optional, adding an `id` associate with this dataset makes it easier
                // to replace it later
                id: 'my_data'
            }
        };
        // addDataToMap action to inject dataset into kepler.gl instance
        this.props.dispatch(addDataToMap({datasets: dataset, config: this.state.config}));
    }
    // componentDidUpdate(){
    //     this.display();
    // }
    componentDidMount() {
        this.display();
    }
    render() {
        return (
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                <Button onClick={this.toggleMode}>{this.state.button}</Button>

                <AutoSizer>
                    {({height, width}) => (

                        <KeplerGl
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            id="map"
                            width={width}
                            height={height}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);