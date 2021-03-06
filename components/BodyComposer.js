import React, { Component } from "react";
import cx from "classnames";

import styles from "./BodyComposer.module.css";

export default class BodyComposer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false,
    };
  }

  handleKeyDown = (e) => {
    console.log(e);
    if (e.ctrlKey && e.code === "Enter" && this.props.handleSubmit) {
      this.props.handleSubmit(e);
    }
  };

  handlePreview = () => {
    this.setState({ preview: true });
  };

  handleWrite = () => {
    this.setState({ preview: false });
  };
  render() {
    const { preview } = this.state;
    const { body, handleChangeBody } = this.props;
    // console.log(this.props);
    return (
      <div className={styles.tabContainer}>
        <div className={styles.commentTabNav}>
          <div className={styles.TabNavTabs}>
            <button
              className={cx(
                preview ? styles.inactiveButton : styles.activeButton,
                styles.button
              )}
              onClick={this.handleWrite}
              type="button"
            >
              Write
            </button>
            <button
              className={cx(
                preview ? styles.activeButton : styles.inactiveButton,
                styles.button
              )}
              onClick={this.handlePreview}
              type="button"
            >
              Preview
            </button>
          </div>
          <div className={styles.markDownSymbols}>
            <button className={styles.markDownSymbolH}>H</button>
            <button className={styles.markDownSymbolB}>
              <strong>B</strong>
            </button>
            <button className={styles.markDownSymbolI}>
              <em>I</em>
            </button>
          </div>
        </div>
        <div className={styles.writeContent}>
          {preview ? (
            <div className={styles.commentTextarea}>
              {body ? body : "Nothing to preview"}
            </div>
          ) : (
            <textarea
              placeholder="Leave a comment"
              className={styles.commentTextarea}
              value={body}
              onChange={handleChangeBody}
              onKeyDown={this.handleKeyDown}
            />
          )}

          {preview ? null : (
            <div className={styles.dragAndDropText}>
              <span className={styles.dragText}>
                Attach files by draging & dropping, selecting or pasting them.
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
