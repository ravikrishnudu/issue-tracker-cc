import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";

import styles from "./Issues.module.css";
import Labels from "./Labels";

async function getIssues(page) {
  return fetch(
    `https://api.github.com/repos/facebook/react/issues?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    }
  ).then((res) => res.json());
}

class Issue extends Component {
  render() {
    const { issue } = this.props;
    // console.log(issue);
    return (
      <div className={styles.issueContainer}>
        <div className={styles.issue}>
          <div className={styles.titleContent}>
            <span>
              <Link className={styles.title} to={`/issues/${issue.number}`}>
                {issue.title}
              </Link>
            </span>
            <Labels labels={issue.labels} />
          </div>
          <div className={styles.subTextBody}>
            <span className={styles.subText}>#{issue.number}</span>
            <span className={styles.subText}>
              opened {formatDistance(Date.now(), parseISO(issue.updated_at))}{" "}
              ago
            </span>
            <span className={styles.userLogin}>
              by{" "}
              <a href="/#" className={styles.herfUserTag}>
                {issue.user.login}
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: null,
      page: 1,
      pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  componentDidMount() {
    getIssues(this.state.page).then((issues) => {
      this.setState({ issues });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (page !== prevState.page) {
      getIssues(this.state.page).then((issues) => {
        this.setState({ issues });
      });
    }
  }

  handlePreviousPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
  };

  handleNextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  handlePage = (currentPage) => {
    this.setState({ page: currentPage });
  };

  render() {
    const { issues, pages } = this.state;
    if (!issues) {
      return <div>Lodaing...</div>;
    }
    console.log(this.state.issues);
    // eslint-disable-next-line
    // console.log(process.env.REACT_APP_TOKEN);
    return (
      <div>
        {issues.map((issue) => (
          <Issue issue={issue} key={issue.id} />
        ))}

        <div className={styles.buttonContainer}>
          <button
            className={styles.previousButton}
            onClick={this.handlePreviousPage}
          >
            Previous
          </button>
          {pages.map((page, index) => (
            <button
              className={styles.numberButtons}
              onClick={() => this.handlePage(page)}
              key={index}
            >
              {page}
            </button>
          ))}
          <button className={styles.nextButton} onClick={this.handleNextPage}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
