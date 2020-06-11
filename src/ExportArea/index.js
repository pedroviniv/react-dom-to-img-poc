import React from 'react';
import { toPng, toJpeg, toSvgDataURL } from 'html-to-image';
import { PNG, JPEG, SVG } from './imgFormats';

export default class ExportArea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pngUrl: '',
      pngError: '',
      jpegUrl: '',
      jpegError: '',
      svgUrl: '',
      svgError: '',
    };
  }

  hasExports(format) {
    if (this.state[format]) {
      return true;
    } 
    return false;
  }

  /**
   * exports the dom element into a img in the given format
   * @param {*} format PNG|JPEG|SVG
   * @param {*} dom html element
   */
  export(format, dom) {
    const strategies = {};
    strategies[PNG] = dom => {
      toPng(dom)
        .then(pngUrl => {
          this.setState({
            pngUrl,
          });
        })
        .catch(pngError => {
          this.setState({
            pngError,
          });
        });
    };
    strategies[JPEG] = dom => {
      toJpeg(dom, { quality: 0.95 })
        .then(jpegUrl => {
          this.setState({
            jpegUrl,
          });
        })
        .catch(jpegError => {
          this.setState({
            jpegError,
          });
        });
    };
    strategies[SVG] = dom => {
      toSvgDataURL(dom)
        .then(svgUrl => {
          this.setState({
            svgUrl,
          });
        })
        .catch(svgError => {
          this.setState({
            svgError,
          });
        });
    };

    strategies[format](dom);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h3>PNG</h3>
            {this.state.pngError}
            {this.hasExports('pngUrl') ? <img src={this.state.pngUrl} alt='png exported img'/> : <></> }
          </div>
          <div className="col-md-6">
            <h3>SVG</h3>
            {this.state.svgError}
            {this.hasExports('svgUrl') ? <img src={this.state.svgUrl} alt='svg exported img'/> : <></> }
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <h3>JPEG</h3>
            {this.state.jpegError}
            {this.hasExports('jpegUrl') ? <img src={this.state.jpegUrl} alt='jpeg exported img'/> : <></> }
            <br/>
            {this.hasExports('jpegUrl') ? <a href={this.state.jpegUrl} download='exported jpeg.jpeg'>Download jpeg</a> : <></> }
          </div>
      </div>
      </div>
    );
  }
}