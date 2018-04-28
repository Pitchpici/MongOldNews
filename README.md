# MongOldNews Scraper

### Overview

MongOldNews Scraper (ProPublica) is a scraper app which captures the title, summary and link of articles of ProPublica.org. In this app, users are able to save their preferred articles, add notes and edit notes to one or multiple articles. 

In this repository, you can see source code of the MongOldNews Scraper. 


### Key Dependencies

`request`: enables `cheerio` to get access to front-end code of https://www.propublica.org

`cheerio`: scrapes front-end code from https://www.propublica.org

`mongoose`: be in charge of database of `scrap`

`express`: builds server-side routes and functions

`morgan`: logs server-side requests, helping debugging

`express-handlebars`: a powerful front-end builder without requiring multiple html pages