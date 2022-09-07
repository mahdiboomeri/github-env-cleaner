# github-env-cleaner
☁️ Remove github deployment history.

 A simple command line tool for removing repository's deployment history. (using github REST api)
 
 ### Usage
 First you need a access token with repo_deployment privilege. you can create a new token from `Settings->Developer Settings->Personal Access Tokens`.
 
 ```bash
 pnpm dlx github-env-cleaner // or npx github-env-cleaner
 ```
 
 ### Known limitations
 Github will not allow you to remove active deployments. More information at https://docs.github.com/en/rest/deployments/deployments#delete-a-deployment
