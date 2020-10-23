import React from 'react';

export default function ProjectDetail({ project }) {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card large">
          <img className="rounded" src={project.imageUrl} alt={project.name} />
          <section className="section dark">
            <h3 className="strong">
              <strong>{project.name}</strong>
            </h3>
            <p>{project.description}</p>
            <p>Budget : {project.budget}</p>
            <p>Signed: {project.contractSignedOn}</p>
            <p>
              <mark className="active">
                {project.isActive ? 'active' : 'inactive'}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
