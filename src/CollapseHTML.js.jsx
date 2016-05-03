import {Component, PropTypes} from "react";
import trunc from "trunc-html";
export default class CollapseHTML extends Component {
  constructor(props) {
    super(props);
    this.state = {collapsed: true};
  }

  // static defaultProps = {
  //     text: '',
  //     truncateText: '…',
  //     line: 1,
  //     showTitle: true,
  //     raf: true
  // };
  _renderHTML() {
    let truncatedFirstElement;
    const {html, charLimit, targetElement} = this.props;
    const {collapsed} = this.state;
    const htmlLength = $(html).text().length;
    if (htmlLength > charLimit) {
      // If total characters is greater than the character limit set,
      // target the first paragraph element and reduce the characters the char
      // limit.
      if (collapsed) {
        const firstElementLength = $(html).first(targetElement).text().length;
        const firstElementHTML = $(html).first(targetElement).html();

        if (firstElementLength < charLimit) {
          truncatedFirstElement = trunc(firstElementHTML, firstElementLength - 1);
        } else {
          truncatedFirstElement = trunc(firstElementHTML, charLimit);
        }
        const newParagraph = `${truncatedFirstElement.html}`;
        return {__html: newParagraph};
      }

      return {__html: trunc($(html).html(), htmlLength).html};
    }

    return {__html: trunc($(html).html(), htmlLength).html};
  }

  _clickCollapseButton(e) {
    e.preventDefault();
    const {collapsed} = this.state;
    this.setState({collapsed: !collapsed});
  }

  _collapseButton() {
    const {html, charLimit, buttonToggleClass} = this.props;
    const {collapsed} = this.state;
    let button;

    if ($(html).text().length > charLimit) {
      if (collapsed) {
        button = (
          <div onClick={(e) => this._clickCollapseButton(e)} className="more-toggle-wrapper">
            <p className={`${buttonToggleClass} more`}>Show more</p>
            <div className="down-arrow-wrapper"></div>
          </div>
        );
      } else {
        button = (
          <div onClick={(e) => this._clickCollapseButton(e)} className="less-toggle-wrapper">
            <p className={`${buttonToggleClass} less`}>Show less</p>
            <div className="up-arrow-wrapper"></div>
          </div>
        );
      }
    }

    return button;
  }

  render() {
    const {containerClass, innerClass} = this.props;

    return (
      <div className={containerClass}>
        <div className={innerClass}>
          <div dangerouslySetInnerHTML={this._renderHTML()} />
          {this._collapseButton()}
        </div>
      </div>
    );
  }
}

CollapseHTML.propTypes = {
  html: PropTypes.any.isRequired,
  containerClass: PropTypes.string.isRequired,
  innerClass: PropTypes.string.isRequired,
  charLimit: PropTypes.number,
  buttonToggleClass: PropTypes.string.isRequired,
  targetElement: PropTypes.string.isRequired,
};
