import React from 'react';
import { projectAPI } from './projectAPI';
import ProjectDetail from './ProjectDetail';
import { Project } from './Project';

interface ProjectPageState {
  loading: boolean;
  project: Project | undefined;
  error: string | undefined;
}

class ProjectPage extends React.Component<any, ProjectPageState> {
  state = {
    loading: false,
    project: undefined,
    error: ''
  };

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    this.setState({ loading: true });
    projectAPI
      .find(id)
      .then(data => this.setState({ project: data, loading: false }))
      .catch(e => this.setState({ error: e.message, loading: false }));
  }
  render() {
    const { loading, project, error } = this.state;
    return (
      <React.Fragment>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {project && <ProjectDetail project={project} />}
      </React.Fragment>
    );
  }
}

export default ProjectPage;
