import React, { useEffect, useState } from 'react';
import { projectAPI } from './projectAPI';
import ProjectDetail from './ProjectDetail';
import { Project } from './Project';
import { RouteComponentProps } from 'react-router-dom';

interface ProjectPageProps extends RouteComponentProps<{ id: string }> {}

function ProjectPage(props: ProjectPageProps) {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const id = Number(props.match.params.id);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .find(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <>
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
      </>
    </div>
  );
}

export default ProjectPage;
