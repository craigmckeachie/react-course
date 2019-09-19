//TODO: Do I need to install TS Lint to get linting working?
https://medium.com/@rossbulat/how-to-use-typescript-with-react-and-redux-a118b1e02b76

https://stackoverflow.com/questions/2751227/how-to-download-source-in-zip-format-from-github

export function deleteProject(
project: Project
): ThunkAction<void, ProjectState, null, Action<string>> {
return (dispatch: any) => {
if (!project.id) return;
dispatch({ type: DELETE_PROJECT_REQUEST });
return projectAPI
.delete(project.id)
.then(data => {
dispatch({ type: DELETE_PROJECT_SUCCESS, payload: project });
})
.catch(error => {
dispatch({ type: DELETE_PROJECT_FAILURE, payload: error });
});
};

removeProject(project){
   -
   -
   -
       this.props.onRemove(project)
   }