This is a repo that contains shared assets for the Vemba family of products. It includes a materials UI theme (vembaTheme.js) and any shared assets like images, favicons, etc.

#Quick Start
```https://git-scm.com/book/en/v2/Git-Tools-Submodules```
##To include the submodule in an existing repo

1.Navigate to the src/asssets/folder and in the terminal, enter:

*```git submodule add -b master https://github.com/ademola-raimi/sharedassets.git```

2. This will create the empty sharedasssets folder and to import files

*```git submodule init```

then

```git submodule update``` 

##Clone the project repo and automatically setup the submodules using --recure-submodules

```git clone --recurse-submodules https://github.com/ademola-raimi/sharedassets.git```

This should automatically initialize and update each submodule in the repo.

## Pushing and Pulling branches

To push/pull all changes (this needs to be done with each push/pull)

```git push --recurse-submodules=on-demand```

Alternately, you can do regular push/pull from the parent git or from the submodule independantly.

**NOTE:** It is important to remember that any changes to the Theme or any of the shared assets will be promoted across multiple projects. It is vitally important to make only changes that are project non-specific in this repo.

#Material UI Themes
Material UI is the design theme that Vemba has chosen to implement for the myriad projects that we are developing.

By creating this shared repo, we can assure that we are consistently using the same style and design standards across apps, giving a sense of product familiarity. It also cuts down on repeated code and design elements.

 ```https://material-ui.com/customization/themes/```
 
 The theme for hotel apps is called hotelTheme.js and should be imported on the index.js file as:
 
 ```import vembaTheme from "./assets/sharedassets/hotelTheme.js";```
 
 The Material UI Theme file is essentially a Material UI Wrapper (createMuiTheme) that contains JSON used to create a style definition and automatically assemble Material UI components with the fonts, colours and effects specified within.
 
 