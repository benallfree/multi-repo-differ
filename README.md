# Introduction

Multi-Repo-Differ is a tool that displays the `git diff` results for multiple repositories at the same time. It is useful for cases where a feature changes must be tracked across multiple repositories. MRD tracks not only working copy changes, but also changes in the `git log` as compared to a reference/main branch for each repo.

![Screen shot](https://raw.githubusercontent.com/benallfree/multi-repo-differ/master/screen1.png)


# Installation

Clone the repo

`npm install`

Start the server: `PORT=4001 npm run serve`

Start the frontend: `npm run start`
