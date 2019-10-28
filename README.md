
# Assignment Template
This repository contains the base files for the assignment. You will need to create a _private duplicate_ in your module organisation. Carry out the following steps, taken from the [GitHub documentation](https://help.github.com/en/enterprise/2.16/user/articles/duplicating-a-repository):

Temporarily clone this repository to your development computer. This will create a directory on your computer called `temp` which contains the repository files:

`git clone https://github.coventry.ac.uk/web/template-dynamic-websites.git temp`

Create a new **private** repository in the module organisation on the GitHub server and copy the _clone url_ to the clipboard (the one that begins with `https://` and ends in `.git`. The repository name should be your username (the one you use to log into the University computers).

Mirror Push to this new repository, replacing xxx with the url from the clipboard making sure you are _in_ the `temp/` directory:

`cd temp/ && git push --mirror xxx`

Once you are sure the code is in your new repository, delete the temporary local repository.

`cd .. && rm -rf temp/`
Your private repository on GitHub will now contain a complete copy of this template including the commits that were already made. You can now start your assignment by carrying out the following steps:

Clone your private repository

Change your [local config settings](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup). This is a vital step otherwise your commits won't show on the GitHub _graph_ and your grade will be affected.

Start working on the assignment. Remember to install all the dependencies listed in the `package.json` file.

Zakariyya Ahmed
